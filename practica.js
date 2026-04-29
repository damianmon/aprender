function esParOImpar(numero) {
  if (numero % 2 === 0) {
    return "es par";
  } else {
    return "es impar";
  }
}

function mayor(a, b, c) {
  if (a >= b && a >= c) {
    return a;
  } else if (b >= a && b >= c) {
    return b;
  } else {
    return c;
  }
}

for (let i = 1; i < 11; i++) {
  console.log(i);
}

function sumarArray(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total = total + arr[i];
  }
  return total;
}

function contar(texto) {
  return texto.length;
}

function sumarPares(arr) {
  let contador = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      contador++;
    }
  }
  return contador;
}

function sumas(a, b) {
  return a + b;
}

function multiplicar(a, b) {
  return a * b;
}
function doble(a) {
  return a * 2;
}
function saludar(nombre) {
  return "hola " + nombre;
}

function numero(a) {
  if (a > 0) {
    return "Positivo";
  } else if (a < 0) {
    return "Negativo";
  } else {
    return "Cero";
  }
}
