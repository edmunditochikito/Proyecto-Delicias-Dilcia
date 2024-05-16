import { createDatatable } from "../DataTables.js";

window.addEventListener("load", async() => {
    createDatatable({
      id: "Tabla",
      ajaxUrl: {
        url: "/dtOrders",
        type: "GET",
      },
      searchBuilder: true,
      buttons: true,
      columns: [
        { data: "pedidoID",className: "text-center"  },
        { data: "clienteID", className: "text-center" },
        { data: "nombreCliente",className:"text-center"},
        { data: "fechaPedido",className: "text-center"  },
        { data: "total",className: "text-center"  },
        { data: "platilloID",className: "text-center" },
        { data: "cantidad",className: "text-center" },
        { data: "estadoPago",className: "text-center" },
        
        
      ],
      
    });
  });