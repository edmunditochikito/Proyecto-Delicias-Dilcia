import {
  createDatatable,
  Toast,
  toastAlertSuccess,
  toastAlertError,
} from "../DataTables.js";

const Cedula= document.getElementById('cedula');
const Monto= document.getElementById('Monto');
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
      targets: -1,
      data: null,
      render: function (data, type, row, meta) {
        return `<button class="btn btn-sm btn-success remove-btn" onclick="MostrarModal('${data.ClienteID}')"><i class="bi bi-cash"></i></button>
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
        updateDatatable();
        }
    });
}

 window.PagarDeuda = async (id) => {
  let data = {
    ClienteID: id,
    Monto: Monto.value
  };

  const response = await axios.post("/PagarDeuda", data);
  const responseData = response.data;
  toastAlertSuccess(responseData.message);


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

window.MostrarModal = async (id) => {
  try {
    const modal = new bootstrap.Modal(document.getElementById("modalDetails"));
    const response = await axios.post("/ObtenerCliente/" + id);
    const Datos = response.data;
    poblarModal(Datos);
    document.getElementById('update').addEventListener('click', async(e)=>{
      e.preventDefault();     
      
     // if(validarFormulario()){
        await sweetConfirmPayDebt(id);
        modal.hide(); 
    //  }
    });

    modal.show();
  } catch (e) {
    console.log(e);
  }
};

 function poblarModal(datosCliente) {
  Cedula.value = datosCliente.Cedula;

}
