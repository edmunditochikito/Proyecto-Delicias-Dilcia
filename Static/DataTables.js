export const createDatatable = (params) => {
    const newTable = new DataTable(`#${params?.id}`, {
      ajax: params?.ajaxUrl,
      destroy: true,
      lengthMenu: [
        [10, 25, 50, 100, -1],
        [10, 25, 50, 100, "Todos"],
      ],
      
      paging: true,
      pagingType: "simple_numbers",
      order: [],
      columnDefs: [ params?.buttonsEvents ? params.buttonsEvents : ""],
      columns: params?.columns,
      buttons: params?.buttons
        ? [
            {
              extend: "excel",
              titleAttr: "Exportar a Excel",
              className: "btn btn-success fw-medium text-white",
              text: "<i class='bi bi-file-earmark-excel'></i>",
              exportOptions: {
                columns: params?.columnsExport,
              },
            },
            {
              extend: "print",
              titleAttr: "Imprimir",
              className: "btn btn-warning fw-medium text-white",
              text: "<i class='bi bi-printer'></i>",
              exportOptions: {
                columns: params?.columnsPrint,
              },
            },
            {
              extend: "colvis",
              titleAttr: "Mostrar columnas",
              className: "btn btn-info fw-medium text-white",
              text: "<i class='bi bi-layout-three-columns'></i>",
              columns: params?.columnsSearchBuilder,
            },
          ]
        : [],
      language: {
        url: "https://cdn.datatables.net/plug-ins/2.0.2/i18n/es-ES.json",
      },
      layout: {
        top:
          params?.searchBuilder && params?.buttons
            ? ["searchBuilder", "buttons"]
            : null,
        bottomEnd: "paging",
      },
      searchBuilder: params?.searchBuilder
        ? {
            columns: params?.columnsSearchBuilder,
          }
        : false,
      // initComplete: function () {
      //   params?.callback();
      // },
    });
  
    return newTable;
  };
  

  export const createDatatableP = (params) => {
    const newTable = new DataTable(`#${params?.id}`, {
      data: params?.data || [], // Usa los datos locales si están disponibles
      destroy: true,
      lengthMenu: [
        [10, 25, 50, 100, -1],
        [10, 25, 50, 100, "Todos"],
      ],
      paging: true,
      pagingType: "simple_numbers",
      order: [],
      columnDefs: params?.buttonsEvents ? params.buttonsEvents : "",
      columns: params?.columns,
      
      language: {
        url: "https://cdn.datatables.net/plug-ins/2.0.2/i18n/es-ES.json",
      },
      layout: {
        bottomEnd: "paging",
      },
      searchBuilder: params?.searchBuilder
        ? {
            columns: params?.columnsSearchBuilder,
          }
        : false,
      // initComplete: function () {
      //   params?.callback();
      // },
      
    });
  
    return newTable;
  };
  