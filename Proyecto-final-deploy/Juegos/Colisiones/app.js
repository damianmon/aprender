/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const domPuntaje = document.getElementById("puntaje");

// ===================== CONTROL =====================
class Control {
  constructor() {
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.#addListeners();
  }

  #addListeners() {
    window.addEventListener("keydown", (event) => {
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
      ) {
        event.preventDefault();
      }

      switch (event.key) {
        case "ArrowUp":
          this.up = true;
          break;
        case "ArrowDown":
          this.down = true;
          break;
        case "ArrowLeft":
          this.left = true;
          break;
        case "ArrowRight":
          this.right = true;
          break;
      }
    });

    window.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.up = false;
          break;
        case "ArrowDown":
          this.down = false;
          break;
        case "ArrowLeft":
          this.left = false;
          break;
        case "ArrowRight":
          this.right = false;
          break;
      }
    });
  }
}

// ===================== AUTO BASE =====================
class Auto {
  constructor(x, y, ancho, alto, color) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.mirandoAbajo = false;
    this.angulo = 0;
    this.color = color;
  }

  dibujar() {
    const { x, y, ancho, alto, color, angulo } = this;
    const inv = this.mirandoAbajo;
    const hw = ancho / 2;
    const hh = alto / 2;

    const capoY = inv ? hh - alto * 0.3 : -hh;
    const paraY = inv ? hh - alto * 0.38 : -hh + alto * 0.18;
    const lunetaY = inv ? -hh + alto * 0.18 : hh - alto * 0.28;

    ctx.save();
    ctx.translate(x + hw, y + hh);
    ctx.rotate(angulo);

    ctx.fillStyle = "#1a1a1a";
    const rW = ancho * 0.22;
    const rH = alto * 0.15;

    ctx.fillRect(-hw - rW * 0.4, -hh + alto * 0.06, rW, rH);
    ctx.fillRect(hw - rW * 0.6, -hh + alto * 0.06, rW, rH);
    ctx.fillRect(-hw - rW * 0.4, -hh + alto * 0.79, rW, rH);
    ctx.fillRect(hw - rW * 0.6, -hh + alto * 0.79, rW, rH);

    ctx.fillStyle = color;
    ctx.fillRect(-hw, -hh, ancho, alto);

    ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
    ctx.fillRect(-hw + ancho * 0.08, capoY, ancho * 0.84, alto * 0.28);

    ctx.fillStyle = "#b8dff5";
    ctx.fillRect(-hw + ancho * 0.14, paraY, ancho * 0.72, alto * 0.12);

    ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
    ctx.fillRect(
      -hw + ancho * 0.08,
      -hh + alto * 0.3,
      ancho * 0.84,
      alto * 0.4,
    );

    ctx.fillStyle = "#b8dff5";
    ctx.fillRect(-hw + ancho * 0.14, lunetaY, ancho * 0.72, alto * 0.08);

    ctx.restore();
  }

  colisiona(otroAuto) {
    return (
      this.x < otroAuto.x + otroAuto.ancho &&
      this.x + this.ancho > otroAuto.x &&
      this.y < otroAuto.y + otroAuto.alto &&
      this.y + this.alto > otroAuto.y
    );
  }
}

// ===================== JUGADOR =====================
class AutoJugador extends Auto {
  constructor() {
    super(canvas.width / 2 - 25, canvas.height - 100, 50, 80, "green");
    this.control = new Control();
    this.velMax = 4;
    this.velocidad = 0;
    this.aceleracion = 0.2;
  }

  mover() {
    this.#fisicas();
  }

  #fisicas() {
    if (this.control.up) this.velocidad += this.aceleracion;
    if (this.control.down) this.velocidad -= this.aceleracion;

    if (this.velocidad > this.velMax) this.velocidad = this.velMax;
    if (this.velocidad < -this.velMax / 2) this.velocidad = -this.velMax / 2;

    this.y -= this.velocidad;

    if (this.control.left && this.x > 0) this.x -= 4;
    if (this.control.right && this.x + this.ancho < canvas.width) this.x += 4;

    const anguloRuedas = this.control.left
      ? -0.25
      : this.control.right
        ? 0.25
        : 0;

    this.angulo += (anguloRuedas - this.angulo) * 0.1;

    this.y = Math.max(0, Math.min(this.y, canvas.height - this.alto));
  }
}

// ===================== ENEMIGO =====================
class AutoEnemigo extends Auto {
  constructor() {
    const ancho = 50;
    const x = Math.random() * (canvas.width - ancho);

    const colors = ["red", "blue", "black", "orange", "yellow", "purple"];
    const randColor = colors[Math.floor(Math.random() * colors.length)];

    super(x, -90, ancho, 80, randColor);
    this.mirandoAbajo = true;
    this.velocidad = 3 + Math.random() * 3;
  }

  mover() {
    this.y += this.velocidad;
  }

  fueraDePantalla() {
    return this.y > canvas.height;
  }
}

// ===================== JUEGO =====================
class Juego {
  constructor() {
    this.jugador = new AutoJugador();
    this.enemigos = [];
    this.activo = true;
    this.punto = 0;
    this.frameCount = 0;
  }

  get intervaloSpawn() {
    return Math.max(30, 60 - this.punto);
  }

  _spawnEnemigo() {
    if (this.frameCount % this.intervaloSpawn === 0) {
      this.enemigos.push(new AutoEnemigo());
    }
  }

  _dibujarFondo() {
    ctx.fillStyle = "#696969";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#ffffff";
    ctx.setLineDash([25, 20]);
    ctx.lineWidth = 3;

    [canvas.width / 3, (canvas.width / 3) * 2].forEach((lineX) => {
      ctx.beginPath();
      ctx.moveTo(lineX, 0);
      ctx.lineTo(lineX, canvas.height);
      ctx.stroke();
    });

    ctx.setLineDash([]);
  }

  update() {
    if (!this.activo) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.frameCount++;
    this._dibujarFondo();

    this.jugador.mover();
    this.jugador.dibujar();

    this._spawnEnemigo();

    this.enemigos = this.enemigos.filter((enemigo) => {
      enemigo.mover();
      enemigo.dibujar();

      if (this.jugador.colisiona(enemigo)) {
        this.activo = false;
        alert("¡¡GAME OVER!!");
      }

      return !enemigo.fueraDePantalla();
    });

    if (this.frameCount % 60 === 0) {
      this.punto++;
      domPuntaje.textContent = this.punto;
    }
  }
}

// ===================== LOOP =====================
let game = new Juego();

function gameLoop() {
  game.update();
  requestAnimationFrame(gameLoop);
}

gameLoop();
