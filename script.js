/* ===========================================================
   My Boo 💙 — interacciones
   - Splash con corazones animados en canvas
   - Contador de tiempo juntos
   - Revelado suave de la página
   - Música de fondo via iframe de YouTube (autoplay on user gesture)
   =========================================================== */

// ---------- Fecha de inicio de la relación ----------
const START_DATE = new Date("2022-08-03T00:00:00");

// ---------- Contador ----------
function updateCounter() {
  const now = new Date();
  const diff = now - START_DATE;

  const totalSeconds = Math.floor(diff / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours   = Math.floor(totalMinutes / 60);
  const totalDays    = Math.floor(totalHours / 24);

  const years  = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays % 365) / 30);
  const days   = Math.floor((totalDays % 365) % 30);
  const hours  = totalHours % 24;

  document.getElementById("cYears").textContent  = years;
  document.getElementById("cMonths").textContent = months;
  document.getElementById("cDays").textContent   = days;
 
}

updateCounter();
setInterval(updateCounter, 1000 * 60); // actualiza cada minuto

// ---------- Corazones en canvas ----------
const canvas  = document.getElementById("heartsCanvas");
const ctx     = canvas.getContext("2d");
let hearts    = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createHeart() {
  return {
    x:     Math.random() * canvas.width,
    y:     canvas.height + 30,
    size:  Math.random() * 20 + 10,
    speed: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.6 + 0.3,
    drift: (Math.random() - 0.5) * 0.8,
    symbol: Math.random() > 0.5 ? "💙" : "💖",
  };
}

function animateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  hearts.forEach((h, i) => {
    ctx.globalAlpha = h.opacity;
    ctx.font = `${h.size}px sans-serif`;
    ctx.fillText(h.symbol, h.x, h.y);
    h.y     -= h.speed;
    h.x     += h.drift;
    h.opacity -= 0.002;
    if (h.y < -30 || h.opacity <= 0) hearts.splice(i, 1);
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(animateHearts);
}
animateHearts();

// Genera nuevos corazones cada 300ms
setInterval(() => {
  if (hearts.length < 60) hearts.push(createHeart());
}, 300);

// ---------- Splash → revelar página ----------
const splash   = document.getElementById("splash");
const site     = document.getElementById("site");
const splashBtn = document.getElementById("splashBtn");

// Música via iframe de YouTube embebido de forma silenciosa
let musicStarted = false;

function startMusic() {
  if (musicStarted) return;
  musicStarted = true;

  const iframe = document.createElement("iframe");
  iframe.src = "https://www.youtube.com/embed/LjhCEhWiKXk?autoplay=1&loop=1&playlist=LjhCEhWiKXk&controls=0&mute=0";
  iframe.style.cssText = "position:fixed;bottom:-9999px;left:-9999px;width:1px;height:1px;";
  iframe.allow = "autoplay";
  document.body.appendChild(iframe);
}

splashBtn.addEventListener("click", () => {
  // Iniciar música
  startMusic();

  // Ocultar splash
  splash.classList.add("is-hidden");

  // Revelar sitio
  site.classList.add("is-visible");
});

// ---------- Animación de scroll (fade-in secciones) ----------
const sections = document.querySelectorAll(".about, .gallery, .story, .message");

const fadeObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      fadeObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

sections.forEach(s => {
  s.style.opacity    = "0";
  s.style.transform  = "translateY(24px)";
  s.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  fadeObs.observe(s);
});

// ---------- Sobre desplegable ----------
const envelope = document.getElementById("envelope");
if (envelope) {
  envelope.addEventListener("click", () => {
    envelope.classList.toggle("is-open");
  });
}

// ---------- Hover sombra en galería ----------
const gItems = document.querySelectorAll(".gallery__item");
gItems.forEach(item => {
  item.addEventListener("mouseenter", () => {
    item.style.boxShadow = "0 20px 40px rgba(37,99,235,0.18)";
  });
  item.addEventListener("mouseleave", () => {
    item.style.boxShadow = "";
  });
});