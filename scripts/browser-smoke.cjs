const {chromium}=require('playwright');
const AxeBuilder=require('@axe-core/playwright').default;
const {PDFDocument}=require('pdf-lib');
const assert=require('node:assert/strict');
const fs=require('node:fs');const path=require('node:path');const vm=require('node:vm');
const root=path.resolve(__dirname,'..'),base=process.env.TNP_TEST_URL||'http://127.0.0.1:8766';
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1000},acceptDownloads:true});
 await context.route(/googletagmanager|googlesyndication|doubleclick/,r=>r.abort());
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(`${page.url()}: ${e.message}`));
 const catalog=JSON.parse(fs.readFileSync(path.join(root,'data/tools.json')));
 const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
 for(const url of urls){await page.goto(base+url);assert.equal(await page.locator('h1').count(),1,url);assert.equal(await page.locator('main').count(),1,url);assert.equal(await page.locator('#tool-search-dialog').count(),1,url);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`desktop overflow: ${url}`);}
 assert.deepEqual(errors,[]);
 // Search, category state, empty results, saved tools, recents and keyboard dialog.
 await page.goto(base+'/');assert.equal(await page.locator('.directory-card:visible').count(),21);
 await page.locator('#tool-search').fill('wifi');assert.equal(await page.locator('.directory-card:visible').count(),1);
 await page.locator('#tool-search').fill('nothingmatches');assert(await page.locator('#no-tools').isVisible());await page.locator('#reset-tool-search').click();
 await page.locator('[data-filter="Developer"]').click();assert.equal(await page.locator('.directory-card:visible').count(),3);
 await page.locator('[data-filter="All"]').click();await page.locator('[data-favorite="json"]').click();await page.locator('[data-filter="Saved"]').click();assert.equal(await page.locator('.directory-card:visible').count(),1);
 await page.keyboard.press('Control+k');await page.locator('#site-search-input').fill('pdf');await page.waitForFunction(()=>document.querySelector('#site-search-results').textContent.includes('Images to PDF'));await page.locator('[data-close-search]').click();assert.equal(await page.locator('#tool-search-dialog').evaluate(d=>d.open),false);
 await page.goto(base+'/tools/json-formatter');await page.goto(base+'/');assert(await page.locator('#returning-tools').isVisible());
 // JSON formatting, unsafe integers, syntax failures, path inspection and file import/download.
 await page.goto(base+'/tools/json-formatter');await page.getByRole('button',{name:'Load sample',exact:true}).click();const expected={orderId:'A104',items:[{sku:'mug-blue',quantity:2}],paid:true,note:null};assert.equal(await page.locator('#json-output').inputValue(),JSON.stringify(expected,null,2));
 await page.locator('summary').filter({hasText:'Inspect JSON'}).click();await page.locator('#json-path-search').fill('quantity');assert(await page.locator('#json-path-results').textContent().then(t=>t.includes('$.items[0].quantity')));
 for(const bad of ['{"paid":true,}',"{orderId:'A104'}",'{"items":[1,2}']){await page.locator('#json-input').fill(bad);await page.evaluate(()=>formatJson());assert((await page.locator('#json-status').textContent()).startsWith('Invalid JSON:'));assert.equal(await page.locator('#json-output').inputValue(),'');}
 for(const number of ['9007199254740993','1e400']){await page.locator('#json-input').fill(`{"id":${number}}`);await page.evaluate(()=>formatJson());assert((await page.locator('#json-status').textContent()).startsWith('Not formatted:'));assert.equal(await page.locator('#json-output').inputValue(),'');}
 await page.locator('#json-file').setInputFiles({name:'sample.json',mimeType:'application/json',buffer:Buffer.from('{"id":"9007199254740993"}')});await page.waitForFunction(()=>document.getElementById('json-output').value.includes('9007199254740993'));
 const pendingJson=page.waitForEvent('download');await page.getByRole('button',{name:'Download .json',exact:true}).click();const jsonFile=await pendingJson;assert.equal(jsonFile.suggestedFilename(),'formatted.json');
 // Color conversion and the unrounded WCAG boundaries.
 await page.goto(base+'/tools/color-picker');await page.evaluate(()=>syncFromHex('#F80'));assert.equal(await page.locator('#cc-hex').inputValue(),'#FF8800');assert.equal(await page.locator('#cc-ratio').textContent(),'2.39:1');assert.equal(await page.locator('#cc-aa-normal').textContent(),'Fail');
 await page.evaluate(()=>syncFromHex('#7C3AED'));assert.equal(await page.locator('#cc-ratio').textContent(),'5.70:1');assert.equal(await page.locator('#cc-aa-normal').textContent(),'Pass');assert.equal(await page.locator('#cc-aaa-normal').textContent(),'Fail');
 await page.evaluate(()=>syncFromHex('#000'));assert.equal(await page.locator('#cc-ratio').textContent(),'21.00:1');await page.locator('#cc-swap').click();assert.equal(await page.locator('#cc-hex').inputValue(),'#FFFFFF');assert.equal(await page.locator('#cc-bg-hex').inputValue(),'#000000');
 await page.locator('#cc-hex').fill('bad-value');await page.evaluate(()=>syncFromHex('bad-value'));assert.equal(await page.locator('#cc-hex').getAttribute('aria-invalid'),'true');
 // General usernames: every style, bounds, keyword normalization, no injection.
 await page.goto(base+'/tools/username-generator');
 for(const style of ['minimal','aesthetic','gaming','cute','funny','business','nature']){await page.locator('#username-style').selectOption(style);await page.locator('#username-form').evaluate(f=>f.requestSubmit());const names=await page.locator('.username-result>span').allTextContents();assert.equal(names.length,30);assert.equal(new Set(names).size,30);assert(names.every(n=>/^[a-z0-9._]+$/.test(n)&&n.length<=20));}
 await page.locator('#username-keyword').fill('pixel');await page.locator('#username-length').fill('10');await page.locator('#username-form').evaluate(f=>f.requestSubmit());assert((await page.locator('.username-result>span').allTextContents()).every(n=>n.includes('pixel')&&n.length<=10));
 await page.locator('#username-keyword').fill('<img src=x onerror=alert(1)>');await page.locator('#username-form').evaluate(f=>f.requestSubmit());assert.equal(await page.locator('#username-results img').count(),0);
 await page.goto(base+'/gaming/');await page.locator('#kw').fill('<img src=x onerror=alert(1)>');await page.evaluate(()=>gen());assert.equal(await page.locator('#rg img').count(),0);
 // A real PDF parser verifies one page, rotation, merging, paper size, reorder and removal.
 await page.goto(base+'/tools/jpg-to-pdf');const source=path.join(root,'blog/examples/pdf-quality-source.png');await page.locator('#jpg-file').setInputFiles(source);await page.waitForFunction(()=>document.getElementById('status').textContent==='Ready to convert');
 const outputDir=process.env.TNP_ARTIFACT_DIR||'/tmp/toolsnow-artifacts';fs.mkdirSync(outputDir,{recursive:true});const sizes=[];
 for(const [name,q] of [['high','0.98'],['balanced','0.92'],['smaller','0.85']]){await page.locator('#jpg-quality').selectOption(q);const pending=page.waitForEvent('download');await page.locator('#convert-btn').click();const download=await pending;const file=path.join(outputDir,`sample-${name}.pdf`);await download.saveAs(file);const buffer=fs.readFileSync(file);const pdf=await PDFDocument.load(buffer);assert.equal(pdf.getPageCount(),1);assert.deepEqual(pdf.getPage(0).getSize(),{width:1200,height:800});sizes.push({name,bytes:buffer.length});}
 await page.locator('#jpg-file').setInputFiles({name:'second.png',mimeType:'image/png',buffer:fs.readFileSync(source)});await page.waitForFunction(()=>document.querySelectorAll('.pdf-page-card').length===2);
 await page.getByRole('button',{name:'Rotate page clockwise: second.png',exact:true}).click();await page.getByRole('button',{name:'Move page earlier: second.png',exact:true}).click();assert((await page.locator('.pdf-page-name').first().textContent()).includes('second.png'));
 await page.locator('#pdf-paper-size').selectOption('a4');const pendingMulti=page.waitForEvent('download');await page.locator('#convert-btn').click();const multi=await pendingMulti;const multiPath=path.join(outputDir,'multipage-a4.pdf');await multi.saveAs(multiPath);const doc=await PDFDocument.load(fs.readFileSync(multiPath));assert.equal(doc.getPageCount(),2);assert.deepEqual(doc.getPage(0).getSize(),{width:595.28,height:841.89});
 await page.getByRole('button',{name:'Remove page: second.png',exact:true}).click();assert.equal(await page.locator('.pdf-page-card').count(),1);
 // Contact remains honest when no endpoint is supplied; success/failure are mocked.
 await page.goto(base+'/about/');assert(await page.locator('#contact-submit').isDisabled());
 await context.route('**/js/contact.js',r=>r.fulfill({contentType:'application/javascript',body:fs.readFileSync(path.join(root,'js/contact.js'),'utf8').replace('contactForm.dataset.endpoint.trim()',"'https://formspree.io/f/testform'")}));
 for(const outcome of ['error','offline','invalid','success']){await context.route('https://formspree.io/f/testform',r=>outcome==='offline'?r.abort():r.fulfill({status:outcome==='error'?422:200,contentType:'application/json',body:JSON.stringify(outcome==='success'?{ok:true}:{})}));await page.goto(base+'/about/');await page.locator('#c-name').fill('Test');await page.locator('#c-email').fill('test@example.com');await page.locator('#c-msg').fill('Test message');await page.locator('#contact-submit').click();await page.waitForFunction(()=>!document.getElementById('contact-submit').disabled);assert.equal(await page.locator('#c-msg').inputValue(),outcome==='success'?'':'Test message');await context.unroute('https://formspree.io/f/testform');}await context.unroute('**/js/contact.js');
 // Mobile: all canonical pages, real menu operation, and no horizontal page overflow.
 await page.setViewportSize({width:390,height:844});const mobileOverflows=[];
 for(const url of urls){await page.goto(base+url);if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)){console.log(url,await page.evaluate(()=>[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).slice(0,3).map(e=>({tag:e.tagName,cls:e.className,right:e.getBoundingClientRect().right,width:e.getBoundingClientRect().width}))));mobileOverflows.push(url);}}
 if(mobileOverflows.length) console.log('mobile overflows',mobileOverflows);
 assert.deepEqual(mobileOverflows,[]);
 await page.goto(base+'/');await page.locator('.nav-toggle').click();assert.equal(await page.locator('.nav-toggle').getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await page.locator('.nav-toggle').getAttribute('aria-expanded'),'false');
 // Axe checks on the important workflows; automated checks do not replace manual review.
 const violations=[];
 for(const url of ['/','/tools/json-formatter','/tools/color-picker','/tools/jpg-to-pdf','/tools/username-generator','/faq/']){await page.goto(base+url);const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();for(const v of result.violations)violations.push({url,id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)});}
 const nojs=await browser.newContext({javaScriptEnabled:false});const raw=await nojs.newPage();await raw.goto(base+'/');assert.equal(await raw.locator('.directory-card').count(),21);await raw.goto(base+'/faq/');assert.equal(await raw.locator('#faq-main details').count(),20);await raw.locator('#faq-main summary').first().click();assert.notEqual(await raw.locator('#faq-main details').first().getAttribute('open'),null);await raw.goto(base+'/blog/tiktok-usernames-2026');assert.equal(await raw.locator('.u-pill').count(),100);await nojs.close();
 assert.deepEqual(errors,[]);
 const report={pages:urls.length,mobilePages:urls.length,tools:catalog.length,pdfSizes:sizes,pdfParser:'pdf-lib',axeViolations:violations,pageErrors:errors,chrome:browser.version()};fs.writeFileSync(path.join(outputDir,'browser-report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
 await browser.close();if(violations.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1)});
