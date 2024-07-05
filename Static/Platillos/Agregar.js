import { toastAlertError, toastAlertSuccess } from "../DataTables.js";
const nombre = document.getElementById("nombre");
const precio = document.getElementById("precio");
const descripcion = document.getElementById("descripcion");
const tipo = document.getElementById("TipoDePlatillo");
const form = document.getElementById("formulario");

document.getElementById("agregar").addEventListener("click", async (e) => {
  if (!nombre.value) {
    toastAlertError(`El campo de nombre está vacío`);
    e.preventDefault();
    nombre.classList.add("is-invalid")
    return;
  } else if (!isNaN(nombre.value)) {
    toastAlertError(`El nombre ${nombre.value} no tiene un formato válido`);
    e.preventDefault();
    nombre.classList.add("is-invalid");
    return;
  } else if (nombre.value.length <= 2) {
    toastAlertError(`El nombre ${nombre.value} es muy corto`);
    e.preventDefault();
    nombre.classList.add("is-invalid");
    return;
  }else{
    nombre.classList.remove("is-invalid");
  } 

  if (!precio.value) {
    toastAlertError(`El campo del precio está vacío`);
    e.preventDefault();
    precio.classList.add("is-invalid");
    return;
  } else if (isNaN(precio.value)) {
    toastAlertError(`El Precio ${precio.value} no tiene un formato válido`);
    e.preventDefault();
    precio.classList.add("is-invalid");
    return;
  }else if(precio.value<0){    
    toastAlertError(`El precio  no puede ser negativo`);
    e.preventDefault();
    precio.classList.add("is-invalid");
    return;
  } 
  else{
    precio.classList.remove("is-invalid");
  }

  if (!descripcion.value) {
    toastAlertError(`El campo de la descripcion está vacío`);
    e.preventDefault();
    descripcion.classList.add("is-invalid");
    return;
  } else if (!isNaN(descripcion.value)) {
    toastAlertError(
      `La descripcion ${descripcion.value} no tiene un formato válido`);
    e.preventDefault();
    descripcion.classList.add("is-invalid");
    return;
  } else if (descripcion.value.length < 6) {
    toastAlertError(`La descripcion ${descripcion.value} es muy corta`);
    e.preventDefault();
    descripcion.classList.add("is-invalid");
    return;
  }else{
    descripcion.classList.remove("is-invalid")
  }
  e.preventDefault();
  let data={
    nombre: nombre.value,
    precio: precio.value,
    descripcion: descripcion.value,
    tipo: tipo.value
  }
  console.log(data);
  try {
    const response = await axios.post("/AgregarPlatillo", data);
    const responseData=response.data;
    if (responseData.data.startsWith("Error")) {
      toastAlertError(responseData.data);    
    } else {
      toastAlertSuccess(responseData.data);
      form.reset();
    }
  } catch (e) {
    console.log(e);
  }

});

let TipoDePlatillo = ['Principal', 'Extra'];
document.addEventListener("DOMContentLoaded", async () => {
 TipoDePlatillo.forEach((cargo) => {
    const option = document.createElement("option");
    option.value = cargo;
    option.text = cargo;
    tipo.appendChild(option);
  });
});