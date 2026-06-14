// ============================================================
// USERNAMEPRO – SHARED UTILITIES
// Inline this via <script> or reference in each page
// ============================================================

// Navigation HTML – injected by each page
const NAV_HTML = `
<header class="site-header">
  <div class="wrapper">
    <div class="header-inner">
      <a href="/index.html" class="logo">
        <span class="logo-icon">⚡</span>
        UsernamePro
      </a>
      <button class="nav-toggle" onclick="toggleNav()" aria-label="Toggle menu">☰</button>
      <nav class="site-nav" id="site-nav">
        <a href="/index.html">Generator</a>
        <a href="/gaming/index.html">Gaming</a>
        <a href="/tiktok/index.html">TikTok</a>
        <a href="/blog/index.html">Blog</a>
        <a href="/faq/index.html">FAQ</a>
        <a href="/about/index.html">About</a>
      </nav>
    </div>
  </div>
</header>`;

const FOOTER_HTML = `
<footer class="site-footer">
  <div class="wrapper">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/index.html" class="logo" style="margin-bottom:10px;display:inline-flex;">
          <span class="logo-icon">⚡</span> UsernamePro
        </a>
        <p>Free username generator for every platform. No signup, no limits.</p>
      </div>
      <div>
        <div class="footer-heading">Tools</div>
        <ul class="footer-links">
          <li><a href="/index.html">Username Generator</a></li>
          <li><a href="/gaming/index.html">Gaming Usernames</a></li>
          <li><a href="/tiktok/index.html">TikTok Usernames</a></li>
          <li><a href="/instagram/index.html">Instagram Usernames</a></li>
          <li><a href="/aesthetic/index.html">Aesthetic Usernames</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-heading">Learn</div>
        <ul class="footer-links">
          <li><a href="/blog/index.html">Blog</a></li>
          <li><a href="/faq/index.html">FAQ</a></li>
          <li><a href="/about/index.html">About</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-heading">Legal</div>
        <ul class="footer-links">
          <li><a href="/about/index.html#privacy">Privacy Policy</a></li>
          <li><a href="/about/index.html#terms">Terms of Use</a></li>
          <li><a href="/about/index.html#contact">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 UsernamePro. All rights reserved.</span>
      <span>Not affiliated with TikTok, Instagram, Discord, or Roblox.</span>
    </div>
  </div>
</footer>`;

// Shared CSS – included inline in each page's <style>
const SHARED_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0A0A0F;
    --surface: #13131A;
    --surface2: #1C1C26;
    --border: #272733;
    --violet: #7C3AED;
    --violet-l: #A78BFA;
    --violet-xl: #C4B5FD;
    --glow: rgba(124,58,237,0.2);
    --text: #F1F0FF;
    --muted: #8B8AA8;
    --success: #10B981;
    --r: 12px; --rs: 8px;
  }
  html { scroll-behavior: smooth; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; background: var(--bg); color: var(--text); line-height: 1.65; -webkit-font-smoothing: antialiased; }
  .wrapper { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
  /* HEADER */
  .site-header { position: sticky; top: 0; z-index: 200; background: rgba(10,10,15,0.9); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); }
  .header-inner { display: flex; align-items: center; justify-content: space-between; padding: 14px 0; }
  .logo { font-size: 1.05rem; font-weight: 800; color: var(--text); text-decoration: none; display: flex; align-items: center; gap: 8px; letter-spacing: -.02em; }
  .logo-icon { width: 28px; height: 28px; background: var(--violet); border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 13px; flex-shrink: 0; }
  .site-nav { display: flex; gap: 6px; }
  .site-nav a { color: var(--muted); text-decoration: none; font-size: 0.875rem; font-weight: 500; padding: 7px 12px; border-radius: var(--rs); transition: all .15s; }
  .site-nav a:hover, .site-nav a.active { color: var(--text); background: var(--surface2); }
  .nav-toggle { display: none; background: none; border: 1px solid var(--border); color: var(--muted); padding: 6px 10px; border-radius: var(--rs); cursor: pointer; font-size: 1rem; }
  /* AD SLOTS */
  .ad-slot { background: var(--surface); border: 1px dashed var(--border); border-radius: var(--r); display: flex; align-items: center; justify-content: center; color: var(--muted); font-size: 0.7rem; letter-spacing: .08em; text-transform: uppercase; }
  .ad-banner { height: 90px; margin: 20px 0; }
  .ad-rect { height: 250px; margin: 24px 0; }
  .ad-sidebar { height: 600px; }
  /* FOOTER */
  .site-footer { border-top: 1px solid var(--border); padding: 48px 0 28px; margin-top: 80px; }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 36px; }
  .footer-brand p { color: var(--muted); font-size: 0.875rem; margin-top: 10px; line-height: 1.6; max-width: 240px; }
  .footer-heading { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: var(--muted); margin-bottom: 12px; }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .footer-links a { color: var(--muted); text-decoration: none; font-size: 0.875rem; transition: color .15s; }
  .footer-links a:hover { color: var(--violet-l); }
  .footer-bottom { border-top: 1px solid var(--border); padding-top: 20px; display: flex; flex-wrap: wrap; gap: 12px; justify-content: space-between; color: var(--muted); font-size: 0.78rem; }
  /* BUTTONS */
  .btn-primary { display: inline-flex; align-items: center; gap: 8px; background: var(--violet); color: #fff; border: none; border-radius: var(--rs); padding: 13px 24px; font-size: 0.95rem; font-weight: 700; cursor: pointer; transition: all .18s; text-decoration: none; }
  .btn-primary:hover { background: #6D28D9; transform: translateY(-1px); box-shadow: 0 8px 28px var(--glow); }
  .btn-ghost { display: inline-flex; align-items: center; gap: 6px; background: transparent; color: var(--muted); border: 1px solid var(--border); border-radius: var(--rs); padding: 10px 18px; font-size: 0.875rem; font-weight: 500; cursor: pointer; transition: all .15s; text-decoration: none; }
  .btn-ghost:hover { border-color: var(--violet); color: var(--violet-l); }
  /* CARDS */
  .card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--r); padding: 24px; }
  .card:hover { border-color: #3A3A50; }
  /* TAGS / BADGES */
  .badge { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 100px; font-size: 0.72rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; }
  .badge-violet { background: var(--glow); border: 1px solid rgba(124,58,237,.35); color: var(--violet-l); }
  .badge-green { background: rgba(16,185,129,.12); border: 1px solid rgba(16,185,129,.3); color: #34D399; }
  /* SECTION TITLES */
  .section-eyebrow { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: var(--violet-l); margin-bottom: 10px; }
  .section-title { font-size: clamp(1.3rem,3vw,1.9rem); font-weight: 800; letter-spacing: -.02em; margin-bottom: 12px; }
  .section-sub { color: var(--muted); font-size: 0.95rem; max-width: 560px; }
  /* MOBILE */
  @media (max-width: 768px) {
    .nav-toggle { display: block; }
    .site-nav { display: none; position: absolute; top: 60px; left: 0; right: 0; background: var(--surface); border-bottom: 1px solid var(--border); flex-direction: column; padding: 12px 20px; gap: 4px; }
    .site-nav.open { display: flex; }
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
  }
  @media (max-width: 480px) {
    .footer-grid { grid-template-columns: 1fr; }
  }
`;

function toggleNav() {
  document.getElementById('site-nav').classList.toggle('open');
}

function initPage(activeNav) {
  // Inject nav & footer
  const headerEl = document.getElementById('header-mount');
  const footerEl = document.getElementById('footer-mount');
  if (headerEl) headerEl.innerHTML = NAV_HTML;
  if (footerEl) footerEl.innerHTML = FOOTER_HTML;
  // Mark active nav
  if (activeNav) {
    document.querySelectorAll('.site-nav a').forEach(a => {
      if (a.href.includes(activeNav)) a.classList.add('active');
    });
  }
}
