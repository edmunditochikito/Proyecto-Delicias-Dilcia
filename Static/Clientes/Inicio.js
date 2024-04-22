const { createDatatable } = require('../DataTables');

window.addEventListener("load", () => {
  createDatatable({
    id: "Tabla",
    ajaxUrl: {
      url: "/dtCustomer",
      type: "GET",
    },
    searchBuilder: true,
    buttons: true,
    columns: [
      
      { data: "nombre" },
      { data: "cedula", className: "text-center" },
      { data: "telefono" },
      { data: "direccion" },
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
        return `<button class="btn btn-sm btn-danger remove-btn" onclick="sweetConfirm('${data.cedula}')"><i class="bi bi-trash"></i></button>
                <button class="btn btn-sm btn-primary edit-btn" onclick="MostrarModal('${data.cedula}')"><i class="bi bi-pencil"></i></button>`;
      },
    },
  });

  const nombre = document.getElementById("nombre");
  const cedula = document.getElementById("cedula");
  const telefono = document.getElementById("telefono");
  const direccion = document.getElementById("direccion");
  const form = document.getElementById("formulario");

  form.addEventListener("submit", async (event) => {
    if (!nombre.value) {
      nombre.classList.add("is-invalid");
      event.preventDefault();
    } else {
      nombre.classList.remove("is-invalid");
    }

    if (!cedula.value) {
      cedula.classList.add("is-invalid");
      event.preventDefault();
    } else {
      cedula.classList.remove("is-invalid");
    }

    if (!telefono.value) {
      telefono.classList.add("is-invalid");
      event.preventDefault();
    } else {
      telefono.classList.remove("is-invalid");
    }

    if (!direccion.value) {
      direccion.classList.add("is-invalid");
      event.preventDefault();
    } else {
      direccion.classList.remove("is-invalid");
    }
  });
});

const sweetConfirm = (cedula) => {
  Swal.fire({
    icon: "warning",
    title: "Eliminar?",
    showCancelButton: true,
    confirmButtonText: "Save",
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

const deleteCustomer = async (cedula) => {
  try {
    const responsePost = await axios.post("/EliminarCliente/" + cedula);
    const response = responsePost.data;

    if (responsePost) {
      Swal.fire({
        position: "top-center",
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

const updateDatatable = () => {
  const dataTableContainer = document.getElementById("Tabla");
  dataTableContainer.innerHTML = "";
  createDatatable({
    id: "Tabla",
    ajaxUrl: {
      url: "/dtCustomer",
      type: "GET",
    },
    searchBuilder: true,
    buttons: true,
    columns: [
      { data: "nombre" },
      { data: "cedula", className: "text-center" },
      { data: "telefono" },
      { data: "direccion" },
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
        return `<button class="btn btn-sm btn-danger remove-btn" onclick="sweetConfirm('${data.cedula}')"><i class="bi bi-trash"></i></button>
                <button class="btn btn-sm btn-primary edit-btn" onclick="MostrarModal('${data.cedula}')"><i class="bi bi-pencil"></i></button>`;
      },
    },
  });
};

const MostrarModal = async (cedula) => {
  try {
    const modal = new bootstrap.Modal(document.getElementById("modalDetails"));
    const response = await axios.post("/ObtenerCliente/" + cedula);

    const datosCliente = response.data;
    poblarModal(datosCliente);

    modal.show();
  } catch (e) {
    console.log(e);
  }
};

function poblarModal(datosCliente) {
  nombre.value = datosCliente.Nombre;
  cedula.value = datosCliente.Cedula;
  telefono.value = datosCliente.Telefono;
  direccion.value = datosCliente.Direccion;
}

/*const createDatatable = (params) => {
  const newTable = new DataTable(`#${params?.id}`, {
    ajax: params?.ajaxUrl,
    destroy: true,
    lengthMenu: [
      [10, 25, 50, 100, -1],
      [10, 25, 50, 100, "Todos"],
    ],
    
    paging: true,
    pagingType: "simple_numbers",
    order: [],
    columnDefs: [ params?.buttonsEvents ? params.buttonsEvents : ""],
    columns: params?.columns,
    buttons: params?.buttons
      ? [
          {
            extend: "excel",
            titleAttr: "Exportar a Excel",
            className: "btn btn-success fw-medium text-white",
            text: "<i class='bi bi-file-earmark-excel'></i>",
          },
          {
            extend: "print",
            titleAttr: "Imprimir",
            className: "btn btn-warning fw-medium text-white",
            text: "<i class='bi bi-printer'></i>",
            exportOptions: {
              columns: params?.columnsPrint,
            },
          },
          {
            extend: "colvis",
            titleAttr: "Mostrar columnas",
            className: "btn btn-info fw-medium text-white",
            text: "<i class='bi bi-layout-three-columns'></i>",
            columns: params?.columnsSearchBuilder,
          },
        ]
      : [],
    language: {
      url: "https://cdn.datatables.net/plug-ins/2.0.2/i18n/es-ES.json",
    },
    layout: {
      top:
        params?.searchBuilder && params?.buttons
          ? ["searchBuilder", "buttons"]
          : null,
      bottomEnd: "paging",
    },
    searchBuilder: params?.searchBuilder
      ? {
          columns: params?.columnsSearchBuilder,
        }
      : false,
    // initComplete: function () {
    //   params?.callback();
    // },
  });

  return newTable;
};*/
