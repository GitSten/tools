const jpgState={pages:[],loading:false,converting:false};
const jpgEls={dropZone:document.getElementById('drop-zone'),previewBox:document.getElementById('preview-box'),status:document.getElementById('status'),imgSize:document.getElementById('img-size'),convertBtn:document.getElementById('convert-btn'),pdfName:document.getElementById('pdf-name'),quality:document.getElementById('jpg-quality')};
function setStatus(message){jpgEls.status.textContent=message;}
function showToast(message){window.ToolsNow.announce(message);}
function onDragOver(e){e.preventDefault();jpgEls.dropZone.classList.add('dragover');}
function onDragLeave(){jpgEls.dropZone.classList.remove('dragover');}
function onDrop(e){e.preventDefault();onDragLeave();loadImages(e.dataTransfer.files);}
function loadImage(file){return loadImages(file?[file]:[]);}
function jpgRenderPages(){
 jpgEls.previewBox.replaceChildren();
 if(!jpgState.pages.length){const p=document.createElement('p');p.textContent='Your pages appear here';p.className='tool-note';jpgEls.previewBox.append(p);}
 jpgState.pages.forEach((page,index)=>{
  const card=document.createElement('div');card.className='pdf-page-card';
  const frame=document.createElement('div');frame.className='pdf-thumbnail';const image=document.createElement('img');image.src=page.url;image.alt=`Page ${index+1}: ${page.file.name}`;image.style.transform=`rotate(${page.rotation}deg)`;frame.append(image);
  const label=document.createElement('div');label.className='pdf-page-name';label.textContent=`${index+1}. ${page.file.name}`;label.title=page.file.name;
  const controls=document.createElement('div');controls.className='pdf-page-actions';
  for(const [text,title,action,disabled] of [
   ['←','Move page earlier',()=>{[jpgState.pages[index-1],jpgState.pages[index]]=[jpgState.pages[index],jpgState.pages[index-1]];jpgRenderPages();},index===0],
   ['→','Move page later',()=>{[jpgState.pages[index+1],jpgState.pages[index]]=[jpgState.pages[index],jpgState.pages[index+1]];jpgRenderPages();},index===jpgState.pages.length-1],
   ['↻','Rotate page clockwise',()=>{page.rotation=(page.rotation+90)%360;jpgRenderPages();},false],
   ['×','Remove page',()=>{URL.revokeObjectURL(page.url);jpgState.pages.splice(index,1);jpgRenderPages();},false]]){
    const b=document.createElement('button');b.type='button';b.textContent=text;b.setAttribute('aria-label',`${title}: ${page.file.name}`);b.title=title;b.disabled=disabled||jpgState.loading||jpgState.converting;b.addEventListener('click',action);controls.append(b);
  }
  card.append(frame,label,controls);jpgEls.previewBox.append(card);
 });
 jpgEls.convertBtn.disabled=!jpgState.pages.length||jpgState.loading||jpgState.converting;
 jpgEls.imgSize.textContent=jpgState.pages.length===1?`${jpgState.pages[0].image.width} × ${jpgState.pages[0].image.height}px`:`${jpgState.pages.length} images`;
 document.getElementById('pdf-page-count').textContent=`${jpgState.pages.length} ${jpgState.pages.length===1?'page':'pages'}`;
 document.getElementById('jpg-file').disabled=jpgState.loading||jpgState.converting;
}
async function loadImages(files){
 if(jpgState.loading||jpgState.converting)return;
 jpgState.loading=true;jpgRenderPages();setStatus('Reading images…');let rejected=0;
 for(const file of Array.from(files)){
  if(jpgState.pages.length>=20||!file.type.startsWith('image/')||file.size>10*1024*1024){rejected++;continue;}
  const url=URL.createObjectURL(file);
  try{
   const image=await new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src=url;});
   const pixels=image.width*image.height;const total=jpgState.pages.reduce((n,p)=>n+p.image.width*p.image.height,0);
   if(!pixels||pixels>20000000||total+pixels>60000000)throw Error('Image dimensions exceed limit');
   jpgState.pages.push({file,image,url,rotation:0});
   if(jpgState.pages.length===1)jpgEls.pdfName.value=file.name.replace(/\.[^.]+$/,'')+'.pdf';
  }catch{URL.revokeObjectURL(url);rejected++;}
 }
 jpgState.loading=false;jpgRenderPages();document.getElementById('jpg-file').value='';
 setStatus(jpgState.pages.length?(rejected?`${jpgState.pages.length} pages ready; ${rejected} files skipped (unsupported or too large)`:'Ready to convert'):'No supported images were added');
}
function resetTool(){if(jpgState.loading||jpgState.converting)return;for(const p of jpgState.pages)URL.revokeObjectURL(p.url);jpgState.pages=[];jpgEls.pdfName.value='images-to-pdf.pdf';jpgRenderPages();setStatus('Choose images to begin');}
function dataUrlToBytes(dataUrl){const binary=atob(dataUrl.split(',')[1]);return Uint8Array.from(binary,c=>c.charCodeAt(0));}
function buildPdfPages(pages){
 const enc=new TextEncoder(),parts=[],offsets=[];let position=0;
 const add=value=>{const bytes=typeof value==='string'?enc.encode(value):value;parts.push(bytes);position+=bytes.length;};
 const obj=(n,body)=>{offsets[n]=position;add(`${n} 0 obj\n`);body.forEach(add);add('\nendobj\n');};
 add('%PDF-1.4\n');obj(1,['<< /Type /Catalog /Pages 2 0 R >>']);obj(2,[`<< /Type /Pages /Kids [${pages.map((_,i)=>`${3+i*3} 0 R`).join(' ')}] /Count ${pages.length} >>`]);
 pages.forEach((p,i)=>{
  const n=3+i*3;
  obj(n,[`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${p.pageW} ${p.pageH}] /Resources << /XObject << /Im0 ${n+2} 0 R >> >> /Contents ${n+1} 0 R >>`]);
  const content=enc.encode(`q\n${p.drawW} 0 0 ${p.drawH} ${p.x} ${p.y} cm\n/Im0 Do\nQ\n`);
  obj(n+1,[`<< /Length ${content.length} >>\nstream\n`,content,'\nendstream']);
  obj(n+2,[`<< /Type /XObject /Subtype /Image /Width ${p.width} /Height ${p.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${p.bytes.length} >>\nstream\n`,p.bytes,'\nendstream']);
 });
 const xrefStart=position,count=3+pages.length*3;let xref=`xref\n0 ${count}\n0000000000 65535 f \n`;
 for(let i=1;i<count;i++)xref+=`${String(offsets[i]).padStart(10,'0')} 00000 n \n`;
 add(xref);add(`trailer\n<< /Size ${count} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`);return new Blob(parts,{type:'application/pdf'});
}
function buildPdf(jpegBytes,imgW,imgH){return buildPdfPages([{bytes:jpegBytes,width:imgW,height:imgH,pageW:imgW,pageH:imgH,drawW:imgW,drawH:imgH,x:0,y:0}]);}
async function convertToPdf(){
 if(!jpgState.pages.length||jpgState.loading||jpgState.converting)return;
 jpgState.converting=true;jpgRenderPages();jpgEls.convertBtn.textContent='Creating PDF…';setStatus('Encoding pages…');
 try{
  const pages=[];const quality=Number(jpgEls.quality.value);const mode=document.getElementById('pdf-paper-size').value;
  for(let i=0;i<jpgState.pages.length;i++){
   const page=jpgState.pages[i];const sideways=page.rotation%180!==0;const width=sideways?page.image.height:page.image.width,height=sideways?page.image.width:page.image.height;
   const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;const ctx=canvas.getContext('2d');if(!ctx)throw Error('Canvas unavailable');ctx.fillStyle='#FFFFFF';ctx.fillRect(0,0,width,height);ctx.translate(width/2,height/2);ctx.rotate(page.rotation*Math.PI/180);ctx.drawImage(page.image,-page.image.width/2,-page.image.height/2);
   const bytes=dataUrlToBytes(canvas.toDataURL('image/jpeg',quality));canvas.width=1;canvas.height=1;
   let pageW=width,pageH=height,drawW=width,drawH=height,x=0,y=0;
   if(mode!=='image'){[pageW,pageH]=mode==='a4'?[595.28,841.89]:[612,792];const margin=24,scale=Math.min((pageW-2*margin)/width,(pageH-2*margin)/height);drawW=+(width*scale).toFixed(3);drawH=+(height*scale).toFixed(3);x=+((pageW-drawW)/2).toFixed(3);y=+((pageH-drawH)/2).toFixed(3);}
   pages.push({bytes,width,height,pageW,pageH,drawW,drawH,x,y});setStatus(`Encoded page ${i+1} of ${jpgState.pages.length}`);await new Promise(resolve=>setTimeout(resolve,0));
  }
  const blob=buildPdfPages(pages);const name=(jpgEls.pdfName.value||'images-to-pdf').replace(/\.pdf$/i,'').replace(/[\\/<>:"|?*]/g,'-')+'.pdf';window.ToolsNow.download(blob,name);
  setStatus(`PDF created: ${pages.length} ${pages.length===1?'page':'pages'} · ${blob.size.toLocaleString()} bytes`);showToast('PDF downloaded. Open it to check the result.');
 }catch{setStatus('PDF could not be created. Try fewer or smaller images.');showToast('Conversion failed. Your images are still here.');}
 finally{jpgState.converting=false;jpgEls.convertBtn.textContent='Download PDF';jpgRenderPages();}
}
jpgEls.dropZone.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();document.getElementById('jpg-file').click();}});
jpgRenderPages();
