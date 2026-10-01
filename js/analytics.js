// Record page/tool usage only. Never send input text, filenames, colors, or generated values.
(() => {
 const measurementId='G-LSDSPEHT0J';
 const browserOptOut=navigator.doNotTrack==='1'||navigator.globalPrivacyControl===true;
 let optedOut=false;try{optedOut=localStorage.getItem('tnp-analytics')==='off';}catch{}
 let enabled=!browserOptOut&&!optedOut;let loaded=false;
 window.dataLayer=window.dataLayer||[];
 window.gtag=function(){if(enabled)window.dataLayer.push(arguments);};
 function load(){
  if(!enabled||loaded)return;loaded=true;
  window.gtag('js',new Date());window.gtag('config',measurementId,{send_page_view:true});
  const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+measurementId;document.head.append(script);
 }
 window.addEventListener('load',()=>{if('requestIdleCallback' in window)requestIdleCallback(load,{timeout:3000});else setTimeout(load,1500);});
 document.addEventListener('DOMContentLoaded',()=>{
  // Tool usage can be queued while the network script waits for idle time.
  if(document.body.dataset.toolId)window.gtag('event','tool_open',{tool_id:document.body.dataset.toolId});
  for(const button of document.querySelectorAll('[data-analytics-toggle]')){
   const render=()=>{button.textContent=browserOptOut?'Analytics: browser opt-out':`Analytics: ${enabled?'on':'off'}`;button.setAttribute('aria-pressed',enabled);button.disabled=browserOptOut;};render();
   button.addEventListener('click',()=>{enabled=!enabled;window['ga-disable-'+measurementId]=!enabled;try{localStorage.setItem('tnp-analytics',enabled?'on':'off');}catch{}render();if(enabled)load();});
  }
 });
})();
