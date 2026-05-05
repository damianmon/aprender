/* ==========================================================================
   🐭 WHACK-A-MOLE — Tu turno de construirlo
   Conceptos: setInterval, clearInterval, setTimeout, localStorage

   INSTRUCCIONES GENERALES:
   - Hay 8 pasos numerados. Hacelos en orden, uno a la vez.
   - Abrí el index.html en el navegador para ver el resultado en vivo.
   - Usá console.log() para depurar si algo no funciona.
   - ¡No te saltes ningún paso! Cada uno depende del anterior.
========================================================================== */

// ============================================================
// 📦 VARIABLES DE ESTADO — Ya están escritas, no las toques
// Estas variables guardan la "memoria" del juego en todo momento.
// ============================================================
let puntaje = 0;
let tiempoRestante = 30;
let intervaloTopo = null; // Va a guardar el ID del setInterval de los topos
let intervaloTimer = null; // Va a guardar el ID del setInterval del reloj
let juegoActivo = false;
let hoyoActivo = null; // El hoyo que tiene el topo visible en este momento

// ============================================================
// 🔌 CONEXIONES AL DOM — Ya están escritas, no las toques
// ============================================================
const displayPuntaje = document.querySelector("#puntaje");
const displayTiempo = document.querySelector("#tiempo");
const displayHighScore = document.querySelector("#high-score");
const btnIniciar = document.querySelector("#btn-iniciar");
const hoyos = document.querySelectorAll(".hoyo");
const mensajeFinal = document.querySelector("#mensaje-final");
const textoFinal = document.querySelector("#texto-final");

// =======================
// PASO 1
// =======================
function cargarHighScore() {
  const highScore = localStorage.getItem("whack-highscore");
  displayHighScore.textContent = highScore !== null ? highScore : "0";
}

// =======================
// PASO 2
// =======================
function actualizarHighScore() {
  const highScore = Number(localStorage.getItem("whack-highscore")) || 0;

  if (puntaje > highScore) {
    localStorage.setItem("whack-highscore", puntaje);
    displayHighScore.textContent = puntaje;
    return true;
  }

  return false;
}

// =======================
// PASO 3
// =======================
function hoyoAleatorio() {
  const numeroAleatorio = Math.floor(Math.random() * hoyos.length);
  return hoyos[numeroAleatorio];
}

// =======================
// PASO 4
// =======================
function mostrarTopo() {
  if (hoyoActivo !== null) {
    hoyoActivo.classList.remove("visible");
  }

  hoyoActivo = hoyoAleatorio(); // 👈 importante ()
  hoyoActivo.classList.add("visible");

  setTimeout(() => {
    if (hoyoActivo === hoyoActivo) {
      hoyoActivo.classList.remove("visible");
    }
  }, 800);
}

// =======================
// PASO 5
// =======================
function golpearTopo(evento) {
  if (!juegoActivo) return;

  const hoyo = evento.currentTarget;

  if (!hoyo.classList.contains("visible")) return;

  puntaje++;
  displayPuntaje.textContent = puntaje;

  hoyo.classList.remove("visible");
  hoyo.classList.add("golpeado");

  setTimeout(() => {
    hoyo.classList.remove("golpeado");
  }, 300);

  hoyoActivo = null;
}

// =======================
// PASO 6
// =======================
function iniciarPartida() {
  puntaje = 0;
  tiempoRestante = 30;
  juegoActivo = true;

  displayPuntaje.textContent = puntaje;
  displayTiempo.textContent = tiempoRestante;

  mensajeFinal.classList.add("oculto");

  btnIniciar.disabled = true;

  mostrarTopo();

  intervaloTopo = setInterval(mostrarTopo, 900);

  intervaloTimer = setInterval(() => {
    tiempoRestante--;
    displayTiempo.textContent = tiempoRestante;

    if (tiempoRestante <= 0) {
      terminarPartida();
    }
  }, 1000);
}
// PASO 7 — Terminar la partida

function terminarPartida() {
  juegoActivo = false;

  clearInterval(intervaloTopo);
  clearInterval(intervaloTimer);

  if (hoyoActivo !== null) {
    hoyoActivo.classList.remove("visible");
    hoyoActivo = null;
  }

  const esRecord = actualizarHighScore();

  if (esRecord) {
    textoFinal.textContent = `🏆 ¡Nuevo récord! Puntaje: ${puntaje}`;
  } else {
    textoFinal.textContent = `🎯 Puntaje final: ${puntaje}`;
  }

  mensajeFinal.classList.remove("oculto");

  btnIniciar.disabled = false;
  btnIniciar.textContent = "🔄 Jugar de nuevo";
}

// ============================================================
// PASO 8 — Conectar los eventos

// TU CÓDIGO AQUÍ 👇
btnIniciar.addEventListener("click", iniciarPartida);
hoyos.forEach((hoyo) => {
  hoyo.addEventListener("click", golpearTopo);
});

// ============================================================
// 🚀 ARRANQUE — Ya está escrito, no lo toques
// ============================================================
cargarHighScore();
