import { createDatatable,toastAlertError,toastAlertSuccess } from "../DataTables.js";

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

  