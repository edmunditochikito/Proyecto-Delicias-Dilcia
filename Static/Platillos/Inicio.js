import { createDatatable } from "../DataTables.js";

const nombre = document.getElementById("nombre");
const precio = document.getElementById("precio");
const descripcion = document.getElementById("descripcion")
const form = document.getElementById("formulario");

window.addEventListener("load", async() => {
    createDatatable({
      id: "Tabla",
      ajaxUrl: {
        url: "/dtDishes",
        type: "GET",
      },
      searchBuilder: true,
      buttons: true,
      columns: [
        { data: "Nombre",className: "text-center" },
        { data: "PlatilloID",className: "text-center"  },
        { data: "Precio",className: "text-center" },
        {data: "descripcion",className: "text-center"},
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
          return `<button class="btn btn-sm btn-danger remove-btn" onclick="sweetConfirmDelete('${data.PlatilloID}')"')"><i class="bi bi-trash"></i></button>
                  <button class="btn btn-sm btn-primary edit-btn" onclick="MostrarModal('${data.PlatilloID}')"')"><i class="bi bi-pencil"></i></button>`;
        },
      },
    });
  });

  window.sweetConfirmDelete = async(id) => {
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
            deleteDish(id);
            
          },
        });
      }
    });
  }; 
   

  const deleteDish = async(id) =>{
    try {
      const formData = new FormData(document.getElementById("formulario"));
      const responsePost = await axios.post("/EliminarPlatillo/" + id, formData);
      const response = responsePost.data
      console.log(responsePost)
     

      if (responsePost) {
        Swal.fire({
          position: "center",
          icon: response.status,
          title: response.message,
          text: `El Platillo ${response.dish.Nombre} ha sido actualizado con éxito!`,
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

  }

  window.sweetConfirmUpdate = async(id) => {
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
            updateDish(id);
            
          },
        });
      }
    });
  }; 
  

const updateDish = async (id) => {
    try {
      const formData = new FormData(document.getElementById("formulario"));
      const responsePost = await axios.post("/ActualizarPlatillo/" + id, formData);
      const response = responsePost.data
      console.log(response)
     

      if (responsePost) {
        Swal.fire({
          position: "center",
          icon: response.status,
          title: response.message,
          text: `El Platillo ${response.dish} ha sido actualizado con éxito!`,
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
  function validarFormulario() {

    let formularioValido = true;
  
    if (!nombre.value.trim()) {
      nombre.classList.add("is-invalid");
      formularioValido = false;
    } else {
      nombre.classList.remove("is-invalid");
    }
  
    
    if (!precio.value.trim()) {
      precio.classList.add("is-invalid");
      formularioValido = false;
    } else {
      precio.classList.remove("is-invalid");
    }
  
  
    if (!descripcion.value.trim()) {
      descripcion.classList.add("is-invalid");
      formularioValido = false;
    } else {
      descripcion.classList.remove("is-invalid");
    }
  
    
    return formularioValido;
  }

  window.MostrarModal = async (id) => {
    try {
      const modal = new bootstrap.Modal(document.getElementById("modalDetails"));
      const response = await axios.post("/ObtenerPlatillo/" + id);
      const datosPlatillos= response.data;
      poblarModal(datosPlatillos);

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

  function poblarModal(datosPlatillos) {
    precio.value=datosPlatillos.Precio
    nombre.value=datosPlatillos.Nombre
    descripcion.value  = datosPlatillos.Descripcion
  }


  window.updateDatatable = async() => {
    const dataTableContainer = document.getElementById("Tabla");
    dataTableContainer.innerHTML = "";
    createDatatable({
        id: "Tabla",
        ajaxUrl: {
          url: "/dtDishes",
          type: "GET",
        },
        searchBuilder: true,
        buttons: true,
        columns: [
          { data: "Nombre",className: "text-center" },
          { data: "PlatilloID", className: "text-center" },
          { data: "Precio",className: "text-center" },
          { data: "descripcion",className: "text-center"},
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
            return `<button class="btn btn-sm btn-danger remove-btn" onclick="sweetConfirmDelete('${data.PlatilloID}')"')"><i class="bi bi-trash"></i></button>
                    <button class="btn btn-sm btn-primary edit-btn" onclick="MostrarModal('${data.PlatilloID}')"')"><i class="bi bi-pencil"></i></button>`;
          },
        },
      });
   
  };

    /*document.getElementById('update').addEventListener('click', async(e)=>{
        e.preventDefault();     
          await sweetConfirmUpdate(id);
          modal.hide(); 
      });*/