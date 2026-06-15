const emojiData = [
  { emoji: '😀', name: 'Grinning Face', category: 'Smileys', keywords: ['happy', 'smile', 'face'], unicode: 'U+1F600', popular: 98 },
  { emoji: '😄', name: 'Smile', category: 'Smileys', keywords: ['happy', 'grin', 'joy'], unicode: 'U+1F604', popular: 97 },
  { emoji: '😂', name: 'Face With Tears of Joy', category: 'Smileys', keywords: ['laugh', 'funny', 'cry'], unicode: 'U+1F602', popular: 99 },
  { emoji: '😍', name: 'Heart Eyes', category: 'Smileys', keywords: ['love', 'adorable', 'cute'], unicode: 'U+1F60D', popular: 95 },
  { emoji: '😉', name: 'Winking Face', category: 'Smileys', keywords: ['wink', 'flirt', 'playful'], unicode: 'U+1F609', popular: 88 },
  { emoji: '🔥', name: 'Fire', category: 'Symbols', keywords: ['hot', 'trending', 'awesome'], unicode: 'U+1F525', popular: 96 },
  { emoji: '✨', name: 'Sparkles', category: 'Symbols', keywords: ['shine', 'magic', 'special'], unicode: 'U+2728', popular: 93 },
  { emoji: '💡', name: 'Light Bulb', category: 'Objects', keywords: ['idea', 'inspiration', 'bright'], unicode: 'U+1F4A1', popular: 82 },
  { emoji: '🎯', name: 'Direct Hit', category: 'Activities', keywords: ['goal', 'focus', 'target'], unicode: 'U+1F3AF', popular: 84 },
  { emoji: '✅', name: 'Check Mark', category: 'Symbols', keywords: ['done', 'yes', 'complete'], unicode: 'U+2705', popular: 90 },
  { emoji: '💬', name: 'Speech Balloon', category: 'Symbols', keywords: ['chat', 'message', 'talk'], unicode: 'U+1F4AC', popular: 80 },
  { emoji: '🌟', name: 'Glowing Star', category: 'Nature', keywords: ['star', 'shine', 'special'], unicode: 'U+1F31F', popular: 89 },
  { emoji: '🌈', name: 'Rainbow', category: 'Nature', keywords: ['colorful', 'bright', 'hope'], unicode: 'U+1F308', popular: 81 },
  { emoji: '🌿', name: 'Herb', category: 'Nature', keywords: ['green', 'leaf', 'fresh'], unicode: 'U+1F33F', popular: 74 },
  { emoji: '🍕', name: 'Pizza', category: 'Food', keywords: ['food', 'slice', 'dinner'], unicode: 'U+1F355', popular: 92 },
  { emoji: '🍔', name: 'Burger', category: 'Food', keywords: ['food', 'fast food', 'meal'], unicode: 'U+1F354', popular: 86 },
  { emoji: '🍎', name: 'Red Apple', category: 'Food', keywords: ['fruit', 'healthy', 'school'], unicode: 'U+1F34E', popular: 77 },
  { emoji: '☕', name: 'Hot Beverage', category: 'Food', keywords: ['coffee', 'tea', 'morning'], unicode: 'U+2615', popular: 94 },
  { emoji: '🚀', name: 'Rocket', category: 'Travel', keywords: ['launch', 'fast', 'startup'], unicode: 'U+1F680', popular: 91 },
  { emoji: '✈️', name: 'Airplane', category: 'Travel', keywords: ['travel', 'flight', 'trip'], unicode: 'U+2708', popular: 72 },
  { emoji: '🏠', name: 'House', category: 'Objects', keywords: ['home', 'house', 'building'], unicode: 'U+1F3E0', popular: 79 },
  { emoji: '📌', name: 'Pin', category: 'Objects', keywords: ['location', 'save', 'notice'], unicode: 'U+1F4CC', popular: 83 },
  { emoji: '🧠', name: 'Brain', category: 'Objects', keywords: ['smart', 'idea', 'thinking'], unicode: 'U+1F9E0', popular: 75 },
  { emoji: '🔒', name: 'Lock', category: 'Objects', keywords: ['secure', 'private', 'password'], unicode: 'U+1F512', popular: 76 },
  { emoji: '📣', name: 'Megaphone', category: 'Objects', keywords: ['announce', 'broadcast', 'promo'], unicode: 'U+1F4E3', popular: 70 },
  { emoji: '💰', name: 'Money Bag', category: 'Objects', keywords: ['money', 'sale', 'cash'], unicode: 'U+1F4B0', popular: 78 },
  { emoji: '🛠️', name: 'Tools', category: 'Objects', keywords: ['build', 'fix', 'work'], unicode: 'U+1F6E0', popular: 65 },
  { emoji: '🎵', name: 'Musical Note', category: 'Activities', keywords: ['music', 'sound', 'song'], unicode: 'U+1F3B5', popular: 85 },
  { emoji: '⚽', name: 'Soccer Ball', category: 'Activities', keywords: ['sport', 'ball', 'game'], unicode: 'U+26BD', popular: 83 },
  { emoji: '🎮', name: 'Video Game', category: 'Activities', keywords: ['gaming', 'play', 'controller'], unicode: 'U+1F3AE', popular: 87 },
  { emoji: '💪', name: 'Flexed Biceps', category: 'People', keywords: ['strong', 'fitness', 'power'], unicode: 'U+1F4AA', popular: 84 },
  { emoji: '🙏', name: 'Folded Hands', category: 'People', keywords: ['please', 'thanks', 'pray'], unicode: 'U+1F64F', popular: 88 },
  { emoji: '👀', name: 'Eyes', category: 'People', keywords: ['look', 'see', 'watch'], unicode: 'U+1F440', popular: 90 },
  { emoji: '🫶', name: 'Heart Hands', category: 'People', keywords: ['love', 'support', 'care'], unicode: 'U+1FAF6', popular: 89 },
  { emoji: '👑', name: 'Crown', category: 'Symbols', keywords: ['king', 'queen', 'top'], unicode: 'U+1F451', popular: 82 },
  { emoji: '💥', name: 'Collision', category: 'Symbols', keywords: ['boom', 'impact', 'explosion'], unicode: 'U+1F4A5', popular: 73 },
  { emoji: '🕒', name: 'Clock', category: 'Objects', keywords: ['time', 'timer', 'watch'], unicode: 'U+1F552', popular: 71 },
  { emoji: '📚', name: 'Books', category: 'Objects', keywords: ['study', 'learn', 'read'], unicode: 'U+1F4DA', popular: 77 },
  { emoji: '🎉', name: 'Party Popper', category: 'Symbols', keywords: ['celebrate', 'party', 'yay'], unicode: 'U+1F389', popular: 94 },
  { emoji: '🏆', name: 'Trophy', category: 'Symbols', keywords: ['win', 'award', 'best'], unicode: 'U+1F3C6', popular: 84 }
];

const emojiEls = {
  search: document.getElementById('emoji-search'),
  sort: document.getElementById('emoji-sort'),
  chips: document.getElementById('emoji-chips'),
  grid: document.getElementById('emoji-grid'),
  meta: document.getElementById('emoji-meta'),
  count: document.getElementById('emoji-count'),
  favCount: document.getElementById('fav-count'),
  recentCount: document.getElementById('recent-count'),
  detailEmoji: document.getElementById('detail-emoji'),
  detailName: document.getElementById('detail-name'),
  detailKeywords: document.getElementById('detail-keywords'),
  detailCategory: document.getElementById('detail-category'),
  detailUnicode: document.getElementById('detail-unicode'),
  favList: document.getElementById('fav-list'),
  recentList: document.getElementById('recent-list'),
  toast: document.getElementById('toast')
};

const categories = ['All', ...new Set(emojiData.map(item => item.category))];
const state = {
  selected: emojiData[0],
  filter: 'All',
  query: '',
  favorites: loadList('emoji-favorites'),
  recent: loadList('emoji-recent')
};

function loadList(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
}

function saveList(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function showToast(message) {
  emojiEls.toast.textContent = message;
  emojiEls.toast.classList.add('show');
  setTimeout(() => emojiEls.toast.classList.remove('show'), 1600);
}

function unicodeLabel(emoji) {
  return Array.from(emoji)
    .map(ch => `U+${ch.codePointAt(0).toString(16).toUpperCase()}`)
    .join(' ');
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => showToast('Copied')).catch(() => showToast('Copy failed'));
}

function setSelected(item) {
  state.selected = item;
  emojiEls.detailEmoji.textContent = item.emoji;
  emojiEls.detailName.textContent = item.name;
  emojiEls.detailKeywords.textContent = item.keywords.join(', ');
  emojiEls.detailCategory.textContent = item.category;
  emojiEls.detailUnicode.textContent = item.unicode || unicodeLabel(item.emoji);
  renderEmojiGrid();
}

function addRecent(item) {
  state.recent = [item.emoji, ...state.recent.filter(e => e !== item.emoji)].slice(0, 12);
  saveList('emoji-recent', state.recent);
  renderSideLists();
}

function toggleFavorite(emoji) {
  if (state.favorites.includes(emoji)) {
    state.favorites = state.favorites.filter(e => e !== emoji);
  } else {
    state.favorites = [emoji, ...state.favorites].slice(0, 24);
  }
  saveList('emoji-favorites', state.favorites);
  renderEmojiGrid();
  renderSideLists();
}

function isSelected(item) {
  return state.selected && state.selected.emoji === item.emoji;
}

function isFavorite(emoji) {
  return state.favorites.includes(emoji);
}

function buildChip(label) {
  const btn = document.createElement('button');
  btn.className = `chip${state.filter === label ? ' active' : ''}`;
  btn.textContent = label;
  btn.onclick = () => {
    state.filter = label;
    renderChips();
    renderEmojiGrid();
  };
  return btn;
}

function renderChips() {
  emojiEls.chips.innerHTML = '';
  categories.forEach(cat => emojiEls.chips.appendChild(buildChip(cat)));
}

function filteredEmojis() {
  const q = state.query.trim().toLowerCase();
  return emojiData.filter(item => {
    const matchesCategory = state.filter === 'All' || item.category === state.filter;
    const searchable = [item.emoji, item.name, item.category, ...item.keywords].join(' ').toLowerCase();
    const matchesQuery = !q || searchable.includes(q);
    return matchesCategory && matchesQuery;
  }).sort((a, b) => {
    if (state.sort === 'name') return a.name.localeCompare(b.name);
    if (state.sort === 'category') return a.category.localeCompare(b.category) || b.popular - a.popular;
    return b.popular - a.popular;
  });
}

function renderEmojiGrid() {
  state.query = emojiEls.search.value || '';
  state.sort = emojiEls.sort.value;
  const items = filteredEmojis();
  emojiEls.count.textContent = `${items.length} emoji${items.length === 1 ? '' : 's'}`;
  emojiEls.meta.textContent = state.filter === 'All'
    ? `Showing ${items.length} emojis across ${categories.length - 1} categories.`
    : `Showing ${items.length} emojis in ${state.filter}.`;

  emojiEls.grid.innerHTML = '';
  if (!items.length) {
    emojiEls.grid.innerHTML = '<div class="empty" style="grid-column:1/-1">No emojis match your search.</div>';
    return;
  }

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = `emoji-card${isSelected(item) ? ' selected' : ''}`;
    card.setAttribute('role', 'button');
    card.tabIndex = 0;
    card.innerHTML = `
      <button class="fav-btn${isFavorite(item.emoji) ? ' active' : ''}" type="button" aria-label="Toggle favorite">★</button>
      <div class="emoji-sym">${item.emoji}</div>
      <div class="emoji-name">${item.name}</div>
      <div class="emoji-tags">${item.category}</div>
    `;
    const activate = () => {
      setSelected(item);
      copyText(item.emoji);
      addRecent(item);
    };
    card.onclick = activate;
    card.onkeydown = e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate();
      }
    };
    card.querySelector('.fav-btn').onclick = e => {
      e.stopPropagation();
      toggleFavorite(item.emoji);
    };
    emojiEls.grid.appendChild(card);
  });
}

function renderSideLists() {
  emojiEls.favCount.textContent = `${state.favorites.length} saved`;
  emojiEls.recentCount.textContent = `${state.recent.length} copied`;

  emojiEls.favList.innerHTML = '';
  if (!state.favorites.length) {
    emojiEls.favList.innerHTML = '<div class="empty">No favorites yet</div>';
  } else {
    state.favorites.map(emoji => emojiData.find(item => item.emoji === emoji)).filter(Boolean).forEach(item => {
      const btn = document.createElement('button');
      btn.className = 'mini-emoji';
      btn.innerHTML = `<span>${item.emoji}</span>${item.name}`;
      btn.onclick = () => {
        setSelected(item);
        copyText(item.emoji);
        addRecent(item);
      };
      emojiEls.favList.appendChild(btn);
    });
  }

  emojiEls.recentList.innerHTML = '';
  if (!state.recent.length) {
    emojiEls.recentList.innerHTML = '<div class="empty">No recent emojis</div>';
  } else {
    state.recent.map(emoji => emojiData.find(item => item.emoji === emoji)).filter(Boolean).forEach(item => {
      const btn = document.createElement('button');
      btn.className = 'mini-emoji';
      btn.innerHTML = `<span>${item.emoji}</span>${item.name}`;
      btn.onclick = () => {
        setSelected(item);
        copyText(item.emoji);
        addRecent(item);
      };
      emojiEls.recentList.appendChild(btn);
    });
  }
}

function copySelected() {
  copyText(state.selected.emoji);
  addRecent(state.selected);
}

function copySelectedAndClose() {
  copySelected();
}

function toggleFavoriteSelected() {
  toggleFavorite(state.selected.emoji);
}

function pickRandomEmoji() {
  const item = emojiData[Math.floor(Math.random() * emojiData.length)];
  setSelected(item);
  copyText(item.emoji);
  addRecent(item);
}

emojiEls.sort = emojiEls.sort || { value: 'popular' };
renderChips();
setSelected(state.selected);
renderEmojiGrid();
renderSideLists();

window.renderEmojis = renderEmojiGrid;
window.copySelected = copySelected;
window.copySelectedAndClose = copySelectedAndClose;
window.toggleFavoriteSelected = toggleFavoriteSelected;
window.pickRandomEmoji = pickRandomEmoji;
