(() => {
  const search = document.getElementById('tool-search');
  if (!search) return;
  const cards = [...document.querySelectorAll('.directory-card')];
  let category = 'All';
  const saved = new Set(window.ToolsNow?.readStore('tnp-saved', []) || []);
  const params = new URLSearchParams(location.search);
  search.value = params.get('q') || '';
  const requested = params.get('category');
  if (['All','Everyday','Developer','Images','Text','Usernames','Saved'].includes(requested)) category = requested;
  function update() {
    const words = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    let count = 0;
    cards.forEach(card => {
      const haystack = card.dataset.search.toLowerCase();
      const matches = (category === 'All' || (category === 'Saved' ? saved.has(card.dataset.toolId) : category === card.dataset.category)) && words.every(word => haystack.includes(word));
      card.hidden = !matches;
      if (matches) count++;
    });
    document.querySelectorAll('[data-filter]').forEach(button => {
      const active = button.dataset.filter === category;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', active);
    });
    document.getElementById('no-tools').hidden = count > 0;
    document.getElementById('search-summary').textContent = `${count} ${count === 1 ? 'tool' : 'tools'} found${category === 'All' ? '' : ` in ${category}`}.`;
    const query = new URLSearchParams();
    if (search.value.trim()) query.set('q', search.value.trim());
    if (category !== 'All') query.set('category', category);
    history.replaceState(null, '', location.pathname + (query.size ? `?${query}` : '') + location.hash);
  }
  document.querySelector('[data-filter="Saved"]').hidden = false;
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { category = button.dataset.filter; update(); }));
  document.querySelectorAll('[data-favorite]').forEach(button => {
    button.hidden = false;
    function render() { const on = saved.has(button.dataset.favorite); button.textContent = on ? '★' : '☆'; button.setAttribute('aria-pressed', on); }
    render();
    button.addEventListener('click', () => {
      const id = button.dataset.favorite;
      saved.has(id) ? saved.delete(id) : saved.add(id);
      window.ToolsNow?.writeStore('tnp-saved', [...saved]);
      render(); update();
    });
  });
  search.addEventListener('input', update);
  document.getElementById('reset-tool-search').addEventListener('click', () => { search.value = ''; category = 'All'; update(); search.focus(); });
  document.addEventListener('keydown', event => {
    if (event.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && !document.activeElement.isContentEditable) { event.preventDefault(); search.focus(); search.scrollIntoView({block:'center'}); }
  });
  const recent = window.ToolsNow?.readStore('tnp-recent', []) || [];
  const recentContainer = document.getElementById('recent-tools');
  for (const id of recent.slice(0,5)) {
    const card = cards.find(c => c.dataset.toolId === id);
    if (!card) continue;
    const link = document.createElement('a'); link.href = card.querySelector('a').getAttribute('href'); link.textContent = card.querySelector('h3').textContent; recentContainer.append(link);
  }
  document.getElementById('returning-tools').hidden = !recentContainer.children.length;
  document.getElementById('clear-recents').addEventListener('click', () => { window.ToolsNow?.writeStore('tnp-recent', []); document.getElementById('returning-tools').hidden = true; });
  update();
})();
