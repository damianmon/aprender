const filas = document.querySelectorAll("#tabla-body tr");
const total = document.getElementById("total");

total.textContent = `Total de personal activo: ${filas.length} empleados`;
