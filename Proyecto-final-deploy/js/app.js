// =======================
// 🔹 DATOS
// =======================

let proyectos = [
  {
    nombre: "Receta de la Abuela",
    url: "proyectos/01-Receta-Abuela/index.html",
  },
  {
    nombre: "Blog del Hacker",
    url: "proyectos/02-Blog-Hacker/index.html",
  },
  {
    nombre: "Registro de usuario",
    url: "proyectos/03-Registro-Usuario/index.html",
  },
  {
    nombre: "Landing",
    url: "proyectos/04-Landign-Producto/index.html",
  },
  {
    nombre: "Gestor de Tareas",
    url: "proyectos/05-Gestor-Tareas/index.html",
  },
  {
    nombre: "FAQ",
    url: "proyectos/06-FAQ-Acordeon/index.html",
  },
  {
    nombre: "Directorio de empleados",
    url: "proyectos/07-Directorio-Empleados/index.html",
  },
  {
    nombre: "Carrito de compras",
    url: "proyectos/08-Carrito-Compras/index.html",
  },
  {
    nombre: "Buscar Mapas",
    url: "proyectos/09-Buscar-Mapas/index.html",
  },

  {
    nombre: "Dashboard",
    url: "proyectos/10-Dashboard-Admin/index.html",
  },
];

let juegos = [
  {
    nombre: "Oráculo",
    url: "Juegos/Videojuego-Oraculo/index.html",
  },
  {
    nombre: "Piedra, Papel o tijeras",
    url: "Juegos/PPT/index.html",
  },
  {
    nombre: "Memotest",
    url: "Juegos/Memotest/index.html",
  },
  {
    nombre: "Buscador de Peliculas",
    url: "Juegos/Buscador-peliculas/index.html",
  },
  {
    nombre: "Ping Pong",
    url: "Juegos/Pingpong/index.html",
  },
  {
    nombre: "Clicker",
    url: "Juegos/Clicker/index.html",
  },
  {
    nombre: "Coliciones",
    url: "Juegos/Colisiones/index.html",
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
          <div class="item" onclick="abrirJuego('${item.url}')">
            ${item.nombre}
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
      <iframe id="visor" src="${url}"></iframe>
    </div>
  `;

  const iframe = document.getElementById("visor");

  iframe.onload = () => {
    try {
      const doc = iframe.contentWindow.document;
      const altura = doc.body.scrollHeight;
      iframe.style.height = altura + "px";
    } catch (e) {
      // Por seguridad (si falla por rutas externas)
      iframe.style.height = "650px";
    }
  };
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
