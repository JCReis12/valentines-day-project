const SITE_CONFIG = {
  coupleName: "[nome do destinatário] & [nome do remetente]",
  relationshipStart: "2021-06-12T19:30:00",
  photos: [
    {
      tag: "CAPÍTULO 01 · MIRANTE AO ENTARDECER",
      caption:
        "“Nosso pôr do sol inesquecível na montanha — onde o mundo pareceu parar só para nós.”",
      meta: "⌖ Mirante das Alturas　•　Luz dourada e abraço apertado",
    },
    {
      tag: "CAPÍTULO 02 · UM DIA SÓ NOSSO",
      caption:
        "“Em qualquer paisagem, o meu lugar favorito continua sendo ao seu lado.”",
      meta: "⌖ Nossos caminhos　•　Risos e mãos entrelaçadas",
    },
    {
      tag: "CAPÍTULO 03 · HORIZONTES NOVOS",
      caption: "“A melhor parte de viajar é descobrir o mundo com você.”",
      meta: "⌖ Estrada afora　•　Playlist alta e coração leve",
    },
    {
      tag: "CAPÍTULO 04 · LUZ DE FIM DE TARDE",
      caption: "“Alguns instantes merecem morar para sempre na memória.”",
      meta: "⌖ Nosso cantinho　•　Calma, carinho e céu aberto",
    },
    {
      tag: "CAPÍTULO 05 · O NOSSO LUGAR",
      caption:
        "“A vida fica mais bonita quando todos os caminhos levam a nós.”",
      meta: "⌖ Para sempre　•　O melhor capítulo ainda é o próximo",
    },
  ],
};
document.body.classList.add("reveal-ready");
const storyCards = document.querySelectorAll(".story-card");
const storyCardObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.2 },
);
storyCards.forEach((card) => storyCardObserver.observe(card));
const ENVELOPE_CONFIG = {
  openingDuration: 1350,
};
const envelopeScene = document.getElementById("envelope-scene");
const envelopeSeal = document.getElementById("envelope-seal");
let envelopeState = "CLOSED";

function setEnvelopeState(state) {
  envelopeState = state;
  envelopeScene.dataset.envelopeState = state.toLowerCase();
}

const envelopeObserver = new IntersectionObserver(
  ([entry], observer) => {
    if (!entry.isIntersecting) return;
    envelopeScene.classList.add("is-visible");
    observer.unobserve(envelopeScene);
  },
  { threshold: 0.18 },
);
envelopeObserver.observe(envelopeScene);

envelopeSeal.addEventListener("click", () => {
  if (envelopeState !== "CLOSED") return;
  envelopeSeal.setAttribute("aria-expanded", "true");
  setEnvelopeState("OPENING");

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setEnvelopeState("OPENED");
    return;
  }

  window.setTimeout(() => {
    setEnvelopeState("OPENED");
  }, ENVELOPE_CONFIG.openingDuration);
});
const photo = document.getElementById("main-photo"),
  thumbnails = document.getElementById("thumbnails");
let currentPhoto = 0;
function showPhoto(index) {
  currentPhoto =
    (index + SITE_CONFIG.photos.length) % SITE_CONFIG.photos.length;
  const item = SITE_CONFIG.photos[currentPhoto];
  photo.style.opacity = ".25";
  window.setTimeout(() => {
    photo.style.opacity = "1";
  }, 100);
  document.getElementById("photo-tag").textContent = `♥ ${item.tag}`;
  document.getElementById("photo-caption").textContent = item.caption;
  document.getElementById("photo-meta").textContent = item.meta;
  [...thumbnails.children].forEach((thumb, i) =>
    thumb.classList.toggle("active", i === currentPhoto),
  );
}
SITE_CONFIG.photos.forEach((item, index) => {
  const thumb = document.createElement("img");
  thumb.src = "img/image.png";
  thumb.alt = item.tag;
  thumb.className = "thumbnail";
  thumb.style.objectPosition = `${20 + index * 18}% 50%`;
  thumb.addEventListener("click", () => showPhoto(index));
  thumbnails.appendChild(thumb);
});
document
  .querySelector(".prev")
  .addEventListener("click", () => showPhoto(currentPhoto - 1));
document
  .querySelector(".next")
  .addEventListener("click", () => showPhoto(currentPhoto + 1));
showPhoto(0);
function elapsed(start, end) {
  let years = end.getFullYear() - start.getFullYear(),
    months = end.getMonth() - start.getMonth(),
    cursor = new Date(start);
  cursor.setFullYear(cursor.getFullYear() + years);
  cursor.setMonth(cursor.getMonth() + months);
  if (cursor > end) {
    months--;
    cursor = new Date(start);
    cursor.setFullYear(cursor.getFullYear() + years);
    cursor.setMonth(cursor.getMonth() + months);
  }
  let remainder = end - cursor;
  const days = Math.floor(remainder / 86400000);
  remainder %= 86400000;
  const hours = Math.floor(remainder / 3600000);
  remainder %= 3600000;
  const minutes = Math.floor(remainder / 60000);
  remainder %= 60000;
  const seconds = Math.floor(remainder / 1000);
  return { years, months, days, hours, minutes, seconds };
}
function updateCounter() {
  const values = elapsed(new Date(SITE_CONFIG.relationshipStart), new Date());
  const labels = [
    ["years", "anos"],
    ["months", "meses"],
    ["days", "dias"],
    ["hours", "horas"],
    ["minutes", "minutos"],
    ["seconds", "segundos"],
  ];
  document.getElementById("contador").innerHTML = labels
    .filter(([key]) => values[key] > 0)
    .map(
      ([key, label]) =>
        `<div class="unit"><strong>${String(values[key]).padStart(2, "0")}</strong><small>${label}</small></div>`,
    )
    .join("");
}
updateCounter();
window.setInterval(updateCounter, 1000);
document.getElementById("heart-button").addEventListener("click", () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (let i = 0; i < 34; i++) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = Math.random() > 0.25 ? "♥" : "✦";
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.top = `${-10 - Math.random() * 10}px`;
    heart.style.color = ["#c0144b", "#ed5b77", "#f5b938", "#d87591"][i % 4];
    heart.style.setProperty("--drift", `${(Math.random() - 0.5) * 180}px`);
    heart.style.animationDelay = `${Math.random() * 0.7}s`;
    document.body.appendChild(heart);
    window.setTimeout(() => heart.remove(), 3700);
  }
});
