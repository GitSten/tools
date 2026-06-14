# ToolsNowPro

Free online tools: QR Generator, Text Case Converter, Word Counter, Password Generator, Image Converter, Username Generator.

**Live site:** https://toolsnowpro.com

---

## Deploy via Git + Cloudflare Pages

### 1. Push to GitHub

```bash
# First time setup
git init
git add .
git commit -m "Initial deploy"
git branch -M main
git remote add origin https://github.com/SINUKONTO/toolsnowpro.git
git push -u origin main
```

### 2. Connect to Cloudflare Pages

1. Mine → **pages.cloudflare.com**
2. "Create a project" → "Connect to Git"
3. Vali oma GitHub repo
4. Build settings:
   - **Framework preset:** `None`
   - **Build command:** *(tühi — jäta tühjaks)*
   - **Build output directory:** `/` *(üks kaldkriips)*
5. "Save and Deploy"

### 3. Lisa custom domain

1. Cloudflare Pages → sinu projekt → "Custom domains"
2. "Set up a custom domain" → sisesta `toolsnowpro.com`
3. Järgi DNS seadistuse juhiseid

---

## Kuidas muuta sisu

```bash
# Tee muudatused failides, siis:
git add .
git commit -m "Uuenda QR generaatori teksti"
git push
```

Cloudflare deploy käivitub automaatselt ~30 sekundiga.

---

## Seadista Google Analytics

Asenda **kõigis HTML failides** `G-XXXXXXXXXX` oma real Measurement ID-ga:

```bash
# Mac/Linux:
find . -name "*.html" -exec sed -i '' 's/G-XXXXXXXXXX/G-SINUNUMBER/g' {} +

# Windows (PowerShell):
Get-ChildItem -Recurse -Filter "*.html" | ForEach-Object {
  (Get-Content $_.FullName) -replace 'G-XXXXXXXXXX', 'G-SINUNUMBER' | Set-Content $_.FullName
}
```

Seejärel: `git add . && git commit -m "Lisa GA ID" && git push`

---

## Seadista AdSense

Asenda `ca-pub-XXXX` oma AdSense Publisher ID-ga:

```bash
# Mac/Linux:
find . -name "*.html" -exec sed -i '' 's/ca-pub-XXXX/ca-pub-SINUNUMBER/g' {} +
```

---

## Struktuuri ülevaade

```
/
├── index.html                  ← Avaleht (tool hub)
├── qr-generator/index.html     ← QR generaator (peamine SEO leht)
├── text-tools/index.html       ← Teksti case converter
├── text-tools/word-counter.html ← Sõnaloendur
├── image-converter/index.html  ← Pildikonverter
├── tools/password-generator.html ← Parooligenraator
├── gaming/index.html           ← Username generator
├── blog/                       ← 25 blogiartiklit
├── shared.css                  ← Globaalne CSS
├── sitemap.xml                 ← Google Search Console jaoks
├── llms.txt                    ← AI crawlerite jaoks
├── robots.txt
├── 404.html                    ← 404 leht (Cloudflare servib automaatselt)
└── wrangler.toml               ← Cloudflare Pages konfiguratsioon
```
