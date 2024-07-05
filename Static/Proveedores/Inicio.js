import { createDatatable,toastAlertError,toastAlertSuccess } from "../DataTables.js";

const nombre = document.getElementById("nombre");
const telefono = document.getElementById("telefono");
const direccion = document.getElementById("direccion");
const form = document.getElementById("formulario");
const categoria = document.getElementById("Categoria");

const proveedor = document.getElementById("Proveedor");
const productos = document.getElementById("IdProducto");
const cantidad = document.getElementById("cantidad");
const fecha_compra = document.getElementById("fecha_compra");

window.addEventListener("load", async() => {
    createDatatable({
      id: "Tabla",
      ajaxUrl: {
        url: "/dtProvider",
        type: "GET",
      },
      searchBuilder: true,
      buttons: true,
      columns: [
        { data: "id",className: "text-center"  },
        { data: "nombre",className: "text-center" },
        { data: "telefono",className: "text-center" },
        { data: "categoria",className: "text-center" },
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
          return `<button class="btn btn-sm btn-danger remove-btn" onclick="sweetConfirmDelete('${data.id}')"><i class="bi bi-trash"></i></button>
                  <button class="btn btn-sm btn-primary edit-btn" onclick="MostrarModal('${data.id}')"><i class="bi bi-pencil"></i></button>
                  <button class="btn btn-sm btn-success edit-btn" onclick="MostrarModalCompras('${data.id}')"><i class="bi bi-truck"></i></button>`;
        },
      },
     columnsExport: [0, 1, 2, 3], 
     columnsPrint: [0, 1, 2, 3],
    });
  });

  window.sweetConfirmDelete = async(id) => {
    Swal.fire({
      icon: "warning",
      title: "¿Estas seguro de que deseas eliminar este proveedor?",
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
            deleteProvider(id);
            
          },
        });
      }
    });
  }; 

  window.sweetConfirmUpdate = async(id) => {
    Swal.fire({
      icon: "question",
      title: "¿Estas seguro de que deseas actualizar este proveedor?",
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
            updateProvider(id);
            
          },
        });
      }
    });
  }; 
  
  const deleteProvider = async (id) => {
    try {
      const responsePost = await axios.post("/EliminarProveedor/" + id);
      const response = responsePost.data;
  
      if (responsePost) {
        Swal.fire({
          position: "center",
          icon: `${response.status}`,
          title: `${response.message}`,
          text: `El proveedor ${response.provider.Nombre} ha sido eliminado con éxito!`,
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

const updateProvider = async (id) => {
    try {
      const formData = new FormData(document.getElementById("formulario"));
      const responsePost = await axios.post("/ActualizarProveedor/" + id, formData);
      const response = responsePost.data

      if (responsePost) {
        Swal.fire({
          position: "center",
          icon: response.status,
          title: response.message,
          text: `El proveedor ${response.provider} ha sido actualizado con éxito!`,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        updateDatatable();
      } else {
        console.error("Error al actualizar el proveedor:", response.message);
      }
    } catch (error) {
      console.error("Error al actualizar el proveedor:", error);
    }
  };
  
  function validarFormulario() {
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
    }else if(telefono.value<0){    
      toastAlertError(`El teléfono no puede ser negativo`);
      telefono.classList.add("is-invalid");
      return;
    }  
    else if (telefono.value.length < 8) {
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
      
      formularioValido=false;
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

  window.MostrarModal = async (id) => {
    try {
      const modal = new bootstrap.Modal(document.getElementById("modalDetails"));
      const response = await axios.post("/ObtenerProveedor/" + id);
      const datosProveedores= response.data;
      poblarModal(datosProveedores);
      document.getElementById('update').addEventListener('click', async(e)=>{
        e.preventDefault();     
        
        if(validarFormulario()){
          await sweetConfirmUpdate(id);
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
    telefono.value = datosCliente.Telefono;
    direccion.value = datosCliente.Direccion;
  }

  window.updateDatatable = async() => {
    if (!$.fn.DataTable.isDataTable("#Tabla")) {
      // Si la tabla DataTable no está inicializada, inicialízala con los datos y las opciones
      loadUsersTable({
        id: "Tabla",
        data: newData,
        searchBuilder: true,
        buttons: true,
      });
    } else {
      const table = $("#Tabla").DataTable();
      table.ajax.reload(null, false); 
      table.ajax.url('/dtProvider').load();
    }
  };
  function validarFormularioCompras() {
    if(productosComprados.length==0){
      toastAlertError(`No se ha seleccionado ningún producto`);
      return;
    }
    return true;
    }
  let modal; // Definir la variable modal fuera de la función

window.MostrarModalCompras = async (cedula) => {
  try {
    modal = new bootstrap.Modal(document.getElementById("modalOrders")); // Asignar el valor de la instancia del modal
    const response = await axios.post("/ObtenerProveedor/" + cedula);
    const datosCliente = response.data;
    console.log(datosCliente);
    poblarModalCompras(datosCliente);
   
    modal.show();
  } catch (e) {
    console.log(e);
  }
};

async function GenerarCompra() {
  try {
     let comprasimplificada = productosComprados.map(producto => ({
      ProductoID: producto.id,
      Cantidad: producto.cantidad,
    }));

    let datosFormularioPedido = {
      proveedor_id: Proveedor.textContent,
      productos: comprasimplificada,
      fecha_pedido: fecha_compra.value,
    }; 
   
    const response = await axios.post('/GenerarCompras', datosFormularioPedido);
    const data = response.data;

    console.log(data); // Add this line to debug the response
    modal.hide();
    toastAlertSuccess(data.data); 
    

    // Ocultar el modal después de generar el pedido
  } catch (error) {
    console.error('Error:', error);
  }
}

// Agregar evento click al botón para generar el pedido
document.getElementById('Generate').addEventListener('click', (e) => {
  e.preventDefault();
  if (!validarFormularioCompras()) {
    return;
  } 
  GenerarCompra();
  document.getElementById("cantidad").value = "";

  while (productosComprados.length > 0) {
    productosComprados.pop();
  }
  addRowDatatable(productosComprados);
});


function poblarModalCompras(datosCliente) {
  proveedor.value = datosCliente.Nombre;
  Proveedor.textContent = datosCliente.ProveedorID;
}

$(document).ready(function() {
 
  $.ajax({
      url: '/dtProduct',
      type: 'GET',
      dataType: 'json',
      success: function(response) {
          
          if (response && response.data && response.data.length > 0) {
              var data = response.data;
              var select = $('#IdProducto');
              // Iterar sobre los clientes y agregar opciones al select
              $.each(data, function(index, Producto) {
                  // Crear un elemento <option>
                  var option = $('<option></option>');
                  // Establecer el valor y el texto del option con la información del cliente
                  option.val(Producto.id); // Puedes usar otro campo como identificador si lo deseas
                  option.text(Producto.nombre ); // Puedes personalizar el texto como desees
                  // Agregar el option al select
                  select.append(option);
                
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

  document.getElementById('fecha_compra').value = año + '-' + mes + '-' + dia;

  let idRow = 0;
  const productosComprados = [];
  $(document).ready(function() {
    // Inicializar DataTable con configuraciones
    const table = $('#Tablap').DataTable({
      data: productosComprados,
      language: {
        url: "https://cdn.datatables.net/plug-ins/2.0.2/i18n/es-ES.json",
      },
      responsive: true,
      paging: true,
      pagingType: "simple_numbers",
      columns: [
        { title: "ID del Producto", data: "id",className: "text-center"},
        { title: "Cantidad", data: "cantidad",className: "text-center"},
        { title: "Unidad De Medida", data: "UnidadDeMedida",className: "text-center"},
        {
          title: "nombre",
          data: "nombre",  
          className: "text-center"
        },
        { data: "idRow", visible: false },
        {
          title:"Precio",
          data:"precio",
          className: "text-center"
        },
        {
          title: "Acciones",
          data: null,
          className: "text-center",
          orderable: false,
          searchable: false,
          render: function(data, type, row, meta) {
            // Agregar un botón de eliminar con un controlador de clic para eliminar una fila
            return `<button class="btn btn-sm btn-danger remove-btn" onclick="SweetEliminarProducto(event, ${row.idRow})"><i class="bi bi-trash"></i></button>`;
          }
        }
      ],
      scrollX: true,
      destroy: true,  
    });
  })

  const validacionProducto = () => {
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
  document.getElementById("agregarProducto").addEventListener("click", async(e) => {
    e.preventDefault();
    if (!validacionProducto()) {
      return;
    }
    
    const productos = document.getElementById("IdProducto").value;
    const cantidad = document.getElementById("cantidad");
    const cantidadValor = cantidad.value;
    const fecha_compra = document.getElementById("fecha_compra").value;
    

    const response = await axios.post("/ObtenerProducto/"+productos);
    const responseData=response.data;
    console.log(responseData);

    const producto = {
      id: productos,
      cantidad: cantidadValor,
      UnidadDeMedida: responseData.UnidadDeMedida,
      nombre: responseData.Nombre,
      precio: responseData.PrecioUnitario,
      idRow: idRow++,
    };

    productosComprados.push(producto);
    addRowDatatable(productosComprados);
    cantidad.value = '';
    cantidad.focus();

  
  });
  
  // Función para actualizar la DataTable con los datos de productosComprados
  function addRowDatatable(productosComprados) {
    const table = $('#Tablap').DataTable();
  
    // Limpiar la tabla actual
    table.clear();
  
    // Agregar los nuevos datos
    table.rows.add(productosComprados);
  
    // Dibujar la tabla
    table.draw();
  }

  // Establecer el valor predeterminado del campo de entrada de fecha


window.SweetEliminarProducto = function(event, idRow) {
  event.preventDefault(); 
  Swal.fire({
    icon: "warning",
    title: "¿Deseas eliminar este Producto?",
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
          const index = productosComprados.findIndex(p => p.idRow === idRow);
          if (index !== -1) {
            productosComprados.splice(index, 1);
          }
          addRowDatatable(productosComprados);
          idRow--;
          console.log(idRow)
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "Producto eliminado",
            text: "El Producto ha sido eliminado correctamente."
          });
        }
      });
    }
  });
};

document.getElementById("closeCompra").addEventListener("click", () => {
  document.getElementById("cantidad").value = "";
  while (productosComprados.length > 0) {
    productosComprados.pop();
  }
  addRowDatatable(productosComprados);
  cantidad.classList.remove("is-invalid");
});

document.getElementById("cancelCompra").addEventListener("click", () => {
  document.getElementById("cantidad").value = "";
  while (productosComprados.length > 0) {
    productosComprados.pop();
  }
  addRowDatatable(productosComprados);
  cantidad.classList.remove("is-invalid");
});
  
  document.getElementById("close").addEventListener("click",(e)=>{
  nombre.classList.remove("is-invalid")
  telefono.classList.remove("is-invalid")
  direccion.classList.remove("is-invalid")
  })
  
  document.getElementById("cancel").addEventListener("click",(e)=>{
  nombre.classList.remove("is-invalid")
  telefono.classList.remove("is-invalid")
  direccion.classList.remove("is-invalid")
  })

  let Categorias = ['Lacteos', 'Carnes', 'Pollo', 'Verduras', 'Insumos Basicos', 'Todos'];
  document.addEventListener("DOMContentLoaded", async () => {
   Categorias.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.text = category;
      categoria.appendChild(option);
    });
  });