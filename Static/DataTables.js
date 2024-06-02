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
              className: "",
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
      scrollX:true,
    });
  
    return newTable;
  };
  
export const toastAlertError = (info) => {
    Toast.fire({
      icon: "error",
      title: info,
    });
  };
export const toastAlertSuccess = (info) => {
    Toast.fire({
      icon: "success",
      title: info,
    });
  };
  
export const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });