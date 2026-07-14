(function () {
  'use strict';

  var SCENARIOS = [
    {
      column: 'ARR',
      verb: 'format',
      options: [
        'Number · Currency EUR (1.234,56 €)',
        'Number · Percentage (12.34%)',
        'Number · Compact K/M/B/T (1.5M)',
        'Number · Compact DE (1,5 Mio.)'
      ],
      selectedIndex: 2
    },
    {
      column: 'Phone',
      verb: 'format',
      options: [
        'Contact · Phone (+prefix)',
        'Contact · Email & Domain',
        'Text · Trim Spaces',
        'Text · Title Case'
      ],
      selectedIndex: 0
    },
    {
      column: 'Hours',
      verb: 'format',
      options: [
        'Time · HH:MM',
        'Time · Decimal hours',
        'Time · Total minutes',
        'Time · Days (8h = 1d)'
      ],
      selectedIndex: 0
    }
  ];

  var STEP_MS = 900;
  var HIGHLIGHT_MS = 650;
  var SELECT_HOLD_MS = 1200;
  var FADE_MS = 400;

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function wait(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  function AutomationDemo(root) {
    this.root = root;
    this.columnEl = root.querySelector('[data-demo-column]');
    this.columnActionEl = root.querySelector('[data-demo-column-action]');
    this.formatEl = root.querySelector('[data-demo-format]');
    this.dropdown = root.querySelector('[data-demo-dropdown]');
    this.optionsEl = root.querySelector('[data-demo-options]');
    this.triggerLine = root.querySelector('[data-demo-trigger]');
    this.arrowEl = root.querySelector('[data-demo-arrow]');
    this.actionLine = root.querySelector('[data-demo-action]');
    this.buttonEl = root.querySelector('[data-demo-button]');
    this.scenarioIndex = 0;
    this.runId = 0;
    this.running = false;
  }

  AutomationDemo.prototype.isActiveRun = function (runId) {
    return this.running && runId === this.runId;
  };

  AutomationDemo.prototype.setColumn = function (name) {
    this.columnEl.textContent = name;
    this.columnActionEl.textContent = name;
  };

  AutomationDemo.prototype.setFormat = function (label) {
    this.formatEl.textContent = label;
    var isPlaceholder = label === 'Format';
    this.formatEl.classList.toggle('automation-demo__format-label--active', isPlaceholder);
  };

  AutomationDemo.prototype.highlightOption = function (options, activeIndex) {
    var html = '';
    for (var i = 0; i < options.length; i++) {
      var cls = 'automation-demo__option';
      if (i === activeIndex) cls += ' automation-demo__option--active';
      html += '<li class="' + cls + '" role="option" aria-selected="' + (i === activeIndex) + '">' + options[i] + '</li>';
    }
    this.optionsEl.innerHTML = html;
  };

  AutomationDemo.prototype.selectFormat = function (options, index) {
    var label = options[index];
    this.highlightOption(options, index);
    this.setFormat(label);
  };

  AutomationDemo.prototype.setDropdownOpen = function (open) {
    this.dropdown.hidden = !open;
    this.root.classList.toggle('automation-demo--open', open);
    if (open && this.formatEl.textContent === 'Format') {
      this.formatEl.classList.add('automation-demo__format-label--active');
    }
  };

  AutomationDemo.prototype.reveal = function (el, visible) {
    if (!el) return;
    el.classList.toggle('automation-demo__line--visible', visible);
  };

  AutomationDemo.prototype.hideAllLines = function () {
    this.reveal(this.triggerLine, false);
    this.reveal(this.arrowEl, false);
    this.reveal(this.actionLine, false);
    this.reveal(this.buttonEl, false);
  };

  AutomationDemo.prototype.prepareScenario = function (scenario) {
    this.setColumn(scenario.column);
    this.setFormat('Format');
    this.setDropdownOpen(false);
    this.highlightOption(scenario.options, -1);
  };

  AutomationDemo.prototype.runScenario = function (scenario) {
    var self = this;
    var runId = ++self.runId;

    self.prepareScenario(scenario);

    return wait(STEP_MS)
      .then(function () {
        if (!self.isActiveRun(runId)) return;
        self.reveal(self.triggerLine, true);
        return wait(STEP_MS);
      })
      .then(function () {
        if (!self.isActiveRun(runId)) return;
        self.reveal(self.arrowEl, true);
        return wait(STEP_MS);
      })
      .then(function () {
        if (!self.isActiveRun(runId)) return;
        self.reveal(self.actionLine, true);
        return wait(STEP_MS);
      })
      .then(function () {
        if (!self.isActiveRun(runId)) return;
        self.setDropdownOpen(true);
        return wait(STEP_MS);
      })
      .then(function () {
        if (!self.isActiveRun(runId)) return;

        var chain = Promise.resolve();
        var previewEnd = Math.max(0, scenario.selectedIndex - 1);

        for (var i = 0; i <= previewEnd; i++) {
          (function (index) {
            chain = chain.then(function () {
              if (!self.isActiveRun(runId)) return;
              self.highlightOption(scenario.options, index);
              return wait(HIGHLIGHT_MS);
            });
          })(i);
        }

        return chain.then(function () {
          if (!self.isActiveRun(runId)) return;
          self.selectFormat(scenario.options, scenario.selectedIndex);
          return wait(SELECT_HOLD_MS);
        });
      })
      .then(function () {
        if (!self.isActiveRun(runId)) return;
        self.setDropdownOpen(false);
        self.reveal(self.buttonEl, true);
        return wait(STEP_MS * 2);
      })
      .then(function () {
        if (!self.isActiveRun(runId)) return;
        self.hideAllLines();
        return wait(FADE_MS);
      });
  };

  AutomationDemo.prototype.loop = function () {
    var self = this;
    if (!self.running) return;

    var scenario = SCENARIOS[self.scenarioIndex];
    self.runScenario(scenario).then(function () {
      if (!self.running) return;
      self.scenarioIndex = (self.scenarioIndex + 1) % SCENARIOS.length;
      self.loop();
    });
  };

  AutomationDemo.prototype.start = function () {
    this.running = true;
    this.loop();
  };

  AutomationDemo.prototype.initStatic = function () {
    var scenario = SCENARIOS[0];
    this.setColumn(scenario.column);
    this.selectFormat(scenario.options, scenario.selectedIndex);
    this.setDropdownOpen(false);
    this.reveal(this.triggerLine, true);
    this.reveal(this.arrowEl, true);
    this.reveal(this.actionLine, true);
    this.reveal(this.buttonEl, true);
  };

  document.addEventListener('DOMContentLoaded', function () {
    var root = document.querySelector('[data-automation-demo]');
    if (!root) return;

    var demo = new AutomationDemo(root);

    if (prefersReducedMotion()) {
      demo.initStatic();
      return;
    }

    demo.start();
  });
})();
