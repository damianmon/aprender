const items = document.querySelectorAll(".item");

items.forEach((item) => {
  const btn = item.querySelector(".pregunta");
  const icono = btn.querySelector("span");

  btn.addEventListener("click", () => {
    const abierto = item.classList.contains("active");

    // cerrar todos
    items.forEach((i) => {
      i.classList.remove("active");
      i.querySelector("span").textContent = "+";
    });

    // abrir el clickeado
    if (!abierto) {
      item.classList.add("active");
      icono.textContent = "-";
    }
  });
});
