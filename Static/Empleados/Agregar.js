import { toastAlertError, toastAlertSuccess } from "../DataTables.js";

const nombre = document.getElementById("nombre");
const cargo = document.getElementById("cargo");
const fecha = document.getElementById("fecha");
const form = document.getElementById("formulario");

document.getElementById("agregar").addEventListener("click", async (e) => {
  if (!nombre.value) {
    toastAlertError(`El campo de nombre está vacío`);
    e.preventDefault();
    nombre.classList.add("is-invalid");
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
  } else {
    nombre.classList.remove("is-invalid");
  };

  if (!fecha.value) {
    toastAlertError(`El campo de la Fecha está vacío`);
    e.preventDefault();
    fecha.classList.add("is-invalid");
    return;
  } else {
    fecha.classList.remove("is-invalid");
  }

  e.preventDefault();
  const data = {
    nombre: nombre.value,
    cargo: cargo.value,
    fecha: fecha.value,
  };
  try {
    const response = await axios.post("/AgregarEmpleado", data);
    const responseData = response.data;
    if (responseData.data.startsWith("Error")) {
      toastAlertError(responseData.data);
    } else {
      toastAlertSuccess(responseData.data);
      form.reset();
    }
    
    return;
  } catch (error) {
    toastAlertError(`Error al enviar los datos: ${error.message}`);
  }

});

let cargos = ["Chef","Ayudante de cocina","Repartidor"];
document.addEventListener("DOMContentLoaded", async () => {
 cargos.forEach((cargo) => {
    const option = document.createElement("option");
    option.value = cargo;
    option.text = cargo;
    document.getElementById("cargo").appendChild(option);
  });
});