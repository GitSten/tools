function getFaviconState() {
  return {
    text: document.getElementById('fv-text').value.trim().slice(0, 2) || 'T',
    bg: document.getElementById('fv-bg').value,
    fg: document.getElementById('fv-fg').value,
    size: parseInt(document.getElementById('fv-size').value, 10) || 512,
    radius: parseInt(document.getElementById('fv-radius').value, 10) || 28
  };
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function drawFavicon(size) {
  const { text, bg, fg, radius } = getFaviconState();
  const canvas = document.getElementById('fv-canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = bg;
  roundRect(ctx, 0, 0, size, size, Math.max(0, radius * size / 512));
  ctx.fill();

  ctx.fillStyle = fg;
  ctx.font = `900 ${Math.round(size * 0.42)}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, size / 2, size / 2 + size * 0.03);
  return canvas;
}

function refreshFavicon() {
  const size = parseInt(document.getElementById('fv-size').value, 10) || 512;
  const canvas = drawFavicon(size);
  document.getElementById('fv-preview').src = canvas.toDataURL('image/png');
  document.getElementById('fv-title').textContent = `${size}px preview`;
}

function downloadFavicon(size) {
  const canvas = drawFavicon(size);
  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png');
  a.download = `favicon-${size}x${size}.png`;
  a.click();
}

function escapeXml(value) {
  return value.replace(/[<>&"']/g, (ch) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    '\'': '&apos;'
  }[ch]));
}

function downloadSvg() {
  const { text, bg, fg } = getFaviconState();
  const size = 512;
  const fontSize = Math.round(size * 0.42);
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="100%" height="100%" rx="72" fill="${bg}"/>
  <text x="50%" y="54%" text-anchor="middle" font-family="system-ui,Segoe UI,Arial,sans-serif" font-size="${fontSize}" font-weight="900" fill="${fg}">${escapeXml(text)}</text>
</svg>`;
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
  a.download = 'favicon.svg';
  a.click();
}

document.addEventListener('DOMContentLoaded', refreshFavicon);
