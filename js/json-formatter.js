let jsonParsed;
let jsonPaths=[];
let jsonTimer;
const jsonLimit=2*1024*1024;
function setJsonStatus(message,isError=false){const el=document.getElementById('json-status');el.textContent=message;el.style.color=isError?'#FCA5A5':'var(--muted)';}
function jsonUnsafeNumber(raw){
  const tokens=/"(?:\\.|[^"\\])*"|(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)/g;
  for(const match of raw.matchAll(tokens))if(match[1]&&(!Number.isFinite(Number(match[1]))||(Number.isInteger(Number(match[1]))&&!Number.isSafeInteger(Number(match[1])))))return match[1];
  return null;
}
function jsonClearOutput(){document.getElementById('json-output').value='';jsonParsed=undefined;jsonPaths=[];document.getElementById('json-metrics').textContent='';document.getElementById('json-path-results').replaceChildren();}
function jsonCollectPaths(value){
  const entries=[];const stack=[{value,path:'$',depth:0}];let maxDepth=0,count=0;
  while(stack.length&&count<10000){const item=stack.pop();count++;maxDepth=Math.max(maxDepth,item.depth);const type=item.value===null?'null':Array.isArray(item.value)?'array':typeof item.value;
    if(entries.length<500)entries.push({path:item.path,type,value:type==='object'||type==='array'?`${Object.keys(item.value).length} ${type==='array'?'items':'keys'}`:String(item.value)});
    if(item.value&&typeof item.value==='object'){const keys=Object.keys(item.value);for(let i=keys.length-1;i>=0;i--){const key=keys[i];const childPath=Array.isArray(item.value)?`${item.path}[${key}]`:/^[A-Za-z_$][\w$]*$/.test(key)?`${item.path}.${key}`:`${item.path}[${JSON.stringify(key)}]`;stack.push({value:item.value[key],path:childPath,depth:item.depth+1});}}
  }
  return {entries,maxDepth,count,truncated:stack.length>0};
}
function jsonRenderPaths(){
  const term=document.getElementById('json-path-search').value.toLowerCase();const target=document.getElementById('json-path-results');target.replaceChildren();
  const rows=jsonPaths.filter(row=>`${row.path} ${row.type} ${row.value}`.toLowerCase().includes(term));
  for(const row of rows.slice(0,60)){const div=document.createElement('div');div.className='json-path-row';const key=document.createElement('code');key.textContent=row.path;const type=document.createElement('span');type.textContent=row.type;const value=document.createElement('span');value.textContent=row.value.slice(0,160);value.title=row.value;div.append(key,type,value);target.append(div);}
  document.getElementById('json-path-note').textContent=jsonPaths.length?`Showing ${Math.min(rows.length,60)} of ${rows.length} matches among the first ${jsonPaths.length} inspected values. Paths use JavaScript-style notation.`:'Format valid JSON to inspect its values.';
}
function renderJson(input,indent){
  const raw=input.trim();jsonClearOutput();
  if(!raw){setJsonStatus('Paste JSON, open a file, or load the sample.');jsonRenderPaths();return;}
  if(new TextEncoder().encode(raw).length>jsonLimit){setJsonStatus('This tool supports up to 2 MB of JSON. Use a smaller sample or a local editor.',true);jsonRenderPaths();return;}
  try{
    const parsed=JSON.parse(raw);const unsafe=jsonUnsafeNumber(raw);
    if(unsafe){setJsonStatus(`Not formatted: ${unsafe} is outside JavaScript’s safe integer range. Quote exact identifiers as strings to preserve their digits.`,true);jsonRenderPaths();return;}
    jsonParsed=parsed;document.getElementById('json-output').value=JSON.stringify(parsed,null,indent);
    const info=jsonCollectPaths(parsed);jsonPaths=info.entries;const rootType=parsed===null?'null':Array.isArray(parsed)?'array':typeof parsed;
    const inputSize=new TextEncoder().encode(raw).length;const outputSize=new TextEncoder().encode(document.getElementById('json-output').value).length;
    document.getElementById('json-metrics').textContent=`Root: ${rootType} · Input: ${inputSize.toLocaleString()} bytes · Output: ${outputSize.toLocaleString()} bytes · Depth: ${info.maxDepth}${info.truncated?' (inspection limit reached)':''}`;
    setJsonStatus(indent===0?'Valid JSON — minified.':'Valid JSON — formatted.');jsonRenderPaths();
  }catch(err){setJsonStatus('Invalid JSON: '+err.message,true);jsonRenderPaths();}
}
function formatJson(){clearTimeout(jsonTimer);renderJson(document.getElementById('json-input').value,Number(document.getElementById('json-indent').value)||2);}
function minifyJson(){clearTimeout(jsonTimer);renderJson(document.getElementById('json-input').value,0);}
async function copyJson(){const value=document.getElementById('json-output').value;if(value)await window.ToolsNow.copy(value);else setJsonStatus('Format valid JSON before copying.',true);}
function downloadJson(){const value=document.getElementById('json-output').value;if(value)window.ToolsNow.download(value,'formatted.json','application/json');else setJsonStatus('Format valid JSON before downloading.',true);}
function loadSampleJson(){document.getElementById('json-input').value='{"orderId":"A104","items":[{"sku":"mug-blue","quantity":2}],"paid":true,"note":null}';formatJson();}
async function importJson(file){if(!file)return;if(file.size>jsonLimit){setJsonStatus('File is larger than 2 MB. Open a smaller sample.',true);return;}try{document.getElementById('json-input').value=await file.text();formatJson();}catch{setJsonStatus('Could not read that file.',true);}}
document.addEventListener('DOMContentLoaded',()=>{
  const input=document.getElementById('json-input');setJsonStatus('Paste JSON, open a file, or load the sample.');jsonRenderPaths();
  input.addEventListener('input',()=>{clearTimeout(jsonTimer);if(document.getElementById('json-live').checked)jsonTimer=setTimeout(formatJson,350);});
  input.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();formatJson();}});
  document.getElementById('json-file').addEventListener('change',e=>{importJson(e.target.files[0]);e.target.value='';});
  document.getElementById('json-clear').addEventListener('click',()=>{input.value='';clearTimeout(jsonTimer);formatJson();input.focus();});
  document.getElementById('json-path-search').addEventListener('input',jsonRenderPaths);
  input.addEventListener('dragover',e=>e.preventDefault());input.addEventListener('drop',e=>{if(e.dataTransfer.files.length){e.preventDefault();importJson(e.dataTransfer.files[0]);}});
});
