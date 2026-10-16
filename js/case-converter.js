(() => {
  const root = document.querySelector('[data-case-tool]');
  if (!root) return;
  const input = root.querySelector('[data-case-input]');
  const buttons = [...root.querySelectorAll('[data-case]')];
  if (!input || !buttons.length) return;

  const SMALL_WORDS = new Set(['a', 'an', 'the', 'and', 'but', 'or', 'nor', 'for', 'so', 'yet', 'at', 'by', 'in', 'of', 'on', 'to', 'up', 'as', 'vs', 'from', 'with', 'into', 'over', 'than', 'via', 'per']);
  const EXAMPLE = 'the QUICK brown fox jumps over the lazy dog. please convert THIS sentence.';

  function cap(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  function wordsOf(str) {
    return str
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .split(/[^A-Za-z0-9]+/)
      .filter(Boolean);
  }

  function titleCase(str) {
    return str.replace(/\S+/g, (word, index, full) => {
      const lower = word.toLowerCase();
      const last = index + word.length === full.length;
      if (index === 0 || last || !SMALL_WORDS.has(lower)) return cap(word);
      return lower;
    });
  }

  function sentenceCase(str) {
    const lower = str.toLowerCase();
    return lower.replace(/(^|[\n.!?]\s*)([a-z])/g, (_, lead, letter) => lead + letter.toUpperCase());
  }

  function applyCase(text, type) {
    const words = wordsOf(text);
    switch (type) {
      case 'upper': return text.toUpperCase();
      case 'lower': return text.toLowerCase();
      case 'title': return titleCase(text);
      case 'capitalized': return text.replace(/\S+/g, cap);
      case 'sentence': return sentenceCase(text);
      case 'camel': return words.length ? words[0].toLowerCase() + words.slice(1).map(cap).join('') : '';
      case 'pascal': return words.map(cap).join('');
      case 'snake': return words.join('_').toLowerCase();
      case 'kebab': return words.join('-').toLowerCase();
      case 'alt': {
        let upper = true;
        return [...text].map(char => {
          if (!/\p{L}/u.test(char)) return char;
          const next = upper ? char.toUpperCase() : char.toLowerCase();
          upper = !upper;
          return next;
        }).join('');
      }
      case 'inverse': return [...text].map(char => char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()).join('');
      default: return text;
    }
  }

  function stats(text) {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text.trim() ? text.split(/\n/).length : 0;
    const sentences = text.trim() ? (text.match(/[.!?]+/g) || []).length : 0;
    const seconds = Math.ceil(words / 3.3);
    const reading = seconds < 60 ? `${seconds} sec` : `${Math.ceil(seconds / 60)} min`;
    const values = { chars: text.length, words, lines, sentences, reading };
    for (const [key, value] of Object.entries(values)) {
      const node = root.querySelector(`[data-stat="${key}"]`);
      if (node) node.textContent = typeof value === 'number' ? value.toLocaleString() : value;
    }
  }

  function setActive(type) {
    for (const button of buttons) {
      const on = button.dataset.case === type;
      button.classList.toggle('active', on);
      button.setAttribute('aria-pressed', on ? 'true' : 'false');
    }
  }

  function convert(type) {
    setActive(type);
    input.value = applyCase(input.value, type);
    stats(input.value);
    window.gtag?.('event', 'tool_action', { tool_id: 'case', case_type: type });
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => convert(button.dataset.case));
  });
  input.addEventListener('input', () => stats(input.value));

  root.querySelector('[data-case-copy]')?.addEventListener('click', async () => {
    if (!input.value) {
      window.ToolsNow?.announce('Nothing to copy yet. Paste some text first.');
      return;
    }
    if (window.ToolsNow?.copy) window.ToolsNow.copy(input.value);
  });

  root.querySelector('[data-case-download]')?.addEventListener('click', () => {
    if (!input.value) {
      window.ToolsNow?.announce('Nothing to download yet. Paste some text first.');
      return;
    }
    window.ToolsNow?.download(input.value, 'converted-text.txt');
  });

  root.querySelector('[data-case-clear]')?.addEventListener('click', () => {
    input.value = '';
    stats('');
    input.focus();
  });

  root.querySelector('[data-case-example]')?.addEventListener('click', () => {
    input.value = EXAMPLE;
    const active = buttons.find(button => button.classList.contains('active'));
    if (active) convert(active.dataset.case);
    else stats(input.value);
    input.focus();
  });

  const preset = root.dataset.defaultCase;
  if (preset) setActive(preset);
  stats(input.value);
})();
