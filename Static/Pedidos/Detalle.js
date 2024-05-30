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
    
    ],
   // columnsSearchBuilder: [0, 1, 2, 3, 4,], // Ajusta según sea necesario
  });

  /* const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");
  const filterButton = document.getElementById("filterDateRange");

  filterButton.addEventListener("click", () => {
    const startDate = Date.parse(startDateInput.value);
    const endDate = Date.parse(endDateInput.value);

    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
      const date = Date.parse(data[3]); // 'fechaPedido' está en la cuarta columna (índice 3)
      if (
        (isNaN(startDate) && isNaN(endDate)) ||
        (isNaN(startDate) && date <= endDate) ||
        (startDate <= date && isNaN(endDate)) ||
        (startDate <= date && date <= endDate)
      ) {
        return true;
      }
      return false;
    });
    table.draw();
    console.log($.fn.dataTable.ext.search);
    $.fn.dataTable.ext.search.pop(); */
  //});
});
