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

const colors = [
  '#ff8a65', '#4dd0e1', '#ffab40', '#9ccc65', '#7986cb', '#ec407a', '#26a69a', '#7e57c2'
];

const chatWindow = document.getElementById('chatWindow');
const startButton = document.getElementById('startButton');
let messageTimer = null;
let messageCount = 0;

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function renderMessage(author, text, color, alignRight = false) {
  const messageEl = document.createElement('div');
  messageEl.className = `message${alignRight ? ' user-right' : ''}`;
  messageEl.style.color = color;
  messageEl.innerHTML = `
    <strong>${author}</strong>
    <span>${text}</span>
  `;
  chatWindow.appendChild(messageEl);
  chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' });
}

function generateMessage() {
  const author = getRandomItem(users);
  const text = getRandomItem(messages);
  const color = getRandomItem(colors);
  const alignRight = Math.random() > 0.5;
  renderMessage(author, text, color, alignRight);
}

function startChat() {
  if (messageTimer) {
    return;
  }

  startButton.disabled = true;
  startButton.textContent = 'CHAT RUNNING';
  messageCount = 0;
  chatWindow.innerHTML = '';

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
