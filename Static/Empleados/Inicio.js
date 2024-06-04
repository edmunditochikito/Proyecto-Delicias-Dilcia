import {
  createDatatable,
  toastAlertError,
  toastAlertSuccess,
  Toast,
} from "../DataTables.js";
const nombre = document.getElementById("nombre");
const cargo = document.getElementById("cargo");
const fecha = document.getElementById("fecha");

const nombreAsi = document.getElementById("nombreAsi");
const idASI = document.getElementById("id");
const montoASI = document.getElementById("montoASI");

window.addEventListener("load", async () => {
  createDatatable({
    id: "Tabla",
    ajaxUrl: {
      url: "/dtWorker",
      type: "GET",
    },
    searchBuilder: true,
    buttons: true,
    columns: [
      { data: "EmpleadoID", className: "text-center" },
      { data: "Nombre", className: "text-center" },
      { data: "Cargo", className: "text-center" },
      {
        data: "FechaContratacion",
        className: "text-center",
        render: function (data, type, row) {
          return moment(data).format("DD/MM/YYYY");
        },
      },
      {
        title: "Acciones",
        className: "text-center",
        orderable: false,
        searchable: false,
      },
      {
        title: "Salario",
        className: "text-center",
        orderable: false,
        searchable: false,
        data: null,
        render: function (data, type, row) {
          return `<button class="btn btn-sm btn-primary remove-btn" onclick="MostrarModalAsignar('${data.EmpleadoID}')"><i class="bi bi-cash"></i></button>
            <button class="btn btn-sm btn-success edit-btn" onclick="MostrarModalUpdate('')"><i class="bi bi-piggy-bank-fill"></i></button>
            `;
        },
      },
    ],
    buttonsEvents: {
      targets: 4,
      data: null,
      render: function (data, type, row, meta) {
        return `<button class="btn btn-sm btn-danger remove-btn" onclick="sweetConfirmDelete('${data.EmpleadoID}')"><i class="bi bi-trash"></i></button>
                  <button class="btn btn-sm btn-primary edit-btn" onclick="MostrarModalUpdate('${data.EmpleadoID}')"><i class="bi bi-pencil"></i></button>
                  `;
      },
    },
    columnsExport: [],
    columnsPrint: [0, 1, 2, 3],
  });
});

const updateWorker = async (id) => {
  try {
    const formData = {
      Nombre: nombre.value,
      Cargo: cargo.value,
      FechaContratacion: fecha.value,
    };
    const responsePost = await axios.post(
      "/ActualizarEmpleado/" + id,
      formData
    );
    const response = responsePost.data;
    console.log(responsePost);
    if (responsePost) {
      Swal.fire({
        position: "center",
        icon: response.status,
        title: response.message,
        text: `El Empleado ${response.worker} ha sido actualizado con éxito!`,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      updateDatatable();
    } else {
      console.error("Error al actualizar el Empleado:", response.message);
    }
  } catch (error) {
    console.error("Error al actualizar el Empleado:", error);
  }
};

window.sweetConfirmDelete = async (EmpleadoID) => {
  Swal.fire({
    icon: "warning",
    title: "¿Estas seguro de que deseas eliminar a este Empleado?",
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
          deleteWorker(EmpleadoID);
        },
      });
    }
  });
};

window.sweetConfirmUpdate = async (EmpleadoID) => {
  Swal.fire({
    icon: "question",
    title: "Estas seguro de que deseas actualizar a este Empleado?",
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
          updateWorker(EmpleadoID);
        },
      });
    }
  });
};
window.sweetConfirmAsign = async (EmpleadoID) => {
  Swal.fire({
    icon: "question",
    title: "Estas seguro de que deseas Asignar este salario?",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Asignar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `<h4 class="fw-bold m-0">Asignando...</h4>`,
        allowOutsideClick: false,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          AsignSalarytoWorker(EmpleadoID);
        },
      });
    }
  });
};

const AsignSalarytoWorker = async (id) => {
    try {
        const formData = {
        EmpleadoID: idASI.value,
        Monto: montoASI.value,
        };
        console.log(formData);
        const responsePost = await axios.post("/AsignarSalario", formData);
        const response = responsePost.data;
        toastAlertSuccess(response.data);
    } catch (error) {
        console.error("Error al Asignar el Salario:", error);
  };
}

const deleteWorker = async (EmpleadoID) => {
  try {
    const responsePost = await axios.post("/EliminarEmpleado/" + EmpleadoID);
    const response = responsePost.data;
    console.log(response);
    if (responsePost) {
      Swal.fire({
        position: "center",
        icon: `${response.status}`,
        title: `${response.message}`,
        text: `El Empleado ${response.worker.Nombre} ha sido eliminado con éxito!`,
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

window.updateDatatable = async () => {
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
    table.ajax.url("/dtWorker").load();
  }
};

function validarFormularioUpdate() {
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

  if (!fecha.value) {
    toastAlertError(`El campo de la Fecha está vacío`);
    fecha.classList.add("is-invalid");
    return;
  } else {
    fecha.classList.remove("is-invalid");
  }
  return true;
}
window.MostrarModalUpdate = async (id) => {
  try {
    const modal = new bootstrap.Modal(document.getElementById("modalDetails"));
    const response = await axios.post("/ObtenerEmpleado/" + id);
    const datosEmpleado = response.data;
    poblarModalUpdate(datosEmpleado);

    document.getElementById("update").addEventListener("click", async (e) => {
      e.preventDefault();

      if (validarFormularioUpdate()) {
        await sweetConfirmUpdate(id);
        modal.hide();
      }
    });
    modal.show();
  } catch (e) {
    console.log(e);
  }
};

function poblarModalUpdate(datosEmpleado) {
  nombre.value = datosEmpleado.Nombre;
  cargo.value = datosEmpleado.Cargo;
  fecha.value = datosEmpleado.FechaContratacion;
}

function validarFormularioAsignar() {
    if (!montoASI.value) {
        toastAlertError(`El campo de Monto está vacío`);
        montoASI.classList.add("is-invalid");
        return;
      } else if (isNaN(montoASI.value)) {
        toastAlertError(`El monto ${montoASI.value} no tiene un formato válido`);
        montoASI.classList.add("is-invalid");
        return;
      }else if (montoASI.value<0) {
        toastAlertError(`El monto no puede ser negativo`);
        montoASI.classList.add("is-invalid");
        return;
      } 
      else {
        montoASI.classList.remove("is-invalid");
      }
    return true;
  }

window.MostrarModalAsignar = async (id) => {
  try {
    const modal = new bootstrap.Modal(document.getElementById("modalASI"));
    const response = await axios.post("/ObtenerEmpleado/" + id);
    const datosEmpleado = response.data;
    console.log(datosEmpleado);
    poblarModalASI(datosEmpleado);

    document.getElementById("Asignar").addEventListener("click", async (e) => {
        e.preventDefault();
  
        if (validarFormularioAsignar()) {
          await sweetConfirmAsign(id);
          modal.hide();
        }
      });
    modal.show();
  } catch (e) {
    console.log(e);
  }
};

function poblarModalASI(datosEmpleado) {
  nombreASI.value = datosEmpleado.Nombre;
  idASI.value = datosEmpleado.EmpleadoID;
}


document.getElementById("closeASI").addEventListener("click", (e) => {
  montoASI.classList.remove("is-invalid");
  montoASI.value = "";
  });
  
  document.getElementById("cancelASI").addEventListener("click", (e) => {
    montoASI.classList.remove("is-invalid");
    montoASI.value = "";
  });