const currentUser = "Nhan Pham";

const STORIES = [
  {
    user: "Mai Cao",
    video: "apt_dance.mp4",
    delay: 0,
    time: "12:12",
    already: true,
    image: "mai.jpg",
  },
  {
    user: "Duy Huynh",
    message: "OMG, have you seen the dance video that just dropped in the group?! 😂",
    time: "12:14",
    delay: 6500,
    image: "duy.jpg",
  },
  {
    user: "Tram Pham",
    message: "Yes! Is it 2023 again?! I can't believe they chose 'Houdini' by Dua Lipa.",
    time: "12:14",
    delay: 2500,
    image: "tram.jpg",
  },
  {
    user: "Tuan Nguyen",
    message: "It's like a time capsule from last year! Hilarious but... yikes. 😅",
    time: "12:14",
    delay: 4500,
    image: "tuan.jpg",
  },
  {
    user: "Nhan Pham", // Come on, we're just embracing the classics!
    time: "12:14",
    image: "nhan.jpg",
  },
  {
    user: "GiangHuong Nguyen",
    message: "I mean, the dance moves were… something.",
    time: "12:14",
    delay: 3500,
    image: "huong.png",
  },
  {
    user: "GiangHuong Nguyen",
    message: "Did anyone else cringe when they tried that black and white style?",
    time: "12:14",
    delay: 2500,
    image: "huong.png",
  },
  {
    user: "Kien Nguyen",
    message: "The wardrobe, though… throwback or throw it out?",
    time: "12:15",
    delay: 4500,
    image: "kien.jpg",
  },
  {
    user: "Hang Nguyen",
    message: "Who choreographed this? My grandma? 💃",
    time: "12:15",
    delay: 3500,
    image: "hang.jpg",
  },
  {
    user: "Hang Nguyen",
    message: "It’s like they were channeling their inner dance machine from last year.",
    time: "12:15",
    delay: 4500,
    image: "hang.jpg",
  },
  {
    user: "Nhan Pham", // "The grandma's got some moves. Don't underestimate her =))"
    time: "12:16",
    image: "nhan.jpg",
  },
  {
    user: "Hang Nguyen",
    message: "I think it's time for an upgrade. How about something from this year?",
    time: "12:15",
    delay: 3500,
    image: "hang.jpg",
  },
  {
    user: "Trang Phan",
    message: "Yes! ‘Đừng làm trái tim anh đau’ anyone?",
    time: "12:16",
    delay: 5000,
    image: "trang.jpg",
  },
  {
    user: "Mai Cao",
    message: "CHALLENGE ACCEPTED!!!",
    time: "12:16",
    delay: 7000,
    image: "mai.jpg",
  },
  {
    user: "Mai Cao",
    video: "apt_dance.mp4",
    delay: 3000,
    time: "12:16",
    already: true,
    image: "mai.jpg",
  },
];

const chatbox = document.querySelector("[data-chatbox]");
const chatboxInput = document.querySelector("[data-chatbox-input]");
let lastUser = null;

window.addEventListener("load", () => {
  setTimeout(() => {
    start();
  }, 1000);
});

async function start() {
  document.querySelectorAll(".block").forEach((b) => b.classList.remove("active"));

  document.querySelector("[data-start]").classList.remove("unread");
  document.querySelector("[data-start]").classList.add("active");
  document.querySelector("[data-chat-name]").textContent = "1111F.1111";
  document.querySelector("[data-chat-img]").src = "images/group.jpg";
  document.querySelector("[data-new-count]").remove();
  chatbox.innerHTML = "";

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
      createMessageElement(currentUser, message, story.time, false, "nhan.jpg");
      chatbox.scrollTop = chatbox.scrollHeight;
    } else {
      await new Promise((resolve) => setTimeout(resolve, story.delay));
      if (story.message != null) createMessageElement(story.user, story.message, story.time, story.already, story.image);
      else if (story.video != null) createVideoElement(story.user, story.video, story.time, story.image);

      chatbox.scrollTop = chatbox.scrollHeight;
    }
  }
}

function createMessageElement(user, message, time, already = false, image = user) {
  const messageElement = document.createElement("div");

  messageElement.classList.add("message", user === currentUser ? "my_message" : "frnd_message");
  messageElement.innerHTML = `
    <div class="userimg ${user === lastUser ? "hidden" : ""}">
      <img src="images/${image}" class="cover" />
    </div>
    <div class="message_content">
      ${user !== lastUser ? `<h4>${user}</h4>` : ""}
      <p>${message}<br /><span>${time}</span></p>
    </div>
  `;

  if (already) {
    messageElement.classList.add("already");
  }

  chatbox.appendChild(messageElement);
  setTimeout(() => {
    messageElement.classList.add("show");
  }, 10);

  lastUser = user;
}

function createVideoElement(user, video, time, image) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", "video_message");
  messageElement.innerHTML = `
    <div class="userimg">
      <img src="images/${image}" class="cover" />
    </div>
    <div class="message_content">
      <h4>${user}</h4>
      <div class="video_container">
        <video>
          <source src="videos/${video}" type="video/mp4" />
        </video>
        <div class="play_button"></div>
      </div>
      <span class="message-time">${time}</span>
    </div>
  `;
  chatbox.appendChild(messageElement);
  setTimeout(() => {
    messageElement.classList.add("show");
  }, 10);

  const videoElement = messageElement.querySelector("video");
  const playButton = messageElement.querySelector(".play_button");

  playButton.addEventListener("click", () => {
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    } else if (videoElement.mozRequestFullScreen) {
      videoElement.mozRequestFullScreen();
    } else if (videoElement.webkitRequestFullscreen) {
      videoElement.webkitRequestFullscreen();
    } else if (videoElement.msRequestFullscreen) {
      videoElement.msRequestFullscreen();
    }
    videoElement.play();
  });
}
