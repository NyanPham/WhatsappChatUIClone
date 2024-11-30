const currentUser = "nhanpham";

const STORIES = [
  {
    user: "nhanpham",
    time: "12:15",
  },
  {
    user: "maicao",
    message: "Nang qua may ba oi",
    delay: 3000,
    time: "12:16",
  },
  {
    user: "maicao",
    message: "Nang qua may ba oi",
    delay: 3000,
    time: "12:16",
  },
  {
    user: "trampham",
    message: "Quan que",
    delay: 1500,
    time: "12:16",
  },
];

const chatbox = document.querySelector("[data-chatbox]");
const chatboxInput = document.querySelector("[data-chatbox-input]");
let lastUser = null;

window.addEventListener("load", async () => {
  for (let story of STORIES) {
    if (story.user === currentUser) {
      await new Promise((resolve) => {
        document.addEventListener("keypress", (e) => {
          if (e.key === "Enter") {
            resolve();
          }
        });
      });

      const message = chatboxInput.value;
      chatboxInput.value = "";
      createMessageElement(currentUser, message, story.time);
    } else {
      await new Promise((resolve) => setTimeout(resolve, story.delay));
      createMessageElement(story.user, story.message, story.time);
    }
  }
});

function createMessageElement(user, message, time) {
  const messageElement = document.createElement("div");

  messageElement.classList.add("message", user === currentUser ? "my_message" : "frnd_message");
  messageElement.innerHTML = `
    <div class="userimg ${user === lastUser ? "hidden" : ""}">
      <img src="images/${user}.jpg" class="cover" />
    </div>
    <div class="message_content">
      ${user !== lastUser ? `<h4>${user}</h4>` : ""}
      <p>${message}<br /><span>${time}</span></p>
    </div>
  `;

  chatbox.appendChild(messageElement);
  setTimeout(() => {
    messageElement.classList.add("show");
  }, 10);

  lastUser = user;
}
