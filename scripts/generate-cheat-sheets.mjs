import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join, resolve } from 'path';

const root = resolve('.');
const toolsDir = join(root, 'tools');

const sheets = [
  {
    slug: 'python-cheat-sheet',
    title: 'Python Cheat Sheet',
    category: 'Programming',
    badge: '🐍 Python',
    intro: 'A practical Python cheat sheet for syntax, data structures, files, exceptions, and everyday workflows.',
    metaTitle: 'Python Cheat Sheet – Syntax, Data Types, Files, Venv & More | ToolsNowPro',
    metaDescription: 'Python cheat sheet with syntax, data types, lists, dictionaries, loops, functions, files, exceptions, virtualenv and common commands.',
    quick: ['Syntax basics', 'Data structures', 'Functions and classes', 'Files, pip and venv'],
    sections: [
      {
        title: 'Basics and output',
        code: `print("Hello, world!")
name = "Alex"
age = 27
is_admin = True

if age >= 18:
    print("Adult")
else:
    print("Minor")`
      },
      {
        title: 'Data types',
        code: `name = "Alex"      # str
age = 27           # int
price = 12.5       # float
active = True      # bool
nothing = None     # NoneType`
      },
      {
        title: 'Lists, tuples, sets and dicts',
        code: `items = ["a", "b", "c"]
items.append("d")
first = items[0]

coords = (10, 20)
unique = {1, 2, 2, 3}

user = {"name": "Alex", "role": "admin"}
role = user.get("role", "guest")
user["active"] = True`
      },
      {
        title: 'Loops and comprehensions',
        code: `for item in items:
    print(item)

for index, item in enumerate(items, start=1):
    print(index, item)

squares = [n * n for n in range(5)]
evens = [n for n in range(10) if n % 2 == 0]`
      },
      {
        title: 'Functions and imports',
        code: `def greet(name, title="Mr/Ms"):
    return f"Hi, {title} {name}!"

from pathlib import Path
from datetime import datetime

print(Path("notes.txt").exists())
print(datetime.now())`
      },
      {
        title: 'Exceptions',
        code: `try:
    value = int(user_input)
except ValueError:
    value = 0
finally:
    print("Done")

assert value >= 0, "Value must be non-negative"
raise ValueError("Invalid input")`
      },
      {
        title: 'Classes and dataclasses',
        code: `class Person:
    def __init__(self, name, age=0):
        self.name = name
        self.age = age

    def greet(self):
        return f"Hi, I'm {self.name}"

from dataclasses import dataclass

@dataclass
class Product:
    name: str
    price: float`
      },
      {
        title: 'Files and JSON',
        code: `with open("notes.txt", "r", encoding="utf-8") as f:
    content = f.read()

import json
data = {"name": "Alex", "active": True}
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)

with open("data.json", "r", encoding="utf-8") as f:
    loaded = json.load(f)`
      },
      {
        title: 'Venv and pip',
        code: `python -m venv .venv
source .venv/bin/activate   # macOS/Linux
.venv\\Scripts\\activate     # Windows

python -m pip install --upgrade pip
pip install requests
pip freeze > requirements.txt`
      },
      {
        title: 'Run and debug',
        code: `python app.py
python -m http.server 8000
python -m pip list
python -m pip show requests`
      }
    ],
    related: ['javascript-cheat-sheet', 'sql-cheat-sheet', 'git-cheat-sheet']
  },
  {
    slug: 'javascript-cheat-sheet',
    title: 'JavaScript Cheat Sheet',
    category: 'Programming',
    badge: '🟨 JavaScript',
    intro: 'JavaScript shortcuts for variables, arrays, DOM work, async code, and fetch requests.',
    metaTitle: 'JavaScript Cheat Sheet – Arrays, DOM, Async/Await & More | ToolsNowPro',
    metaDescription: 'JavaScript cheat sheet covering const/let, arrays, DOM, async/await, fetch, and useful snippets.',
    quick: ['const vs let', 'Array methods', 'DOM basics', 'Async / await'],
    sections: [
      {
        title: 'Variables and functions',
        code: `const name = "Alex";
let count = 0;

function greet(user) {
  return \`Hi, \${user}\`;
}

const sum = (a, b) => a + b;`
      },
      {
        title: 'Arrays',
        code: `const nums = [1, 2, 3];
nums.push(4);
nums.map(n => n * 2);
nums.filter(n => n > 2);
nums.find(n => n === 3);`
      },
      {
        title: 'DOM and events',
        code: `const btn = document.querySelector("#save");
btn.addEventListener("click", () => {
  document.body.classList.toggle("saved");
});

document.getElementById("title").textContent = "Updated";`
      },
      {
        title: 'Async and fetch',
        code: `async function loadData() {
  const res = await fetch("/api/data");
  const data = await res.json();
  console.log(data);
}`
      },
      {
        title: 'Objects and storage',
        code: `const user = { name: "Alex", role: "admin" };
const { name, role } = user;
const copy = { ...user, active: true };

localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme");
console.log(theme);`
      }
    ],
    related: ['python-cheat-sheet', 'regex-cheat-sheet', 'git-cheat-sheet']
  },
  {
    slug: 'sql-cheat-sheet',
    title: 'SQL Cheat Sheet',
    category: 'Programming',
    badge: '🗄 SQL',
    intro: 'Common SQL patterns for selecting, filtering, joining, grouping and updating rows.',
    metaTitle: 'SQL Cheat Sheet – SELECT, JOIN, GROUP BY & More | ToolsNowPro',
    metaDescription: 'SQL cheat sheet with SELECT, WHERE, JOIN, GROUP BY, INSERT, UPDATE, DELETE, and indexes.',
    quick: ['SELECT and WHERE', 'JOIN types', 'GROUP BY + aggregates', 'INSERT / UPDATE / DELETE'],
    sections: [
      {
        title: 'Select and filter',
        code: `SELECT id, name
FROM users
WHERE active = 1
ORDER BY created_at DESC
LIMIT 20;`
      },
      {
        title: 'Join tables',
        code: `SELECT o.id, c.name
FROM orders o
JOIN customers c ON c.id = o.customer_id
LEFT JOIN coupons cp ON cp.id = o.coupon_id;`
      },
      {
        title: 'Group and aggregate',
        code: `SELECT category, COUNT(*) AS total, AVG(price) AS avg_price
FROM products
GROUP BY category
HAVING COUNT(*) > 5;`
      },
      {
        title: 'Write data',
        code: `INSERT INTO users (name, email) VALUES ('Alex', 'a@example.com');
UPDATE users SET active = 0 WHERE last_login < '2025-01-01';
DELETE FROM users WHERE id = 10;`
      },
      {
        title: 'CTEs and transactions',
        code: `WITH recent_orders AS (
  SELECT customer_id, total
  FROM orders
  WHERE created_at >= '2025-01-01'
)
SELECT customer_id, SUM(total) AS revenue
FROM recent_orders
GROUP BY customer_id;

BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;`
      }
    ],
    related: ['python-cheat-sheet', 'bash-linux-cheat-sheet', 'excel-formulas-cheat-sheet']
  },
  {
    slug: 'bash-linux-cheat-sheet',
    title: 'Bash / Linux Commands Cheat Sheet',
    category: 'Dev Tools',
    badge: '⌨ Bash',
    intro: 'Terminal basics for navigating files, searching text, permissions and processes.',
    metaTitle: 'Bash / Linux Commands Cheat Sheet – Terminal Basics | ToolsNowPro',
    metaDescription: 'Bash and Linux commands cheat sheet with pwd, ls, cd, grep, find, chmod, ps, and piping basics.',
    quick: ['Navigation', 'Search files', 'Permissions', 'Processes and pipes'],
    sections: [
      {
        title: 'Navigation',
        code: `pwd
ls -la
cd /path/to/project
mkdir new-folder
touch notes.txt`
      },
      {
        title: 'Files and search',
        code: `cp source.txt backup.txt
mv old-name.txt new-name.txt
rm -r folder
grep -R "query" .
find . -name "*.js"`
      },
      {
        title: 'Permissions',
        code: `chmod +x script.sh
chown user:group file.txt
sudo apt update
sudo apt install git`
      },
      {
        title: 'Processes and pipes',
        code: `ps aux
top
kill 12345
cat access.log | grep "500" | head`
      },
      {
        title: 'Text processing',
        code: `grep -R "ERROR" .
sed -n '1,20p' file.txt
awk '{print $1, $NF}' data.txt
find . -name "*.js" | xargs grep -n "TODO"`
      }
    ],
    related: ['git-cheat-sheet', 'regex-cheat-sheet', 'docker-cheat-sheet']
  },
  {
    slug: 'regex-cheat-sheet',
    title: 'Regex Cheat Sheet',
    category: 'Programming',
    badge: '🔎 Regex',
    intro: 'A compact regex cheat sheet with common symbols, patterns and practical examples.',
    metaTitle: 'Regex Cheat Sheet – Common Patterns, Symbols & Examples | ToolsNowPro',
    metaDescription: 'Regex cheat sheet with common symbols, email and URL patterns, groups, quantifiers and flags.',
    quick: ['Symbols', 'Email and URL patterns', 'Groups and quantifiers', 'Flags and examples'],
    sections: [
      {
        title: 'Core symbols',
        code: `. = any char
\\d = digit
\\w = word char
\\s = whitespace
^ start, $ end`
      },
      {
        title: 'Common patterns',
        code: `^\\S+@\\S+\\.\\S+$   # email
https?://\\S+        # URL
\\b\\d{3}-\\d{3}-\\d{4}\\b  # US phone
^[A-Za-z0-9_]{3,16}$ # username`
      },
      {
        title: 'Groups and quantifiers',
        code: `(abc)       # capture group
(?:abc)     # non-capturing group
\\d+         # one or more digits
\\d{2,4}     # between 2 and 4 digits`
      },
      {
        title: 'Lookarounds and cleanup',
        code: `(?=\\d{4})   # lookahead
(?!test)     # negative lookahead
(?<=@)\\w+   # lookbehind

text.replace(/\\s+/g, " ").trim()`
      }
    ],
    related: ['javascript-cheat-sheet', 'bash-linux-cheat-sheet', 'markdown-cheat-sheet']
  }
];

// The regex sheet continues with a few more blocks to keep it useful.
sheets[4].sections = [
  {
    title: 'Core symbols',
    code: `. = any char
\\d = digit
\\w = word char
\\s = whitespace
^ start, $ end`
  },
  {
    title: 'Common patterns',
    code: `^\\S+@\\S+\\.\\S+$   # email
https?://\\S+        # URL
\\b\\d{3}-\\d{3}-\\d{4}\\b  # US phone
^[A-Za-z0-9_]{3,16}$ # username`
  },
  {
    title: 'Groups and quantifiers',
    code: `(abc)       # capture group
(?:abc)     # non-capturing group
\\d+         # one or more digits
\\d{2,4}     # between 2 and 4 digits`
  },
  {
    title: 'Flags',
    code: `/pattern/i   # ignore case
/pattern/g   # global
/pattern/m   # multiline
/pattern/s   # dotall`
  },
  {
    title: 'Lookarounds and cleanup',
    code: `(?=\\d{4})   # lookahead
(?!test)     # negative lookahead
(?<=@)\\w+   # lookbehind

text.replace(/\\s+/g, " ").trim()`
  },
  {
    title: 'Replacement examples',
    code: `const cleaned = text.replace(/\\s+/g, " ").trim();
const emails = text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}/g);
const numbers = text.match(/\\d+/g);`
  }
];

const moreSheets = [
  {
    slug: 'git-cheat-sheet',
    title: 'Git Cheat Sheet',
    category: 'Dev Tools',
    badge: '🌿 Git',
    intro: 'Essential Git commands for everyday branching, syncing and fixing mistakes.',
    metaTitle: 'Git Cheat Sheet – Essential Git Commands | ToolsNowPro',
    metaDescription: 'Git cheat sheet with init, clone, status, add, commit, push, pull, branch, merge and undo commands.',
    quick: ['Setup and clone', 'Daily workflow', 'Branches and merges', 'Undo common mistakes'],
    sections: [
      { title: 'Setup', code: `git init\ngit clone <repo-url>\ngit config --global user.name "Your Name"\ngit config --global user.email "you@example.com"` },
      { title: 'Daily workflow', code: `git status\ngit add .\ngit commit -m "message"\ngit push origin main` },
      { title: 'Branches', code: `git branch\ngit checkout -b feature-name\ngit merge feature-name\ngit branch -d feature-name` },
      { title: 'Undo', code: `git restore file.txt\ngit reset HEAD file.txt\ngit revert <commit>\ngit log --oneline` }
      ,
      { title: 'Stash and rebase', code: `git stash\ngit stash pop\ngit rebase main\ngit cherry-pick <commit>\ngit tag v1.0.0` }
    ],
    related: ['bash-linux-cheat-sheet', 'docker-cheat-sheet', 'vscode-shortcuts-cheat-sheet']
  },
  {
    slug: 'docker-cheat-sheet',
    title: 'Docker Cheat Sheet',
    category: 'Dev Tools',
    badge: '🐳 Docker',
    intro: 'Quick Docker commands for images, containers, ports, volumes and Compose.',
    metaTitle: 'Docker Cheat Sheet – Build, Run, Logs, Volumes & Compose | ToolsNowPro',
    metaDescription: 'Docker cheat sheet with build, run, ps, logs, exec, volumes and docker compose commands.',
    quick: ['Images and containers', 'Ports and volumes', 'Logs and shell access', 'Docker Compose'],
    sections: [
      { title: 'Images and containers', code: `docker build -t app .\ndocker run -d -p 3000:3000 app\ndocker ps\ndocker ps -a` },
      { title: 'Logs and shell', code: `docker logs <container>\ndocker exec -it <container> sh\ndocker stop <container>\ndocker rm <container>` },
      { title: 'Volumes', code: `docker volume ls\ndocker volume create data\ndocker run -v data:/app/data app` },
      { title: 'Compose', code: `docker compose up -d\ndocker compose down\ndocker compose logs -f\ndocker compose restart` }
      ,
      { title: 'Inspect and network', code: `docker inspect <container>\ndocker port <container>\ndocker network ls\ndocker network prune` }
    ],
    related: ['git-cheat-sheet', 'bash-linux-cheat-sheet', 'vscode-shortcuts-cheat-sheet']
  },
  {
    slug: 'vscode-shortcuts-cheat-sheet',
    title: 'VS Code Shortcuts Cheat Sheet',
    category: 'Dev Tools',
    badge: '🧩 VS Code',
    intro: 'Useful VS Code shortcuts for editing, search, multi-cursor work and terminal access.',
    metaTitle: 'VS Code Shortcuts Cheat Sheet – Essential Editor Shortcuts | ToolsNowPro',
    metaDescription: 'VS Code shortcuts cheat sheet with editing, search, multi-cursor, terminal and file navigation shortcuts.',
    quick: ['Editing', 'Search and replace', 'Multi-cursor', 'Terminal and files'],
    sections: [
      { title: 'Editing', code: `Mac: ⌘ / Ctrl + X cut line\nMac: ⌘ / Ctrl + D duplicate selection\nMac: ⌥ / Alt + ↑↓ move line\nMac: ⌘ / Ctrl + / comment line` },
      { title: 'Search', code: `Mac: ⌘ / Ctrl + P quick open\nMac: ⌘ / Ctrl + Shift + P command palette\nMac: ⌘ / Ctrl + F find\nMac: ⌘ / Ctrl + H replace` },
      { title: 'Multi-cursor', code: `Alt + click add cursor\n⌘ / Ctrl + D select next occurrence\n⌘ / Ctrl + Shift + L select all occurrences\n⌥ / Alt + drag column selection` },
      { title: 'Terminal and files', code: `Mac: Ctrl + \` terminal\nMac: ⌘ / Ctrl + B sidebar\nMac: ⌘ / Ctrl + \\ split editor\n⌘ / Ctrl + K S keyboard shortcuts` }
      ,
      { title: 'Panels and extensions', code: `Mac: ⌘ / Ctrl + Shift + E explorer\nMac: ⌘ / Ctrl + Shift + X extensions\nMac: ⌘ / Ctrl + Shift + M problems\nMac: ⌘ / Ctrl + Shift + P command palette` }
    ],
    related: ['git-cheat-sheet', 'markdown-cheat-sheet', 'keyboard-shortcuts-cheat-sheet']
  },
  {
    slug: 'vim-cheat-sheet',
    title: 'Vim Cheat Sheet',
    category: 'Dev Tools',
    badge: '🕹 Vim',
    intro: 'Core Vim movement, editing and save/quit commands for faster terminal editing.',
    metaTitle: 'Vim Cheat Sheet – Modes, Navigation & Editing Commands | ToolsNowPro',
    metaDescription: 'Vim cheat sheet with modes, movement, edit, search, save and quit commands.',
    quick: ['Modes', 'Movement', 'Editing', 'Save and quit'],
    sections: [
      { title: 'Modes', code: `i insert mode\nEsc normal mode\nv visual mode\n: command mode` },
      { title: 'Movement', code: `h left\nj down\nk up\nl right\nw next word` },
      { title: 'Editing', code: `dd delete line\nyy copy line\np paste\nu undo\nCtrl + r redo` },
      { title: 'Save and quit', code: `:w save\n:q quit\n:wq save and quit\n:q! quit without saving` }
      ,
      { title: 'Search and windows', code: `/term search forward\n?term search backward\nn next match\nN previous match\n:split\n:vsplit\nCtrl + w w switch window` }
    ],
    related: ['bash-linux-cheat-sheet', 'markdown-cheat-sheet', 'regex-cheat-sheet']
  },
  {
    slug: 'markdown-cheat-sheet',
    title: 'Markdown Cheat Sheet',
    category: 'Web',
    badge: '📝 Markdown',
    intro: 'Markdown syntax for headings, emphasis, lists, links, code and tables.',
    metaTitle: 'Markdown Cheat Sheet – Headings, Lists, Links, Code & Tables | ToolsNowPro',
    metaDescription: 'Markdown cheat sheet with headings, bold, lists, links, images, code blocks and tables.',
    quick: ['Headings and emphasis', 'Lists and links', 'Code blocks', 'Tables and quotes'],
    sections: [
      { title: 'Headings and emphasis', code: `# H1\n## H2\n**bold**\n*italic*` },
      { title: 'Lists and links', code: `- item one\n- item two\n1. first\n[link](https://example.com)` },
      { title: 'Code and quotes', code: `\`inline code\`\n\n\`\`\`js\nconsole.log("hi")\n\`\`\`\n> blockquote` },
      { title: 'Tables', code: `| Name | Value |\n| --- | --- |\n| A | 1 |\n| B | 2 |` }
      ,
      { title: 'Images and checklists', code: `![Alt text](image.png)\n- [ ] Todo item\n- [x] Finished item\n\\* escape special characters` }
    ],
    related: ['html-tags-cheat-sheet', 'css-flexbox-cheat-sheet', 'css-grid-cheat-sheet']
  },
  {
    slug: 'css-flexbox-cheat-sheet',
    title: 'CSS Flexbox Cheat Sheet',
    category: 'Web',
    badge: '📦 Flexbox',
    intro: 'Flexbox essentials for direction, alignment, spacing and item sizing.',
    metaTitle: 'CSS Flexbox Cheat Sheet – Alignment, Direction & Layout | ToolsNowPro',
    metaDescription: 'CSS Flexbox cheat sheet with display flex, direction, justify-content, align-items, gap and flex properties.',
    quick: ['Container properties', 'Alignment', 'Item sizing', 'Common patterns'],
    sections: [
      { title: 'Container', code: `.container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}` },
      { title: 'Wrapping', code: `.wrap {\n  display: flex;\n  flex-wrap: wrap;\n  align-content: start;\n}` },
      { title: 'Items', code: `.item {\n  flex: 1 1 240px;\n  align-self: center;\n}` },
      { title: 'Center a box', code: `.center {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}` }
      ,
      { title: 'Nav bars and cards', code: `.nav {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}\n\n.cards {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}` }
    ],
    related: ['css-grid-cheat-sheet', 'html-tags-cheat-sheet', 'markdown-cheat-sheet']
  },
  {
    slug: 'css-grid-cheat-sheet',
    title: 'CSS Grid Cheat Sheet',
    category: 'Web',
    badge: '🧱 Grid',
    intro: 'Grid templates, repeats, gaps and placement snippets for responsive layouts.',
    metaTitle: 'CSS Grid Cheat Sheet – Grid Templates, Gaps & Placement | ToolsNowPro',
    metaDescription: 'CSS Grid cheat sheet with grid-template-columns, rows, repeat, minmax, gap and placement.',
    quick: ['Grid templates', 'repeat and minmax', 'Placement', 'Responsive grids'],
    sections: [
      { title: 'Basic grid', code: `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}` },
      { title: 'Responsive columns', code: `.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 16px;\n}` },
      { title: 'Placement', code: `.card {\n  grid-column: 1 / 3;\n  grid-row: 1 / 2;\n}` },
      { title: 'Center content', code: `.grid-center {\n  display: grid;\n  place-items: center;\n}` }
      ,
      { title: 'Template areas', code: `.layout {\n  display: grid;\n  grid-template-areas:\n    \"header header\"\n    \"sidebar main\"\n    \"footer footer\";\n  grid-template-columns: 240px 1fr;\n}\n.header { grid-area: header; }\n.sidebar { grid-area: sidebar; }\n.main { grid-area: main; }` }
    ],
    related: ['css-flexbox-cheat-sheet', 'html-tags-cheat-sheet', 'markdown-cheat-sheet']
  },
  {
    slug: 'html-tags-cheat-sheet',
    title: 'HTML Tags Cheat Sheet',
    category: 'Web',
    badge: '🏷 HTML',
    intro: 'A practical HTML tags cheat sheet with semantic tags, forms, media and head elements.',
    metaTitle: 'HTML Tags Cheat Sheet – Semantic Tags, Forms, Media & More | ToolsNowPro',
    metaDescription: 'HTML tags cheat sheet with semantic elements, text tags, links, media, forms and head tags.',
    quick: ['Semantic layout', 'Text tags', 'Forms and inputs', 'Media and head'],
    sections: [
      { title: 'Semantic layout', code: `<header></header>\n<nav></nav>\n<main></main>\n<section></section>\n<article></article>\n<footer></footer>` },
      { title: 'Text and links', code: `<h1>Title</h1>\n<p>Paragraph</p>\n<strong>Bold</strong>\n<em>Italic</em>\n<a href="/">Link</a>` },
      { title: 'Forms', code: `<form>\n  <input type="text">\n  <textarea></textarea>\n  <button type="submit">Send</button>\n</form>` },
      { title: 'Media and head', code: `<img src="image.jpg" alt="Alt text">\n<video controls></video>\n<title>Page title</title>\n<meta name="description" content="...">` }
      ,
      { title: 'Common form inputs', code: `<label for="email">Email</label>\n<input id="email" type="email">\n<input type="password">\n<input type="date">\n<select><option>One</option></select>` }
    ],
    related: ['css-flexbox-cheat-sheet', 'css-grid-cheat-sheet', 'markdown-cheat-sheet']
  },
  {
    slug: 'excel-formulas-cheat-sheet',
    title: 'Excel Formulas Cheat Sheet',
    category: 'Productivity',
    badge: '📊 Excel',
    intro: 'Useful Excel formulas for sums, logic, lookups and cleaning up spreadsheet data.',
    metaTitle: 'Excel Formulas Cheat Sheet – SUM, IF, COUNTIF, XLOOKUP & More | ToolsNowPro',
    metaDescription: 'Excel formulas cheat sheet with SUM, AVERAGE, IF, COUNTIF, XLOOKUP, INDEX/MATCH, CONCAT and IFERROR.',
    quick: ['Summaries', 'Logic', 'Lookups', 'Text cleanup'],
    sections: [
      { title: 'Core formulas', code: `=SUM(A1:A10)\n=AVERAGE(A1:A10)\n=MIN(A1:A10)\n=MAX(A1:A10)` },
      { title: 'Logic and counts', code: `=IF(A1>10,"Yes","No")\n=COUNTIF(A:A,"Done")\n=SUMIF(B:B,"North",C:C)` },
      { title: 'Lookups', code: `=XLOOKUP(E2,A:A,B:B)\n=INDEX(B:B,MATCH(E2,A:A,0))` },
      { title: 'Text and errors', code: `=CONCAT(A1," ",B1)\n=TEXTJOIN(", ",TRUE,A1:A5)\n=IFERROR(A1/B1,0)` }
      ,
      { title: 'Dates and rounding', code: `=TODAY()\n=NOW()\n=DATEDIF(A1,B1,"d")\n=ROUND(A1,2)\n=TEXT(A1,"dd-mmm-yyyy")` }
    ],
    related: ['google-sheets-formulas-cheat-sheet', 'keyboard-shortcuts-cheat-sheet', 'sql-cheat-sheet']
  },
  {
    slug: 'google-sheets-formulas-cheat-sheet',
    title: 'Google Sheets Formulas Cheat Sheet',
    category: 'Productivity',
    badge: '📗 Sheets',
    intro: 'Google Sheets formulas for filtering, querying, looking up and cleaning data.',
    metaTitle: 'Google Sheets Formulas Cheat Sheet – FILTER, QUERY, UNIQUE & More | ToolsNowPro',
    metaDescription: 'Google Sheets formulas cheat sheet with FILTER, QUERY, UNIQUE, ARRAYFORMULA, SPLIT and IFERROR.',
    quick: ['FILTER and QUERY', 'Unique values', 'Lookup formulas', 'Array formulas'],
    sections: [
      { title: 'Core formulas', code: `=SUM(A1:A10)\n=AVERAGE(A1:A10)\n=COUNTIF(A:A,"Done")\n=IFERROR(A1/B1,0)` },
      { title: 'Data tools', code: `=FILTER(A2:C, C2:C="Yes")\n=UNIQUE(A2:A)\n=SORT(A2:B,1,TRUE)` },
      { title: 'Query', code: `=QUERY(A1:C,"select A, sum(C) where B='North' group by A label sum(C) ''",1)` },
      { title: 'Text helpers', code: `=ARRAYFORMULA(A2:A & " " & B2:B)\n=SPLIT(A2,",")\n=TEXTJOIN(", ",TRUE,A2:A5)` }
      ,
      { title: 'Dates and matching', code: `=TODAY()\n=DATEVALUE("2026-06-15")\n=REGEXMATCH(A2,"pattern")\n=IFNA(VLOOKUP(A2,D:E,2,FALSE),"Not found")` }
    ],
    related: ['excel-formulas-cheat-sheet', 'keyboard-shortcuts-cheat-sheet', 'markdown-cheat-sheet']
  },
  {
    slug: 'keyboard-shortcuts-cheat-sheet',
    title: 'Keyboard Shortcuts Cheat Sheet',
    category: 'Productivity',
    badge: '⌨ Shortcuts',
    intro: 'A practical shortcut cheat sheet for Mac and Windows with editing, windows, browser, screenshots and app-switching shortcuts.',
    metaTitle: 'Keyboard Shortcuts Cheat Sheet – Mac, Windows, Browser & More | ToolsNowPro',
    metaDescription: 'Keyboard shortcuts cheat sheet with Mac and Windows shortcuts for editing, file actions, search, browser tabs, screenshots and app switching.',
    quick: ['Editing', 'Search and replace', 'Browser tabs', 'Screenshots'],
    sections: [
      { title: 'Editing', code: `Copy: ⌘ / Ctrl + C\nPaste: ⌘ / Ctrl + V\nCut: ⌘ / Ctrl + X\nUndo: ⌘ / Ctrl + Z\nRedo: ⌘ / Ctrl + Shift + Z\nSelect all: ⌘ / Ctrl + A\nDuplicate line: ⌘ / Ctrl + D` },
      { title: 'File actions', code: `Save: ⌘ / Ctrl + S\nOpen: ⌘ / Ctrl + O\nNew tab: ⌘ / Ctrl + T\nClose tab: ⌘ / Ctrl + W\nClose window: ⌘ / Ctrl + Shift + W\nPrint: ⌘ / Ctrl + P` },
      { title: 'Search and windows', code: `Find: ⌘ / Ctrl + F\nReplace: ⌘ / Ctrl + H\nFind next: Enter / F3\nFind previous: Shift + Enter / Shift + F3\nCommand palette: ⌘ / Ctrl + Shift + P\nSpotlight / Run: ⌘ + Space / Win + R` },
      { title: 'Browser basics', code: `Refresh: ⌘ / Ctrl + R\nReopen tab: ⌘ / Ctrl + Shift + T\nBookmark: ⌘ / Ctrl + D\nAddress bar: ⌘ / Ctrl + L\nNew window: ⌘ / Ctrl + N\nHistory: ⌘ / Ctrl + H` },
      { title: 'Navigation', code: `Next tab: ⌘ / Ctrl + Tab\nPrevious tab: ⌘ / Ctrl + Shift + Tab\nMove line: Alt + Up / Down\nMove by word: Option / Ctrl + Arrow\nTop / bottom: ⌘ / Ctrl + Home / End` },
      { title: 'Screenshots', code: `Mac selected area: Shift + Cmd + 4\nMac full screen: Shift + Cmd + 3\nWindows snip: Win + Shift + S\nWindows full screen: Win + PrtScn` },
      { title: 'System and apps', code: `Switch app: ⌘ + Tab / Alt + Tab\nTask manager / Force quit: Ctrl + Shift + Esc / Cmd + Option + Esc\nLock screen: Win + L / Ctrl + Cmd + Q\nEmoji picker: Win + . / Ctrl + Cmd + Space` }
    ],
    related: ['vscode-shortcuts-cheat-sheet', 'markdown-cheat-sheet', 'excel-formulas-cheat-sheet']
  }
];

const allSheets = [...sheets, ...moreSheets];

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function navHtml(activeSlug) {
  const active = activeSlug === 'cheat-sheet-library' ? 'class="active"' : '';
  return `
    <a href="../qr-generator/index.html">▦ QR Generator</a>
    <a href="../text-tools/index.html">🔤 Case Converter</a>
    <a href="../text-tools/word-counter.html">📊 Word Counter</a>
    <a href="../tools/password-generator.html">🔑 Password Generator</a>
    <a href="../tools/jpg-to-pdf.html">📄 JPG to PDF</a>
    <a href="../tools/random-number-generator.html">🎲 Random Number</a>
    <a href="../tools/stopwatch-timer.html">⏱ Stopwatch / Timer</a>
    <a href="../tools/lorem-ipsum-generator.html">✎ Lorem Ipsum</a>
    <a href="../tools/color-picker.html">🎨 Color Picker</a>
    <a href="../tools/json-formatter.html">{} JSON Formatter</a>
    <a href="../tools/favicon-generator.html">◉ Favicon</a>
    <a href="../tools/emoji-library.html">😄 Emoji Library</a>
    <a href="../tools/cheat-sheet-library.html"${active ? ` ${active}` : ''}>📚 Cheat Sheets</a>
    <a href="../image-converter/index.html">🖼 Image Converter</a>
    <a href="../gaming/index.html">⚡ Username</a>
    <a href="../blog/index.html">📝 Blog</a>`;
}

function footerHtml() {
  return `
    <div><div class="footer-heading">Tools</div><ul class="footer-links">
      <li><a href="../index.html">Username Generator</a></li>
      <li><a href="../tools/password-generator.html">Password Generator</a></li>
      <li><a href="../tools/emoji-library.html">Emoji Library</a></li>
      <li><a href="../tools/cheat-sheet-library.html">Cheat Sheets</a></li>
      <li><a href="../tools/lorem-ipsum-generator.html">Lorem Ipsum Generator</a></li>
      <li><a href="../tools/color-picker.html">Color Picker</a></li>
      <li><a href="../tools/json-formatter.html">JSON Formatter</a></li>
      <li><a href="../tools/favicon-generator.html">Favicon Generator</a></li>
      <li><a href="../tools/bio-generator.html">Bio Generator</a></li>
      <li><a href="../tools/hashtag-generator.html">Hashtag Generator</a></li>
    </ul></div>`;
}

function renderSheetPage(sheet) {
  const relatedCards = sheet.related.map(slug => {
    const related = allSheets.find(s => s.slug === slug);
    if (!related) return '';
    return `<a href="${related.slug}.html" class="related-card"><strong>${escapeHtml(related.title)}</strong><span>${escapeHtml(related.intro)}</span></a>`;
  }).join('');

  const sections = sheet.sections.map(section => `
    <section class="sheet-block">
      <div class="sheet-head">
        <h2>${escapeHtml(section.title)}</h2>
        <button class="btn-copy" onclick="copyBlock(this)">Copy</button>
      </div>
      <pre><code>${escapeHtml(section.code)}</code></pre>
    </section>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(sheet.metaTitle)}</title>
<meta name="description" content="${escapeHtml(sheet.metaDescription)}">
<link rel="stylesheet" href="../shared.css">
<style>
.hero{padding:52px 0 28px;text-align:center}
.hero h1{font-size:clamp(2rem,5vw,3rem);font-weight:900;letter-spacing:-.03em;margin-bottom:14px}
.hero h1 span{color:var(--violet-l)}
.hero p{color:var(--muted);font-size:1rem;max-width:680px;margin:0 auto}
.tool-wrap{max-width:1120px;margin:0 auto;padding-bottom:60px}
.sheet-layout{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:20px;align-items:start}
.sheet-block{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:22px;margin-bottom:16px}
.sheet-head{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:14px}
.sheet-head h2{font-size:1.02rem;font-weight:800}
.btn-copy{background:var(--violet);color:#fff;border:none;border-radius:10px;padding:9px 14px;font-size:.84rem;font-weight:800;cursor:pointer}
.btn-copy:hover{background:#6D28D9}
pre{margin:0;background:var(--surface2);border:1px solid var(--border);border-radius:14px;padding:16px;overflow:auto;line-height:1.6;font-size:.86rem}
code{font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace}
.side-card{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:20px;margin-bottom:16px}
.side-card h3{font-size:.82rem;font-weight:800;text-transform:uppercase;letter-spacing:.09em;color:var(--muted);margin-bottom:10px}
.side-list{list-style:none;display:flex;flex-direction:column;gap:8px}
.side-list a{color:var(--violet-l);text-decoration:none;font-size:.9rem}
.side-list a:hover{text-decoration:underline}
.fact-list{display:flex;flex-direction:column;gap:8px;color:var(--muted);font-size:.9rem}
.fact-list li{list-style:none}
.related-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.related-card{display:flex;flex-direction:column;gap:4px;background:var(--surface2);border:1px solid var(--border);border-radius:14px;padding:14px;text-decoration:none;color:var(--text)}
.related-card strong{font-size:.88rem}
.related-card span{font-size:.8rem;color:var(--muted);line-height:1.4}
.sheet-pills{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-top:16px}
.sheet-pill{padding:7px 12px;border-radius:999px;border:1px solid var(--border);background:var(--surface2);color:var(--muted);font-size:.78rem;font-weight:700}
@media(max-width:900px){.sheet-layout{grid-template-columns:1fr}.related-grid{grid-template-columns:1fr}}
</style>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-LSDSPEHT0J"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-LSDSPEHT0J");</script>
<link rel="icon" type="image/svg+xml" href="../favicon.svg">
<link rel="apple-touch-icon" href="../favicon-180.svg">
<meta name="theme-color" content="#7C3AED">
</head>
<body>
<div class="ad-floating-left" aria-label="Sponsored ad"><iframe src="/namecheap-1183668.html" width="160" height="600" title="Namecheap sponsored banner" style="border:0;display:block;background:transparent" loading="lazy"></iframe></div>
<div class="ad-floating-right" aria-label="Sponsored ad"><iframe src="/namecheap-1184513.html" width="160" height="600" title="Namecheap sponsored banner" style="border:0;display:block;background:transparent" loading="lazy"></iframe></div>
<header class="site-header"><div class="wrapper"><div class="header-inner">
  <a href="../index.html" class="logo"><span class="logo-icon">⚡</span>ToolsNowPro</a>
  <button class="nav-toggle" onclick="document.getElementById('snav').classList.toggle('open')">☰</button>
  <nav class="site-nav" id="snav">${navHtml(sheet.slug)}</nav>
</div></div></header>

<div class="wrapper">
  <details class="bookmark-strip">
    <summary>Bookmark this page</summary>
    <div class="bookmark-hint">Press Ctrl+D (Windows) or Cmd+D (Mac) to bookmark this page.</div>
  </details>
</div>

<div class="wrapper"><div class="ad-slot ad-banner" style="padding:0;overflow:hidden;display:flex;justify-content:center"><iframe src="/namecheap-1374966.html" width="728" height="90" title="Namecheap sponsored banner" style="border:0;display:block;background:transparent" loading="lazy"></iframe></div></div>

<div class="hero wrapper">
  <div class="badge badge-violet" style="margin-bottom:18px">${escapeHtml(sheet.badge)}</div>
  <h1>${escapeHtml(sheet.title)}</h1>
  <p>${escapeHtml(sheet.intro)}</p>
  <div class="sheet-pills">${sheet.quick.map(q => `<span class="sheet-pill">${escapeHtml(q)}</span>`).join('')}</div>
</div>

<div class="wrapper">
  <div class="tool-wrap">
    <div class="sheet-layout">
      <main>${sections}</main>
      <aside>
        <div class="side-card">
          <h3>Quick Facts</h3>
          <ul class="fact-list">
            <li>Use this sheet as a fast reference while coding or writing docs.</li>
            <li>Click any section to copy the full snippet.</li>
            <li>Open the library to jump between all cheat sheets.</li>
          </ul>
        </div>
        <div class="side-card">
          <h3>Library</h3>
          <p style="color:var(--muted);font-size:.9rem;line-height:1.6;margin-bottom:14px">Browse the full cheat sheet library and jump to other topics.</p>
          <a href="cheat-sheet-library.html" class="btn-primary" style="display:flex;justify-content:center;width:100%">📚 Open Library</a>
        </div>
        <div class="side-card">
          <h3>Related</h3>
          <div class="related-grid">${relatedCards}</div>
        </div>
      </aside>
    </div>
  </div>
</div>

<footer class="site-footer"><div class="wrapper">
  <div class="footer-grid">
    <div class="footer-brand"><a href="../index.html" class="logo" style="margin-bottom:10px;display:inline-flex"><span class="logo-icon">⚡</span>ToolsNowPro</a><p>Free utility tools for creators and businesses.</p></div>
    ${footerHtml()}
    <div><div class="footer-heading">Learn</div><ul class="footer-links"><li><a href="../blog/index.html">📝 Blog</a></li><li><a href="../faq/index.html">FAQ</a></li></ul></div>
    <div><div class="footer-heading">Legal</div><ul class="footer-links"><li><a href="../about/index.html#privacy">Privacy</a></li><li><a href="../about/index.html#terms">Terms</a></li></ul></div>
  </div>
  <div class="footer-bottom"><span>© 2026 ToolsNowPro.</span></div>
</div></footer>

<div class="toast" id="toast">✓ Copied!</div>
<script>
function copyBlock(btn){
  const text = btn.closest('.sheet-block').querySelector('pre').innerText;
  navigator.clipboard.writeText(text).catch(()=>{});
  const toast=document.getElementById('toast');
  toast.textContent='✓ Copied!';
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),1500);
}
</script>
</body></html>`;
}

function renderLibraryPage() {
  const groups = [...new Set(allSheets.map(s => s.category))];
  const cards = groups.map(category => {
    const items = allSheets.filter(s => s.category === category).map(s => `
      <a href="${s.slug}.html" class="library-card" data-card data-title="${escapeHtml((s.title + ' ' + s.metaDescription).toLowerCase())}">
        <div class="lib-badge">${escapeHtml(s.badge)}</div>
        <h3>${escapeHtml(s.title)}</h3>
        <p>${escapeHtml(s.intro)}</p>
      </a>
    `).join('');
    return `
      <section class="library-group">
        <h2>${escapeHtml(category)}</h2>
        <div class="library-grid">${items}</div>
      </section>
    `;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Cheat Sheet Library – Python, Git, CSS, Excel & More | ToolsNowPro</title>
<meta name="description" content="Browse the ToolsNowPro cheat sheet library. Python, JavaScript, SQL, Git, Docker, CSS, HTML, Markdown, Excel and more.">
<link rel="stylesheet" href="../shared.css">
<style>
.hero{padding:52px 0 28px;text-align:center}
.hero h1{font-size:clamp(2rem,5vw,3rem);font-weight:900;letter-spacing:-.03em;margin-bottom:14px}
.hero h1 span{color:var(--violet-l)}
.hero p{color:var(--muted);font-size:1rem;max-width:720px;margin:0 auto}
.tool-wrap{max-width:1180px;margin:0 auto;padding-bottom:60px}
.search-row{display:grid;grid-template-columns:1fr 220px;gap:12px;align-items:end;margin:22px 0 10px}
.field{display:flex;flex-direction:column;gap:6px}
.field label{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)}
.field input,.field select{width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:var(--rs);padding:11px 14px;color:var(--text);font-size:.95rem;font-family:inherit}
.field input:focus,.field select:focus{outline:none;border-color:var(--violet)}
.library-group{margin-top:24px}
.library-group h2{font-size:1.05rem;font-weight:900;margin-bottom:14px}
.library-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px}
.library-card{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:18px;text-decoration:none;color:var(--text);display:block;transition:all .18s}
.library-card:hover{border-color:var(--violet);transform:translateY(-2px);box-shadow:0 12px 32px rgba(124,58,237,.12)}
.lib-badge{display:inline-flex;align-items:center;gap:6px;font-size:.68rem;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:var(--violet-l);background:var(--glow);border:1px solid rgba(124,58,237,.22);border-radius:100px;padding:4px 10px;margin-bottom:12px}
.library-card h3{font-size:1rem;font-weight:800;margin-bottom:6px}
.library-card p{font-size:.84rem;color:var(--muted);line-height:1.55}
.stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:20px 0 0}
.mini{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:16px 18px;text-align:center}
.mini b{display:block;font-size:1.4rem;color:var(--violet-l)}
.mini span{font-size:.76rem;color:var(--muted)}
@media(max-width:900px){.search-row,.stats-row{grid-template-columns:1fr 1fr}.search-row{grid-template-columns:1fr}}
</style>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-LSDSPEHT0J"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-LSDSPEHT0J");</script>
<link rel="icon" type="image/svg+xml" href="../favicon.svg">
<link rel="apple-touch-icon" href="../favicon-180.svg">
<meta name="theme-color" content="#7C3AED">
</head>
<body>
<div class="ad-floating-left" aria-label="Sponsored ad"><iframe src="/namecheap-1183668.html" width="160" height="600" title="Namecheap sponsored banner" style="border:0;display:block;background:transparent" loading="lazy"></iframe></div>
<div class="ad-floating-right" aria-label="Sponsored ad"><iframe src="/namecheap-1184513.html" width="160" height="600" title="Namecheap sponsored banner" style="border:0;display:block;background:transparent" loading="lazy"></iframe></div>
<header class="site-header"><div class="wrapper"><div class="header-inner">
  <a href="../index.html" class="logo"><span class="logo-icon">⚡</span>ToolsNowPro</a>
  <button class="nav-toggle" onclick="document.getElementById('snav').classList.toggle('open')">☰</button>
  <nav class="site-nav" id="snav">${navHtml('cheat-sheet-library')}</nav>
</div></div></header>

<div class="wrapper">
  <details class="bookmark-strip">
    <summary>Bookmark this page</summary>
    <div class="bookmark-hint">Press Ctrl+D (Windows) or Cmd+D (Mac) to bookmark this page.</div>
  </details>
</div>

<div class="wrapper"><div class="ad-slot ad-banner" style="padding:0;overflow:hidden;display:flex;justify-content:center"><iframe src="/namecheap-1374966.html" width="728" height="90" title="Namecheap sponsored banner" style="border:0;display:block;background:transparent" loading="lazy"></iframe></div></div>

<div class="hero wrapper">
  <div class="badge badge-violet" style="margin-bottom:18px">📚 Free Cheat Sheets</div>
  <h1>Cheat Sheet <span>Library</span></h1>
  <p>Browse practical cheat sheets for programming, web development, dev tools, and productivity. Search fast and jump into the topic you need.</p>
  <div class="stats-row">
    <div class="mini"><b>${allSheets.length}</b><span>Cheat sheets</span></div>
    <div class="mini"><b>4</b><span>Categories</span></div>
    <div class="mini"><b>1 click</b><span>Copy snippets</span></div>
    <div class="mini"><b>Free</b><span>No signup</span></div>
  </div>
</div>

<div class="wrapper">
  <div class="tool-wrap">
    <div class="search-row">
      <div class="field">
        <label>Search cheat sheets</label>
        <input id="search" type="text" placeholder="Search Python, Git, CSS Grid, Excel, Markdown..." oninput="filterCards()">
      </div>
      <div class="field">
        <label>Category</label>
        <select id="category" onchange="filterCards()">
          <option value="">All categories</option>
          ${groups.map(g => `<option value="${escapeHtml(g)}">${escapeHtml(g)}</option>`).join('')}
        </select>
      </div>
    </div>
    ${cards}
  </div>
</div>

<footer class="site-footer"><div class="wrapper">
  <div class="footer-grid">
    <div class="footer-brand"><a href="../index.html" class="logo" style="margin-bottom:10px;display:inline-flex"><span class="logo-icon">⚡</span>ToolsNowPro</a><p>Free utility tools for creators and businesses.</p></div>
    ${footerHtml()}
    <div><div class="footer-heading">Learn</div><ul class="footer-links"><li><a href="../blog/index.html">📝 Blog</a></li><li><a href="../faq/index.html">FAQ</a></li></ul></div>
    <div><div class="footer-heading">Legal</div><ul class="footer-links"><li><a href="../about/index.html#privacy">Privacy</a></li><li><a href="../about/index.html#terms">Terms</a></li></ul></div>
  </div>
  <div class="footer-bottom"><span>© 2026 ToolsNowPro.</span></div>
</div></footer>

<script>
function filterCards(){
  const q=document.getElementById('search').value.toLowerCase().trim();
  const cat=document.getElementById('category').value;
  document.querySelectorAll('[data-card]').forEach(card=>{
    const matchTitle=card.dataset.title.includes(q);
    const matchCat=!cat || card.closest('.library-group').querySelector('h2').textContent===cat;
    card.style.display=(matchTitle && matchCat) ? '' : 'none';
  });
  document.querySelectorAll('.library-group').forEach(group=>{
    const visible = group.querySelectorAll('[data-card]:not([style*="display: none"])').length;
    group.style.display = visible ? '' : 'none';
  });
}
</script>
</body></html>`;
}

mkdirSync(toolsDir, { recursive: true });
writeFileSync(join(toolsDir, 'cheat-sheet-library.html'), renderLibraryPage());
for (const sheet of allSheets) {
  writeFileSync(join(toolsDir, `${sheet.slug}.html`), renderSheetPage(sheet));
}

console.log(`Wrote ${allSheets.length + 1} cheat sheet pages.`);
