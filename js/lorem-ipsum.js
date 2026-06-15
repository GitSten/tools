const LOREM_BANKS = {
  classic: [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'ut', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate'
  ],
  startup: [
    'growth', 'signal', 'pivot', 'launch', 'scale', 'stack', 'metric', 'design',
    'product', 'market', 'vision', 'velocity', 'brand', 'ship', 'builder', 'workflow',
    'insight', 'feedback', 'system', 'strategy', 'value', 'focus', 'edge', 'roadmap'
  ],
  creative: [
    'canvas', 'palette', 'texture', 'rhythm', 'horizon', 'sketch', 'glow', 'echo',
    'mosaic', 'drift', 'spark', 'blend', 'tone', 'shape', 'form', 'layer',
    'ink', 'flare', 'bloom', 'grain', 'motion', 'frame', 'vision'
  ],
  neutral: [
    'curabitur', 'elementum', 'phasellus', 'malesuada', 'porttitor', 'ultricies',
    'viverra', 'pellentesque', 'interdum', 'fermentum', 'aliquet', 'integer',
    'sagittis', 'facilisi', 'bibendum', 'rutrum', 'volutpat', 'lacinia', 'gravida'
  ]
};

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function sentence(pool, minWords, maxWords) {
  const count = minWords + Math.floor(Math.random() * (maxWords - minWords + 1));
  const words = [];
  for (let i = 0; i < count; i += 1) words.push(pick(pool));
  const text = words.join(' ');
  return text.charAt(0).toUpperCase() + text.slice(1) + '.';
}

function paragraph(pool, sentences, minWords, maxWords, opening) {
  const out = [];
  for (let i = 0; i < sentences; i += 1) {
    if (i === 0 && opening) out.push('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
    else out.push(sentence(pool, minWords, maxWords));
  }
  return out.join(' ');
}

function generateLorem() {
  const mode = document.getElementById('lp-mode').value;
  const paragraphs = parseInt(document.getElementById('lp-paragraphs').value, 10);
  const sentences = parseInt(document.getElementById('lp-sentences').value, 10);
  const minWords = parseInt(document.getElementById('lp-min').value, 10);
  const maxWords = parseInt(document.getElementById('lp-max').value, 10);
  const opening = document.getElementById('lp-opening').checked;
  const pool = LOREM_BANKS[mode] || LOREM_BANKS.classic;

  const items = [];
  for (let i = 0; i < paragraphs; i += 1) {
    items.push(paragraph(pool, sentences, minWords, maxWords, opening && i === 0));
  }

  document.getElementById('lp-output').value = items.join('\n\n');
  document.getElementById('lp-count').textContent = `${paragraphs} paragraph${paragraphs === 1 ? '' : 's'} generated`;
}

function copyLorem() {
  const value = document.getElementById('lp-output').value.trim();
  if (!value) return;
  navigator.clipboard.writeText(value).catch(() => {});
  const toast = document.getElementById('toast');
  if (toast) {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1800);
  }
}

document.addEventListener('DOMContentLoaded', generateLorem);
