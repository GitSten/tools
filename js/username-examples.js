// Examples remain readable without JavaScript. Add keyboard-accessible copying.
document.querySelectorAll('.u-grid .u-pill').forEach(pill => {
  pill.tabIndex = 0;
  pill.setAttribute('role', 'button');
  pill.setAttribute('aria-label', `Copy ${pill.textContent.trim()}`);
  async function copy() {
    const toast = document.getElementById('toast');
    try {
      await navigator.clipboard.writeText(pill.textContent.trim());
      if (toast) toast.textContent = '✓ Copied!';
    } catch {
      if (toast) toast.textContent = 'Copy failed. Select the name and copy it manually.';
    }
    if (toast) {
      toast.setAttribute('role', 'status');
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2000);
    }
  }
  pill.addEventListener('click', copy);
  pill.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      copy();
    }
  });
});
