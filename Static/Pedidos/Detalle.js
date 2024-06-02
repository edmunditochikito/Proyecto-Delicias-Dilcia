import { createDatatable } from "../DataTables.js";
window.addEventListener("load", async () => {
  const table = createDatatable({
    id: "Tabla",
    ajaxUrl: {
      url: "/dtOrdersDetail",
      type: "GET",
    },
    searchBuilder: true,
    buttons: true,
    columns: [
      { data: "DetallePedidoID", className: "text-center" },
      { data: "PedidoID", className: "text-center" },
      { data: "ClienteID", className: "text-center" },
      { data: "ClienteNombre", className: "text-center" },
      { data: "PlatilloID", className: "text-center" },
      { data: "PlatilloNombre", className: "text-center" },
      { data: "PrecioUnitario", className: "text-center" },
      { data: "Cantidad", className: "text-center" },
      { data: "PrecioTotal", className: "text-center" },
      { data: "EstadoPago", className: "text-center" },
      { 
        data: "Fecha", 
        className: "text-center",
        render: function(data, type, row) {
          return moment(data).format('DD/MM/YYYY');
        }
      }
    ],
   // columnsSearchBuilder: [0, 1, 2, 3, 4,], // Ajusta según sea necesario
  });

 
});
