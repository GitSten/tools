(() => {
  function readStore(key, fallback) { try { const value = JSON.parse(localStorage.getItem(key)); return Array.isArray(value) ? value.filter(x => typeof x === 'string') : fallback; } catch { return fallback; } }
  function writeStore(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }
  function announce(message) {
    let status = document.getElementById('site-status');
    if (!status) { status = document.createElement('div'); status.id = 'site-status'; status.className = 'site-status'; status.setAttribute('role','status'); document.body.append(status); }
    status.textContent = message; status.hidden = false;
    clearTimeout(announce.timer); announce.timer = setTimeout(() => { status.hidden = true; }, 2800);
  }
  async function copy(text) { try { await navigator.clipboard.writeText(text); announce('Copied to clipboard.'); window.gtag?.('event','tool_copy',{tool_id:document.body.dataset.toolId||'directory'}); return true; } catch { announce('Copy could not complete. Select the text and copy it manually.'); return false; } }
  function download(text, filename, type='text/plain') {
    const blob = text instanceof Blob ? text : new Blob([text], {type});
    const url = URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=filename; a.click(); window.gtag?.('event','tool_download',{tool_id:document.body.dataset.toolId||'directory'}); setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function randomInt(min, max) {
    if(!Number.isSafeInteger(min)||!Number.isSafeInteger(max)||max<min)throw new RangeError('Use a valid safe-integer range.');
    const range=max-min+1;if(range>4294967296)throw new RangeError('Range is too large.');
    const bucket=new Uint32Array(1),limit=Math.floor(4294967296/range)*range;
    do{crypto.getRandomValues(bucket);}while(bucket[0]>=limit);
    return min+bucket[0]%range;
  }
  window.ToolsNow = {readStore,writeStore,announce,copy,download,randomInt};
  const toggle=document.querySelector('.nav-toggle'); const nav=document.getElementById('snav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => { const open=nav.classList.toggle('open'); toggle.setAttribute('aria-expanded',open); });
    nav.addEventListener('click', e=>{ if(e.target.closest('a')){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');} });
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.focus();}});
  }
  const id=document.body.dataset.toolId;
  if(id) { const recent=readStore('tnp-recent',[]).filter(x=>x!==id); writeStore('tnp-recent',[id,...recent].slice(0,6)); }
  document.querySelectorAll('[data-save-current]').forEach(button=>{
    button.hidden=false;
    const saved=new Set(readStore('tnp-saved',[]));
    const render=()=>{const on=saved.has(id);button.textContent=on?'★ Saved':'☆ Save tool';button.setAttribute('aria-pressed',on);};render();
    button.addEventListener('click',()=>{saved.has(id)?saved.delete(id):saved.add(id);writeStore('tnp-saved',[...saved]);render();});
  });
  const dialog=document.getElementById('tool-search-dialog');const input=document.getElementById('site-search-input');const results=document.getElementById('site-search-results');
  let catalog=[]; let loading=null;
  function renderSearch() {
    const terms=input.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const matching=catalog.filter(t=>terms.every(term=>`${t.name} ${t.description} ${t.keywords}`.toLowerCase().includes(term))).slice(0,9);
    results.replaceChildren();
    for(const tool of matching){const a=document.createElement('a');a.href=tool.url;const name=document.createElement('strong');name.textContent=tool.name;const desc=document.createElement('span');desc.textContent=tool.description;a.append(name,desc);results.append(a);}
    if(!matching.length){const p=document.createElement('p');p.className='search-empty';p.textContent='No matching tool. Try “PDF”, “JSON”, or “username”.';results.append(p);}
    document.getElementById('site-search-count').textContent=`${matching.length} tools shown.`;
  }
  async function openSearch(){
    if(!dialog)return;dialog.showModal();input.focus();
    try { if(!loading)loading=fetch('/data/tools.json').then(r=>{if(!r.ok)throw Error();return r.json();}).then(t=>{catalog=t;}); await loading;renderSearch(); }
    catch{results.textContent='Search is temporarily unavailable. Browse all tools using the link below.';loading=null;}
  }
  document.querySelectorAll('[data-open-search]').forEach(b=>b.addEventListener('click',openSearch));
  if(dialog){input.addEventListener('input',renderSearch);document.querySelector('[data-close-search]').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});dialog.addEventListener('cancel',e=>{e.preventDefault();dialog.close();});input.addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();results.querySelector('a')?.focus();}if(e.key==='Enter')results.querySelector('a')?.click();});}
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&dialog?.open){e.preventDefault();dialog.close();return;}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if(dialog?.open)dialog.close();else openSearch();}});
})();
