const MostrarModal = async (id) => {
  try {
    const response = await fetch("/ObtenerCliente/" + id, {
      method: "POST",
    }); // Ruta donde se encuentra la vista de Flask que devuelve los datos del cliente
    if (!response.ok) {
      throw new Error("Hubo un problema al obtener los datos del cliente.");
    }
    const datosCliente = await response.json();
    if (datosCliente) {
      poblarModal(datosCliente);
    } else console.error("error");
  } catch (error) {
    console.error("Error:", error);
  }
};

function poblarModal(datosCliente) {
  document.getElementById("nombre").value = datosCliente.Nombre;
  document.getElementById("cedula").value = datosCliente.Cedula;
  document.getElementById("telefono").value = datosCliente.Telefono;
  document.getElementById("direccion").value = datosCliente.Direccion;
}

