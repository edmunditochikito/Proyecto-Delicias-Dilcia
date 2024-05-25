import { createDatatable } from "../DataTables.js";

const nombre = document.getElementById("nombre");
const telefono = document.getElementById("telefono");
const direccion = document.getElementById("direccion");
const form = document.getElementById("formulario");

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
                  <button class="btn btn-sm btn-primary edit-btn" onclick="MostrarModal('${data.id}')"><i class="bi bi-pencil"></i></button>`;
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
      // Si la tabla DataTable ya está inicializada, recarga los datos mediante AJAX
      const table = $("#Tabla").DataTable();
    
      // Opción 1: Recargar los datos utilizando ajax.reload()
      table.ajax.reload(null, false); // El segundo parámetro (false) evita que se reinicie la página
    
      // Opción 2: Actualizar los datos y volver a dibujar la tabla
      // Esto es útil si necesitas modificar los parámetros de la solicitud AJAX
      table.ajax.url('/dtProvider').load();
    }
  };