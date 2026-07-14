(function () {
  'use strict';

  var STAGGER_MS = 140;

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function pairIndex(pair) {
    var section = pair.closest('.data-story__examples');
    if (!section) return 0;
    var pairs = section.querySelectorAll('.example-pair');
    return Array.prototype.indexOf.call(pairs, pair);
  }

  function revealPair(pair, stagger) {
    pair.style.setProperty('--card-delay', pairIndex(pair) * stagger + 'ms');
    pair.classList.add('is-visible');
  }

  function init() {
    var pairs = document.querySelectorAll('.example-pair');
    if (!pairs.length) return;

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      pairs.forEach(function (pair) {
        revealPair(pair, 0);
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          revealPair(entry.target, STAGGER_MS);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -5% 0px'
      }
    );

    pairs.forEach(function (pair) {
      observer.observe(pair);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
