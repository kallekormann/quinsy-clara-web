(function () {
  'use strict';

  function initTabs() {
    var tabRoot = document.querySelector('[data-setup-tabs]');
    if (!tabRoot) return;

    var tabs = tabRoot.querySelectorAll('[data-setup-tab]');
    var panels = tabRoot.querySelectorAll('[data-setup-panel]');

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.getAttribute('data-setup-tab');

        tabs.forEach(function (btn) {
          var isActive = btn === tab;
          btn.classList.toggle('is-active', isActive);
          btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
          btn.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        panels.forEach(function (panel) {
          var isActive = panel.getAttribute('data-setup-panel') === target;
          panel.classList.toggle('is-active', isActive);
          panel.hidden = !isActive;
        });
      });
    });
  }

  function initFilters() {
    var searchInput = document.querySelector('[data-setup-search]');
    var categoryButtons = document.querySelectorAll('[data-setup-category]');
    var rows = document.querySelectorAll('[data-setup-row]');
    var resultsEl = document.querySelector('[data-setup-results]');
    var emptyEl = document.querySelector('[data-setup-empty]');

    if (!searchInput || !rows.length) return;

    var activeCategory = 'all';
    var total = rows.length;

    function applyFilters() {
      var query = searchInput.value.trim().toLowerCase();
      var visible = 0;

      rows.forEach(function (row) {
        var category = row.getAttribute('data-category') || '';
        var catMatch = activeCategory === 'all' || category === activeCategory;
        var textMatch = !query || row.textContent.toLowerCase().indexOf(query) !== -1;
        var show = catMatch && textMatch;

        row.hidden = !show;
        if (show) visible += 1;
      });

      if (resultsEl) {
        resultsEl.textContent = 'Showing ' + visible + ' of ' + total + ' formatters';
      }

      if (emptyEl) {
        emptyEl.hidden = visible > 0;
      }
    }

    searchInput.addEventListener('input', applyFilters);

    categoryButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        activeCategory = button.getAttribute('data-setup-category') || 'all';

        categoryButtons.forEach(function (btn) {
          btn.classList.toggle('is-active', btn === button);
        });

        applyFilters();
      });
    });

    applyFilters();
  }

  function init() {
    initTabs();
    initFilters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
