import { createDatatable } from "../DataTables.js";


window.addEventListener("load", async() => {
    createDatatable({
      id: "Tabla",
      ajaxUrl: {
        url: "/dtProduct",
        type: "GET",
      },
      searchBuilder: true,
      buttons: true,
      columns: [
        { data: "nombre", className: "text-center" },
        { data: "id", className: "text-center" },
        { data: "unidadDeMedida", className: "text-center"},
        { data: "cantidad", className: "text-center" },
        { data: "precio", className: "text-center" },
      
      ],
      /*buttonsEvents: {
        targets: -1,
        data: null,
        render: function (data, type, row, meta) {
          return `<button class="btn btn-sm btn-danger remove-btn" onclick="sweetConfirmDelete('${data.id}')"><i class="bi bi-trash"></i></button>
                  <button class="btn btn-sm btn-primary edit-btn" onclick="MostrarModal('${data.id}')"><i class="bi bi-pencil"></i></button>`;
        },
      },*/
    });
  });