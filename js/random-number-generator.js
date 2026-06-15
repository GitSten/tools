const rngEls = {
  basicMin: document.getElementById('basic-min'),
  basicMax: document.getElementById('basic-max'),
  basicOut: document.getElementById('basic-output'),
  diceSides: document.getElementById('dice-sides'),
  diceOut: document.getElementById('dice-output'),
  luckyRange: document.getElementById('lucky-range'),
  luckyOut: document.getElementById('lucky-output'),
  nameList: document.getElementById('name-list'),
  nameOut: document.getElementById('name-output'),
  colorSwatch: document.getElementById('color-swatch'),
  colorOut: document.getElementById('color-output'),
  coin: document.getElementById('coin'),
  coinOut: document.getElementById('coin-output'),
  pwLen: document.getElementById('pw-len'),
  pwOut: document.getElementById('pw-output'),
  toast: document.getElementById('toast')
};

function randInt(min, max) {
  const lo = Math.ceil(Math.min(min, max));
  const hi = Math.floor(Math.max(min, max));
  const range = hi - lo + 1;
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return lo + (arr[0] % range);
}

function randChoice(list) {
  return list[randInt(0, list.length - 1)];
}

function showToast(message) {
  rngEls.toast.textContent = message;
  rngEls.toast.classList.add('show');
  setTimeout(() => rngEls.toast.classList.remove('show'), 1600);
}

function copyResult(id) {
  const el = document.getElementById(id);
  const text = el.textContent.trim();
  if (!text || text.includes('Paste a list')) return;
  navigator.clipboard.writeText(text).catch(() => {});
  showToast('Copied');
}

function generateBasic() {
  const min = parseInt(rngEls.basicMin.value || '1', 10);
  const max = parseInt(rngEls.basicMax.value || '100', 10);
  rngEls.basicOut.textContent = String(randInt(min, max));
}

function selectDice(btn, sides) {
  document.querySelectorAll('.dice-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  rngEls.diceSides.value = String(sides);
  rollDice();
}

function updateDiceLabel() {
  document.querySelectorAll('.dice-btn').forEach(b => b.classList.remove('active'));
  rollDice();
}

function rollDice() {
  const sides = Math.max(2, parseInt(rngEls.diceSides.value || '6', 10));
  rngEls.diceOut.textContent = String(randInt(1, sides));
}

function generateLucky() {
  const raw = (rngEls.luckyRange.value || '1-100').replace(/\s+/g, '');
  let min = 1;
  let max = 100;
  const match = raw.match(/^(-?\d+)-(-?\d+)$/);
  if (match) {
    min = parseInt(match[1], 10);
    max = parseInt(match[2], 10);
  }
  rngEls.luckyOut.textContent = String(randInt(min, max));
}

function pickName() {
  const names = rngEls.nameList.value
    .split(/[\n,;]+/)
    .map(s => s.trim())
    .filter(Boolean);
  if (!names.length) {
    rngEls.nameOut.textContent = 'Add a few names first';
    return;
  }
  rngEls.nameOut.textContent = randChoice(names);
}

function generateColor() {
  const value = '#' + Array.from({ length: 6 }, () => randChoice('0123456789ABCDEF'.split(''))).join('');
  rngEls.colorSwatch.style.background = value;
  rngEls.colorOut.textContent = value;
}

function flipCoin() {
  const result = randChoice(['HEADS', 'TAILS']);
  rngEls.coin.classList.remove('flipping');
  void rngEls.coin.offsetWidth;
  rngEls.coin.classList.add('flipping');
  setTimeout(() => {
    rngEls.coin.textContent = result;
    rngEls.coinOut.textContent = result;
    rngEls.coin.classList.remove('flipping');
  }, 350);
}

function generatePassword() {
  const len = Math.min(64, Math.max(8, parseInt(rngEls.pwLen.value || '16', 10)));
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const nums = '0123456789';
  const syms = '!@#$%^&*()-_=+[]{}|;:,.<>?';
  const pool = lower + upper + nums + syms;
  const arr = new Uint32Array(len);
  crypto.getRandomValues(arr);
  let out = '';
  for (let i = 0; i < len; i++) out += pool[arr[i] % pool.length];
  rngEls.pwOut.textContent = out;
}

window.copyResult = copyResult;
window.generateBasic = generateBasic;
window.selectDice = selectDice;
window.updateDiceLabel = updateDiceLabel;
window.rollDice = rollDice;
window.generateLucky = generateLucky;
window.pickName = pickName;
window.generateColor = generateColor;
window.flipCoin = flipCoin;
window.generatePassword = generatePassword;

generateBasic();
rollDice();
generateColor();
flipCoin();
