// ============================================================
//  VIDEOJUEGO — El Oráculo
//  Demostración en vivo: while, if/else, variables, DOM básico
// ============================================================

// --- Estado del juego ---
let numeroSecreto = generarNumero();
let intentos = 0;
let juegoActivo = true;

function generarNumero() {
  const aleatorio = Math.random();

  const escalado = aleatorio * 100;

  const redondeo = Math.floor(escalado);

  const resultado = redondeo + 1;

  return resultado;
}

function adivinar() {
  if (!juegoActivo) return;
  let intento = Number(document.getElementById("inputNumero").value);

  if (Number.isNaN(intento) || intento < 1 || intento > 100) {
    mostrarMensaje("Ingresa un numero entre 1 y 100");
    return;
  }

  intentos = intentos + 1;

  if (intento === numeroSecreto) {
    juegoActivo = false;
    mostrarMensaje(`Correcto, Era el ${numeroSecreto}`);
    mostrarIntentos(`La cantidad de intentos fue ${intentos}`);
    document.getElementById("btnReset").style.display = "inline-block";
  } else if (intento < numeroSecreto) {
    mostrarMensaje("El numero secreto es mayor");
    mostrarIntentos(`Intentos: ${intentos}`);
  } else {
    mostrarMensaje("El numero secreto es menor");
    mostrarIntentos(`Intentos: ${intentos}`);
  }

  document.getElementById("inputNumero").value = "";
}

function reiniciar() {
  numeroSecreto = generarNumero();
  intentos = 0;
  mostrarMensaje("");
  mostrarIntentos("");
  document.getElementById("btnReset").style.display = "none";
}

// --- Helpers de UI ---
function mostrarMensaje(texto) {
  document.getElementById("mensaje").textContent = texto;
}

function mostrarIntentos(texto) {
  document.getElementById("intentos").textContent = texto;
}

// Permitir presionar Enter para adivinar
document
  .getElementById("inputNumero")
  .addEventListener("keydown", function (e) {
    if (e.key === "Enter") adivinar();
  });
