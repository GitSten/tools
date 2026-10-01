(() => {
 const input=document.getElementById('guide-search');if(!input)return;
 const rows=[...document.querySelectorAll('#art-list .article-row')];let category='All';
 function filter(){const terms=input.value.toLowerCase().trim().split(/\s+/).filter(Boolean);let count=0;for(const row of rows){const match=(category==='All'||row.dataset.cat===category)&&terms.every(t=>row.textContent.toLowerCase().includes(t));row.hidden=!match;row.style.display=match?'':'none';if(match)count++;}if(document.getElementById('art-count'))document.getElementById('art-count').textContent=`Showing ${count} guides`;document.getElementById('guide-search-status').textContent=`${count} ${count===1?'guide':'guides'}${count?'':' — try a broader search or another category'}.`;}
 input.value=new URLSearchParams(location.search).get('q')||'';input.addEventListener('input',filter);
 document.querySelectorAll('.cat-btn').forEach(button=>button.addEventListener('click',()=>{const code=button.getAttribute('onclick')||'';const match=code.match(/filterCat\('([^']+)'/);category=match&&match[1]!=='all'?match[1]:'All';filter();}));filter();
})();
