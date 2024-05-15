import { createDatatable } from "../DataTables.js";

const nombre = document.getElementById("nombre");
const cedula = document.getElementById("cedula");
const telefono = document.getElementById("telefono");
const direccion = document.getElementById("direccion");
const form = document.getElementById("formulario");

const cedulaP = document.getElementById("CedulaP");
const IdPlatillo = document.getElementById("IdPlatillo");
const cantidad = document.getElementById("cantidad");
const estado = document.getElementById("estado");
const fecha_pedido = document.getElementById("fecha_pedido");

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
      { data: "nombre",className: "text-center" },
      { data: "cedula", className: "text-center" },
      { data: "telefono",className: "text-center" },
      { data: "direccion",className: "text-center" },
      {
        title: "Acciones",
        className: "text-center",
        orderable: false,
        searchable: false,
      },
    ],
    buttonsEvents: {
      targets: 4,
      data: null,
      render: function (data, type, row, meta) {
        return `<button class="btn btn-sm btn-danger remove-btn" onclick="sweetConfirmDelete('${data.cedula}')"><i class="bi bi-trash"></i></button>
                <button class="btn btn-sm btn-primary edit-btn" onclick="MostrarModalUpdate('${data.cedula}')"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-sm btn-success edit-btn" onclick="MostrarModalOrders('${data.cedula}')"><i class="bi bi-truck"></i></button>
                `;
      },
    },
  });
});

window.sweetConfirmDelete = async(cedula) => {
  Swal.fire({
    icon: "warning",
    title: "¿Estas seguro de que deseas eliminar a este cliente?",
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
    title: "Estas seguro de que deseas actualizar a este cliente?",
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
      { data: "nombre",className: "text-center" },
      { data: "cedula", className: "text-center" },
      { data: "telefono",className: "text-center" },
      { data: "direccion",className: "text-center" },
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
                <button class="btn btn-sm btn-primary edit-btn" onclick="MostrarModalUpdate('${data.cedula}')"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-sm btn-success edit-btn" onclick="MostrarModalOrders('${data.cedula}')"><i class="bi bi-truck"></i></button>`;
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

window.MostrarModalUpdate = async (cedula) => {
  try {
    const modal = new bootstrap.Modal(document.getElementById("modalDetails"));
    const response = await axios.post("/ObtenerCliente/" + cedula);
    const datosCliente = response.data;
    poblarModalUpdate(datosCliente);
    
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
window.MostrarModalOrders = async (cedula) => {
  try {
    const modal = new bootstrap.Modal(document.getElementById("modalOrders"));
    const response = await axios.post("/ObtenerCliente/" + cedula);
    const datosCliente = response.data;
    poblarModalOrders(datosCliente)

    document.getElementById('Generate').addEventListener('click',(e)=>{
      e.preventDefault();
       GenerarPedido();
       modal.hide();
    });
    
    
    modal.show();
  } catch (e) {
    console.log(e);
  }
};

function poblarModalUpdate(datosCliente) {
  nombre.value = datosCliente.Nombre;
  cedula.value = datosCliente.Cedula;
  telefono.value = datosCliente.Telefono;
  direccion.value = datosCliente.Direccion;
}
function poblarModalOrders(datosCliente) {
  cedulaP.textContent = datosCliente.Cedula;
  cedulaP.value = datosCliente.Nombre+" "+datosCliente.Cedula;
}


 $(document).ready(function() {
 
  $.ajax({
      url: '/GetDishes',
      type: 'POST',
      dataType: 'json',
      success: function(response) {
          // Verificar si la respuesta contiene datos
          if (response && response.data && response.data.length > 0) {
              // Obtener el array de clientes
              var clientes = response.data;

              // Obtener el select
              var select = $('#IdPlatillo');

              // Iterar sobre los clientes y agregar opciones al select
              $.each(clientes, function(index, platillo) {
                  // Crear un elemento <option>
                  var option = $('<option></option>');
                  // Establecer el valor y el texto del option con la información del cliente
                  option.val(platillo.PlatilloID); // Puedes usar otro campo como identificador si lo deseas
                  option.text(platillo.Nombre + ' - ' + platillo.descripcion); // Puedes personalizar el texto como desees
                  // Agregar el option al select
                  select.append(option);
              });
          } else {
              console.log('No se encontraron datos de clientes.');
          }
      },
      error: function(xhr, status, error) {
          console.error('Error al obtener datos de clientes:', error);
      }
  });
}); 


let datos = ["Pagado","Pendiente"];

// Función para llenar el select
function llenarSelect() {
  var select = document.getElementById("estado");

  // Iterar sobre los datos
  datos.forEach(function(persona) {
      // Crear un elemento <option>
      var option = document.createElement("option");
      // Establecer el valor y el texto del option con la información de la persona
      option.value = persona; // Puedes usar otro campo como identificador si lo deseas
      option.text = persona; // Puedes personalizar el texto como desees
      // Agregar el option al select
      select.appendChild(option);
  });
}

// Llamar a la función para llenar el select cuando la página se cargue
window.onload = llenarSelect;

  // Obtener la fecha actual
  var fechaActual = new Date();
  var dia = fechaActual.getDate();
  var mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0
  var año = fechaActual.getFullYear();

  // Formatear la fecha para que sea compatible con el campo de entrada de fecha
  if (mes < 10) {
    mes = '0' + mes; // Agregar un cero delante si el mes es menor que 10
  }
  if (dia < 10) {
    dia = '0' + dia; // Agregar un cero delante si el día es menor que 10
  }

  // Establecer el valor predeterminado del campo de entrada de fecha
document.getElementById('fecha_pedido').value = año + '-' + mes + '-' + dia;

function GenerarPedido(){

  let datosFormularioPedido = {
    CedulaP: cedulaP.textContent,
    IdPlatillo: IdPlatillo.value,
    cantidad: cantidad.value,
    fecha_pedido: fecha_pedido.value,
    estado: estado.value
  };
  console.log(datosFormularioPedido)
  axios.post('/GenerarPedidos', datosFormularioPedido)
  .then(function (response) {
    // Manejar la respuesta del servidor si es necesario
    console.log(response.data);
  })
  .catch(function (error) {
    // Manejar errores si es necesario
    console.error('Error:', error);
  });
}