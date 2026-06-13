const startScreen = document.getElementById("startScreen");
const countdownScreen = document.getElementById("countdownScreen");
const countdownNumber = document.getElementById("countdownNumber");

const startBtn = document.getElementById("startBtn");
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");

const openBookBtn = document.getElementById("openBookBtn");
const closeBookBtn = document.getElementById("closeBookBtn");
const scrapbookOverlay = document.getElementById("scrapbookOverlay");

const mainTitle = document.getElementById("mainTitle");
const mainSubtitle = document.getElementById("mainSubtitle");

const bookPageTitle = document.getElementById("bookPageTitle");
const bookImage = document.getElementById("bookImage");
const bookPhotoCaption = document.getElementById("bookPhotoCaption");
const bookMessage = document.getElementById("bookMessage");
const bookDate = document.getElementById("bookDate");

const prevPageBtn = document.getElementById("prevPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");

/* =========================
   SETTING EDIT DI SINI
========================= */

const websiteSetting = {
  countdownTime: 3,

  mainTitle: "I Love You",
  mainSubtitle: "Setiap cerita kecil tentang kamu selalu menjadi bagian paling indah. #edisigabut",

  rainText: "I Love You",
  rainColorOne: "#ffffff",
  rainColorTwo: "#ffd1e8",

  heartEffect: true,

  musicUrl: "laguu/laguuu.mp3"
};

const scrapbookPages = [
  {
    title: "Memories karoke",
    image: "foto/foto1.jpg",
    caption: "biar mancung",
    message: "Kalau lupa ini dimana ini kita karokean di berdua doang dan lu pura-pura tidur sambil gw elus-elus tuh pala",
    date: "karoke"
  },
  {
    title: "After karoke",
    image: "foto/foto2.jpg",
    caption: "bandel banget",
    message: "ini kita makan ayam after karoke",
    date: "makan ayam"
  },
  {
    title: "Helm",
    image: "foto/foto3.jpg",
    caption: "lucuuu awww",
    message: "disini lu lucu banget makanya gw foto shitmen ini gw pen bawa pulanggggg argggg",
    date: "helm lucu"
  },
  {
    title: "Kost main kartu",
    image: "foto/foto4.jpg",
    caption: "lu sok jago padahal cupu",
    message: "disini lu kek gk mau kalah banget kek ya udah lah karna lu kalah beberapa kali dan ego lu kesenggol gw ngalah aja siii",
    date: "si kompetitif"
  },
  {
    title: "Graduate",
    image: "foto/foto5.jpg",
    caption: "Happy Graduate",
    message: "lu dan yang lain mungkin ngerasa make up nya jelek tapi gw liat tetep aja cantik kok,lebih malah",
    date:"cakeppp kok ajggggg"
  },
  {
    title: "gk tau ini kapan dan dimana",
    image: "foto/foto6.jpg",
    caption: "aku suka ekspresi lu disini",
    message: "gw pilih foto ini karna ini lucu sihhh wkwkwk itu aja",
    date: "jenongnyan membuat goyah",
  },
  {
    title: "pap dari lu",
    image: "foto/foto7.jpg",
    caption: "NPD",
    message: "ekspresi lu lucu banget pen gw jadiin stickerrrr wkwkwk",
    date: "pap dari lu",
  }
];

/* =========================
   PROGRAM WEBSITE
========================= */

let musicPlaying = false;
let currentPage = 0;

mainTitle.textContent = websiteSetting.mainTitle;
mainSubtitle.textContent = websiteSetting.mainSubtitle;
bgMusic.src = websiteSetting.musicUrl;

startBtn.addEventListener("click", function () {
  startScreen.classList.add("hidden");
  startCountdown();
});

function startCountdown() {
  countdownScreen.classList.remove("hidden");

  let time = websiteSetting.countdownTime;
  countdownNumber.textContent = time;

  const countdownInterval = setInterval(function () {
    time--;
    countdownNumber.textContent = time;

    if (time <= 0) {
      clearInterval(countdownInterval);
      countdownScreen.classList.add("hidden");
      playMusic();
    }
  }, 1000);
}

/* MUSIC */

function playMusic() {
  bgMusic.play()
    .then(function () {
      musicPlaying = true;
      musicBtn.textContent = "⏸";
    })
    .catch(function () {
      musicPlaying = false;
      musicBtn.textContent = "▶";
    });
}

function pauseMusic() {
  bgMusic.pause();
  musicPlaying = false;
  musicBtn.textContent = "▶";
}

musicBtn.addEventListener("click", function () {
  if (musicPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
});

/* HUJAN TULISAN */

function createRainText() {
  const text = document.createElement("div");

  text.className = "rain-text";
  text.textContent = websiteSetting.rainText;

  const randomLeft = Math.random() * window.innerWidth;
  const randomDuration = 3 + Math.random() * 4;
  const randomSize = 14 + Math.random() * 18;

  const selectedColor =
    Math.random() > 0.5
      ? websiteSetting.rainColorOne
      : websiteSetting.rainColorTwo;

  text.style.left = randomLeft + "px";
  text.style.color = selectedColor;
  text.style.fontSize = randomSize + "px";
  text.style.animationDuration = randomDuration + "s";

  document.body.appendChild(text);

  setTimeout(function () {
    text.remove();
  }, randomDuration * 1000);
}

setInterval(createRainText, 320);

/* EFEK HATI */

function createHeart() {
  if (!websiteSetting.heartEffect) return;

  const heart = document.createElement("div");

  const heartList = ["💗", "💖", "💕", "💘", "🤍"];

  heart.className = "heart";
  heart.textContent = heartList[Math.floor(Math.random() * heartList.length)];

  const randomLeft = Math.random() * window.innerWidth;
  const randomDuration = 4 + Math.random() * 4;
  const randomSize = 20 + Math.random() * 22;

  heart.style.left = randomLeft + "px";
  heart.style.fontSize = randomSize + "px";
  heart.style.animationDuration = randomDuration + "s";

  document.body.appendChild(heart);

  setTimeout(function () {
    heart.remove();
  }, randomDuration * 1000);
}

setInterval(createHeart, 700);

/* SCRAPBOOK */

openBookBtn.addEventListener("click", function () {
  scrapbookOverlay.classList.remove("hidden");
  renderScrapbookPage();
});

closeBookBtn.addEventListener("click", function () {
  scrapbookOverlay.classList.add("hidden");
});

nextPageBtn.addEventListener("click", function () {
  currentPage++;

  if (currentPage >= scrapbookPages.length) {
    currentPage = 0;
  }

  renderScrapbookPage();
});

prevPageBtn.addEventListener("click", function () {
  currentPage--;

  if (currentPage < 0) {
    currentPage = scrapbookPages.length - 1;
  }

  renderScrapbookPage();
});

function renderScrapbookPage() {
  const page = scrapbookPages[currentPage];

  bookPageTitle.textContent = page.title;
  bookImage.src = page.image;
  bookPhotoCaption.textContent = page.caption;
  bookMessage.textContent = page.message;
  bookDate.textContent = page.date;
}

scrapbookOverlay.addEventListener("click", function (event) {
  if (event.target === scrapbookOverlay) {
    scrapbookOverlay.classList.add("hidden");
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    scrapbookOverlay.classList.add("hidden");
  }
});