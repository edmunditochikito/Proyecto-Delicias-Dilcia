import {toastAlertError,toastAlertSuccess} from '../DataTables.js'
const nombre = document.getElementById("nombre");
const cedula = document.getElementById("cedula");
const telefono = document.getElementById("telefono");
const direccion = document.getElementById("direccion");
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

  if (!cedula.value) {
    toastAlertError(`El campo de la cédula está vacío`);
    cedula.classList.add("is-invalid");
    e.preventDefault();
    return;
  } else if (!/^\d{3}-\d{6}-\d{4}[A-Za-z]$/.test(cedula.value)) {
    toastAlertError(`La cédula ${cedula.value} no tiene un formato válido`);
    cedula.classList.add("is-invalid");
    e.preventDefault();
    return;
  }else{
    cedula.classList.remove("is-invalid");
  }

  if (!telefono.value) {
    toastAlertError(`El campo del teléfono está vacío`);
    e.preventDefault();
    telefono.classList.add("is-invalid");
    return;
  } else if (isNaN(telefono.value)) {
    toastAlertError(`El teléfono ${telefono.value} no tiene un formato válido`);
    e.preventDefault();
    telefono.classList.add("is-invalid");
    return;
  }else if (telefono.value<0) {
    toastAlertError(`El teléfono no puede ser negativo`);
    e.preventDefault();
    telefono.classList.add("is-invalid");
    return;
  }
   else if (telefono.value.length < 8) {
    toastAlertError(`El teléfono ${telefono.value} es muy corto`);
    e.preventDefault();
    telefono.classList.add("is-invalid");
    return;
  } else if (telefono.value.length > 8) {
    toastAlertError(`El teléfono ${telefono.value} es muy largo`);
    e.preventDefault();
    telefono.classList.add("is-invalid");
    return;
  }else{
    telefono.classList.remove("is-invalid");
  }


  if (!direccion.value) {
    toastAlertError(`El campo de la dirección está vacío`);
    e.preventDefault();
    direccion.classList.add("is-invalid");
    return;
  } else if (!isNaN(direccion.value)) {
    toastAlertError(
      `La dirección ${direccion.value} no tiene un formato válido`);
    e.preventDefault();
    direccion.classList.add("is-invalid");
    return;
  } else if (direccion.value.length < 6) {
    toastAlertError(`La dirección ${direccion.value} es muy corta`);
    e.preventDefault();
    direccion.classList.add("is-invalid");
    return;
  }else{
    direccion.classList.remove("is-invalid")
  }

  const data = {
    nombre: nombre.value,
    cedula: cedula.value,
    telefono: telefono.value,
    direccion: direccion.value,
  };
  e.preventDefault();

  try {
    console.log(data);
    const response = await axios.post("/AgregarCliente", data);
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


