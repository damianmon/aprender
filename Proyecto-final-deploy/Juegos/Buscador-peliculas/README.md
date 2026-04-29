# 🎬 Tarea: Buscador Flix

Construí un buscador de películas en tiempo real usando **JavaScript puro y el DOM**. Cada letra que el usuario escribe filtra la lista de películas instantáneamente, sin recargar la página.

---

## Objetivo

Conectar los tres conceptos clave del módulo en un solo proyecto:

1. **Arrays y objetos** → la base de datos de películas.
2. **Métodos de array** → `.filter()` e `.includes()` para buscar.
3. **DOM + Eventos** → renderizar tarjetas y escuchar el input del usuario.

---

## Estructura del proyecto

```
05-Tarea-Buscador-Peliculas/
├── index.html   ← estructura y estilos ya listos
└── app.js       ← acá vas a escribir todo el código
```

---

## Cómo abrir el proyecto

Abrí `index.html` con **Live Server** (clic derecho → _Open with Live Server_) o simplemente arrastralo al navegador.

La página ya tiene el input y el contenedor `#contenedor-peliculas` listos. Tu trabajo es darle vida con JavaScript en `app.js`.

---

## Consignas

El archivo `app.js` tiene la estructura base ya escrita. Tenés que completar **dos funciones**:

---

### ✅ Parte 1 — `renderizarPeliculas(arrayPeliculas)`

Esta función recibe un array de películas y debe **dibujar una tarjeta en pantalla por cada una**.

```
➡ Para cada película del array:
   1. Creá un <div> con la clase 'tarjeta'
   2. Poné adentro el título y el año
   3. Agregalo al contenedor del DOM

💡 Tip: antes de dibujar, limpiá el contenedor con contenedor.innerHTML = ''
```

**Ejemplo de tarjeta esperada:**

```html
<div class="tarjeta">
  <h3>Matrix</h3>
  <p>Año: 1999</p>
</div>
```

---

### ✅ Parte 2 — Event Listener del input

Dentro del `addEventListener("input", ...)` ya armado, tenés que:

```
1. Capturar lo que el usuario escribe (ya está en la variable 'textoBuscado')
2. Usar .filter() sobre el array 'peliculas' para quedarte solo con
   las que en su título (en minúsculas) incluyan el texto buscado
3. Llamar a renderizarPeliculas() con el array filtrado
```

---

## Base de datos incluida

```javascript
const peliculas = [
  { titulo: "El Señor de los Anillos", año: 2001 },
  { titulo: "Matrix", año: 1999 },
  { titulo: "Inception", año: 2010 },
  { titulo: "El Padrino", año: 1972 },
  { titulo: "Interstellar", año: 2014 },
  { titulo: "Batman: El Caballero de la Noche", año: 2008 },
];
```

---

## Comportamiento esperado

| Acción del usuario  | Resultado en pantalla                                     |
| ------------------- | --------------------------------------------------------- |
| Carga la página     | Se muestran las 6 películas                               |
| Escribe `"ma"`      | Se muestran "Matrix" e "Interstellar" (si contiene "ma")  |
| Escribe `"el"`      | Se muestran las películas que contienen "el" en el título |
| Borra todo el texto | Vuelven a aparecer las 6 películas                        |

---

## Criterios de aprobación

- [ ] Al cargar la página se renderizan todas las películas automáticamente.
- [ ] El buscador funciona en tiempo real (sin botón de búsqueda).
- [ ] La búsqueda **no es sensible a mayúsculas** (funciona igual con "matrix" que con "MATRIX").
- [ ] Al borrar el texto del input, vuelven a aparecer todas las películas.
- [ ] No se usa ningún `for` clásico — solo métodos de array (`.filter()`, `.forEach()` o `.map()`).

---

## Tips y pistas

- `evento.target.value` te da el texto actual del input.
- `.toLowerCase()` convierte a minúsculas para comparar sin importar cómo escribe el usuario.
- `.includes("texto")` retorna `true` si el string contiene ese fragmento.
- `elemento.innerHTML = ''` limpia el contenido de un nodo del DOM.
- `contenedor.appendChild(tarjeta)` agrega un nodo como último hijo del contenedor.
