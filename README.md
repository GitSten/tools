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

## Kontaktivormi aktiveerimine

Vorm kasutab [Formspree AJAX saatmist](https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax/).

1. Loo Formspree vorm ja kinnita sõnumeid vastu võttev e-posti aadress.
2. Määra `about/index.html` vormi `data-endpoint` väärtuseks oma vormi URL kujul `https://formspree.io/f/…`.
3. Avalda muudatus ja saada üks mittetundlik kontrollsõnum. Kontrolli nii teenuse vastust kui ka sõnumi saabumist postkasti.

Tühja või sobimatu endpoint'iga on saatmisnupp keelatud ja leht ütleb, et vorm pole saadaval. Edukat teadet näidatakse ainult pärast Formspree HTTP-edukust ja JSON-vastust `ok: true`. Vea korral säilivad väljad. Teenuse kinnitatud vastus ei tõenda postkasti kohaletoimetamist. Avalikku HTML-i ei lisata API-võtmeid.

About-lehe avaliku haldaja nimi tuleb lisada omaniku kinnitatud andmete põhjal. Projekti failides sellist identiteeti ei olnud.

## Sisuparanduste kontroll (2026-10-01)

Chrome'i brauseris kontrolliti 66 muudetud HTML-lehe skriptide käivitumist, JSON-i ja värvikoodi näiteid, FAQ avamist ilma JavaScriptita, näidisnimede kopeerimist klaviatuuriga ning kontaktivormi viit olekut (seadistamata, HTTP-viga, võrguviga, kinnitamata vastus, kinnitatud vastus). Kontaktiteenuse vastused olid simuleeritud; päris postkasti saatmist pole kontrollitud. Kuue põhilehe paigutus kontrolliti ka 390 px laiusega.

PDF-juhendi näidisfailid asuvad `blog/examples/` ja päris tööriista kuvatõmmised `blog/images/`. Näidis-PDF-id loodi tööriista enda allalaadimisfunktsiooniga. Failide suurused ja PDF-i lehe/pildi mõõtmed on kontrollitud; mõõdetud tulemused ja piirangud on juhendis.

QR-generaatori URL-väljund dekodeeriti eraldi QR-lugejaga tagasi algseks URL-iks. Vigane duplikaatleht `/tools/qr-generator.html` suunab nüüd toimivale `/qr-generator/` lehele.
