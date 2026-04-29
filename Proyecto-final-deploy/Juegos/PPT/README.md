# 🏠 Tarea — Videojuego: Piedra, Papel o Tijera

## Descripción

Vas a programar el clásico juego de **Piedra, Papel o Tijera** contra la computadora.
Todo en JavaScript puro, interactuando con el DOM.

---

## Reglas del juego

- El jugador elige entre: **Piedra**, **Papel** o **Tijera**
- La computadora elige aleatoriamente
- Se determina el ganador de la ronda según las reglas clásicas:
  - Piedra vence a Tijera
  - Tijera vence a Papel
  - Papel vence a Piedra
  - Si ambos eligen igual → Empate

---

## Requisitos Mínimos (funcionalidad base)

1. **Elección del jugador**: 3 botones en el HTML (uno por opción)
2. **Elección de la computadora**: aleatoria con `Math.random()`
3. **Determinar ganador**: con `if/else` o `switch`
4. **Mostrar resultado**: en el HTML quién ganó la ronda
5. **Marcador**: contadores de victorias, derrotas y empates

---

## Requisitos Extra (si te animás)

- [ ] Mejor de 3 rondas: quien llega a 2 victorias primero gana la partida
- [ ] Mostrar con emojis la elección de cada jugador (🪨 📄 ✂️)
- [ ] Botón para reiniciar el juego
- [ ] Historial de las últimas 5 rondas

---

## Archivos

| Archivo      | Descripción                    |
| ------------ | ------------------------------ |
| `index.html` | Estructura y botones del juego |
| `app.js`     | **Tu código va aquí**          |

---

## Pistas y Tips

```js
// Generar elección aleatoria de la computadora:
const opciones = ["piedra", "papel", "tijera"];
const eleccionPC = opciones[Math.floor(Math.random() * opciones.length)];

// Cambiar texto en el HTML:
document.getElementById("resultado").textContent = "¡Ganaste!";
```

---

## Criterios de Evaluación

| Criterio                                        | Puntos |
| ----------------------------------------------- | ------ |
| El juego funciona sin errores en consola        | 40     |
| Lógica de ganador correcta para todos los casos | 30     |
| Marcador funcional                              | 20     |
| Código legible y con comentarios                | 10     |

> **Entrega:** subí tu `app.js` completo. No modifiques el `index.html` base.
