const formulario = document.querySelector("#formulario") //cambiado var por const y nombre de id correcto

formulario.onsubmit = function(e) {

  e.preventDefault(); //agregado default
  
  const nombreInput = formulario.elements["name"]; //cambiado por el elemento correcto
  const edadInput = formulario.elements["age"]; //cambiado por el elemento correcto
  const nacionalidadSelect = formulario.elements["nationality"]; //cambiado por el elemento correcto

  const nombre = nombreInput.value.trim(); //variable corregida
  const edad = parseInt(edadInput.value); //variable corregida

  const nacionalidad = nacionalidadSelect.options[nacionalidadSelect.selectedIndex].value;

  // Validaciones
  let errores = false;
  if (nombre.length === 0) {
    nombreInput.classList.add("error");
    errores = true;
  } else {
    nombreInput.classList.remove("error");
  }

  if (isNaN(edad) || edad < 18 || edad > 120) {
    edadInput.classList.add("error");
    errores = true;
  } else {
    edadInput.classList.remove("error");
  }

  if (!errores) {
    agregarInvitado(nombre, edad, nacionalidad);

    // Limpiar campos después de agregar
    formulario.reset();
  }
};

// Función para traducir la nacionalidad
function obtenerNacionalidadCompleta(valor) {
  switch (valor) {
    case "ar":
      return "Argentina";
    case "mx":
      return "Mexicana";
    case "per":
      return "Peruana";
    case "vnzl":
      return "Venezolana";
    default:
      return "Desconocida";
  }
}

// Función para crear y agregar invitado al DOM
function agregarInvitado(nombre, edad, nacionalidadCodigo) {
  const nacionalidad = obtenerNacionalidadCompleta(nacionalidadCodigo);
  const lista = document.getElementById("lista-de-invitados");

  const elementoLista = document.createElement("div");
  elementoLista.classList.add("elemento-lista");

  // Crear elementos reutilizando una función
  crearElemento("Nombre", nombre, elementoLista);
  crearElemento("Edad", edad, elementoLista);
  crearElemento("Nacionalidad", nacionalidad, elementoLista);

  // Botón para eliminar al invitado
  const botonBorrar = document.createElement("button");
  botonBorrar.textContent = "Eliminar invitado";
  botonBorrar.onclick = function () {
    lista.removeChild(elementoLista);
  };

  elementoLista.appendChild(botonBorrar);
  lista.appendChild(elementoLista);
}

// Función para crear una línea de datos del invitado
function crearElemento(label, valor, contenedor) {
  const span = document.createElement("span");
  const input = document.createElement("input");
  const salto = document.createElement("br");

  span.textContent = `${label}: `;
  input.value = valor;
  input.disabled = true;

  contenedor.appendChild(span);
  contenedor.appendChild(input);
  contenedor.appendChild(salto);
}