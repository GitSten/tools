"""Local preview with Cloudflare-style extensionless HTML routes."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit
import argparse, os
ROOT=Path(__file__).resolve().parent.parent
class Handler(SimpleHTTPRequestHandler):
 def send_head(self):
  parsed=urlsplit(self.path);route=parsed.path
  redirects={}
  for line in (ROOT/'_redirects').read_text().splitlines():
   parts=line.split()
   if len(parts)==3 and not line.lstrip().startswith('#'):redirects[parts[0]]=(parts[1],int(parts[2]))
  if route in redirects:
   dest,status=redirects[route];self.send_response(status);self.send_header('Location',dest);self.end_headers();return None
  if route.endswith('.html') and not route.startswith('/namecheap-'):
   dest=route[:-10]+'/' if route.endswith('/index.html') else route[:-5]
   self.send_response(307);self.send_header('Location',dest+('?' + parsed.query if parsed.query else ''));self.end_headers();return None
  file=Path(self.translate_path(route))
  if not file.exists() and not file.suffix and file.with_suffix('.html').is_file():self.path=route+'.html'+('?' + parsed.query if parsed.query else '')
  return super().send_head()
 def log_message(self,format,*args):pass
if __name__=='__main__':
 parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=8766);args=parser.parse_args();os.chdir(ROOT)
 print(f'Preview: http://127.0.0.1:{args.port}',flush=True)
 ThreadingHTTPServer(('127.0.0.1',args.port),Handler).serve_forever()
