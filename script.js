(function () {
  "use strict";

  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const yearEl = document.getElementById("year");
  const snowField = document.getElementById("snowField");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* Language toggle (EN / KA) */
  const STORAGE_KEY = "enguri:lang";
  const setLang = (lang) => {
    const next = lang === "ka" ? "ka" : "en";
    document.documentElement.setAttribute("lang", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (_) {}
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === next);
      btn.setAttribute("aria-pressed", String(btn.dataset.lang === next));
    });
  };

  let stored = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch (_) {}
  setLang(stored || document.documentElement.getAttribute("lang") || "en");

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".lang-btn");
    if (!btn) return;
    setLang(btn.dataset.lang);
  });

  /* Season toggle (Winter / Summer) */
  const SEASON_KEY = "enguri:season";
  const setSeason = (season) => {
    const next = season === "summer" ? "summer" : "winter";
    document.documentElement.setAttribute("data-season", next);
    try {
      localStorage.setItem(SEASON_KEY, next);
    } catch (_) {}
    document.querySelectorAll(".season-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.season === next);
      btn.setAttribute("aria-pressed", String(btn.dataset.season === next));
    });
    applySnow();
  };

  let storedSeason = null;
  try {
    storedSeason = localStorage.getItem(SEASON_KEY);
  } catch (_) {}

  /* Navbar scroll state (sub-pages only — home keeps transparent navbar) */
  const isHomePage = Boolean(document.querySelector(".hero"));

  const handleScroll = () => {
    if (!navbar || isHomePage) return;
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };
  if (!isHomePage) {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
  }

  /* Mobile nav */
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      navToggle.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", String(open));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Scroll reveal (home page only — menu pages show content immediately) */
  const isMenuPage = Boolean(document.querySelector(".menu-page"));

  if (!isMenuPage) {
    const revealTargets = document.querySelectorAll(
      "section, .dish-card, .section-head, .menu-group"
    );
    revealTargets.forEach((el) => el.classList.add("reveal"));

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      revealTargets.forEach((el) => io.observe(el));
    } else {
      revealTargets.forEach((el) => el.classList.add("visible"));
    }
  }

  /* Snow particles (hero) — only in winter */
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function applySnow() {
    if (!snowField) return;
    snowField.innerHTML = "";
    if (prefersReducedMotion) return;
    if (document.documentElement.getAttribute("data-season") === "summer") {
      return;
    }
    const flakeCount = 40;
    const glyphs = ["\u2744", "\u2745", "\u2746", "\u2022"];
    for (let i = 0; i < flakeCount; i++) {
      const flake = document.createElement("span");
      flake.className = "snow-flake";
      flake.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
      const size = 0.5 + Math.random() * 1.2;
      const duration = 8 + Math.random() * 14;
      const delay = -Math.random() * duration;
      flake.style.left = Math.random() * 100 + "%";
      flake.style.fontSize = size + "rem";
      flake.style.opacity = String(0.4 + Math.random() * 0.6);
      flake.style.animationDuration = duration + "s";
      flake.style.animationDelay = delay + "s";
      snowField.appendChild(flake);
    }
  }

  /* Apply season (now that applySnow is defined) and wire up buttons */
  setSeason(
    storedSeason ||
      document.documentElement.getAttribute("data-season") ||
      "summer"
  );

  document.querySelectorAll(".season-btn").forEach((btn) => {
    btn.addEventListener("click", () => setSeason(btn.dataset.season));
  });
})();
