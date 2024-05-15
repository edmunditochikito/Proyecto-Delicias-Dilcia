import { createDatatable } from "../DataTables.js";
const nombre = document.getElementById("nombre");
const precio = document.getElementById("precio");
const unidad_de_medida = document.getElementById("unidad_de_medida")
const id = document.getElementById("id")
const cantidad = document.getElementById("cantidad")
const form = document.getElementById("formulario");

window.addEventListener("load", async() => {
    createDatatable({
      id: "Tabla",
      ajaxUrl: {
        url: "/dtProduct",
        type: "GET",
      },
      searchBuilder: true,
      buttons: true,
      columns: [
        { data: "nombre", className: "text-center" },
        { data: "id", className: "text-center" },
        { data: "unidadDeMedida", className: "text-center"},
        { data: "cantidad", className: "text-center" },
        { data: "precio", className: "text-center" },
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
    });
  });



  window.sweetConfirmDelete = async(id) => {
    Swal.fire({
      icon: "warning",
      title: "¿Estas seguro de que deseas eliminar este producto?",
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
            deleteProduct(id);
            
          },
        });
      }
    });
  }; 
   

  const deleteProduct = async(id) =>{
    try {
   
      const responsePost = await axios.post("/EliminarProducto/" + id);
      const response = responsePost.data
      console.log(response)
      if (responsePost) {
        Swal.fire({
          position: "center",
          icon: response.status,
          title: response.message,
          text: `El Producto ${response.Product.Nombre} ha sido Eliminado con éxito!`,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        updateDatatable();
      } else {
        console.error("Error al Eliminar el producto:", response.message);
      }
    } catch (error) {
      console.error("Error al Eliminar el Producto:", error);
    }

  }


  window.sweetConfirmUpdate = async(id) => {
    Swal.fire({
      icon: "question",
      title: "¿Estas seguro de que deseas actualizar este producto?",
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
            updateProduct(id);
            
          },
        });
      }
    });
  }; 

  
const updateProduct = async (id) => {
  try {
    const formData = new FormData(document.getElementById("formulario"));
    const responsePost = await axios.post("/ActualizarProductos/" + id, formData);
    const response = responsePost.data
    console.log(response)
   

    if (responsePost) {
      Swal.fire({
        position: "center",
        icon: response.status,
        title: response.message,
        text: `El Producto ${response.product} ha sido actualizado con éxito!`,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      updateDatatable();
    } else {
      console.error("Error al actualizar el Producto:", response.message);
    }
  } catch (error) {
    console.error("Error al actualizar el Producto:", error);
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


  if (!id.value.trim()) {
    id.classList.add("is-invalid");
    formularioValido = false;
  } else {
    id.classList.remove("is-invalid");
  }
  if (!unidad_de_medida.value.trim()) {
    unidad_de_medida.classList.add("is-invalid");
    formularioValido = false;
  } else {
    unidad_de_medida.classList.remove("is-invalid");
  }
  if (!cantidad.value.trim()) {
    cantidad.classList.add("is-invalid");
    formularioValido = false;
  } else {
    cantidad.classList.remove("is-invalid");
  }

  
  return formularioValido;
}


  window.MostrarModal = async (id) => {
    try {
      const modal = new bootstrap.Modal(document.getElementById("modalDetails"));
      const response = await axios.post("/ObtenerProducto/" + id);
      const datosProductos= response.data;
      poblarModal(datosProductos);
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

  
  function poblarModal(datosProductos) {
    precio.value = datosProductos.PrecioUnitario
    nombre.value = datosProductos.Nombre
    id.value  = datosProductos.ProductoID
    unidad_de_medida.value = datosProductos.UnidadDeMedida
    cantidad.value = datosProductos.Cantidad
  } 


  window.updateDatatable = async() => {
    const dataTableContainer = document.getElementById("Tabla");
    dataTableContainer.innerHTML = "";
    createDatatable({
      id: "Tabla",
      ajaxUrl: {
        url: "/dtProduct",
        type: "GET",
      },
      searchBuilder: true,
      buttons: true,
      columns: [
        { data: "nombre", className: "text-center" },
        { data: "id", className: "text-center" },
        { data: "unidadDeMedida", className: "text-center"},
        { data: "cantidad", className: "text-center" },
        { data: "precio", className: "text-center" },
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
    });
   
  };