function clamp(num,min,max){return Math.min(max,Math.max(min,num));}
function hexToRgb(hex){const cleaned=hex.replace('#','').trim();const full=cleaned.length===3?cleaned.split('').map(c=>c+c).join(''):cleaned;if(!/^[0-9a-fA-F]{6}$/.test(full))return null;return {r:parseInt(full.slice(0,2),16),g:parseInt(full.slice(2,4),16),b:parseInt(full.slice(4,6),16)};}
function rgbToHex(r,g,b){return '#'+[r,g,b].map(n=>clamp(Math.round(Number(n)||0),0,255).toString(16).padStart(2,'0')).join('');}
function colorLuminance(rgb){const values=[rgb.r,rgb.g,rgb.b].map(n=>{const c=n/255;return c<=.04045?c/12.92:((c+.055)/1.055)**2.4;});return values[0]*.2126+values[1]*.7152+values[2]*.0722;}
function contrastRatio(fg,bg){const a=colorLuminance(fg),b=colorLuminance(bg);return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);}
function syncFromHex(value){
 const rgb=hexToRgb(value);const input=document.getElementById('cc-hex');
 if(!rgb){input.setAttribute('aria-invalid','true');document.getElementById('cc-error').textContent='Enter a 3- or 6-digit HEX color, such as #F80 or #FF8800.';return false;}
 const hex=rgbToHex(rgb.r,rgb.g,rgb.b).toUpperCase();input.removeAttribute('aria-invalid');document.getElementById('cc-error').textContent='';
 document.getElementById('cc-color').value=hex;input.value=hex;
 for(const channel of ['r','g','b'])document.getElementById('cc-'+channel).value=rgb[channel];
 document.getElementById('cc-preview').style.background=hex;document.getElementById('cc-swatch').textContent='HEX '+hex;
 document.getElementById('cc-swatch').style.color=colorLuminance(rgb)>.179?'#111111':'#FFFFFF';updateContrast();return true;
}
function syncFromRgb(){const channels=['r','g','b'].map(c=>clamp(parseInt(document.getElementById('cc-'+c).value,10)||0,0,255));syncFromHex(rgbToHex(...channels));}
function syncBackground(value){const rgb=hexToRgb(value);const field=document.getElementById('cc-bg-hex');if(!rgb){field.setAttribute('aria-invalid','true');document.getElementById('cc-bg-error').textContent='Enter a valid 3- or 6-digit background HEX color.';return false;}const hex=rgbToHex(rgb.r,rgb.g,rgb.b).toUpperCase();field.removeAttribute('aria-invalid');document.getElementById('cc-bg-error').textContent='';field.value=hex;document.getElementById('cc-bg').value=hex;updateContrast();return true;}
function updateContrast(){
 const fg=hexToRgb(document.getElementById('cc-hex').value);const bg=hexToRgb(document.getElementById('cc-bg-hex').value);if(!fg||!bg)return;
 const ratio=contrastRatio(fg,bg);const sample=document.getElementById('cc-text-preview');sample.style.color=rgbToHex(fg.r,fg.g,fg.b);sample.style.background=rgbToHex(bg.r,bg.g,bg.b);
 document.getElementById('cc-ratio').textContent=ratio.toFixed(2)+':1';
 for(const [id,threshold] of [['cc-aa-normal',4.5],['cc-aa-large',3],['cc-aaa-normal',7],['cc-aaa-large',4.5]]){const el=document.getElementById(id);const pass=ratio>=threshold;el.textContent=pass?'Pass':'Fail';el.className=pass?'contrast-pass':'contrast-fail';}
 document.getElementById('cc-css-output').value=`color: ${document.getElementById('cc-hex').value};\nbackground-color: ${document.getElementById('cc-bg-hex').value};`;
}
function copyHex(){if(hexToRgb(document.getElementById('cc-hex').value))window.ToolsNow.copy(document.getElementById('cc-hex').value);}
function copyRgb(){if(document.getElementById('cc-hex').hasAttribute('aria-invalid'))return;window.ToolsNow.copy(`rgb(${['r','g','b'].map(c=>document.getElementById('cc-'+c).value).join(', ')})`);}
async function sampleScreenColor(){try{const color=await new EyeDropper().open();syncFromHex(color.sRGBHex);}catch(err){if(err.name!=='AbortError')window.ToolsNow.announce('Screen sampling is unavailable. Paste a color value instead.');}}
document.addEventListener('DOMContentLoaded',()=>{
 syncFromHex(document.getElementById('cc-hex').value);syncBackground(document.getElementById('cc-bg-hex').value);
 document.getElementById('cc-eyedropper').hidden=!('EyeDropper' in window);
 document.getElementById('cc-swap').addEventListener('click',()=>{const fg=document.getElementById('cc-hex').value,bg=document.getElementById('cc-bg-hex').value;syncFromHex(bg);syncBackground(fg);});
 document.getElementById('cc-copy-css').addEventListener('click',()=>window.ToolsNow.copy(document.getElementById('cc-css-output').value));
});
