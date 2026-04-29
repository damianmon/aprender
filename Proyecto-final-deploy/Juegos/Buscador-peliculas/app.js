// 1. LA BASE DE DATOS MOCK
const peliculas = [
  { titulo: "El Señor de los Anillos", año: 2001 },
  { titulo: "Matrix", año: 1999 },
  { titulo: "Inception", año: 2010 },
  { titulo: "El Padrino", año: 1972 },
  { titulo: "Interstellar", año: 2014 },
  { titulo: "Batman: El Caballero de la Noche", año: 2008 },
];

// 2. ATRAPANDO ELEMENTOS DEL DOM
const contenedor = document.querySelector("#contenedor-peliculas");
const inputBusqueda = document.querySelector("#input-busqueda");

// 3. FUNCIÓN PARA RENDERIZAR (DIBUJAR) PELÍCULAS
function renderizarPeliculas(arrayPeliculas) {
  // limpiar contenedor
  contenedor.innerHTML = "";

  // recorrer array
  arrayPeliculas.forEach((peli) => {
    const div = document.createElement("div");
    div.classList.add("tarjeta");

    div.innerHTML = `
      <h3>${peli.titulo}</h3>
      <p>${peli.año}</p>
    `;

    contenedor.appendChild(div);
  });
}

// 4. EL BUSCADOR
inputBusqueda.addEventListener("input", (evento) => {
  const textoBuscado = evento.target.value.toLowerCase();

  // filtrar películas
  const filtradas = peliculas.filter((peli) =>
    peli.titulo.toLowerCase().includes(textoBuscado),
  );

  // renderizar resultado
  renderizarPeliculas(filtradas);
});

// 5. INICIALIZACIÓN
renderizarPeliculas(peliculas);
