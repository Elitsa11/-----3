const users = [
  'Луна', 'Мартин', 'Рени', 'Алекс', 'Силвия', 'Даниел', 'Иван', 'Надежда', 'Яна', 'Стефан'
];

const messages = [
  'Здравейте всички!',
  'Някой има ли идея как да решим задачата?',
  'Аз вече пробвах няколко варианта и работи добре.',
  'Това изглежда супер интересно!',
  'Имам предложение за нова тема.',
  'Ще изпратя пример по-късно.',
  'Хубав ден на всички!',
  'Много добра работа досега.',
  'Кой иска да започне първи?',
  'Впечатлен съм от резултата.'
];

const donationMessages = [
  'ShadowX donated $100',
  'PixselPro donated $20',
  'CyberWolf donated $500',
  'LegendaryStar donated $75',
  'NovaQueen donated $150'
];

const nameColors = ['red', 'cyan', 'lime', 'orange'];
const messageColors = ['#ff8a65', '#4dd0e1', '#ffab40', '#9ccc65', '#7986cb', '#ec407a', '#26a69a', '#7e57c2'];
const avatarBackgrounds = ['#8e44ad', '#16a085', '#d35400', '#2980b9', '#c0392b', '#27ae60', '#f39c12', '#2c3e50'];
const moderators = ['Алекс', 'Иван', 'Силвия'];
const bannedMessages = [
  'Visit my channel for free coins',
  'Click this link for followers',
  'Buy cheap subscribers now',
  'Get hack tool here',
  'Earn money fast'
];
const bannedWords = ['free', 'followers', 'hack', 'earn money', 'cheap'];

const chatWindow = document.getElementById('chatWindow');
const startButton = document.getElementById('startButton');
const subscriberCountEl = document.getElementById('subscriberCount');
const viewerCountEl = document.getElementById('viewerCount');
let messageTimer = null;
let messageCount = 0;
let subscribers = 12300;
let viewers = 1200;

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getSubscriberText(amount) {
  if (amount >= 1000) {
    return (amount / 1000).toFixed(1) + 'K';
  }
  return amount.toString();
}

function getViewerText(amount) {
  if (amount >= 1000) {
    return (amount / 1000).toFixed(1) + 'K';
  }
  return amount.toString();
}

function updateViewerCount() {
  if (Math.random() < 0.6) {
    const change = Math.floor(Math.random() * 10) + 3;
    viewers = Math.max(420, viewers + (Math.random() < 0.3 ? -change : change));
    viewerCountEl.textContent = getViewerText(viewers);
  }
}

function isBannedMessage(text) {
  return bannedWords.some(word => text.toLowerCase().includes(word.toLowerCase()));
}

function createAvatarUrl(name) {
  const initials = name
    .split(' ')
    .map(part => part.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const bg = getRandomItem(avatarBackgrounds);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128"><rect width="128" height="128" rx="28" fill="${bg}"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Segoe UI, sans-serif" font-weight="700" font-size="56" fill="#ffffff">${initials}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function renderMessage(author, text, authorColor, messageColor, alignRight = false, isDonation = false, isModerator = false, isBlocked = false) {
  const messageEl = document.createElement('div');
  messageEl.className = `message${alignRight ? ' user-right' : ''}${isDonation ? ' donation' : ''}${isBlocked ? ' banned' : ''}`;
  messageEl.style.borderColor = messageColor;

  const avatarEl = document.createElement('div');
  avatarEl.className = 'avatar';
  const avatarUrl = createAvatarUrl(author);
  avatarEl.style.backgroundImage = `url('${avatarUrl}')`;

  const bodyEl = document.createElement('div');
  bodyEl.className = 'message-body';
  const badgeHtml = isModerator ? '<span class="badge">MOD</span>' : '';
  const displayText = isBlocked ? 'Съобщението е блокирано от модератор.' : text;

  bodyEl.innerHTML = `
    <strong style="color: ${authorColor};">${author} ${badgeHtml}</strong>
    <span>${displayText}</span>
  `;

  messageEl.appendChild(avatarEl);
  messageEl.appendChild(bodyEl);
  chatWindow.appendChild(messageEl);
  requestAnimationFrame(() => {
    chatWindow.scrollTop = chatWindow.scrollHeight;
  });
}

function getSubscriberText(amount) {
  if (amount >= 1000) {
    return (amount / 1000).toFixed(1) + 'K';
  }
  return amount.toString();
}

function addFakeSubscribers() {
  if (Math.random() < 0.3) {
    const boost = Math.floor(Math.random() * 25) + 5;
    subscribers += boost;
    subscriberCountEl.textContent = getSubscriberText(subscribers);
  }
}

function playAlertSound() {
  const tone = new Audio('data:audio/wav;base64,UklGRhQAAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YVQAAAAA');
  tone.volume = 0.2;
  tone.play().catch(() => {});
}

function generateMessage() {
  const author = getRandomItem(users);
  let text;
  let isDonation = false;
  let isBlocked = false;
  const isModerator = moderators.includes(author) || Math.random() < 0.1;

  if (Math.random() < 0.18) {
    text = getRandomItem(bannedMessages);
    isBlocked = true;
  } else if (Math.random() < 0.25) {
    text = getRandomItem(donationMessages);
    isDonation = true;
  } else {
    text = getRandomItem(messages);
    const emojis = ['😊', '😉', '🚀', '🔥', '✨', '💬', '👍'];
    if (Math.random() < 0.4) {
      text += ' ' + getRandomItem(emojis);
    }
    if (isBannedMessage(text)) {
      isBlocked = true;
    }
  }

  const authorColor = getRandomItem(nameColors);
  const messageColor = getRandomItem(messageColors);
  const alignRight = Math.random() > 0.5;
  renderMessage(author, text, authorColor, messageColor, alignRight, isDonation, isModerator, isBlocked);

  if (isDonation || isBlocked || Math.random() < 0.2) {
    playAlertSound();
  }

  addFakeSubscribers();
  updateViewerCount();
}

function startChat() {
  if (messageTimer) {
    return;
  }

  startButton.disabled = true;
  startButton.textContent = 'CHAT RUNNING';
  messageCount = 0;
  chatWindow.innerHTML = '';
  subscribers = 12300;
  viewers = 1200;
  subscriberCountEl.textContent = getSubscriberText(subscribers);
  viewerCountEl.textContent = getViewerText(viewers);

  generateMessage();
  setTimeout(generateMessage, 500);

  messageTimer = setInterval(() => {
    generateMessage();
    messageCount += 1;
    if (messageCount >= 18) {
      clearInterval(messageTimer);
      messageTimer = null;
      startButton.disabled = false;
      startButton.textContent = 'START CHAT';
    }
  }, 1100);
}

startButton.addEventListener('click', startChat);
