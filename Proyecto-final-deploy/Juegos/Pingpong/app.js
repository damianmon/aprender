/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("lienzoPong");
const ctx = canvas.getContext("2d");

const score1DOM = document.getElementById("score1");
const score2DOM = document.getElementById("score2");

let scoreP1 = 0;
let scoreP2 = 0;

// ======================================================
// CONTROLES
// ======================================================
const teclas = {
  w: false,
  s: false,
  ArrowUp: false,
  ArrowDown: false,
};

window.addEventListener("keydown", (e) => {
  if (teclas.hasOwnProperty(e.key)) teclas[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  if (teclas.hasOwnProperty(e.key)) teclas[e.key] = false;
});

// ======================================================
// PALETA
// ======================================================
class Paleta {
  constructor(x, y, ancho, alto, color) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.color = color;
    this.velocidad = 6;
  }

  dibujar() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.ancho, this.alto);
  }

  mover(arriba, abajo) {
    if (arriba && this.y > 0) this.y -= this.velocidad;
    if (abajo && this.y + this.alto < canvas.height) this.y += this.velocidad;
  }
}

// ======================================================
// PELOTA
// ======================================================
class Pelota {
  constructor(x, y, radio, color) {
    this.x = x;
    this.y = y;
    this.radio = radio;
    this.color = color;
    this.velX = 4;
    this.velY = 4;
  }

  dibujar() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  mover() {
    this.x += this.velX;
    this.y += this.velY;

    // Rebote arriba / abajo
    if (this.y - this.radio < 0 || this.y + this.radio > canvas.height) {
      this.velY *= -1;
    }
  }
}

// ======================================================
// INSTANCIAS
// ======================================================
const jugador1 = new Paleta(10, 150, 20, 100, "white");
const jugador2 = new Paleta(canvas.width - 30, 150, 20, 100, "white");
const pelota = new Pelota(canvas.width / 2, canvas.height / 2, 10, "white");

// ======================================================
// RESET
// ======================================================
function resetPelota() {
  pelota.x = canvas.width / 2;
  pelota.y = canvas.height / 2;

  pelota.velX *= -1;
  pelota.velY = Math.random() * 4 - 2;
}

// ======================================================
// GAME LOOP
// ======================================================
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Movimiento
  jugador1.mover(teclas.w, teclas.s);
  jugador2.mover(teclas.ArrowUp, teclas.ArrowDown);
  pelota.mover();

  // =========================
  // COLISIÓN JUGADOR 1 (FIX)
  // =========================
  if (
    pelota.velX < 0 &&
    pelota.x - pelota.radio < jugador1.x + jugador1.ancho &&
    pelota.x > jugador1.x &&
    pelota.y > jugador1.y &&
    pelota.y < jugador1.y + jugador1.alto
  ) {
    pelota.velX *= -1;
    pelota.x = jugador1.x + jugador1.ancho;

    // rebote según impacto
    let impacto =
      (pelota.y - (jugador1.y + jugador1.alto / 2)) / (jugador1.alto / 2);
    pelota.velY = impacto * 5;
  }

  // =========================
  // COLISIÓN JUGADOR 2
  // =========================
  if (
    pelota.velX > 0 &&
    pelota.x + pelota.radio > jugador2.x &&
    pelota.x < jugador2.x + jugador2.ancho &&
    pelota.y > jugador2.y &&
    pelota.y < jugador2.y + jugador2.alto
  ) {
    pelota.velX *= -1;
    pelota.x = jugador2.x - pelota.radio;

    let impacto =
      (pelota.y - (jugador2.y + jugador2.alto / 2)) / (jugador2.alto / 2);
    pelota.velY = impacto * 5;
  }

  // =========================
  // PUNTOS
  // =========================
  if (pelota.x < 0) {
    scoreP2++;
    score2DOM.textContent = scoreP2;
    resetPelota();
  }

  if (pelota.x > canvas.width) {
    scoreP1++;
    score1DOM.textContent = scoreP1;
    resetPelota();
  }

  // Dibujar
  jugador1.dibujar();
  jugador2.dibujar();
  pelota.dibujar();

  requestAnimationFrame(gameLoop);
}

// ARRANQUE
gameLoop();
