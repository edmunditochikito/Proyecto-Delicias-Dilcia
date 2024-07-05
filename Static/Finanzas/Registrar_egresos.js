import {toastAlertError,toastAlertSuccess} from '../DataTables.js'
const TipoDeGasto = document.getElementById("TipoDeGasto");
const Evidencia = document.getElementById("Evidencia");
const Monto = document.getElementById("Monto");
const Fecha = document.getElementById("Fecha");
const Descripcion = document.getElementById("Descripcion");
const form = document.getElementById("formulario");

document.getElementById("agregar").addEventListener("click", async (e) => {
 
    e.preventDefault();
    if(!Evidencia.value){
        toastAlertError(`El campo de Evidencia de Gasto está vacío`);
        TipoDeGasto.classList.add("is-invalid");
        e.preventDefault();
        return;
    }

    if (!Monto.value) {
        toastAlertError(`El campo del Monto está vacío`);
        e.preventDefault();
        Monto.classList.add("is-invalid");
        return;
      } else if (isNaN(Monto.value)) {
        toastAlertError(`El Monto ${Monto.value} no tiene un formato válido`);
        e.preventDefault();
        Monto.classList.add("is-invalid");
        return;
      }else if(Monto.value<0){    
        toastAlertError(`El Monto  no puede ser negativo`);
        e.preventDefault();
        Monto.classList.add("is-invalid");
        return;
      }else if(Monto.value>99999999){    
        toastAlertError(`El Monto  no puede Tan Grande`);
        e.preventDefault();
        Monto.classList.add("is-invalid");
        return;
      } 
      else{
        Monto.classList.remove("is-invalid");
      }

      if (!Fecha.value) {
        toastAlertError(`El campo de la Fecha está vacío`);
        e.preventDefault();
        Fecha.classList.add("is-invalid");
        return;
      } else {
        Fecha.classList.remove("is-invalid");
      }

      if (!Descripcion.value) {
        toastAlertError(`El campo de la Descripcion está vacío`);
        e.preventDefault();
        Descripcion.classList.add("is-invalid");
        return;
      } else if (!isNaN(Descripcion.value)) {
        toastAlertError(
          `La Descripcion ${Descripcion.value} no tiene un formato válido`);
        e.preventDefault();
        Descripcion.classList.add("is-invalid");
        return;
      } else if (Descripcion.value.length < 6) {
        toastAlertError(`La Descripcion ${Descripcion.value} es muy corta`);
        e.preventDefault();
        Descripcion.classList.add("is-invalid");
        return;
      }else{
        Descripcion.classList.remove("is-invalid")
      }
      e.preventDefault();
     
      let data={
        TipoDeEgreso:Descripcion.value,
        TipoDeGasto:TipoDeGasto.value,
        Evidencia:Evidencia.value,
        Monto:Monto.value,
        Fecha:Fecha.value,
        Descripcion:Descripcion.value
      }
        console.log(data);  
       

        try {
            const response = await axios.post("/RegistrarEgresos", data);
            const responseData = response.data;
            if (responseData.data.startsWith("Error")) {
              toastAlertError(responseData.data);
            } else {
              toastAlertSuccess(responseData.data);
              form.reset();
            }
            
            return;
          } catch (error) {
            toastAlertError(`Error al enviar los datos: ${error.message}`);
          }


});

let TiposDeGasto = ['Compra', 'Pago de Salario', 'Servicio Básico'];
document.addEventListener("DOMContentLoaded", async () => {
    TiposDeGasto.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.text = category;
    TipoDeGasto.appendChild(option);
  });
});