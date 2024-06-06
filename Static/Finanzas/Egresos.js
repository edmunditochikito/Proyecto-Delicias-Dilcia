import { createDatatable } from "../DataTables.js";

window.addEventListener("load", async () => {
  const table = createDatatable({
    id: "Tabla",
    ajaxUrl: {
      url: "/dtEgresos",
      type: "GET",
    },
    searchBuilder: true,
    buttons: true,
    columns: [
      { data: "EgresoID", className: "text-center" },
      { data: "TipoEgreso", className: "text-center" },
      { data: "Monto", className: "text-center" },
      { 
        data: "FechaEgreso", 
        className: "text-center",
        render: function(data, type, row) {
          return moment(data).format('DD/MM/YYYY');
        }
      },
      { data: "Descripcion", className: "text-center" },
      //{ data: "SalarioID", className: "text-center" },
     // { data: "ProveedorID", className: "text-center" },
      { data: "TipoGasto", className: "text-center" },
    
    ],
    columnsSearchBuilder: [0, 1, 2, 3, 4,], // Ajusta según sea necesario
  });
});