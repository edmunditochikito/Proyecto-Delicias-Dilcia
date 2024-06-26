import {
  createDatatable,
  Toast,
  toastAlertSuccess,
  toastAlertError,
} from "../DataTables.js";

window.addEventListener("load", async () => {
  const table = createDatatable({
    id: "Tabla",
    ajaxUrl: {
      url: "/dtDebt",
      type: "GET",
    },
    searchBuilder: true,
    buttons: true,
    columns: [
      { data: "DeudaID", className: "text-center" },
      { data: "ClienteID", className: "text-center" },
      { data: "Monto", className: "text-center" },
      { data: "FechaVencimiento", className: "text-center" },
      { data: "EstadoPago", className: "text-center" },
      { data: "PedidoID", className: "text-center" },
      { data: "PedidoTotal", className: "text-center" },
      { data: "ClienteNombre", className: "text-center" },
      {
        title: "Saldar Deuda",
        className: "text-center",
        orderable: false,
        searchable: false,
      },
    ],
    buttonsEvents: {
      targets: 8,
      data: null,
      render: function (data, type, row, meta) {
        return `<button class="btn btn-sm btn-success remove-btn" onclick="sweetConfirmPayDebt('${data.DeudaID}')"><i class="bi bi-cash"></i></button>
            `;
      },
    },
  });
});


window.sweetConfirmPayDebt = (id) => {
    Swal.fire({
        title: "¿Estás seguro de saldar esta deuda?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, saldar deuda",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
        PagarDeuda(id);
        }
    });
}

window.PagarDeuda = async (id) => {
  const response = await axios.post("/GetDebt/" + id);
  const data = response.data;

  const Cliente = {
    ClienteID: data.ClienteID,
  };

  try {
    const response2 = await axios.post("/PagarDeuda", Cliente);
    const responseData = response2.data;
    if (responseData.message.startsWith("Error")) {
        console.log(responseData.message);
      toastAlertError(responseData.message);
      updateDatatable();

    } else {
        console.log(responseData.message);
      toastAlertSuccess(responseData.message);
      updateDatatable();
    }

    return; 
  } catch (error) {
    toastAlertError(`Error al enviar los datos: ${error.message}`);
  }
};

const updateDatatable = async () => {
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
    table.ajax.url("/dtDebt").load();
  }
};
