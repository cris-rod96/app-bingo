let dataBingo = null;

function generarNumero() {
  let numeroGenerado = Math.floor(Math.random() * 75) + 1;
  return numeroGenerado;
}
function printTable(codigo) {
  let containerTable = document.getElementById("container-table");
  let obj = {};
  containerTable.innerHTML = "";
  let numeros = dataBingo[codigo];

  numeros.forEach((num) => {
    if (!obj.hasOwnProperty(num)) {
      obj[num] = 0;
    } else {
      obj[num] = obj[num] + 1;
    }
    containerTable.innerHTML += `<span>${num}</span>`;
  });

  containerTable.classList.remove("hide");

  console.log(obj);
}
function printData() {
  dataBingo = getData();
  if (dataBingo) {
    let selectCodigo = document.getElementById("filter-codigo");
    selectCodigo.removeAttribute("disabled");
    selectCodigo.innerHTML = " ";
    let optionFormat = "";
    for (let codigo in dataBingo) {
      optionFormat += `<option value="${codigo}">Código #${codigo}</option>`;
    }
    selectCodigo.innerHTML = optionFormat;
  }
}
function generarCodigo(codigo) {
  codigo = Number(codigo);
  if (codigo < 10) return `${"0".repeat(4)}${codigo}`;
  if (codigo < 100 && codigo >= 10) return `${"0".repeat(3)}${codigo}`;
  if (codigo < 1000 && codigo >= 100) return `${"0".repeat(2)}${codigo}`;
  if (codigo < 10000 && codigo >= 1000) return `0${codigo}`;
}

function saveStorage(tablas) {
  localStorage.setItem("bingo-app", JSON.stringify(tablas));
  printData();
}

function generarTablas(cantidad, codigoInicio) {
  // Bucle cantidad de tablas
  let tablasGeneradas = {};
  let miCodigo = generarCodigo(codigoInicio);
  for (let cantidadTablas = 0; cantidadTablas < cantidad; cantidadTablas++) {
    // Array que contendrá los números generados
    let numeros = [];
    //Bucle para cantidad de numeros generados por tabla
    for (let i = 0; i < 25; i++) {
      // Genero el número aleatorio
      let numero = generarNumero();
      if (numero < 10) {
        let miNumero = `0${numero}`;
        if (!numeros.includes(miNumero)) {
          numeros.push(miNumero);
        } else {
          i--;
        }
      } else {
        let miNumero = numero.toString();
        if (!numeros.includes(miNumero)) {
          numeros.push(miNumero);
        } else {
          i--;
        }
      }
    }
    tablasGeneradas[miCodigo] = numeros;
    miCodigo = Number(miCodigo);
    miCodigo = generarCodigo(++miCodigo);
  }

  return tablasGeneradas;
}

function loadListeners() {
  document.getElementById("btn-generate").addEventListener("click", () => {
    let cantidad = document.getElementById("input-cant").value;
    let codigoInicio = document.getElementById("input-codigo").value;

    if (cantidad && codigoInicio) {
      let misTablas = generarTablas(cantidad, codigoInicio);
      saveStorage(misTablas);
    } else {
      alert("No puedes seguir");
    }
  });

  document.getElementById("filter-codigo").addEventListener("change", (e) => {
    printTable(e.target.value);
  });
}

function getData() {
  dataBingo = localStorage.getItem("bingo-app");
  if (dataBingo) {
    dataBingo = JSON.parse(dataBingo);
  }

  return dataBingo;
}

addEventListener("DOMContentLoaded", () => {
  loadListeners();
  printData();
});
