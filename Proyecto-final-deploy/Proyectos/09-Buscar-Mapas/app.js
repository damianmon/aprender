const botones = document.querySelectorAll(".sucursal button");
const mapa = document.getElementById("mapaFrame");

botones.forEach((btn) => {
  btn.addEventListener("click", () => {
    const coord = btn.getAttribute("data-coord");

    mapa.src = `https://www.google.com/maps?q=${coord}&z=15&output=embed`;
  });
});
