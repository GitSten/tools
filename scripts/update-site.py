"""Refresh shared navigation, tool metadata and canonical sitemap. No build dependencies."""
from pathlib import Path
import json, re, html, xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parent.parent
TOOLS=json.loads((ROOT/'data/tools.json').read_text())
BASE='https://toolsnowpro.com'
HEADER='''<a class="skip-link" href="#main-content">Skip to content</a>
<header class="site-header"><div class="wrapper"><div class="header-inner">
<a href="/" class="logo" aria-label="ToolsNowPro home"><span class="logo-icon" aria-hidden="true">↗</span>ToolsNow<span class="logo-pro">Pro</span></a>
<nav class="site-nav" id="snav" aria-label="Main navigation"><a href="/#tools">All tools</a><a href="/qr-generator/">QR codes</a><a href="/tools/username-generator.html">Usernames</a><a href="/blog/">Guides</a></nav>
<div class="header-actions"><button type="button" class="site-search-button" data-open-search aria-label="Search tools"><span aria-hidden="true">⌕</span><span class="search-button-label">Find a tool</span><kbd aria-hidden="true">⌘ K</kbd></button><button type="button" class="nav-toggle" aria-controls="snav" aria-expanded="false" aria-label="Toggle navigation">☰</button></div>
</div></div></header>'''
FOOTER='''<footer class="site-footer"><div class="wrapper"><div class="footer-grid"><div class="footer-brand"><a href="/" class="logo"><span class="logo-icon" aria-hidden="true">↗</span>ToolsNow<span class="logo-pro">Pro</span></a><p>Small tools for everyday work.<br>Free to use. Built for your browser.</p></div><div><div class="footer-heading">Your toolkit</div><ul class="footer-links"><li><a href="/tools/json-formatter.html">JSON Formatter</a></li><li><a href="/tools/jpg-to-pdf.html">Images to PDF</a></li><li><a href="/tools/color-picker.html">Color & Contrast</a></li><li><a href="/qr-generator/">QR Code Generator</a></li><li><a href="/#tools">All 21 tools</a></li></ul></div><div><div class="footer-heading">Ideas & reference</div><ul class="footer-links"><li><a href="/tools/username-generator.html">Username Generator</a></li><li><a href="/gaming/">Gaming Usernames</a></li><li><a href="/tools/cheat-sheet-library.html">Cheat Sheets</a></li><li><a href="/blog/">Practical Guides</a></li></ul></div><div><div class="footer-heading">ToolsNowPro</div><ul class="footer-links"><li><a href="/about/">About</a></li><li><a href="/editorial/">Editorial Standards</a></li><li><a href="/about/#contact">Contact & Feedback</a></li><li><a href="/about/#privacy">Privacy</a></li><li><a href="/about/#terms">Terms</a></li></ul></div></div><div class="footer-bottom"><span>© 2026 ToolsNowPro · <button type="button" class="analytics-toggle" data-analytics-toggle aria-pressed="false">Analytics settings</button></span><span>Need a domain? <a href="https://namecheap.pxf.io/c/7408925/1632743/5618" rel="sponsored nofollow noopener" target="_blank">Search Namecheap ↗</a> <span class="affiliate-label">Affiliate link</span></span></div></div></footer>
<dialog class="tool-search-dialog" id="tool-search-dialog" aria-labelledby="search-dialog-title"><div class="search-dialog-header"><h2 id="search-dialog-title">Find your next tool</h2><button type="button" data-close-search class="dialog-close" aria-label="Close tool search">×</button></div><label class="sr-only" for="site-search-input">Search tool names and tasks</label><input type="search" id="site-search-input" placeholder="Try JSON, PDF, QR or username…" autocomplete="off"><p id="site-search-count" class="sr-only" role="status" aria-live="polite"></p><div id="site-search-results" class="site-search-results"></div><div class="search-dialog-footer"><a href="/#tools">Browse all tools →</a><span>Esc to close</span></div></dialog>'''
for p in ROOT.rglob('*.html'):
 if '.git' in p.parts or p.name.startswith('namecheap-') or p.parent.name=='examples':continue
 s=p.read_text()
 if 'http-equiv="refresh"' in s:continue
 if '<!-- SITE_HEADER -->' in s:s=s.replace('<!-- SITE_HEADER -->',HEADER)
 elif '<header class="site-header"' in s:s=re.sub(r'(?:<a class="skip-link".*?</a>\s*)?<header class="site-header".*?</header>',lambda _:HEADER,s,flags=re.S)
 else:continue
 s=re.sub(r'<dialog class="tool-search-dialog".*?</dialog>','',s,flags=re.S)
 if '<!-- SITE_FOOTER -->' in s:s=s.replace('<!-- SITE_FOOTER -->',FOOTER)
 else:
  s=re.sub(r'<footer class="site-footer".*?</footer>',lambda _:FOOTER,s,flags=re.S)
 # Remove affiliate iframe and bookmark prompt from above the actual tool.
 s=re.sub(r'<div class="wrapper"><div class="ad-slot ad-banner"[^>]*><iframe.*?</iframe></div></div>','',s,flags=re.S)
 s=re.sub(r'<div class="wrapper">\s*<details class="bookmark-strip">.*?</details>\s*</div>','',s,flags=re.S)
 # Main landmark is server-rendered, including pages which did not have one.
 if 'id="main-content"' not in s:
  if '<main' in s:s=re.sub(r'<main(\s[^>]*)?>',lambda m:'<main id="main-content"'+(m[1] or '')+'>',s,count=1)
  else:s=s.replace('</header>','</header>\n<main id="main-content">',1).replace('<footer class="site-footer"','</main>\n<footer class="site-footer"',1)
 if 'src="/js/site.js"' not in s:s=s.replace('</head>','<script src="/js/site.js" defer></script>\n</head>')
 # Match visible labels with the first following control where older forms omitted association.
 s=re.sub(r'<label>([^<]+)</label>(\s*<(?:input|select|textarea)\b[^>]*\bid="([^"]+)"[^>]*>)',lambda m:f'<label for="{m[3]}">{m[1]}</label>{m[2]}',s)
 tool=next((t for t in TOOLS if (ROOT/(t['url'].lstrip('/')+'index.html' if t['url'].endswith('/') else t['url'].lstrip('/')+'.html')).resolve()==p.resolve()),None)
 if tool:
  s=re.sub(r'<body([^>]*)>',lambda m:'<body'+re.sub(r'\sdata-tool-id="[^"]*"','',m[1])+f' data-tool-id="{tool["id"]}">',s,count=1)
  s=re.sub(r'<div class="wrapper tool-breadcrumbs">.*?</nav><button.*?</button></div>','',s,flags=re.S)
  if 'tool-breadcrumbs' not in s:
   crumb=f'<div class="wrapper tool-breadcrumbs"><nav aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/?category={tool["category"]}#tools">{tool["category"]}</a><span aria-hidden="true">/</span><span>{html.escape(tool["name"])}</span></nav><button type="button" class="save-tool-button" data-save-current aria-pressed="false" hidden>☆ Save tool</button></div>'
   s=s.replace('<main id="main-content">','<main id="main-content">\n'+crumb,1)
  if '"@type":"WebApplication"' not in s and '"@type": "WebApplication"' not in s:
   app={'@context':'https://schema.org','@type':'WebApplication','name':tool['name'],'url':BASE+tool['url'],'description':tool['description'],'applicationCategory':'UtilitiesApplication','operatingSystem':'Any','browserRequirements':'Requires JavaScript and a modern web browser','offers':{'@type':'Offer','price':'0','priceCurrency':'USD'}}
   s=s.replace('</head>','<script type="application/ld+json">'+json.dumps(app,ensure_ascii=False)+'</script>\n</head>')
 # Match canonical and internal links to the extensionless URLs already served in production.
 def clean_url(url):
  url=re.sub(r'/index\.html(?=$|[?#])','/',url)
  if url.startswith('index.html'):url='./'+url[len('index.html'):]
  return re.sub(r'\.html(?=$|[?#])','',url)
 s=re.sub(r'href="([^"]+)"',lambda m:'href="'+clean_url(m[1])+'"',s)
 s=re.sub(r'https://toolsnowpro\.com[^"\s<>]*',lambda m:clean_url(m[0]),s)
 p.write_text(s)
# Only canonical, indexable URLs belong in the sitemap. Preserve earlier substantive dates.
NS={'sm':'http://www.sitemaps.org/schemas/sitemap/0.9'};old={}
try:
 for u in ET.parse(ROOT/'sitemap.xml').getroot():
  loc=u.find('sm:loc',NS);last=u.find('sm:lastmod',NS)
  if loc is not None:old[re.sub(r'\.html$','',loc.text)]=last.text if last is not None else None
except ET.ParseError:pass
urls=[]
for p in ROOT.rglob('*.html'):
 if '.git' in p.parts or p.name=='404.html' or p.name.startswith('namecheap-') or 'examples' in p.parts:continue
 s=p.read_text()
 if 'http-equiv="refresh"' in s or re.search(r'<meta[^>]+name="robots"[^>]+content="[^"]*noindex',s):continue
 c=re.search(r'<link[^>]+rel="canonical"[^>]+href="([^"]+)"',s)
 if c:
  url=c[1];substantive=p.name in ['index.html','json-formatter.html','color-picker.html','jpg-to-pdf.html','username-generator.html'] and p.parent.name in ['tools','toolsnowpro-website']
  date='2026-10-02' if substantive else old.get(url)
  modified=re.search(r'"dateModified"\s*:\s*"([^"]+)"',s)
  if modified:date=modified[1][:10]
  urls.append((url,date))
ET.register_namespace('',NS['sm']);root=ET.Element('{'+NS['sm']+'}urlset')
for url,date in sorted(set(urls)):
 u=ET.SubElement(root,'url');ET.SubElement(u,'loc').text=url
 if date:ET.SubElement(u,'lastmod').text=date
ET.indent(root,space='  ');ET.ElementTree(root).write(ROOT/'sitemap.xml',encoding='UTF-8',xml_declaration=True)
print(f'Updated site chrome; sitemap contains {len(set(urls))} canonical pages.')
