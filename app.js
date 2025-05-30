const chatBox = document.getElementById('chatBox');
const form = document.getElementById('messageForm');
const input = document.getElementById('messageInput');
const usernameInput = document.getElementById('username');

// Önceki mesajları yükle
function loadMessages() {
  const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
  chatBox.innerHTML = "";
  messages.forEach(msg => {
    const div = document.createElement('div');
    div.textContent = `${msg.name}: ${msg.text}`;
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

// Her 1 saniyede bir yenile
setInterval(loadMessages, 1000);

// İlk açılışta yükle
loadMessages();
