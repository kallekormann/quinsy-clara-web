# Shared Components (clara-web)

Canonical HTML patterns for Clara. Copy into new pages to stay consistent.

**Note:** This `shared/` folder lives inside `clara-web/` so the site is self-contained for its own GitHub repo and Vercel project. When building `quinsy-web`, copy this folder into that project and adjust tokens.

## Stylesheet load order

```html
<link rel="stylesheet" href="/shared/css/fonts.css">
<link rel="stylesheet" href="/shared/css/base.css">
<link rel="stylesheet" href="/shared/css/components.css">
<link rel="stylesheet" href="/shared/css/wordmark.css">
<link rel="stylesheet" href="/css/tokens.css">
```

Fonts are self-hosted in `/fonts/` (no Google Fonts, no third-party cookie requests).

---

## Site header

```html
<header class="site-header" role="banner">
  <div class="container site-header__inner">
    <a href="/" class="wordmark wordmark--clara" aria-label="Clara home">
      <span class="wordmark__serif">Quinsy</span>
      <span class="wordmark__sans">Clara</span>
    </a>
    <nav class="site-header__nav" aria-label="Main navigation">
      <a href="#features" class="link--muted">Features</a>
    </nav>
    <div class="site-header__cta">
      <a href="#install" class="btn btn--primary">Install on monday</a>
    </div>
  </div>
</header>
```

---

## Wordmark

Clara header (serif Quinsy + Inter Clara):

```html
<a href="/" class="wordmark wordmark--clara">
  <span class="wordmark__serif">Quinsy</span>
  <span class="wordmark__sans">Clara</span>
</a>
```

Footer attribution (serif Quinsy only):

```html
<a href="https://quinsy.app" class="wordmark wordmark--footer">
  <span class="wordmark__serif">Quinsy</span>
</a>
```

---

## Buttons

```html
<a href="#" class="btn btn--primary">Primary CTA</a>
<a href="#" class="btn btn--secondary">Secondary CTA</a>
```

---

## Badge

```html
<span class="badge">monday.com app</span>
```

---

## Section

```html
<section class="section" aria-labelledby="section-id">
  <div class="container">
    <h2 id="section-id" class="section__title">Section title</h2>
    <p class="section__lead">One sentence intro.</p>
  </div>
</section>
```

Alternate background: add `section--alt` to `<section>`.

---

## Before / after example (data stories)

Use inside `.data-story__examples`. Each pair is a tilted before/after card set tinted with the parent story's `--story-accent`.

```html
<div class="data-story__examples">
  <div class="example-pair">
    <div class="example-card example-card--before">
      <span class="example-card__label">Before</span>
      <code class="example-card__value">  hello world  </code>
    </div>
    <div class="example-card example-card--after">
      <span class="example-card__label">After</span>
      <code class="example-card__value">Hello World</code>
    </div>
  </div>
</div>
```

Scroll entrance animation is handled by `/js/example-cards.js` (adds `.is-visible` to each `.example-pair`). With `prefers-reduced-motion`, cards appear in their final tilted state immediately.

Grid: 2 pairs side-by-side on desktop; when 3 pairs, the third spans full width and centers below.

---

## Before / after example (legacy)

```html
<div class="example">
  <span class="example__label">Before</span>
  <span class="example__before">0049 170 1234567</span>
  <span class="example__label">After</span>
  <span class="example__after">+49 170 1234567</span>
</div>
```

Deprecated for data stories; use the card pair pattern above instead.

---

## Steps (how it works)

```html
<div class="steps">
  <div class="step">
    <div class="step__number" aria-hidden="true">1</div>
    <div class="step__content">
      <h3 class="step__title">Step title</h3>
      <p class="step__text">Step description.</p>
    </div>
  </div>
</div>
```

---

## Compatibility list

```html
<div class="compat-list">
  <div class="compat-list__item">
    <span class="compat-list__status compat-list__status--supported">Supported</span>
    <p class="compat-list__label"><strong>Text columns:</strong> explanation.</p>
  </div>
</div>
```

Status modifiers: `--supported`, `--limited`, `--not-supported`.

---

## FAQ accordion

Use native `<details>` / `<summary>` so answers stay in the DOM for crawlers and AI systems. Pair with matching `FAQPage` JSON-LD in the page `<head>` (same question and answer text as visible HTML).

```html
<section class="section" id="faq" aria-labelledby="faq-title">
  <div class="container">
    <header>
      <h2 id="faq-title" class="section__title">Frequently asked questions</h2>
      <p class="section__lead">One sentence intro.</p>
    </header>
    <div class="faq-list">
      <details class="faq-item" open>
        <summary class="faq-item__question">Question text?</summary>
        <div class="faq-item__answer">
          <p>Answer-first sentence. Supporting detail.</p>
        </div>
      </details>
    </div>
  </div>
</section>
```

SEO notes:
- Do not hide answers with `display:none` or off-screen CSS.
- JSON-LD `FAQPage` schema is the primary signal for rich results and AI answer engines.
- Mark the first 1-2 items `open` for above-the-fold visibility.

---

## Legal page layout

```html
<main class="legal" role="main">
  <p class="draft-notice">Draft notice text.</p>
  <h1>Page title</h1>
  <p>Prose content.</p>
  <h2>Section</h2>
</main>
```

---

## Site footer

```html
<footer class="site-footer" role="contentinfo">
  <div class="container site-footer__inner">
    <nav class="site-footer__links" aria-label="Footer navigation">
      <a href="/privacy/" class="site-footer__link">Privacy</a>
      <a href="/terms/" class="site-footer__link">Terms</a>
      <a href="/imprint/" class="site-footer__link">Imprint</a>
    </nav>
    <div class="site-footer__divider" aria-hidden="true"></div>
    <p class="site-footer__attribution">
      A product by
      <a href="https://quinsy.app" class="wordmark wordmark--footer">
        <span class="wordmark__serif">Quinsy</span>
      </a>
      · © 2026 Quinsy
    </p>
  </div>
</footer>
```
