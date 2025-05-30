const chatBox = document.getElementById('chatBox');
const form = document.getElementById('messageForm');
const input = document.getElementById('messageInput');
const usernameInput = document.getElementById('username');
const clearButton = document.getElementById('clearChat');

function loadMessages() {
  const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
  chatBox.innerHTML = "";
  messages.forEach(msg => {
    const div = document.createElement('div');
    div.classList.add('chat-message');
    div.classList.add(msg.name === usernameInput.value ? 'you' : 'other');

    if (msg.name !== usernameInput.value) {
      const sender = document.createElement('span');
      sender.classList.add('sender');
      sender.textContent = msg.name;
      div.appendChild(sender);
    }

    const messageText = document.createTextNode(msg.text);
    div.appendChild(messageText);
    chatBox.appendChild(div);
  });
  chatBox.scrollTop = chatBox.scrollHeight;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = usernameInput.value.trim();
  const text = input.value.trim();
  if (!name || !text) return;

  const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
  messages.push({ name, text });
  localStorage.setItem('chatMessages', JSON.stringify(messages));
  
  input.value = '';
  loadMessages();
});

clearButton.addEventListener('click', () => {
  localStorage.removeItem('chatMessages');
  loadMessages();
});

setInterval(loadMessages, 1000);
loadMessages();
