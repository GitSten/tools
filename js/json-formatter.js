function setJsonStatus(message, isError = false) {
  const status = document.getElementById('json-status');
  status.textContent = message;
  status.style.color = isError ? '#FCA5A5' : 'var(--muted)';
}

function renderJson(input, indent) {
  const raw = input.trim();
  if (!raw) {
    setJsonStatus('Paste JSON to format it.');
    document.getElementById('json-output').value = '';
    return;
  }
  try {
    const parsed = JSON.parse(raw);
    document.getElementById('json-output').value = JSON.stringify(parsed, null, indent);
    setJsonStatus('JSON formatted successfully.');
  } catch (err) {
    document.getElementById('json-output').value = '';
    setJsonStatus('Invalid JSON: ' + err.message, true);
  }
}

function formatJson() {
  const indent = parseInt(document.getElementById('json-indent').value, 10) || 2;
  renderJson(document.getElementById('json-input').value, indent);
}

function minifyJson() {
  const raw = document.getElementById('json-input').value.trim();
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    document.getElementById('json-output').value = JSON.stringify(parsed);
    setJsonStatus('JSON minified successfully.');
  } catch (err) {
    setJsonStatus('Invalid JSON: ' + err.message, true);
  }
}

function copyJson() {
  const output = document.getElementById('json-output').value.trim();
  if (!output) return;
  navigator.clipboard.writeText(output).catch(() => {});
}

function loadSampleJson() {
  document.getElementById('json-input').value = JSON.stringify({
    name: 'ToolsNowPro',
    tools: ['QR Generator', 'Password Generator', 'Color Picker'],
    active: true,
    updated: '2026-06-15'
  }, null, 2);
  formatJson();
}

document.addEventListener('DOMContentLoaded', loadSampleJson);
