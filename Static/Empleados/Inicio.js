import { createDatatable,toastAlertError,toastAlertSuccess,Toast} from "../DataTables.js";

window.addEventListener("load", async() => {
    createDatatable({
      id: "Tabla",
      ajaxUrl: {
        url: "/dtWorker",
        type: "GET",
      },
      searchBuilder: true,
      buttons: true,
      columns: [
        { data: "EmpleadoID",className: "text-center" },
        { data: "Nombre", className: "text-center" },
        { data: "Cargo",className: "text-center" },
        { 
            data: "FechaContratacion", 
            className: "text-center",
            render: function(data, type, row) {
              return moment(data).format('DD/MM/YYYY');
            }
        },
        {
          title: "Acciones",
          className: "text-center",
          orderable: false,
          searchable: false,
        },
      ],
      buttonsEvents: {
        targets: 4,
        data: null,
        render: function (data, type, row, meta) {
          return `<button class="btn btn-sm btn-danger remove-btn" onclick="sweetConfirmDelete('${data.cedula}')"><i class="bi bi-trash"></i></button>
                  <button class="btn btn-sm btn-primary edit-btn" onclick="MostrarModalUpdate('${data.cedula}')"><i class="bi bi-pencil"></i></button>
                  `;
        },
      },
      columnsExport: [],
      columnsPrint:[0,1,2,3], 
    });
  });