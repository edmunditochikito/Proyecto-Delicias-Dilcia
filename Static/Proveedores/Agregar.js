    import {toastAlertError,toastAlertSuccess} from '../DataTables.js'
    const nombre = document.getElementById("nombre");
    const telefono = document.getElementById("telefono");
    const direccion = document.getElementById("direccion");
    const categoria = document.getElementById("Categoria");
    const form=document.getElementById("formulario");
    
    document.getElementById("agregar").addEventListener("click",async(e)=>{
      if (!nombre.value) {
        toastAlertError(`El campo de nombre está vacío`);
        e.preventDefault();
        nombre.classList.add("is-invalid")
        return;
      } else if (!isNaN(nombre.value)) {
        toastAlertError(`El nombre ${nombre.value} no tiene un formato válido`);
        e.preventDefault();
        nombre.classList.add("is-invalid");
        return;
      } else if (nombre.value.length <= 2) {
        toastAlertError(`El nombre ${nombre.value} es muy corto`);
        e.preventDefault();
        nombre.classList.add("is-invalid");
        return;
      }else{
        nombre.classList.remove("is-invalid");
      }

      if (!telefono.value) {
        toastAlertError(`El campo del Telefono está vacío`);
        e.preventDefault();
        telefono.classList.add("is-invalid");
        return;
      } else if (isNaN(telefono.value)) {
        toastAlertError(`El teléfono ${telefono.value} no tiene un formato válido`);
        e.preventDefault();
        telefono.classList.add("is-invalid");
        return;
      }else if(telefono.value<0){    
        toastAlertError(`El teléfono no puede ser negativo`);
        e.preventDefault();
        telefono.classList.add("is-invalid");
        return;
      } 
      else if (telefono.value.length < 8) {
        toastAlertError(`El teléfono ${telefono.value} es muy corto`);
        e.preventDefault();
        telefono.classList.add("is-invalid");
        return;
      } else if (telefono.value.length > 8) {
        toastAlertError(`El teléfono ${telefono.value} es muy largo`);
        e.preventDefault();
        telefono.classList.add("is-invalid");
        return;
      }
      else{
        telefono.classList.remove("is-invalid");
      }
    
      if (!direccion.value) {
        toastAlertError(`El campo de la dirección está vacío`);
        e.preventDefault();
        direccion.classList.add("is-invalid");
        return;
      } else if (!isNaN(direccion.value)) {
        toastAlertError(
          `La dirección ${direccion.value} no tiene un formato válido`);
        e.preventDefault();
        direccion.classList.add("is-invalid");
        return;
      } else if (direccion.value.length < 6) {
        toastAlertError(`La dirección ${direccion.value} es muy corta`);
        e.preventDefault();
        direccion.classList.add("is-invalid");
        return;
      }else{
        direccion.classList.remove("is-invalid")
      }

      const data = {
        nombre: nombre.value,
        telefono: telefono.value,
        direccion: direccion.value,
        categoria: categoria.value
      };
      e.preventDefault();

      try {
        console.log(data);
        const response = await axios.post("/AgregarProveedor", data);
        const responseData = response.data;    
        toastAlertSuccess(responseData.data);   
        clear();
        return;
      } catch (error) {
        toastAlertError(`Error al enviar los datos: ${error.message}`);
      }
    })
  
  

  const clear=()=>{
    nombre.value="";
    telefono.value="";
    direccion.value="";

  }

  let Categorias = ['Lacteos', 'Carnes', 'Pollo', 'Verduras', 'Insumos Basicos', 'Todos'];
document.addEventListener("DOMContentLoaded", async () => {
 Categorias.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.text = category;
    categoria.appendChild(option);
  });
});