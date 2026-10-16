import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join, resolve } from 'path';

const root = resolve('.');
const FORMATS = [
  { id: 'sentence', label: 'Sentence case' },
  { id: 'lower', label: 'lower case' },
  { id: 'upper', label: 'UPPER CASE' },
  { id: 'capitalized', label: 'Capitalized Case' },
  { id: 'title', label: 'Title Case' },
  { id: 'alt', label: 'aLtErNaTiNg cAsE' },
  { id: 'inverse', label: 'iNVERSE cAsE' },
  { id: 'camel', label: 'camelCase' },
  { id: 'pascal', label: 'PascalCase' },
  { id: 'snake', label: 'snake_case' },
  { id: 'kebab', label: 'kebab-case' }
];
const CODE_IDS = new Set(['camel', 'pascal', 'snake', 'kebab']);

const pages = [
  {
    slug: 'uppercase',
    id: 'upper',
    short: 'UPPER CASE',
    h1: 'Convert text to upper case',
    title: 'Upper Case Converter – Change Text to UPPERCASE | ToolsNowPro',
    description: 'Turn any text into UPPER CASE in your browser. Fix a caps-lock draft, make a short label, then switch it back to sentence case.',
    article: `
      <h2>What upper case does</h2>
      <p>Upper case makes every letter a capital. "please review this" becomes "PLEASE REVIEW THIS". Numbers, spaces, and punctuation stay as they are. Letters that are already capitals stay capitals.</p>
      <p>Use it for short labels, acronyms you want to emphasize, and warning text that is only a few words long. A full paragraph in capitals is harder to read, because the eye loses the usual shape of each word. If a message arrived in all capitals by accident, convert it to <a href="/text-tools/sentence-case/">sentence case</a> or <a href="/text-tools/lowercase/">lower case</a> instead of leaving it this way.</p>
      <h2>A caps-lock email, before and after</h2>
      <table>
        <tr><th>Step</th><th>Text</th></tr>
        <tr><td>Stuck caps lock</td><td>PLEASE SEND THE INVOICE TODAY.</td></tr>
        <tr><td>Upper case again</td><td>PLEASE SEND THE INVOICE TODAY.</td></tr>
        <tr><td>Then sentence case</td><td>Please send the invoice today.</td></tr>
      </table>
      <p>Clicking UPPER CASE on text that is already capitalized does not damage it. The useful follow-up is sentence case, which lowers the letters and restores a normal first capital. Proper names are not detected, so "MARIA" becomes "Maria" in sentence case only because it starts the sentence or a new word after you use Capitalized Case. Check names after you convert.</p>
      <h2>Where all capitals still help</h2>
      <ul>
        <li>Two or three words on a button, badge, or poster.</li>
        <li>Legal phrases that are customarily capitalized, such as a short "AS IS" label. Do not invent legal wording with this tool.</li>
        <li>An environment variable, after you have already made <a href="/text-tools/snake-case/">snake_case</a>. Convert to snake_case first, then click UPPER CASE to get NAMES_LIKE_THIS.</li>
      </ul>
      <p>The converter uses standard Unicode case mapping. It does not apply Turkish or other language-specific rules, so check dotted I and similar letters if the text is not English.</p>`
  },
  {
    slug: 'lowercase',
    id: 'lower',
    short: 'lower case',
    h1: 'Convert text to lower case',
    title: 'Lower Case Converter – Uncapitalize Text Online | ToolsNowPro',
    description: 'Change UPPERCASE text to lower case without retyping. Useful for usernames, CSS classes, URL slugs, and caps-lock mistakes.',
    article: `
      <h2>What lower case does</h2>
      <p>Lower case uncapitalizes every letter. "Reset The Password" becomes "reset the password". It is the fastest way to undo a caps-lock paste when you do not need sentence capitals yet.</p>
      <p>People search for this when a form, username, or file name must be lowercase. CSS classes, URL paths, package names, and many database keys are written entirely in lower case. A single capital letter can make a username or a class name fail a check that compares text exactly.</p>
      <h2>Before and after</h2>
      <table>
        <tr><th>You pasted</th><th>Lower case</th></tr>
        <tr><td>New-York_Office</td><td>new-york_office</td></tr>
        <tr><td>WELCOME BACK</td><td>welcome back</td></tr>
        <tr><td>Already lower</td><td>already lower</td></tr>
      </table>
      <p>Hyphens and underscores are kept. If you wanted those separators normalized, use <a href="/text-tools/kebab-case/">kebab-case</a> or <a href="/text-tools/snake-case/">snake_case</a> after this step. For a normal sentence, <a href="/text-tools/sentence-case/">sentence case</a> is the better second click, because lower case removes the capital at the start of the sentence too.</p>
      <h2>What this will not fix</h2>
      <ul>
        <li>Spelling. The letters change case only.</li>
        <li>Language-specific pairs such as Turkish İ. The tool uses Unicode's default mapping, not a locale.</li>
        <li>Meaning. A lowercased brand name may violate that brand's writing rules. Check the name before you publish it.</li>
      </ul>`
  },
  {
    slug: 'sentence-case',
    id: 'sentence',
    short: 'Sentence case',
    h1: 'Convert text to sentence case',
    title: 'Sentence Case Converter – Fix ALL CAPS Text | ToolsNowPro',
    description: 'Turn all-caps or messy text into sentence case. The first letter of each sentence becomes a capital. Everything else is lowercase.',
    article: `
      <h2>What sentence case does</h2>
      <p>Sentence case capitalizes the first letter of the text and the first letter after a period, question mark, or exclamation point. The rest becomes lower case. A line break is also treated as a place to start again, which helps when you paste a list of one-line notes.</p>
      <p>This is the format for email, chat, product descriptions, and most interface labels. If someone wrote the whole message in capitals, sentence case is usually the conversion you want. <a href="/text-tools/uppercase/">Upper case</a> is the opposite direction.</p>
      <h2>Before and after</h2>
      <table>
        <tr><th>Input</th><th>Sentence case</th></tr>
        <tr><td>PLEASE SEND THE FILE. I NEED IT TODAY!</td><td>Please send the file. I need it today!</td></tr>
        <tr><td>hello world. this is a test.</td><td>Hello world. This is a test.</td></tr>
      </table>
      <p>The tool lowercases the whole string first, then restores those starting capitals. That means a proper name in the middle of a sentence is lowercased: "I met MARIA in PARIS" becomes "I met maria in paris." Put the capitals back on names and places after you convert. The tool does not have a dictionary of names.</p>
      <h2>Sentence case or title case</h2>
      <p><a href="/text-tools/title-case/">Title case</a> capitalizes most words and is what many headlines use. Sentence case capitalizes the sentence, not every word. Modern product interfaces usually prefer sentence case for buttons and headings because it reads like ordinary language. Use title case when a style guide, a book title, or a newspaper headline asks for it.</p>`
  },
  {
    slug: 'title-case',
    id: 'title',
    short: 'Title Case',
    h1: 'Convert text to title case',
    title: 'Title Case Converter – Capitalize Headlines Online | ToolsNowPro',
    description: 'Capitalize headline words and leave short words such as a, the, and of lowercase, unless they are first or last.',
    article: `
      <h2>What title case does</h2>
      <p>Title case capitalizes the main words of a heading. Short words stay lowercase unless they are the first or last word: a, an, the, and, but, or, nor, for, so, yet, at, by, in, of, on, to, up, as, vs, from, with, into, over, than, via, and per. "a guide to the new api" becomes "A Guide to the New Api".</p>
      <p>That last word shows the limit. "Api" is capitalized like any other word. The converter does not know that API is an acronym, and it does not look up the Chicago Manual of Style or AP for exceptions. It follows one consistent short-word list so you can see exactly what changed.</p>
      <h2>Title case compared with capitalized case</h2>
      <table>
        <tr><th>Input</th><th>Title case</th><th>Capitalized case</th></tr>
        <tr><td>how to read a book</td><td>How to Read a Book</td><td>How To Read A Book</td></tr>
        <tr><td>notes from the editor</td><td>Notes from the Editor</td><td>Notes From The Editor</td></tr>
      </table>
      <p><a href="/text-tools/capitalized-case/">Capitalized case</a> capitalizes every word, including "a" and "the". Title case is the one to use for articles, videos, and chapter titles. Capitalized case fits name lists and places where every word should look equal.</p>
      <p>After converting, scan acronyms and names. You may want "API", "iPhone", or "macOS" adjusted by hand. <a href="/text-tools/sentence-case/">Sentence case</a> is the other common headline style, especially in product design.</p>`
  },
  {
    slug: 'capitalized-case',
    id: 'capitalized',
    short: 'Capitalized Case',
    h1: 'Capitalize each word',
    title: 'Capitalized Case Converter – Capitalize Every Word | ToolsNowPro',
    description: 'Capitalize the first letter of every word and lowercase the rest. Different from title case, which keeps short words small.',
    article: `
      <h2>What capitalized case does</h2>
      <p>Capitalized case puts a capital on the first letter of every word and lowercases the remaining letters. "new york city" becomes "New York City". "a" and "the" are capitalized too. Nothing in the word list is skipped.</p>
      <p>Choose this for personal names you typed in a hurry, city lists, and spreadsheet columns where every cell should look the same. Do not use it for a book title if your style guide says short words stay small. That format is <a href="/text-tools/title-case/">title case</a>.</p>
      <h2>Before and after</h2>
      <table>
        <tr><th>Input</th><th>Capitalized case</th></tr>
        <tr><td>mary ann smith</td><td>Mary Ann Smith</td></tr>
        <tr><td>THE NEW YORK OFFICE</td><td>The New York Office</td></tr>
        <tr><td>e-mail address</td><td>E-mail Address</td></tr>
      </table>
      <p>Words are split on spaces. A hyphen stays inside the token, so "e-mail" becomes "E-mail", not "E-Mail". If you need a programming identifier, switch to <a href="/text-tools/camel-case/">camelCase</a> or <a href="/text-tools/pascal-case/">PascalCase</a> instead. Those remove the spaces.</p>
      <p>The tool cannot tell a surname from an ordinary word. "van" and "de" in a name may need to stay lowercase. Fix those after the conversion.</p>`
  },
  {
    slug: 'camel-case',
    id: 'camel',
    short: 'camelCase',
    h1: 'Convert text to camelCase',
    title: 'camelCase Converter – Make JavaScript Variable Names | ToolsNowPro',
    description: 'Turn a phrase into camelCase for JavaScript variables and functions. The first word stays lowercase. Spaces and punctuation are removed.',
    article: `
      <h2>What camelCase does</h2>
      <p>camelCase joins words and capitalizes each word after the first. "user login count" becomes "userLoginCount". Spaces, hyphens, and underscores are removed. A phrase that is already PascalCase is split on the capital letters first, so "UserLoginCount" also becomes "userLoginCount".</p>
      <p>JavaScript, Java, and Swift use camelCase for variables and functions. Class names usually use <a href="/text-tools/pascal-case/">PascalCase</a> instead, with the first word capitalized too.</p>
      <h2>Before and after</h2>
      <table>
        <tr><th>Input</th><th>camelCase</th></tr>
        <tr><td>get user name</td><td>getUserName</td></tr>
        <tr><td>user-login-count</td><td>userLoginCount</td></tr>
        <tr><td>XML Http Request</td><td>xmlHttpRequest</td></tr>
      </table>
      <p>Acronyms are only as smart as the spaces you provide. "XMLHttpRequest" without spaces is one word and becomes "xmlhttprequest". Type "XML Http Request" if you want the capitals kept at word boundaries.</p>
      <p>A name cannot start with a number in most languages. If the phrase starts with a digit, rename it before you paste it into code. For Python and environment names, use <a href="/text-tools/snake-case/">snake_case</a>. For CSS classes and URL slugs, use <a href="/text-tools/kebab-case/">kebab-case</a>.</p>`
  },
  {
    slug: 'pascal-case',
    id: 'pascal',
    short: 'PascalCase',
    h1: 'Convert text to PascalCase',
    title: 'PascalCase Converter – Class and Component Names | ToolsNowPro',
    description: 'Join words into PascalCase for class names, React components, and types. Every word starts with a capital. Separators are removed.',
    article: `
      <h2>What PascalCase does</h2>
      <p>PascalCase capitalizes every word and removes the separators. "login form" becomes "LoginForm". It is camelCase with a capital first letter. Use it for classes, React components, and type names. Use <a href="/text-tools/camel-case/">camelCase</a> for variables and functions.</p>
      <h2>Before and after</h2>
      <table>
        <tr><th>Input</th><th>PascalCase</th></tr>
        <tr><td>user profile card</td><td>UserProfileCard</td></tr>
        <tr><td>http response</td><td>HttpResponse</td></tr>
        <tr><td>already_snake_case</td><td>AlreadySnakeCase</td></tr>
      </table>
      <p>The converter splits on spaces, hyphens, underscores, and on a lowercase letter followed by a capital. "alreadySnakeCase" becomes "AlreadySnakeCase". A block of capitals without spaces is one word: "HTTPResponse" stays a single token and becomes "Httpresponse" after the first letter is capitalized and the rest is lowercased inside that word. Spell the words apart if you need "HttpResponse".</p>
      <p>PascalCase is a code format, not a headline format. Readers of a blog post should see <a href="/text-tools/title-case/">title case</a> or <a href="/text-tools/sentence-case/">sentence case</a>, which keep the spaces.</p>`
  },
  {
    slug: 'snake-case',
    id: 'snake',
    short: 'snake_case',
    h1: 'Convert text to snake_case',
    title: 'snake_case Converter – Underscore Names for Code | ToolsNowPro',
    description: 'Turn a phrase into snake_case with underscores. Use it for Python names, database columns, and file names, then uppercase it for environment variables.',
    article: `
      <h2>What snake_case does</h2>
      <p>snake_case separates words with underscores and writes every letter in lower case. "User Login Count" becomes "user_login_count". Hyphens and spaces become underscores. camelCase and PascalCase are split before the underscores are added, so "userLoginCount" becomes "user_login_count".</p>
      <p>Python variables, many database columns, and a lot of file names use this pattern. Ruby and PHP use it widely too.</p>
      <h2>Before and after</h2>
      <table>
        <tr><th>Input</th><th>snake_case</th></tr>
        <tr><td>Last Login At</td><td>last_login_at</td></tr>
        <tr><td>user-login-count</td><td>user_login_count</td></tr>
        <tr><td>getHttpResponse</td><td>get_http_response</td></tr>
      </table>
      <p>Environment variables are the same shape in upper case: LAST_LOGIN_AT. Make snake_case first, then open <a href="/text-tools/uppercase/">UPPER CASE</a> and convert the result. Doing it in that order keeps the underscores.</p>
      <p>If the destination is a URL or a CSS class, you usually want hyphens instead. That format is <a href="/text-tools/kebab-case/">kebab-case</a>. If the destination is a JavaScript variable, use <a href="/text-tools/camel-case/">camelCase</a>.</p>`
  },
  {
    slug: 'kebab-case',
    id: 'kebab',
    short: 'kebab-case',
    h1: 'Convert text to kebab-case',
    title: 'kebab-case Converter – Hyphenated Slugs and CSS Classes | ToolsNowPro',
    description: 'Turn a title into kebab-case for URLs, CSS classes, and HTML attributes. Words are lowercase and separated by hyphens.',
    article: `
      <h2>What kebab-case does</h2>
      <p>kebab-case lowercases the words and puts a hyphen between them. "Spring Sale Landing Page" becomes "spring-sale-landing-page". Spaces and underscores become hyphens. camelCase is split first, so "springSalePage" becomes "spring-sale-page".</p>
      <p>Use it for URL slugs, CSS class names, and HTML data attributes. A slug made this way is predictable: readers and analytics see the same words that were in the title, without capitals or spaces that have to be encoded.</p>
      <h2>Before and after</h2>
      <table>
        <tr><th>Input</th><th>kebab-case</th></tr>
        <tr><td>How to Store a PDF</td><td>how-to-store-a-pdf</td></tr>
        <tr><td>Nav_Item Active</td><td>nav-item-active</td></tr>
        <tr><td>backgroundColor</td><td>background-color</td></tr>
      </table>
      <p>The tool does not remove stop words. "How to Store a PDF" keeps "to" and "a". Delete words you do not want in the slug before you convert, or edit them out of the result. It also does not check whether that URL already exists.</p>
      <p>Python and database columns more often use <a href="/text-tools/snake-case/">snake_case</a>. JavaScript variables use <a href="/text-tools/camel-case/">camelCase</a>. A headline that people will read as a sentence should stay in <a href="/text-tools/title-case/">title case</a> or <a href="/text-tools/sentence-case/">sentence case</a>, with the spaces intact.</p>`
  },
  {
    slug: 'alternating-case',
    id: 'alt',
    short: 'Alternating case',
    h1: 'Convert text to alternating case',
    title: 'Alternating Case Converter – aLtErNaTiNg cAsE | ToolsNowPro',
    description: 'Alternate capital and lowercase letters for a stylistic look. Punctuation and spaces stay put, so the pattern follows the letters only.',
    article: `
      <h2>What alternating case does</h2>
      <p>Alternating case walks through the letters and flips between upper and lower case. "hello there" becomes "HeLlO tHeRe". Spaces, numbers, and punctuation do not take a turn, so the pattern does not drift when the sentence has commas.</p>
      <p>This is a style effect for a meme, a username experiment, or a single emphasized word. It is a poor choice for an email, a document, or anything you want people to read quickly. If the text was a caps-lock accident, use <a href="/text-tools/sentence-case/">sentence case</a> instead.</p>
      <h2>Before and after</h2>
      <table>
        <tr><th>Input</th><th>Alternating case</th></tr>
        <tr><td>hello there</td><td>HeLlO tHeRe</td></tr>
        <tr><td>stop, please.</td><td>StOp, PlEaSe.</td></tr>
      </table>
      <p><a href="/text-tools/inverse-case/">Inverse case</a> is different. Inverse case swaps whatever case each letter already has, so "Hello" becomes "hELLO". Alternating case ignores the original case and starts again from a capital on the first letter.</p>
      <p>Running alternating case twice does not restore the original. The second pass starts from the already alternating letters and flips them again. Keep a copy of the source text if you might want it back. The box converts what is currently in it.</p>`
  },
  {
    slug: 'inverse-case',
    id: 'inverse',
    short: 'Inverse case',
    h1: 'Invert the case of each letter',
    title: 'Inverse Case Converter – Swap Upper and Lower Case | ToolsNowPro',
    description: 'Swap the case of every letter. Capitals become lowercase and lowercase letters become capitals. Numbers and punctuation stay the same.',
    article: `
      <h2>What inverse case does</h2>
      <p>Inverse case flips each letter. A capital becomes lowercase, and a lowercase letter becomes a capital. "Hello World" becomes "hELLO wORLD". Digits and punctuation are unchanged, because they have no case.</p>
      <p>It is useful when text was typed with the case key reversed, and as a one-off visual style. It is not a substitute for <a href="/text-tools/sentence-case/">sentence case</a> or <a href="/text-tools/lowercase/">lower case</a> when you simply want readable prose.</p>
      <h2>Before and after</h2>
      <table>
        <tr><th>Input</th><th>Inverse case</th></tr>
        <tr><td>Hello World</td><td>hELLO wORLD</td></tr>
        <tr><td>MIXED Case 123</td><td>mixed cASE 123</td></tr>
      </table>
      <p>Because the flip depends on the current letter, clicking inverse case a second time restores the text that was in the box. That is different from <a href="/text-tools/alternating-case/">alternating case</a>, which always restarts its own pattern and does not undo itself cleanly.</p>
      <p>Unicode case mapping still applies. A letter with no upper or lower partner stays as it is. Language-specific pairs, including Turkish İ, follow Unicode's default mapping rather than a locale you can select here.</p>`
  }
];

function buttons(activeId) {
  const html = (format) => {
    const on = format.id === activeId;
    return `<button type="button" class="case-btn${on ? ' active' : ''}" data-case="${format.id}" aria-pressed="${on ? 'true' : 'false'}">${format.label}</button>`;
  };
  const ordered = (list) => {
    const active = list.find(format => format.id === activeId);
    const rest = list.filter(format => format.id !== activeId);
    return (active ? [active, ...rest] : list).map(html).join('');
  };
  const letter = FORMATS.filter(format => !CODE_IDS.has(format.id));
  const code = FORMATS.filter(format => CODE_IDS.has(format.id));
  return `<p class="case-label">Letter case</p><div class="case-btns" role="group" aria-label="Letter case">${ordered(letter)}</div><p class="case-label">Code formats</p><div class="case-btns" role="group" aria-label="Code formats">${ordered(code)}</div>`;
}

function formatLinks(currentSlug) {
  const main = `<a href="/text-tools/"${currentSlug ? '' : ' aria-current="page"'}>All cases</a>`;
  const rest = pages.map(page => `<a href="/text-tools/${page.slug}/"${page.slug === currentSlug ? ' aria-current="page"' : ''}>${page.short}</a>`).join('');
  return `<nav class="case-links" aria-label="Case formats">${main}${rest}</nav>`;
}

function tool(activeId) {
  return `<section class="case-tool" data-case-tool${activeId ? ` data-default-case="${activeId}"` : ''}>
<label class="sr-only" for="case-input">Text to convert</label>
<textarea id="case-input" class="case-input" data-case-input placeholder="Type or paste your text here" spellcheck="true"></textarea>
<div class="case-stats" aria-live="polite">
<span>Characters <b data-stat="chars">0</b></span>
<span>Words <b data-stat="words">0</b></span>
<span>Sentences <b data-stat="sentences">0</b></span>
<span>Lines <b data-stat="lines">0</b></span>
<span>Reading time <b data-stat="reading">0 sec</b></span>
</div>
<div class="case-actions">
<button type="button" class="btn-primary" data-case-copy>Copy</button>
<button type="button" class="btn-ghost" data-case-download>Download</button>
<button type="button" class="btn-ghost" data-case-clear>Clear</button>
<button type="button" class="btn-ghost" data-case-example>Load example</button>
</div>
${buttons(activeId)}
<p class="case-hint">Click a format to convert the text in the box. The text stays in this browser.</p>
</section>
<div class="ad-slot ad-banner" data-ad-region="after-tool"></div>`;
}

function shell({ title, description, canonical, h1, lede, crumb, activeId, article, faq }) {
  const faqJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebApplication', name: h1, url: canonical, applicationCategory: 'UtilityApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, description },
      { '@type': 'FAQPage', mainEntity: faq.map(item => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) }
    ]
  });
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:type" content="website">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="https://toolsnowpro.com/og-home.svg">
<meta name="google-adsense-account" content="ca-pub-7627794878922112">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/favicon-180.svg">
<meta name="theme-color" content="#0C1018">
<link rel="stylesheet" href="/shared.css">
<link rel="stylesheet" href="/css/case.css">
<script type="application/ld+json">${faqJson}</script>
<script src="/js/analytics.js" defer></script>
<script src="/js/site.js" defer></script>
<script src="/js/case-converter.js" defer></script>
</head>
<body data-tool-id="case">
<a class="skip-link" href="#main-content">Skip to content</a>
<header class="site-header"><div class="wrapper"><div class="header-inner">
<a href="/" class="logo" aria-label="ToolsNowPro home"><span class="logo-icon" aria-hidden="true">↗</span>ToolsNow<span class="logo-pro">Pro</span></a>
<nav class="site-nav" id="snav" aria-label="Main navigation"><a href="/#tools">All tools</a><a href="/qr-generator/">QR codes</a><a href="/tools/username-generator">Usernames</a><a href="/blog/">Guides</a></nav>
<div class="header-actions"><button type="button" class="site-search-button" data-open-search aria-label="Search tools"><span aria-hidden="true">⌕</span><span class="search-button-label">Find a tool</span><kbd aria-hidden="true">⌘ K</kbd></button><button type="button" class="nav-toggle" aria-controls="snav" aria-expanded="false" aria-label="Toggle navigation">☰</button></div>
</div></div></header>
<main id="main-content" class="case-page">
<div class="wrapper tool-breadcrumbs"><nav aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/?category=Text#tools">Text</a><span aria-hidden="true">/</span>${crumb}</nav><button type="button" class="save-tool-button" data-save-current aria-pressed="false" hidden>☆ Save tool</button></div>
<div class="wrapper">
<header class="case-hero"><h1>${h1}</h1><p>${lede}</p></header>
${tool(activeId)}
<article class="case-article prose">
${article}
<div class="ad-slot ad-banner" data-ad-region="content"></div>
<h2>Other formats</h2>
${formatLinks(activeId ? pages.find(page => page.id === activeId).slug : '')}
<h2>Questions</h2>
<div class="case-faq">
${faq.map(item => `<details><summary>${item.q}</summary><p>${item.a}</p></details>`).join('\n')}
</div>
<p>Need a count instead of a new case? Use the <a href="/text-tools/word-counter">word counter</a>. Need placeholder copy while you design? Use the <a href="/tools/lorem-ipsum-generator">lorem ipsum generator</a>.</p>
</article>
</div>
</main>
<footer class="site-footer"><div class="wrapper"><div class="footer-grid"><div class="footer-brand"><a href="/" class="logo"><span class="logo-icon" aria-hidden="true">↗</span>ToolsNow<span class="logo-pro">Pro</span></a><p>Small tools for everyday work.<br>Free to use. Built for your browser.</p></div><div><div class="footer-heading">Your toolkit</div><ul class="footer-links"><li><a href="/tools/json-formatter">JSON Formatter</a></li><li><a href="/tools/jpg-to-pdf">Images to PDF</a></li><li><a href="/tools/color-picker">Color & Contrast</a></li><li><a href="/qr-generator/">QR Code Generator</a></li><li><a href="/#tools">All 21 tools</a></li></ul></div><div><div class="footer-heading">Ideas & reference</div><ul class="footer-links"><li><a href="/tools/username-generator">Username Generator</a></li><li><a href="/gaming/">Gaming Usernames</a></li><li><a href="/tools/cheat-sheet-library">Cheat Sheets</a></li><li><a href="/blog/">Practical Guides</a></li></ul></div><div><div class="footer-heading">ToolsNowPro</div><ul class="footer-links"><li><a href="/about/">About</a></li><li><a href="/editorial/">Editorial Standards</a></li><li><a href="/about/#contact">Contact & Feedback</a></li><li><a href="/about/#privacy">Privacy</a></li><li><a href="/about/#terms">Terms</a></li></ul></div></div><div class="footer-bottom"><span>© 2026 ToolsNowPro · <button type="button" class="analytics-toggle" data-analytics-toggle aria-pressed="false">Analytics settings</button></span><span>Need a domain? <a href="https://namecheap.pxf.io/c/7408925/1632743/5618" rel="sponsored nofollow noopener" target="_blank">Search Namecheap ↗</a> <span class="affiliate-label">Affiliate link</span></span></div></div></footer>
<dialog class="tool-search-dialog" id="tool-search-dialog" aria-labelledby="search-dialog-title"><div class="search-dialog-header"><h2 id="search-dialog-title">Find your next tool</h2><button type="button" data-close-search class="dialog-close" aria-label="Close tool search">×</button></div><label class="sr-only" for="site-search-input">Search tool names and tasks</label><input type="search" id="site-search-input" placeholder="Try JSON, PDF, QR or username…" autocomplete="off"><p id="site-search-count" class="sr-only" role="status" aria-live="polite"></p><div id="site-search-results" class="site-search-results"></div><div class="search-dialog-footer"><a href="/#tools">Browse all tools →</a><span>Esc to close</span></div></dialog>
</body>
</html>
`;
}

const sharedFaq = [
  { q: 'Is the text uploaded?', a: 'No. Conversion happens in this browser. The text is not sent to a ToolsNowPro server.' },
  { q: 'Does the result cost anything?', a: 'No. You can copy or download it without an account.' },
  { q: 'Will proper names stay capitalized?', a: 'Only if the format you chose keeps them. Sentence case lowercases the sentence first, so check names afterward.' }
];

const mainArticle = `
<h2>Pick the case that matches the job</h2>
<p>Each button rewrites the text currently in the box. Start from your own wording, click the format, and copy the result. If you need a different format afterward, click another button. Code formats such as snake_case replace spaces, so convert to the code format before you send the result through UPPER CASE for an environment variable.</p>
<table>
<tr><th>Format</th><th>the quick brown fox</th><th>Use it for</th></tr>
<tr><td><a href="/text-tools/sentence-case/">Sentence case</a></td><td>The quick brown fox</td><td>Email, interface labels, normal prose</td></tr>
<tr><td><a href="/text-tools/lowercase/">lower case</a></td><td>the quick brown fox</td><td>Usernames, CSS, undoing caps lock</td></tr>
<tr><td><a href="/text-tools/uppercase/">UPPER CASE</a></td><td>THE QUICK BROWN FOX</td><td>Short labels, then environment names</td></tr>
<tr><td><a href="/text-tools/capitalized-case/">Capitalized Case</a></td><td>The Quick Brown Fox</td><td>Names and lists where every word takes a capital</td></tr>
<tr><td><a href="/text-tools/title-case/">Title Case</a></td><td>The Quick Brown Fox</td><td>Headlines. Short words stay small when the phrase has them</td></tr>
<tr><td><a href="/text-tools/camel-case/">camelCase</a></td><td>theQuickBrownFox</td><td>JavaScript variables and functions</td></tr>
<tr><td><a href="/text-tools/pascal-case/">PascalCase</a></td><td>TheQuickBrownFox</td><td>Classes and components</td></tr>
<tr><td><a href="/text-tools/snake-case/">snake_case</a></td><td>the_quick_brown_fox</td><td>Python, columns, file names</td></tr>
<tr><td><a href="/text-tools/kebab-case/">kebab-case</a></td><td>the-quick-brown-fox</td><td>URL slugs and CSS classes</td></tr>
<tr><td><a href="/text-tools/alternating-case/">aLtErNaTiNg cAsE</a></td><td>ThE qUiCk bRoWn fOx</td><td>A stylistic effect, not body text</td></tr>
<tr><td><a href="/text-tools/inverse-case/">iNVERSE cAsE</a></td><td>THE QUICK BROWN FOX</td><td>Swapping the case each letter already has</td></tr>
</table>
<h2>How the converter decides</h2>
<p>Letter formats change case and keep your spaces. Title case lowercases short words such as "a", "the", and "of" unless they are the first or last word. Capitalized case does not skip those words. Sentence case lowercases everything, then capitalizes the start of the text, the start of a line, and the first letter after . ! or ?</p>
<p>Code formats split words on spaces, hyphens, underscores, and on a change from a lowercase letter to a capital. "userLoginCount" can become user_login_count or user-login-count. A run of capitals without spaces is treated as one word, so type "XML Http Request" if you need those pieces kept apart.</p>
<p>Nothing here checks grammar, trademarks, or whether a username is available. The reading-time estimate is about 200 words a minute and is only a guide. For a fuller count, open the <a href="/text-tools/word-counter">word counter</a>.</p>
<h2>Limits worth knowing</h2>
<ul>
<li>Names and acronyms are not detected. "MARIA" in the middle of a sentence becomes "maria" in sentence case.</li>
<li>Case mapping follows Unicode's default rules, not Turkish or other locale rules.</li>
<li>The box converts its current contents. Copy the original first if you may want it unchanged.</li>
<li>Alternating case does not restore the previous text when you click it again. Inverse case does, because it flips every letter back.</li>
</ul>`;

const mainFaq = [
  ...sharedFaq,
  { q: 'Which button fixes an all-caps email?', a: 'Sentence case. It restores a capital at the start of each sentence and lowers the rest. Check names afterward.' },
  { q: 'What is the difference between title case and capitalized case?', a: 'Title case leaves short words such as a, the, and of in lowercase unless they start or end the text. Capitalized case capitalizes every word.' }
];

const mainHtml = shell({
  title: 'Convert Case – Upper Case, Lower Case, Title Case | ToolsNowPro',
  description: 'Paste text and convert it to upper case, lower case, sentence case, title case, or a code format. Free, instant, and processed in your browser.',
  canonical: 'https://toolsnowpro.com/text-tools/',
  h1: 'Convert upper case to lower case',
  lede: 'Paste the text and choose a format: sentence case, lower case, UPPER CASE, title case, or a code name. Nothing is uploaded.',
  crumb: '<span>Convert case</span>',
  activeId: '',
  article: mainArticle,
  faq: mainFaq
});

writeFileSync(join(root, 'text-tools/index.html'), mainHtml);

for (const page of pages) {
  const html = shell({
    title: page.title,
    description: page.description,
    canonical: `https://toolsnowpro.com/text-tools/${page.slug}/`,
    h1: page.h1,
    lede: page.description,
    crumb: `<a href="/text-tools/">Convert case</a><span aria-hidden="true">/</span><span>${page.short}</span>`,
    activeId: page.id,
    article: page.article,
    faq: [
      ...sharedFaq,
      { q: `When should I use ${page.short}?`, a: page.description }
    ]
  });
  const file = join(root, 'text-tools', page.slug, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

console.log(`Wrote text-tools/index.html and ${pages.length} case pages.`);
