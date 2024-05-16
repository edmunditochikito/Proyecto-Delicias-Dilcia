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
        { data: "nombre",className: "text-center" },
        { data: "platilloID",className: "text-center"  },
        { data: "precio",className: "text-center" },
        {data: "descripcion",className: "text-center"},
        {data:"estado",className:"text-center"},
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
          const checked = row.estado === 'Disponible' ? 'checked' : '';
          return `<input type="checkbox" class="btn btn-sm btn-primary edit-btn" ${checked} onclick="toggleAvailability(${data.platilloID}, this.checked)"></input>
                  <button class="btn btn-sm btn-danger remove-btn" onclick="sweetConfirmDelete('${data.platilloID}')"')"><i class="bi bi-trash"></i></button>
                  <button class="btn btn-sm btn-primary edit-btn" onclick="MostrarModal('${data.platilloID}')"')"><i class="bi bi-pencil"></i></button>`;
        },
      },
    });
  });

  window.sweetConfirmDelete = async(id) => {
    Swal.fire({
      icon: "warning",
      title: "¿Estas seguro de que deseas eliminar este platillo?",
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
        console.error("Error al actualizar el Platillo:", response.message);
      }
    } catch (error) {
      console.error("Error al actualizar el Platillo:", error);
    }

  }

  window.sweetConfirmUpdate = async(id) => {
    Swal.fire({
      icon: "question",
      title: "¿Estas seguro de que deseas actualizar este platillo?",
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
        console.error("Error al actualizar el Platillo:", response.message);
      }
    } catch (error) {
      console.error("Error al actualizar el Platillo:", error);
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


  let datos = ["Disponible","No Disponible"];

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
window.onload = llenarSelect;

window.toggleAvailability = async (id, isChecked) => {
  try {
      const estado = isChecked ? 'Disponible' : 'No Disponible';
      const response = await axios.post(`/EstadoPlatillo/${id}`, { estado });
     
          updateDatatable();
      
  } catch (error) {
      console.error("Error al actualizar el estado del platillo:", error);
  }
};

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
          { data: "nombre",className: "text-center" },
          { data: "platilloID", className: "text-center" },
          { data: "precio",className: "text-center" },
          { data: "descripcion",className: "text-center"},
          {data:"estado",className:"text-center"},
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
            const checked = row.estado === 'Disponible' ? 'checked' : '';
            return `<input type="checkbox" class="btn btn-sm btn-primary edit-btn" ${checked} onclick="toggleAvailability(${data.platilloID}, this.checked)"></input>
                    <button class="btn btn-sm btn-danger remove-btn" onclick="sweetConfirmDelete('${data.platilloID}')"')"><i class="bi bi-trash"></i></button>
                    <button class="btn btn-sm btn-primary edit-btn" onclick="MostrarModal('${data.platilloID}')"')"><i class="bi bi-pencil"></i></button>`;
          },
        },
      });
   
  };

 