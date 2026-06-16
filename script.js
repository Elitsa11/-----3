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

const chatWindow = document.getElementById('chatWindow');
const startButton = document.getElementById('startButton');
const subscriberCountEl = document.getElementById('subscriberCount');
let messageTimer = null;
let messageCount = 0;
let subscribers = 12300;

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function renderMessage(author, text, authorColor, messageColor, alignRight = false, isDonation = false) {
  const messageEl = document.createElement('div');
  messageEl.className = `message${alignRight ? ' user-right' : ''}${isDonation ? ' donation' : ''}`;
  messageEl.style.borderColor = messageColor;

  const avatarEl = document.createElement('div');
  avatarEl.className = 'avatar';
  avatarEl.textContent = author.charAt(0).toUpperCase();

  const bodyEl = document.createElement('div');
  bodyEl.className = 'message-body';
  bodyEl.innerHTML = `
    <strong style="color: ${authorColor};">${author}</strong>
    <span>${text}</span>
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

  if (Math.random() < 0.25) {
    text = getRandomItem(donationMessages);
    isDonation = true;
  } else {
    text = getRandomItem(messages);
    const emojis = ['😊', '😉', '🚀', '🔥', '✨', '💬', '👍'];
    if (Math.random() < 0.4) {
      text += ' ' + getRandomItem(emojis);
    }
  }

  const authorColor = getRandomItem(nameColors);
  const messageColor = getRandomItem(messageColors);
  const alignRight = Math.random() > 0.5;
  renderMessage(author, text, authorColor, messageColor, alignRight, isDonation);

  if (isDonation || Math.random() < 0.2) {
    playAlertSound();
  }

  addFakeSubscribers();
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
  subscriberCountEl.textContent = getSubscriberText(subscribers);

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
