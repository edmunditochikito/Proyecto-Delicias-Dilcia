const nombre = document.getElementById("nombre");
const cedula = document.getElementById("cedula");
const telefono = document.getElementById("telefono");
const direccion = document.getElementById("direccion");
const form = document.getElementById("formulario");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let alerts = [];
  let isValid = true;

  if (!nombre.value) {
    alerts.push(`El campo de nombre está vacío`);
    isValid = false;
  } else if (!isNaN(nombre.value)) {
    alerts.push(`El nombre ${nombre.value} no tiene un formato válido`);
    isValid = false;
  } else if (nombre.value.length <= 2) {
    alerts.push(`El nombre ${nombre.value} es muy corto`);
    isValid = false;
  }

  if (!cedula.value) {
    alerts.push(`El campo de la cédula está vacío`);
    isValid = false;
  } else if (!/^\d{3}-\d{6}-\d{4}[A-Za-z]$/.test(cedula.value)) {
    alerts.push(`La cédula ${cedula.value} no tiene un formato válido`);
    isValid = false;
  }

  if (!telefono.value) {
    alerts.push(`El campo del teléfono está vacío`);
    isValid = false;
  } else if (isNaN(telefono.value)) {
    alerts.push(`El teléfono ${telefono.value} no tiene un formato válido`);
    isValid = false;
  } else if (telefono.value.length < 8) {
    alerts.push(`El teléfono ${telefono.value} es muy corto`);
    isValid = false;
  }

  if (!direccion.value) {
    alerts.push(`El campo de la dirección está vacío`);
    isValid = false;
  } else if (!isNaN(direccion.value)) {
    alerts.push(`La dirección ${direccion.value} no tiene un formato válido`);
    isValid = false;
  } else if (direccion.value.length < 6) {
    alerts.push(`La dirección ${direccion.value} es muy corta`);
    isValid = false;
  }

  if (!isValid) {
    alerts.forEach(msg => toastAlertError(msg));
    return;
  }

  const data = {
    nombre: nombre.value,
    cedula: cedula.value,
    telefono: telefono.value,
    direccion: direccion.value,
  };

  try {
    const response = await axios.post("/AgregarCliente", data);
    console.log(response);
    // Maneja la respuesta positiva del servidor, por ejemplo, mostrar un mensaje de éxito.
  } catch (error) {
    // Maneja el error, por ejemplo, mostrando un mensaje de error.
    toastAlertError(`Error al enviar los datos: ${error.message}`);
  }
});

window.toastAlertError = (info) => {
  Toast.fire({
    icon: "error",
    title: info,
  });
};

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});
