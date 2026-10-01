(() => {
  const words={
    minimal:[['clear','quiet','daily','little','open','bright','calm','simple','fresh','true','hello','early'],['note','line','orbit','space','story','spark','path','wave','corner','room','lane','loop']],
    aesthetic:[['lunar','silk','velvet','soft','ivory','pearl','dusk','rose','cloud','linen','pastel','opal'],['petal','veil','loom','haze','bloom','dawn','mist','drift','glow','echo','moon','muse']],
    gaming:[['frost','neon','shadow','storm','cyber','rogue','swift','ghost','iron','nova','void','blaze'],['viper','wolf','blade','knight','hawk','forge','ranger','reaper','strike','spark','titan','rift']],
    cute:[['mochi','honey','peach','sugar','cloud','tiny','mint','berry','kitty','candy','lily','bunny'],['petal','bun','bean','puff','cloud','star','bloom','moon','sprout','muffin','berry','cake']],
    funny:[['oops','almost','sleepy','soggy','lost','awkward','not','tiny','confused','extra','chaotic','probably'],['human','potato','penguin','robot','waffle','wizard','toast','pigeon','pickle','snack','duck','noodle']],
    business:[['made','build','craft','clear','fresh','bright','daily','open','good','hello','true','studio'],['studio','works','lab','design','craft','collective','space','journal','creative','co','shop','stories']],
    nature:[['fern','moss','clover','willow','cedar','birch','hazel','meadow','wild','ivy','oak','river'],['path','bloom','field','grove','cottage','creek','hearth','garden','trail','gate','leaf','brook']]
  };
  const form=document.getElementById('username-form');let names=[];
  const pick=arr=>arr[Math.floor(Math.random()*arr.length)];
  function generate(event){
    event?.preventDefault();if(!form.reportValidity())return;
    const raw=document.getElementById('username-keyword').value.trim();
    const keyword=raw.toLowerCase().replace(/[^a-z0-9]/g,'');
    const max=Number(document.getElementById('username-length').value);
    const [first,last]=words[document.getElementById('username-style').value];
    const numbers=document.getElementById('username-numbers').checked;
    const separators=document.getElementById('username-separators').checked;
    const result=new Set();
    if(raw&&!keyword){document.getElementById('username-status').textContent='Use a keyword containing letters A–Z or numbers.';return;}
    for(let i=0;i<1500&&result.size<30;i++){
      const a=keyword||pick(first),b=pick(last);
      const sep=separators?pick(['','.','_']):'';
      const reversed=Math.random()<.35;
      let name=reversed?b+sep+a:a+sep+b;
      if(numbers&&Math.random()<.45)name+=Math.floor(Math.random()*100);
      if(name.length<=max&&name.length>=3)result.add(name);
    }
    names=[...result];const container=document.getElementById('username-results');container.replaceChildren();
    for(const name of names){const row=document.createElement('div');row.className='username-result';const text=document.createElement('span');text.textContent=name;const button=document.createElement('button');button.type='button';button.textContent='Copy';button.setAttribute('aria-label',`Copy ${name}`);button.addEventListener('click',()=>window.ToolsNow.copy(name));row.append(text,button);container.append(row);}
    const note=names.length?`${names.length} ideas generated. Check availability on your platform before using one.`:'No combinations fit this length. Shorten your keyword or increase the character limit.';
    document.getElementById('username-status').textContent=note+(raw!==keyword&&raw?' Your keyword was normalized to '+keyword+'.':'');
    document.getElementById('username-copy-all').disabled=!names.length;document.getElementById('username-download').disabled=!names.length;
  }
  form.addEventListener('submit',generate);
  document.getElementById('username-copy-all').addEventListener('click',()=>window.ToolsNow.copy(names.join('\n')));
  document.getElementById('username-download').addEventListener('click',()=>window.ToolsNow.download(names.join('\n'),'username-ideas.txt'));
  const initialStyle=new URLSearchParams(location.search).get('style');
  if(initialStyle&&words[initialStyle])document.getElementById('username-style').value=initialStyle;
  generate();
})();
