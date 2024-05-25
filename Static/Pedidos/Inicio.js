import { createDatatable } from "../DataTables.js";

window.addEventListener("load", async () => {
  const table = createDatatable({
    id: "Tabla",
    ajaxUrl: {
      url: "/dtOrders",
      type: "GET",
    },
    searchBuilder: true,
    buttons: true,
    columns: [
      { data: "pedidoID", className: "text-center" },
      { data: "clienteID", className: "text-center" },
      { data: "nombreCliente", className: "text-center" },
      { data: "fechaPedido", className: "text-center" },
      { data: "total", className: "text-center" },
      { data: "platilloID", className: "text-center" },
      { data: "cantidad", className: "text-center" },
      { data: "estadoPago", className: "text-center" },
    ],
    columnsSearchBuilder: [0, 1, 2, 3, 4, 5, 6, 7], // Ajusta según sea necesario
  });

  const startDateInput = document.getElementById("startDate");
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
    $.fn.dataTable.ext.search.pop();
  });
});
