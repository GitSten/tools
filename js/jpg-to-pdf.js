const jpgState = {
  file: null,
  image: null,
  previewUrl: null
};

const jpgEls = {
  dropZone: document.getElementById('drop-zone'),
  previewBox: document.getElementById('preview-box'),
  status: document.getElementById('status'),
  imgSize: document.getElementById('img-size'),
  convertBtn: document.getElementById('convert-btn'),
  pdfName: document.getElementById('pdf-name'),
  quality: document.getElementById('jpg-quality'),
  toast: document.getElementById('toast')
};

function showToast(message) {
  jpgEls.toast.textContent = message;
  jpgEls.toast.classList.add('show');
  setTimeout(() => jpgEls.toast.classList.remove('show'), 1800);
}

function setStatus(message) {
  jpgEls.status.textContent = message;
}

function onDragOver(e) {
  e.preventDefault();
  jpgEls.dropZone.classList.add('dragover');
}

function onDragLeave() {
  jpgEls.dropZone.classList.remove('dragover');
}

function onDrop(e) {
  e.preventDefault();
  onDragLeave();
  const file = e.dataTransfer.files && e.dataTransfer.files[0];
  if (file) loadImage(file);
}

function setPreview(url) {
  jpgEls.previewBox.innerHTML = '';
  const img = document.createElement('img');
  img.src = url;
  img.alt = 'Image preview';
  jpgEls.previewBox.appendChild(img);
}

function loadImage(file) {
  if (!file || !file.type.startsWith('image/')) return;
  jpgState.file = file;
  jpgEls.convertBtn.disabled = false;
  setStatus('Loading image...');
  const reader = new FileReader();
  reader.onload = e => {
    const image = new Image();
    image.onload = () => {
      jpgState.image = image;
      if (jpgState.previewUrl) URL.revokeObjectURL(jpgState.previewUrl);
      jpgState.previewUrl = URL.createObjectURL(file);
      setPreview(jpgState.previewUrl);
      jpgEls.imgSize.textContent = `${image.width} × ${image.height}px`;
      jpgEls.pdfName.value = file.name.replace(/\.[^.]+$/, '') + '.pdf';
      setStatus('Ready to convert');
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function resetTool() {
  jpgState.file = null;
  jpgState.image = null;
  if (jpgState.previewUrl) URL.revokeObjectURL(jpgState.previewUrl);
  jpgState.previewUrl = null;
  jpgEls.previewBox.innerHTML = '<div style="color:var(--muted);text-align:center;padding:20px">Preview appears here</div>';
  jpgEls.imgSize.textContent = '—';
  jpgEls.convertBtn.disabled = true;
  jpgEls.pdfName.value = 'image-to-pdf.pdf';
  setStatus('Upload an image to begin');
  const input = document.getElementById('jpg-file');
  input.value = '';
}

function dataUrlToBytes(dataUrl) {
  const base64 = dataUrl.split(',')[1];
  const bin = atob(base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

function buildPdf(jpegBytes, imgW, imgH) {
  const enc = new TextEncoder();
  const parts = [];
  const offsets = [];
  let position = 0;

  const add = value => {
    const bytes = typeof value === 'string' ? enc.encode(value) : value;
    parts.push(bytes);
    position += bytes.length;
  };

  const addObj = (num, bodyParts) => {
    offsets[num] = position;
    add(`${num} 0 obj\n`);
    bodyParts.forEach(part => add(part));
    add(`\nendobj\n`);
  };

  const content = `q\n${imgW} 0 0 ${imgH} 0 0 cm\n/Im0 Do\nQ\n`;
  const contentBytes = enc.encode(content);

  addObj(1, ['<< /Type /Catalog /Pages 2 0 R >>\n']);
  addObj(2, ['<< /Type /Pages /Kids [3 0 R] /Count 1 >>\n']);
  addObj(3, [`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${imgW} ${imgH}] /Resources << /XObject << /Im0 4 0 R >> /ProcSet [/PDF /ImageC] >> /Contents 5 0 R >>\n`]);

  offsets[4] = position;
  add(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${imgW} /Height ${imgH} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`);
  add(jpegBytes);
  add(`\nendstream\nendobj\n`);

  addObj(5, [`<< /Length ${contentBytes.length} >>\nstream\n`, contentBytes, '\nendstream\n']);

  const xrefStart = position;
  let xref = 'xref\n0 6\n0000000000 65535 f \n';
  for (let i = 1; i <= 5; i++) {
    xref += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  add(xref);
  add(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`);

  return new Blob(parts, { type: 'application/pdf' });
}

async function convertToPdf() {
  if (!jpgState.image) {
    showToast('Upload an image first');
    return;
  }

  const quality = Number(jpgEls.quality.value);
  const canvas = document.createElement('canvas');
  canvas.width = jpgState.image.width;
  canvas.height = jpgState.image.height;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(jpgState.image, 0, 0);

  const jpegDataUrl = canvas.toDataURL('image/jpeg', quality);
  const jpegBytes = dataUrlToBytes(jpegDataUrl);
  const pdfBlob = buildPdf(jpegBytes, canvas.width, canvas.height);
  const url = URL.createObjectURL(pdfBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = (jpgEls.pdfName.value || 'image-to-pdf.pdf').replace(/\.pdf$/i, '') + '.pdf';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
  showToast('PDF downloaded');
  setStatus('PDF created successfully');
}

window.onDragOver = onDragOver;
window.onDragLeave = onDragLeave;
window.onDrop = onDrop;
window.loadImage = loadImage;
window.resetTool = resetTool;
window.convertToPdf = convertToPdf;
