import { createDatatable } from "../DataTables.js";

window.addEventListener("load", async () => {
  const table = createDatatable({
    id: "Tabla",
    ajaxUrl: {
      url: "/dtIngresos",
      type: "GET",
    },
    searchBuilder: true,
    buttons: true,
    columns: [
      { data: "IngresoID", className: "text-center" },
      { data: "TipoIngreso", className: "text-center" },
      { data: "Monto", className: "text-center" },
      { 
        data: "FechaIngreso", 
        className: "text-center",
        render: function(data, type, row) {
          return moment(data).format('DD/MM/YYYY');
        }
      },
      { data: "ClienteID", className: "text-center" },
      { data: "PedidoID", className: "text-center" },
      { data: "Descripcion", className: "text-center" },
    
    ],
    columnsSearchBuilder: [0, 1, 2, 3, 4,], // Ajusta según sea necesario
  });
});