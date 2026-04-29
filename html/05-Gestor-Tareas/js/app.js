let tareas = [];

const input = document.getElementById("inputTarea");
const btnAgregar = document.getElementById("btnAgregar");
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");
const btnLimpiar = document.getElementById("btnLimpiar");

function actualizarContador() {
  const tareas = lista.querySelectorAll("li");
  const pendientes = [...tareas].filter(
    (li) => !li.classList.contains("completada"),
  ).length;
  contador.textContent = `Tienes ${pendientes} tareas pendientes.`;
}

function crearTarea(texto) {
  const li = document.createElement("li");

  li.innerHTML = `
    <input type="checkbox">
    <span>${texto}</span>
    <button class="btn-eliminar">❌</button>
  `;

  const checkbox = li.querySelector("input");
  const btnEliminar = li.querySelector("button");

  checkbox.addEventListener("change", () => {
    li.classList.toggle("completada");
    actualizarContador();
  });

  btnEliminar.addEventListener("click", () => {
    li.remove();
    actualizarContador();
  });

  lista.appendChild(li);
  actualizarContador();
}

btnAgregar.addEventListener("click", () => {
  const texto = input.value.trim();

  if (texto === "") return;

  crearTarea(texto);
  input.value = "";
});

btnLimpiar.addEventListener("click", () => {
  const tareas = lista.querySelectorAll(".completada");
  tareas.forEach((t) => t.remove());
  actualizarContador();
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    btnAgregar.click();
  }
});
