const tg = window.Telegram.WebApp;
tg.expand();

const userId = tg.initDataUnsafe?.user?.id || "test-user";
const backendUrl = window.location.href.includes("127.0.0.1")
  ? "http://localhost:3000"
  : "https://smartsavedmessages.onrender.com";

async function loadMessages() {
  const response = await fetch(`${backendUrl}/messages/${userId}`);
  const messages = await response.json();
  const list = document.getElementById("messageList");
  list.innerHTML = messages.map((msg) => `<li>${msg}</li>`).join("");
}

// eslint-disable-next-line no-unused-vars
async function sendMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value;
  if (!text) return;

  await fetch(`${backendUrl}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, text }),
  });

  input.value = "";
  loadMessages();
}

loadMessages();
