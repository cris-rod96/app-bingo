let numeros = [];
let obj = {};
function generarNumero() {
  let numeroGenerado = Math.floor(Math.random() * 75) + 1;
  return numeroGenerado;
}
// const generarNumero = () => Math.floor(Math.random() * 75) + 1;

for (let i = 0; i < 25; i++) {
  let numero = generarNumero();

  if (!numeros.includes(numero.toString())) {
    if (numero < 10) {
      let miNumero = `0${1}`;
      if (!numeros.includes(miNumero)) {
        numeros.push(miNumero);
      } else {
        i--;
      }
    } else {
      numeros.push(numero.toString());
    }
  } else {
    i--;
  }
}

let miNumeroString = numeros.toString();
for (let i = 0; i < numeros.length; i++) {
  if (!obj.hasOwnProperty(numeros[i])) {
    obj[numeros[i]] = 1;
  } else {
    obj[numeros[i]] += 1;
  }
}

console.log(numeros);
console.log(obj);
