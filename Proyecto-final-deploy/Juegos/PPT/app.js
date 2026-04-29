// ============================================================
//  TAREA — Videojuego: Piedra, Papel o Tijera
//  Tu código va en este archivo.
//  Leé el README.md para entender los requisitos.
// ============================================================

// ------------------------------------------------------------
//  PISTAS INICIALES (borrá los comentarios cuando termines)
// ------------------------------------------------------------

// Las opciones posibles del juego:
// const opciones = ["piedra", "papel", "tijera"];

// Función que se llama al clickear un botón (ya está en el HTML):
// jugar("piedra") / jugar("papel") / jugar("tijera")

// Para mostrar algo en pantalla:
// document.getElementById("resultado").textContent = "texto";

// Para actualizar el puntaje del jugador:
// document.getElementById("puntajeJugador").textContent = número;

// Los emojis para mostrar la elección:
// 🪨 → piedra | 📄 → papel | ✂️ → tijera

// ------------------------------------------------------------
//  TU CÓDIGO EMPIEZA AQUÍ
// ------------------------------------------------------------

let puntajeJugador = 0;
let puntajePC = 0;
let puntajeEmpate = 0;

const opciones = ["piedra", "papel", "tijera"];

function jugar(eleccionJugador) {
  // 1. elección de la PC
  const eleccionPC = opciones[Math.floor(Math.random() * opciones.length)];

  // 2. mostrar elecciones
  mostrarElecciones(eleccionJugador, eleccionPC);

  // 3. decidir ganador
  const resultado = decidirGanador(eleccionJugador, eleccionPC);

  // 4. mostrar resultado
  mostrarResultado(resultado);

  // 5. actualizar marcador
  actualizarMarcador();
}

function decidirGanador(jugador, pc) {
  if (jugador === pc) {
    puntajeEmpate++;
    return "Empate 🤝";
  }

  if (
    (jugador === "piedra" && pc === "tijera") ||
    (jugador === "papel" && pc === "piedra") ||
    (jugador === "tijera" && pc === "papel")
  ) {
    puntajeJugador++;
    return "Ganaste 😎";
  }

  puntajePC++;
  return "Perdiste 😢";
}

function mostrarElecciones(jugador, pc) {
  const emojis = {
    piedra: "🪨",
    papel: "📄",
    tijera: "✂️",
  };

  document.getElementById("eleccionJugador").textContent = emojis[jugador];

  document.getElementById("eleccionPC").textContent = emojis[pc];
}

function mostrarResultado(texto) {
  document.getElementById("resultado").textContent = texto;
}

function actualizarMarcador() {
  document.getElementById("puntajeJugador").textContent = puntajeJugador;

  document.getElementById("puntajePC").textContent = puntajePC;

  document.getElementById("puntajeEmpate").textContent = puntajeEmpate;
}

function reiniciar() {
  puntajeJugador = 0;
  puntajePC = 0;
  puntajeEmpate = 0;

  actualizarMarcador();

  document.getElementById("resultado").textContent = "";
  document.getElementById("eleccionJugador").textContent = "❓";
  document.getElementById("eleccionPC").textContent = "❓";
}
