/**
 * Простой скрипт для сайта AnesteZi.
 * 1) Год в подвале
 * 2) Тень у шапки при прокрутке
 * 3) Плавное появление блоков при скролле
 */

(function () {
  // --- Год в copyright ---
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --- Шапка: класс при прокрутке вниз ---
  var header = document.querySelector(".header");
  function updateHeader() {
    if (!header) return;
    if (window.scrollY > 12) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // --- Появление элементов с классом .js-reveal ---
  var revealItems = document.querySelectorAll(".js-reveal");
  if (!("IntersectionObserver" in window)) {
    // Старые браузеры: просто показываем всё сразу
    revealItems.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -5% 0px",
    }
  );

  revealItems.forEach(function (el) {
    observer.observe(el);
  });
})();
