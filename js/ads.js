(() => {
  const CLIENT = 'ca-pub-7627794878922112';
  // Paste AdSense unit IDs here when they exist. Empty values use Auto ads only.
  const SLOTS = { 'after-tool': '', content: '' };
  const KEY = 'tnp-ads';
  const browserOptOut = navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true;

  function stored() {
    try { return localStorage.getItem(KEY); } catch { return null; }
  }
  function store(value) {
    try { localStorage.setItem(KEY, value); } catch {}
  }

  function loadAds() {
    if (browserOptOut || stored() !== 'on' || document.querySelector('script[data-adsense]')) return;
    const script = document.createElement('script');
    script.async = true;
    script.dataset.adsense = 'true';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT}`;
    script.crossOrigin = 'anonymous';
    script.addEventListener('load', fillSlots);
    document.head.appendChild(script);
  }

  function fillSlots() {
    for (const region of document.querySelectorAll('[data-ad-region]')) {
      const slot = SLOTS[region.dataset.adRegion];
      if (!slot || region.querySelector('ins')) continue;
      const ins = document.createElement('ins');
      ins.className = 'adsbygoogle';
      ins.style.display = 'block';
      ins.dataset.adClient = CLIENT;
      ins.dataset.adSlot = slot;
      ins.dataset.adFormat = 'auto';
      ins.dataset.fullWidthResponsive = 'true';
      region.appendChild(ins);
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch {}
    }
  }

  let dialog;
  function openDialog() {
    if (browserOptOut) return;
    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.className = 'consent-dialog';
      dialog.setAttribute('aria-labelledby', 'consent-title');
      dialog.innerHTML = `
        <p class="consent-kicker">Advertising</p>
        <h2 id="consent-title">Can ToolsNowPro show ads?</h2>
        <p>The tools keep running in this browser either way. Text, files, and results are not sent to our server.</p>
        <p>If you consent, Google AdSense may store cookies to measure ads and, where allowed, personalise them. You can change this later from Ad settings in the footer.</p>
        <p><a href="/about/#privacy">Privacy policy</a></p>
        <div class="consent-actions">
          <button type="button" class="btn-ghost" data-ads-choice="off">Do not consent</button>
          <button type="button" class="btn-primary" data-ads-choice="on">Consent</button>
        </div>`;
      dialog.addEventListener('cancel', event => event.preventDefault());
      dialog.addEventListener('click', event => {
        const choice = event.target.closest('[data-ads-choice]')?.dataset.adsChoice;
        if (!choice) return;
        store(choice);
        dialog.close();
        if (choice === 'on') loadAds();
      });
      document.body.appendChild(dialog);
    }
    if (!dialog.open) dialog.showModal();
  }

  function addSettings() {
    const toggle = document.querySelector('[data-analytics-toggle]');
    if (!toggle || toggle.parentElement.querySelector('[data-ads-settings]')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'analytics-toggle';
    button.dataset.adsSettings = '';
    if (browserOptOut) {
      button.textContent = 'Ads: browser opt-out';
      button.disabled = true;
    } else {
      button.textContent = 'Ad settings';
      button.addEventListener('click', openDialog);
    }
    toggle.after(document.createTextNode(' · '), button);
  }

  addSettings();
  if (browserOptOut) return;
  if (stored() === 'on') loadAds();
  else if (stored() !== 'off') openDialog();
})();
