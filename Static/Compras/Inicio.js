import {createDatatable} from '../DataTables.js'

window.addEventListener("load", async () => {
    const table = createDatatable({
      id: "Tabla",
      ajaxUrl: {
        url: "/dtCompras",
        type: "GET",
      },
      searchBuilder: true,
      buttons: true,
      columns: [
        { data: "ProductoCompraID", className: "text-center" },
        { data: "CompraID", className: "text-center" },
        { data: "ProductoID", className: "text-center" },
        { data: "Cantidad", className: "text-center" },
        { data: "PrecioUnitario", className: "text-center" },
      
      ],
      columnsSearchBuilder: [0, 1, 2, 3, 4,], // Ajusta según sea necesario
    })
});