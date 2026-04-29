// =======================
// 🔹 DATOS
// =======================

let proyectos = [
  {
    nombre: "Buscar Mapas",
    url: "proyectos/09-Buscar-Mapas/index.html",
  },
  {
    nombre: "Gestor de Tareas",
    url: "proyectos/05-Gestor-Tareas/index.html",
  },
];

let juegos = [
  {
    nombre: "Videojuego Oráculo",
    url: "Juegos/Videojuego-Oraculo/index.html",
  },
];

// =======================
// 🔹 DOM
// =======================

const contenido = document.getElementById("contenido");
const items = document.querySelectorAll(".sidebar li");

// =======================
// 🔹 RENDER LISTA
// =======================

function renderLista(lista, tipo) {
  return `
    <div class="panel">
      <h2>${tipo}</h2>

      <div class="lista">
        ${lista
          .map(
            (item) => `
          <div class="item">
            <span onclick="abrirJuego('${item.url}')">
              ${item.nombre}
            </span>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  `;
}

// =======================
// 🔹 ABRIR PROYECTO/JUEGO
// =======================

function abrirJuego(url) {
  contenido.innerHTML = `
    <div class="panel">
      <button onclick="volver()">⬅ Volver</button>
      <iframe src="${url}"></iframe>
    </div>
  `;
}

// =======================
// 🔹 VOLVER
// =======================

function volver() {
  contenido.innerHTML = `
    <h1>Bienvenido</h1>
    <p>Seleccioná una sección</p>
  `;
}

// =======================
// 🔹 MENÚ
// =======================

items.forEach((item) => {
  item.addEventListener("click", () => {
    items.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");

    const texto = item.textContent;

    if (texto.includes("Dashboard")) {
      volver();
    }

    if (texto.includes("Proyectos")) {
      contenido.innerHTML = renderLista(proyectos, "📁 Proyectos");
    }

    if (texto.includes("Juegos")) {
      contenido.innerHTML = renderLista(juegos, "🎮 Juegos");
    }
  });
});
