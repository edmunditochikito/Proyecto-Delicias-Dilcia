import { createDatatable,toastAlertError,toastAlertSuccess,Toast} from "../DataTables.js";

const nombre = document.getElementById("nombre");
const cedula = document.getElementById("cedula");
const telefono = document.getElementById("telefono");
const direccion = document.getElementById("direccion");

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
    columnsExport: [],
    columnsPrint:[0,1,2,3], 
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
  if (!$.fn.DataTable.isDataTable("#Tabla")) {
    loadUsersTable({
      id: "Tabla",
      data: newData,
      searchBuilder: true,
      buttons: true,
    });
  } else {
    const table = $("#Tabla").DataTable();
    table.ajax.reload(null, false); 
    table.ajax.url('/dtCustomer').load();
  }
};

function validarFormularioUpdate() {
  if (!nombre.value) {
    toastAlertError(`El campo de nombre está vacío`);
    nombre.classList.add("is-invalid")
    return;
  } else if (!isNaN(nombre.value)) {
    toastAlertError(`El nombre ${nombre.value} no tiene un formato válido`);

    nombre.classList.add("is-invalid");
    return;
  } else if (nombre.value.length <= 2) {
    toastAlertError(`El nombre ${nombre.value} es muy corto`);
    nombre.classList.add("is-invalid");
    return;
  }else{
    nombre.classList.remove("is-invalid");
  }

  if (!telefono.value) {
    toastAlertError(`El campo del teléfono está vacío`);
    telefono.classList.add("is-invalid");
    return;
  } else if (isNaN(telefono.value)) {
    toastAlertError(`El teléfono ${telefono.value} no tiene un formato válido`);
    telefono.classList.add("is-invalid");
    return;
  }else if (telefono.value<0) {
    toastAlertError(`El teléfono no puede ser negativo`);
    telefono.classList.add("is-invalid");
    return;
  }else if (telefono.value.length < 8) {
    toastAlertError(`El teléfono ${telefono.value} es muy corto`);
    telefono.classList.add("is-invalid");
    return;
  } else if (telefono.value.length > 8) {
    toastAlertError(`El teléfono ${telefono.value} es muy largo`);
    telefono.classList.add("is-invalid");
    return;
  }else{
    telefono.classList.remove("is-invalid");
  }


  if (!direccion.value) {
    toastAlertError(`El campo de la dirección está vacío`);
    direccion.classList.add("is-invalid");
    return;
  } else if (!isNaN(direccion.value)) {
    toastAlertError(
      `La dirección ${direccion.value} no tiene un formato válido`);
    direccion.classList.add("is-invalid");
    return;
  } else if (direccion.value.length < 6) {
    toastAlertError(`La dirección ${direccion.value} es muy corta`);
    direccion.classList.add("is-invalid");
    return;
  }else{
    direccion.classList.remove("is-invalid")
  }
  return true;
}
function validarFormularioOrders() {
if(PlatilosPedidos.length==0){
  toastAlertError(`No se ha seleccionado ningún platillo`);
  return;
}
return true;
}

window.MostrarModalUpdate = async (cedula) => {
  try {
    const modal = new bootstrap.Modal(document.getElementById("modalDetails"));
    const response = await axios.post("/ObtenerCliente/" + cedula);
    const datosCliente = response.data;
    poblarModalUpdate(datosCliente);

    document.getElementById('update').addEventListener('click', async(e)=>{
      e.preventDefault();
     
      if (validarFormularioUpdate()) {
        await sweetConfirmUpdate(cedula);
        modal.hide(); 
      }
    });
    modal.show();
  } catch (e) {
    console.log(e);
  }
};

let modal; // Definir la variable modal fuera de la función

window.MostrarModalOrders = async (cedula) => {
  try {
    modal = new bootstrap.Modal(document.getElementById("modalOrders")); // Asignar el valor de la instancia del modal
    const response = await axios.post("/ObtenerCliente/" + cedula);
    const datosCliente = response.data;
    poblarModalOrders(datosCliente);
   
    modal.show();
  } catch (e) {
    console.log(e);
  }
};

async function GenerarPedido() {
  try {
    let pedidoSimplificado = PlatilosPedidos.map(platillo => ({
      PlatilloID: platillo.id,
      Cantidad: platillo.cantidad,
      EstadoPago: platillo.estado
    }));

    let datosFormularioPedido = {
      CedulaP: cedulaP.textContent,
      platillos: pedidoSimplificado,
      fecha_pedido: fecha_pedido.value,
    };
    console.log(datosFormularioPedido);
    
    const response = await axios.post('/GenerarPedidos', datosFormularioPedido);
    const data = response.data;

    console.log(data); // Add this line to debug the response
    toastPedidoRealizado(data.data); 
    modal.hide();

    // Ocultar el modal después de generar el pedido
  } catch (error) {
    console.error('Error:', error);
  }
}

// Agregar evento click al botón para generar el pedido
document.getElementById('Generate').addEventListener('click', (e) => {
  e.preventDefault();
  if (!validarFormularioOrders()) {
    return;
  }
  GenerarPedido();
  document.getElementById("cantidad").value = "";

  while (PlatilosPedidos.length > 0) {
    PlatilosPedidos.pop();
  }
  addRowDatatable(PlatilosPedidos);
});

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
              
              var data = response.data;
              
              // Obtener el select
              var select = $('#IdPlatillo');

              // Iterar sobre los clientes y agregar opciones al select
              $.each(data, function(index, platillo) {
                if(platillo.estado=="Disponible"){
                  // Crear un elemento <option>
                  var option = $('<option></option>');
                  // Establecer el valor y el texto del option con la información del cliente
                  option.val(platillo.platilloID); // Puedes usar otro campo como identificador si lo deseas
                  option.text(platillo.nombre + ' - ' + platillo.descripcion); // Puedes personalizar el texto como desees
                  // Agregar el option al select
                  select.append(option);
                }
                
              });
          } else {
              console.log('No se encontraron datos .');
          }
      },
      error: function(xhr, status, error) {
          console.error('Error al obtener datos ', error);
      }
  });
}); 





function llenarSelect() {
  let datos = ["Pagado","Pendiente"];
  var select = document.getElementById("estado");
  datos.forEach(function(persona) {
     
      var option = document.createElement("option");
      
      option.value = persona; 
      option.text = persona; 
      select.appendChild(option);
  });
}


window.onload = llenarSelect;

  var fechaActual = new Date();
  var dia = fechaActual.getDate();
  var mes = fechaActual.getMonth() + 1; 
  var año = fechaActual.getFullYear();

  if (mes < 10) {
    mes = '0' + mes;
  }
  if (dia < 10) {
    dia = '0' + dia;
  }

  // Establecer el valor predeterminado del campo de entrada de fecha
document.getElementById('fecha_pedido').value = año + '-' + mes + '-' + dia;




let idRow = 0;
const PlatilosPedidos = [];

$(document).ready(function() {
  // Inicializar DataTable con configuraciones
  const table = $('#Tablap').DataTable({
    data: PlatilosPedidos,
    language: {
      url: "https://cdn.datatables.net/plug-ins/2.0.2/i18n/es-ES.json",
    },
    responsive: true,
    paging: true,
    pagingType: "simple_numbers",
    columns: [
      { title: "ID del Platillo", data: "id" },
      { title: "Cantidad", data: "cantidad" },
      {
        title: "Descripción",
        data: "descripcion",
        render: function(data, type, row) {
          // Acortar la descripción si es muy larga para mostrarla
          if (type === 'display' && data.length > 50) {
            return '<span class="descripcion-corta" title="Haga clic para ver más">' + data.substr(0, 50) + '...</span>';
          }
          return data;
        }
      },
      { data: "idRow", visible: false },
      {
        title:"estado",
        data:"estado"
      },
      {
        title:"Precio",
        data:"precio"
      },
      {
        title: "Acciones",
        data: null,
        className: "text-center",
        orderable: false,
        searchable: false,
        render: function(data, type, row, meta) {
          // Agregar un botón de eliminar con un controlador de clic para eliminar una fila
          return `<button class="btn btn-sm btn-danger remove-btn" onclick="SweetEliminarPlatillo(event, ${row.idRow})"><i class="bi bi-trash"></i></button>`;
        }
      }
    ],
    scrollX: true,
    destroy: true,  
  });

  window.SweetEliminarPlatillo = function(event, idRow) {
    event.preventDefault(); 
    Swal.fire({
      icon: "warning",
      title: "¿Deseas eliminar este platillo?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `<h4 class="fw-bold m-0">Eliminando...</h4>`,
          allowOutsideClick: false,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const index = PlatilosPedidos.findIndex(p => p.idRow === idRow);
            if (index !== -1) {
              PlatilosPedidos.splice(index, 1);
            }
            addRowDatatable(PlatilosPedidos);
            idRow--;
            console.log(idRow)
            Swal.close();
            Swal.fire({
              icon: "success",
              title: "Platillo eliminado",
              text: "El platillo ha sido eliminado correctamente."
            });
          }
        });
      }
    });
  };


  $('#Tablap tbody').on('click', 'td .descripcion-corta', function() {
    const rowData = table.row($(this).parents('tr')).data();
    sweetConfirmInfoPlatillo(rowData.descripcion);
  });
});

const validacionPlatillo = () => {
  if(!cantidad.value){
    toastAlertError(`El campo de cantidad está vacío`);
    cantidad.classList.add("is-invalid");
    return;
  }else if(isNaN(cantidad.value)){
    toastAlertError(`La cantidad ${cantidad.value} no tiene un formato válido`);
    cantidad.classList.add("is-invalid");
    return;
  }else if(cantidad.value<0){
    toastAlertError(`La cantidad no puede ser negativa`);
    cantidad.classList.add("is-invalid");
    return;
  }else{
    cantidad.classList.remove("is-invalid");
  
  }
  return true;
};

document.getElementById("agregarPlatillo").addEventListener("click", async(e) => {
  e.preventDefault();
  if (!validacionPlatillo()) {
    return;
  }
  const cantidadInput = document.getElementById("cantidad");
  const cantidad = cantidadInput.value;
  const IdPlatillo = document.getElementById("IdPlatillo");
  const indexPlatillo = IdPlatillo.selectedIndex;
  const descripcionPlatillo = IdPlatillo.options[indexPlatillo].text;
  const estado = document.getElementById("estado").value;
  
  const response = await axios.post("/ObtenerPlatillo/"+IdPlatillo.value);
  const responseData=response.data;
  console.log(responseData);

  const Platillo = {
    "cantidad": cantidad,
    "id": IdPlatillo.value,
    "descripcion": descripcionPlatillo,
    "idRow": idRow++,
    "estado":estado,
    "precio":responseData.Precio,
  };

  // Agregar el nuevo platillo al array PlatilosPedidos
  PlatilosPedidos.push(Platillo);

  // Actualizar la DataTable con los nuevos datos
  addRowDatatable(PlatilosPedidos);
  cantidadInput.value = '';
  cantidadInput.focus();
});

// Función para actualizar la DataTable con los datos de PlatilosPedidos
function addRowDatatable(PlatilosPedidos) {
  const table = $('#Tablap').DataTable();

  // Limpiar la tabla actual
  table.clear();

  // Agregar los nuevos datos
  table.rows.add(PlatilosPedidos);

  // Dibujar la tabla
  table.draw();
}

window.sweetConfirmInfoPlatillo = (info) => {
  Swal.fire({
    icon: "info",
    title: info,
    showCancelButton: false,
  });
};


window.toastPedidoRealizado = (info) => {
  Toast.fire({
    icon: 'success',
    title: info,
  });
};

document.getElementById("cancel").addEventListener("click", () => {
  document.getElementById("cantidad").value = "";
  while (PlatilosPedidos.length > 0) {
    PlatilosPedidos.pop();
  }
  addRowDatatable(PlatilosPedidos);
});

document.getElementById("Close").addEventListener("click", () => {
  document.getElementById("cantidad").value = "";
  while (PlatilosPedidos.length > 0) {
    PlatilosPedidos.pop();
  }
  addRowDatatable(PlatilosPedidos);
});


document.getElementById("updateClose").addEventListener("click",(e)=>{
nombre.classList.remove("is-invalid")
telefono.classList.remove("is-invalid")
direccion.classList.remove("is-invalid")
})

document.getElementById("updateCancel").addEventListener("click",(e)=>{
nombre.classList.remove("is-invalid")
telefono.classList.remove("is-invalid")
direccion.classList.remove("is-invalid")
})