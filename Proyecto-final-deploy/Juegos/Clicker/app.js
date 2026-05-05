/* ==========================================================================
   🕹️ APPWISE CLICKER - TAREA DE SEMANA 5
   Objetivo: Aplicar Eventos, setInterval y LocalStorage.
========================================================================== */

// 1. VARIABLES DE ESTADO DEL JUEGO
let monedas = 0;
let mineros = 0;
let costoMinero = 10;

// 2. ATRAPAMOS LOS ELEMENTOS DEL DOM
const btnMinar = document.querySelector("#btn-minar");
const btnComprarMinero = document.querySelector("#btn-comprar-minero");
const btnReset = document.querySelector("#btn-reset");

const displayMonedas = document.querySelector("#display-monedas");
const displayMps = document.querySelector("#display-mps"); // Monedas por segundo
const displayMineros = document.querySelector("#display-mineros");
const displayCosto = document.querySelector("#display-costo");

// ==========================================================================
// 3. RECUPERAR DATOS AL INICIAR (LocalStorage)
// ==========================================================================
function cargarPartida() {
  // 📝 TAREA 1: Leer el LocalStorage al iniciar
  // -------------------------------------------------
  // Tip: localStorage.getItem('clave') te da el valor guardado (o null si no existe).
  // Tip: parseInt() convierte un string como "42" al número 42.
  // Tip: Usá el operador || para poner un valor por defecto si getItem devuelve null.
  //      Ej: parseInt(localStorage.getItem('monedas')) || 0
  // -------------------------------------------------
  // TU CÓDIGO AQUÍ 👇
  monedas = parseInt(localStorage.getItem("monedas")) || 0;
  mineros = parseInt(localStorage.getItem("mineros")) || 0;
  costoMinero = parseInt(localStorage.getItem("costoMinero")) || 10;

  // Actualizamos la pantalla con los datos cargados
  actualizarPantalla();
}

function guardarPartida() {
  // 📝 TAREA 2: Guardar el estado en LocalStorage
  // -------------------------------------------------
  // Tip: localStorage.setItem('clave', valor) guarda un dato.
  // Tip: Tenés que guardar las 3 variables: monedas, mineros y costoMinero.
  //      Usá el mismo nombre de clave que usaste en la Tarea 1 para leerlas.
  // -------------------------------------------------
  // TU CÓDIGO AQUÍ 👇
  localStorage.setItem("monedas", monedas);
  localStorage.setItem("mineros", mineros);
  localStorage.setItem("costoMinero", costoMinero);
}

function actualizarPantalla() {
  // Esta función ya te la damos lista. Dibuja los datos en el HTML.
  displayMonedas.textContent = monedas;
  displayMps.textContent = mineros;
  displayMineros.textContent = mineros;
  displayCosto.textContent = costoMinero;

  // Deshabilitar el botón de compra si no alcanza el dinero
  if (monedas >= costoMinero) {
    btnComprarMinero.disabled = false;
  } else {
    btnComprarMinero.disabled = true;
  }
}

// ==========================================================================
// 4. LÓGICA DE EVENTOS (Clics)
// ==========================================================================

// 📝 TAREA 3: Evento al hacer clic en la moneda gigante
// -------------------------------------------------
// Pasos:
//   1. Sumale 1 a la variable monedas  →  monedas = monedas + 1
//   2. Llamá a guardarPartida() para no perder el progreso.
//   3. Llamá a actualizarPantalla() para que el display se refresque.
// -------------------------------------------------
btnMinar.addEventListener("click", () => {
  // TU CÓDIGO AQUÍ 👇
  monedas = monedas + 1;
  guardarPartida();
  actualizarPantalla();
});

// 📝 TAREA 4: Evento para comprar un Minero
// -------------------------------------------------
// Pasos (en orden):
//   1. Verificá si alcanza el dinero con un if (monedas >= costoMinero).
//   2. Dentro del if: restale el costo  →  monedas = monedas - costoMinero
//   3. Sumale un minero               →  mineros = mineros + 1
//   4. Encarecé el siguiente          →  costoMinero = Math.floor(costoMinero * 1.5)
//   5. Llamá a guardarPartida() y actualizarPantalla().
// -------------------------------------------------
btnComprarMinero.addEventListener("click", () => {
  // TU CÓDIGO AQUÍ 👇
  if (monedas >= costoMinero) {
    monedas = monedas - costoMinero;
    mineros = mineros + 1;
    costoMinero = Math.floor(costoMinero * 1.5);

    guardarPartida();
    actualizarPantalla();
  }
});

// Evento para borrar todo (Modo Dios)
btnReset.addEventListener("click", () => {
  if (confirm("¿Estás seguro de perder todo tu progreso?")) {
    localStorage.clear();
    monedas = 0;
    mineros = 0;
    costoMinero = 10;
    actualizarPantalla();
  }
});

// ==========================================================================
// 5. EL MOTOR DEL JUEGO (Timers)
// ==========================================================================

// 📝 TAREA 5: El Motor Automático (setInterval)
// -------------------------------------------------
// Tip: setInterval(función, milisegundos) repite una función cada N ms.
//      1 segundo = 1000 milisegundos.
// Pasos dentro del intervalo:
//   1. Verificá con un if que mineros > 0 (si no hay mineros, no pasa nada).
//   2. Sumale la cantidad de mineros a monedas  →  monedas = monedas + mineros
//   3. Llamá a guardarPartida() y actualizarPantalla().
// -------------------------------------------------
// TU CÓDIGO AQUÍ 👇
setInterval(() => {
  if (mineros > 0) {
    monedas = monedas + mineros;
    guardarPartida();
    actualizarPantalla();
  }
}, 1000);

// ==========================================================================
// ¡ARRANQUE!
// ==========================================================================
cargarPartida();
