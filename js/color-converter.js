function clamp(num, min, max) {
  return Math.min(max, Math.max(min, num));
}

function hexToRgb(hex) {
  const cleaned = hex.replace('#', '').trim();
  const full = cleaned.length === 3 ? cleaned.split('').map((c) => c + c).join('') : cleaned;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16)
  };
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map((n) => clamp(Number(n) || 0, 0, 255).toString(16).padStart(2, '0')).join('');
}

function syncFromHex(value) {
  const rgb = hexToRgb(value);
  if (!rgb) return false;
  const hex = `#${value.replace('#', '').padStart(6, '0').slice(0, 6)}`.toUpperCase();
  document.getElementById('cc-color').value = hex;
  document.getElementById('cc-hex').value = hex;
  document.getElementById('cc-r').value = rgb.r;
  document.getElementById('cc-g').value = rgb.g;
  document.getElementById('cc-b').value = rgb.b;
  document.getElementById('cc-preview').style.background = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  document.getElementById('cc-swatch').textContent = `HEX ${hex}`;
  return true;
}

function syncFromRgb() {
  const r = clamp(parseInt(document.getElementById('cc-r').value, 10) || 0, 0, 255);
  const g = clamp(parseInt(document.getElementById('cc-g').value, 10) || 0, 0, 255);
  const b = clamp(parseInt(document.getElementById('cc-b').value, 10) || 0, 0, 255);
  const hex = rgbToHex(r, g, b).toUpperCase();
  document.getElementById('cc-color').value = hex;
  document.getElementById('cc-hex').value = hex;
  document.getElementById('cc-preview').style.background = `rgb(${r}, ${g}, ${b})`;
  document.getElementById('cc-swatch').textContent = `RGB ${r}, ${g}, ${b}`;
}

function copyHex() {
  navigator.clipboard.writeText(document.getElementById('cc-hex').value).catch(() => {});
}

function copyRgb() {
  const r = document.getElementById('cc-r').value;
  const g = document.getElementById('cc-g').value;
  const b = document.getElementById('cc-b').value;
  navigator.clipboard.writeText(`rgb(${r}, ${g}, ${b})`).catch(() => {});
}

document.addEventListener('DOMContentLoaded', () => {
  syncFromHex(document.getElementById('cc-hex').value);
});
