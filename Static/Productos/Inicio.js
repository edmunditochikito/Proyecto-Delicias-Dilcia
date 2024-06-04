import {
  createDatatable,
  Toast,
  toastAlertError,
  toastAlertSuccess,
} from "../DataTables.js";
const nombre = document.getElementById("nombre");
const precio = document.getElementById("precio");
const unidad_de_medida = document.getElementById("unidad_de_medida");
const id = document.getElementById("id");
const cantidad = document.getElementById("cantidad");
const form = document.getElementById("formulario");

window.addEventListener("load", async () => {
  createDatatable({
    id: "Tabla",
    ajaxUrl: {
      url: "/dtProduct",
      type: "GET",
    },
    searchBuilder: true,
    buttons: true,
    columns: [
      { data: "id", className: "text-center" },
      { data: "nombre", className: "text-center" },
      { data: "cantidad", className: "text-center" },
      { data: "unidadDeMedida", className: "text-center" },
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
    columnsExport: [0, 1, 2, 3, 4],
    columnsPrint: [0, 1, 2, 3, 4],
  });
});

window.sweetConfirmDelete = async (id) => {
  Swal.fire({
    icon: "warning",
    title: "¿Estas seguro de que deseas eliminar este producto?",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
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

const deleteProduct = async (id) => {
  try {
    const responsePost = await axios.post("/EliminarProducto/" + id);
    const response = responsePost.data;
    console.log(response);
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
};

window.sweetConfirmUpdate = async (id) => {
  Swal.fire({
    icon: "question",
    title: "¿Estas seguro de que deseas actualizar este producto?",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
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
    const responsePost = await axios.post(
      "/ActualizarProductos/" + id,
      formData
    );
    const response = responsePost.data;
    console.log(response);

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

  if (!nombre.value) {
    toastAlertError(`El campo de nombre está vacío`);
    nombre.classList.add("is-invalid");
    return;
  } else if (!isNaN(nombre.value)) {
    toastAlertError(`El nombre ${nombre.value} no tiene un formato válido`);
    nombre.classList.add("is-invalid");
    return;
  } else if (nombre.value.length <= 2) {
    toastAlertError(`El nombre ${nombre.value} es muy corto`);
    nombre.classList.add("is-invalid");
    return;
  } else {
    nombre.classList.remove("is-invalid");
  }

  if (!cantidad.value) {
    toastAlertError(`El campo de la cantidad está vacío`);
    cantidad.classList.add("is-invalid");
    return;
  } else if (isNaN(cantidad.value)) {
    toastAlertError(`La cantidad ${cantidad.value} no tiene un formato válido`);
    cantidad.classList.add("is-invalid");
    return;
  } else {
    cantidad.classList.remove("is-invalid");
  }

  if (!precio.value) {
    toastAlertError(`El campo del precio está vacío`);
    precio.classList.add("is-invalid");
    return;
  } else if (isNaN(precio.value)) {
    toastAlertError(`El Precio ${precio.value} no tiene un formato válido`);
    precio.classList.add("is-invalid");
    return;
  } else {
    precio.classList.remove("is-invalid");
  }

  return true;
}

window.MostrarModal = async (id) => {
  try {
    const modal = new bootstrap.Modal(document.getElementById("modalDetails"));
    const response = await axios.post("/ObtenerProducto/" + id);
    const datosProductos = response.data;
    poblarModal(datosProductos);
    document.getElementById("update").addEventListener("click", async (e) => {
      e.preventDefault();
      if (validarFormulario()) {
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
  precio.value = datosProductos.PrecioUnitario;
  nombre.value = datosProductos.Nombre;
  id.value = datosProductos.ProductoID;
  unidad_de_medida.value = datosProductos.UnidadDeMedida;
  cantidad.value = datosProductos.Cantidad;
}

window.updateDatatable = async () => {
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
    table.ajax.url("/dtProduct").load();
  }
};

document.getElementById("close").addEventListener("click", (e) => {
  nombre.classList.remove("is-invalid");
  precio.classList.remove("is-invalid");
  unidad_de_medida.classList.remove("is-invalid");
  cantidad.classList.remove("is-invalid");
});

document.getElementById("cancel").addEventListener("click", (e) => {
  nombre.classList.remove("is-invalid");
  precio.classList.remove("is-invalid");
  unidad_de_medida.classList.remove("is-invalid");
  cantidad.classList.remove("is-invalid");
});
