const cartas = [
  { id: 1, icono: "🍎" },
  { id: 2, icono: "🍎" },
  { id: 3, icono: "🍌" },
  { id: 4, icono: "🍌" },
  { id: 5, icono: "🍇" },
  { id: 6, icono: "🍇" },
  { id: 7, icono: "🍉" },
  { id: 8, icono: "🍉" },
];

cartas.sort(() => 0.5 - Math.random());

const tablero = document.querySelector("#tablero");

let cartasElegidas = [];
let bloqueo = false;

function crearTablero() {
  for (let i = 0; i < cartas.length; i++) {
    const carta = document.createElement("div");

    carta.classList.add("carta");

    carta.setAttribute("data-id", i);
    carta.setAttribute("data-icono", cartas[i].icono);

    carta.textContent = "❓";

    carta.addEventListener("click", voltearCarta);

    tablero.appendChild(carta);
  }
}

function voltearCarta(evento) {
  if (bloqueo) return;

  const carta = evento.target;

  if (carta.classList.contains("volteada")) return;

  const id = carta.getAttribute("data-id");
  const icono = carta.getAttribute("data-icono");

  carta.textContent = icono;
  carta.classList.add("volteada");

  cartasElegidas.push({
    id: id,
    elemento: carta,
    icono: icono,
  });

  if (cartasElegidas.length === 2) {
    bloqueo = true;
    setTimeout(verificarPareja, 600);
  }
}

function verificarPareja() {
  const carta1 = cartasElegidas[0];
  const carta2 = cartasElegidas[1];

  if (carta1.icono === carta2.icono) {
    carta1.elemento.classList.add("resuelta");
    carta2.elemento.classList.add("resuelta");
  } else {
    carta1.elemento.textContent = "❓";
    carta2.elemento.textContent = "❓";

    carta1.elemento.classList.remove("volteada");
    carta2.elemento.classList.remove("volteada");
  }

  cartasElegidas = [];
  bloqueo = false;
}

crearTablero();
