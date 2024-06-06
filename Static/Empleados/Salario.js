import { createDatatable,toastAlertError,toastAlertSuccess } from "../DataTables.js";

const idPagar = document.getElementById("id");
const nombre = document.getElementById("nombre");
const detalle = document.getElementById("Detalle");
const monto = document.getElementById("monto"); 

window.addEventListener("load", async () => {
  const table = createDatatable({
    id: "Tabla",
    ajaxUrl: {
      url: "/dtSalary",
      type: "GET",
    },
    searchBuilder: true,
    buttons: true,
    columns: [
      { data: "SalarioID", className: "text-center" },
      { data: "EmpleadoID", className: "text-center" },
      { data: "Nombre", className: "text-center" },
      { data: "Cargo", className: "text-center" },
      { data: "Monto", className: "text-center" },
        {
            title: "Acciones",
            className: "text-center",
            orderable: false,
            searchable: false,
        },
    
    ],
    buttonsEvents: {
        targets: 5,
        data: null,
        render: function (data, type, row, meta) {
          return ` <button class="btn btn-sm btn-success edit-btn" onclick="mostrarModal('${data.EmpleadoID}')"><i class="bi bi-piggy-bank-fill"></i></button>
                    `;
        },
      },
    columnsSearchBuilder: [0, 1, 2, 3, 4,], // Ajusta según sea necesario
  });
});

window.sweetConfirmPay = async (id) => {
    Swal.fire({
      icon: "question",
      title: "Estas seguro de que deseas Asignar este salario?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Asignar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `<h4 class="fw-bold m-0">Asignando...</h4>`,
          allowOutsideClick: false,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            PaySalarytoWorker(id);
          },
        });
      }
    });
  };

  const PaySalarytoWorker = async (id) => {
    try {
      console.log(id.value);
        const formData = {
        empleado_id: id,
        monto: monto.value,
        detalle: detalle.value,
        };
        console.log(formData);
        const responsePost = await axios.post("/PagarSalario", formData);
        const response = responsePost.data;
        toastAlertSuccess(response.data);
    } catch (error) {
        console.error("Error al Asignar el Salario:", error);
  };
}

function validarFormularioPagar() {
    if (!monto.value) {
        toastAlertError(`El campo de Monto está vacío`);
        monto.classList.add("is-invalid");
        return;
      } else if (isNaN(monto.value)) {
        toastAlertError(`El monto ${monto.value} no tiene un formato válido`);
        monto.classList.add("is-invalid");
        return;
      }else if (monto.value<0) {
        toastAlertError(`El monto no puede ser negativo`);
        monto.classList.add("is-invalid");
        return;
      } 
      else {
        monto.classList.remove("is-invalid");
      }

      if (!detalle.value) {
        toastAlertError(`El campo de la detalle está vacío`);
        detalle.classList.add("is-invalid");
        return;
      } else if (!isNaN(detalle.value)) {
        toastAlertError(
          `La detalle ${detalle.value} no tiene un formato válido`);
          detalle.classList.add("is-invalid");
        return;
      } else if (detalle.value.length < 6) {
        toastAlertError(`La detalle ${detalle.value} es muy corta`);
        detalle.classList.add("is-invalid");
        return;
      }else{
        detalle.classList.remove("is-invalid")
      }
    return true;
  }


window.mostrarModal = async (id) => {
    try {
      const modal = new bootstrap.Modal(document.getElementById("modal"));
      const response = await axios.post("/ObtenerEmpleado/" + id);
      const datosEmpleado = response.data;
      poblarModal(datosEmpleado);
      console.log(id.value);
  
      document.getElementById("Pagar").addEventListener("click", async (e) => {
        e.preventDefault();   
        if (validarFormularioPagar()) { 
          await sweetConfirmPay(id);
        }
      });
      modal.show();
    } catch (e) {
      console.log(e);
    }
  };


const poblarModal = (datosEmpleado) => {
    id.value = datosEmpleado.EmpleadoID;
    nombre.value = datosEmpleado.Nombre;
  }