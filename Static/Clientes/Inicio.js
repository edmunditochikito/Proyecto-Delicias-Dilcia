import { createDatatable } from "../DataTables.js";

const nombre = document.getElementById("nombre");
const cedula = document.getElementById("cedula");
const telefono = document.getElementById("telefono");
const direccion = document.getElementById("direccion");
const form = document.getElementById("formulario");



window.addEventListener("load", async() => {
  createDatatable({
    id: "Tabla",
    ajaxUrl: {
      url: "/dtCustomer",
      type: "GET",
    },
    searchBuilder: true,
    buttons: true,
    columns: [
      { data: "nombre" },
      { data: "cedula", className: "text-center" },
      { data: "telefono" },
      { data: "direccion" },
      {
        title: "Acciones",
        className: "text-center",
        orderable: false,
        searchable: false,
      },
    ],
    buttonsEvents: {
      targets: -1,
      data: null,
      render: function (data, type, row, meta) {
        return `<button class="btn btn-sm btn-danger remove-btn" onclick="sweetConfirmDelete('${data.cedula}')"><i class="bi bi-trash"></i></button>
                <button class="btn btn-sm btn-primary edit-btn" onclick="MostrarModal('${data.cedula}')"><i class="bi bi-pencil"></i></button>`;
      },
    },
  });
});

window.sweetConfirmDelete = async(cedula) => {
  Swal.fire({
    icon: "warning",
    title: "Eliminar?",
    showCancelButton: true,
    cancelButtonText:"Cancelar",
    confirmButtonText: "Eliminar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `<h4 class="fw-bold m-0">Eliminando...</h4>`,
        allowOutsideClick: false,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          deleteCustomer(cedula);
          
        },
      });
    }
  });
}; 

window.sweetConfirmUpdate = async(cedula) => {
  Swal.fire({
    icon: "question",
    title: "Actualizar?",
    showCancelButton: true,
    cancelButtonText:"Cancelar",
    confirmButtonText: "Actualizar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `<h4 class="fw-bold m-0">Actualizando...</h4>`,
        allowOutsideClick: false,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          updateCustomer(cedula);
          
        },
      });
    }
  });
}; 

const updateCustomer = async (cedula) => {
  try {
    const formData = new FormData(document.getElementById("formulario"));
    const responsePost = await axios.post("/ActualizarCliente/" + cedula, formData);
    const response = responsePost.data
    console.log(responsePost)
    if (responsePost) {
      Swal.fire({
        position: "center",
        icon: response.status,
        title: response.message,
        text: `El cliente ${response.customer} ha sido actualizado con éxito!`,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      updateDatatable();
    } else {
      console.error("Error al actualizar el cliente:", response.message);
    }
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
  }
};

const deleteCustomer = async (cedula) => {
  try {
    const responsePost = await axios.post("/EliminarCliente/" + cedula);
    const response = responsePost.data;

    if (responsePost) {
      Swal.fire({
        position: "center",
        icon: `${response.status}`,
        title: `${response.message}`,
        text: `El cliente ${response.customer.Nombre} ha sido eliminado con éxito!`,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      updateDatatable();
    }
  } catch (e) {
    console.log(e);
  }
};


window.updateDatatable = async() => {
  const dataTableContainer = document.getElementById("Tabla");
  dataTableContainer.innerHTML = "";
  createDatatable({
    id: "Tabla",
    ajaxUrl: {
      url: "/dtCustomer",
      type: "GET",
    },
    searchBuilder: true,
    buttons: true,
    columns: [
      { data: "nombre" },
      { data: "cedula", className: "text-center" },
      { data: "telefono" },
      { data: "direccion" },
      {
        title: "Acciones",
        className: "text-center",
        orderable: false,
        searchable: false,
      },
    ],
    buttonsEvents: {
      targets: -1,
      data: null,
      render: function (data, type, row, meta) {
        return `<button class="btn btn-sm btn-danger remove-btn" onclick="sweetConfirmDelete('${data.cedula}')"><i class="bi bi-trash"></i></button>
                <button class="btn btn-sm btn-primary edit-btn" onclick="MostrarModal('${data.cedula}')"><i class="bi bi-pencil"></i></button>`;
      },
    },
    
  });
};

function validarFormulario() {

  let formularioValido = true;

  if (!nombre.value.trim()) {
    nombre.classList.add("is-invalid");
    formularioValido = false;
  } else {
    nombre.classList.remove("is-invalid");
  }

  
  if (!direccion.value.trim()) {
    direccion.classList.add("is-invalid");
    formularioValido = false;
  } else {
    direccion.classList.remove("is-invalid");
  }


  if (!telefono.value.trim()) {
    telefono.classList.add("is-invalid");
    formularioValido = false;
  } else {
    telefono.classList.remove("is-invalid");
  }

  
  return formularioValido;
}

window.MostrarModal = async (cedula) => {
  try {
    const modal = new bootstrap.Modal(document.getElementById("modalDetails"));
    const response = await axios.post("/ObtenerCliente/" + cedula);
    const datosCliente = response.data;
    poblarModal(datosCliente);
    
    document.getElementById('update').addEventListener('click', async(e)=>{
      e.preventDefault();
     
      if (validarFormulario()) {
        await sweetConfirmUpdate(cedula);
        modal.hide(); 
      }
    });

    modal.show();
  } catch (e) {
    console.log(e);
  }
};

function poblarModal(datosCliente) {
  nombre.value = datosCliente.Nombre;
  cedula.value = datosCliente.Cedula;
  telefono.value = datosCliente.Telefono;
  direccion.value = datosCliente.Direccion;
}
