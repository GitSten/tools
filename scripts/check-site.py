"""Check local links, canonical routes, structured data and content landmarks."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import re,json,xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parent.parent
BASE='https://toolsnowpro.com'
class Parser(HTMLParser):
 def __init__(self):super().__init__();self.ids=[];self.links=[];self.h1=0;self.main=0
 def handle_starttag(self,tag,attrs):
  d=dict(attrs)
  if 'id' in d:self.ids.append(d['id'])
  if tag=='h1':self.h1+=1
  if tag=='main':self.main+=1
  self.links.extend(d[k] for k in ['href','src'] if k in d)
def local_file(url,source):
 parsed=urlsplit(url)
 if parsed.scheme or parsed.netloc:
  if parsed.netloc!='toolsnowpro.com':return None
  path=ROOT/unquote(parsed.path).lstrip('/')
 else:path=ROOT/unquote(parsed.path).lstrip('/') if parsed.path.startswith('/') else source.parent/unquote(parsed.path) if parsed.path else source
 if path.is_dir():path=path/'index.html'
 if not path.exists() and not path.suffix and path.with_suffix('.html').exists():path=path.with_suffix('.html')
 return path
errors=[];count=0;canonicals={}
for p in ROOT.rglob('*.html'):
 if '.git' in p.parts:continue
 s=p.read_text();doc=Parser();doc.feed(s)
 if len(doc.ids)!=len(set(doc.ids)):errors.append(f'{p.relative_to(ROOT)}: duplicate IDs')
 if not p.name.startswith('namecheap-') and 'http-equiv="refresh"' not in s:
  count+=1
  if doc.h1!=1:errors.append(f'{p.relative_to(ROOT)}: expected 1 h1, found {doc.h1}')
  if doc.main!=1:errors.append(f'{p.relative_to(ROOT)}: expected 1 main, found {doc.main}')
  if s.count('id="tool-search-dialog"')!=1:errors.append(f'{p.relative_to(ROOT)}: search dialog missing/duplicated')
 for link in doc.links:
  path=local_file(link,p)
  if path is None:continue
  if not path.exists():errors.append(f'{p.relative_to(ROOT)}: missing {link}')
  elif urlsplit(link).fragment and path.suffix=='.html':
   target=Parser();target.feed(path.read_text())
   if urlsplit(link).fragment not in target.ids:errors.append(f'{p.relative_to(ROOT)}: missing anchor {link}')
 for block in re.findall(r'<script type="application/ld\+json">(.*?)</script>',s,re.S):
  try:json.loads(block)
  except ValueError:errors.append(f'{p.relative_to(ROOT)}: invalid structured JSON')
 c=re.search(r'<link[^>]+rel="canonical"[^>]+href="([^"]+)"',s)
 if c and 'http-equiv="refresh"' not in s and not p.name.startswith('namecheap-'):
  if '.html' in c[1]:errors.append(f'{p.relative_to(ROOT)}: redirected canonical')
  if c[1] in canonicals:errors.append(f'{p.relative_to(ROOT)}: duplicate canonical {c[1]}')
  canonicals[c[1]]=p
ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
urls=[x.text for x in ET.parse(ROOT/'sitemap.xml').findall('s:url/s:loc',ns)]
if len(urls)!=len(set(urls)):errors.append('Duplicate sitemap URLs')
for url in urls:
 if url not in canonicals:errors.append('Sitemap URL does not match an indexable page: '+url)
 if '.html' in url:errors.append('Sitemap includes redirected URL: '+url)
tools=json.loads((ROOT/'data/tools.json').read_text())
if len({x['id'] for x in tools})!=len(tools):errors.append('Duplicate tool IDs')
for t in tools:
 if not local_file(t['url'],ROOT/'index.html').exists():errors.append('Missing catalog tool '+t['name'])
print(f'Checked {count} content pages, {len(urls)} sitemap URLs, and {len(tools)} tools.')
if errors:
 for error in errors:print('ERROR:',error)
 raise SystemExit(1)
print('Local links, anchors, IDs, landmarks, canonical URLs and structured data passed.')
