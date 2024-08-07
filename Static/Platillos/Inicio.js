import { createDatatable,toastAlertError} from "../DataTables.js";

const nombre = document.getElementById("nombre");
const precio = document.getElementById("precio");
const descripcion = document.getElementById("descripcion");
const form = document.getElementById("formulario");
const tipo = document.getElementById("TipoDePlatillo");

window.addEventListener("load", async () => {
  createDatatable({
    id: "Tabla",
    ajaxUrl: {
      url: "/dtDishes",
      type: "GET",
    },
    searchBuilder: true,
    buttons: true,
    columns: [
      { data: "platilloID", className: "text-center" },
      { data: "nombre", className: "text-center" },
      { data: "precio", className: "text-center" },
      { data: "descripcion", className: "text-center" },
      { data: "estado", className: "text-center" },
      {data: "tipo", className: "text-center"},
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
        const checked = row.estado === "Disponible" ? "checked" : "";
        return `<input type="checkbox" class="btn btn-sm btn-primary edit-btn" ${checked} onclick="toggleAvailability(${data.platilloID}, this.checked)"></input>
                  <button class="btn btn-sm btn-danger remove-btn" onclick="sweetConfirmDelete('${data.platilloID}')"')"><i class="bi bi-trash"></i></button>
                  <button class="btn btn-sm btn-primary edit-btn" onclick="MostrarModal('${data.platilloID}')"')"><i class="bi bi-pencil"></i></button>`;
      },
    },
    columnsExport: [0, 1, 2, 3, 4],
    columnsPrint: [0, 1, 2, 3, 4],
  });
});

window.sweetConfirmDelete = async (id) => {
  Swal.fire({
    icon: "warning",
    title: "¿Estas seguro de que deseas eliminar este platillo?",
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
          deleteDish(id);
        },
      });
    }
  });
};

const deleteDish = async (id) => {
  try {
    const formData = new FormData(document.getElementById("formulario"));
    const responsePost = await axios.post("/EliminarPlatillo/" + id, formData);
    const response = responsePost.data;

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
};

window.sweetConfirmUpdate = async (id) => {
  Swal.fire({
    icon: "question",
    title: "¿Estas seguro de que deseas actualizar este platillo?",
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
          updateDish(id);
        },
      });
    }
  });
};

const updateDish = async (id) => {
  try {
    const formData = new FormData(document.getElementById("formulario"));
    const responsePost = await axios.post(
      "/ActualizarPlatillo/" + id,
      formData
    );
    const response = responsePost.data;
    console.log(response);

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

  if (!descripcion.value) {
    toastAlertError(`El campo de la descripcion está vacío`);
    descripcion.classList.add("is-invalid");
    return;
  } else if (!isNaN(descripcion.value)) {
    toastAlertError(
      `La descripcion ${descripcion.value} no tiene un formato válido`);
      descripcion.classList.add("is-invalid");
    return;
  } else if (descripcion.value.length < 6) {
    toastAlertError(`La descripcion ${descripcion.value} es muy corta`);
    descripcion.classList.add("is-invalid");
    return;
  }else{
    descripcion.classList.remove("is-invalid")
  }

  return true;
}

window.MostrarModal = async (id) => {
  try {
    const modal = new bootstrap.Modal(document.getElementById("modalDetails"));
    const response = await axios.post("/ObtenerPlatillo/" + id);
    const datosPlatillos = response.data;
    poblarModal(datosPlatillos);

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

function poblarModal(datosPlatillos) {
  precio.value = datosPlatillos.Precio;
  nombre.value = datosPlatillos.Nombre;
  descripcion.value = datosPlatillos.Descripcion;
}

let datos = ["Disponible", "No Disponible"];

// Función para llenar el select
function llenarSelect() {
  var select = document.getElementById("estado");

  // Iterar sobre los datos
  datos.forEach(function (persona) {
    // Crear un elemento <option>
    var option = document.createElement("option");

    option.value = persona;
    option.text = persona; 
    // Agregar el option al select
    select.appendChild(option);
  });
}
window.onload = llenarSelect;

window.toggleAvailability = async (id, isChecked) => {
  try {
    const estado = isChecked ? "Disponible" : "No Disponible";
    const response = await axios.post(`/EstadoPlatillo/${id}`, { estado });

    updateDatatable();
  } catch (error) {
    console.error("Error al actualizar el estado del platillo:", error);
  }
};

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
    table.ajax.url("/dtDishes").load();
  }
};
document.getElementById("close").addEventListener("click", (e) => {
  nombre.classList.remove("is-invalid");
  precio.classList.remove("is-invalid");
  descripcion.classList.remove("is-invalid");
  
});

document.getElementById("cancel").addEventListener("click", (e) => {
  nombre.classList.remove("is-invalid");
  precio.classList.remove("is-invalid");
  descripcion.classList.remove("is-invalid");
});

let TipoDePlatillo = ['Principal', 'Extra'];
document.addEventListener("DOMContentLoaded", async () => {
 TipoDePlatillo.forEach((cargo) => {
    const option = document.createElement("option");
    option.value = cargo;
    option.text = cargo;
    tipo.appendChild(option);
  });
});