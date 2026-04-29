const botones = document.querySelectorAll(".agregar");
const lista = document.getElementById("listaCarrito");
const total = document.getElementById("total");
const contador = document.getElementById("contador");

let carrito = [];

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    const card = boton.parentElement;
    const nombre = card.querySelector("h3").textContent;
    const precio = parseFloat(
      card.querySelector("p").textContent.replace("$", ""),
    );

    carrito.push({ nombre, precio });
    renderCarrito();
  });
});

function renderCarrito() {
  lista.innerHTML = "";

  let suma = 0;

  carrito.forEach((item, index) => {
    suma += item.precio;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} $${item.precio}
      <button onclick="eliminar(${index})">❌</button>
    `;

    lista.appendChild(li);
  });

  total.textContent = suma.toFixed(2);
  contador.textContent = carrito.length;
}

function eliminar(index) {
  carrito.splice(index, 1);
  renderCarrito();
}
