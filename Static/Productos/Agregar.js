import {toastAlertError,toastAlertSuccess} from '../DataTables.js'
    const nombre = document.getElementById("nombre");
    const precio = document.getElementById("precio");
    const unidad_de_medida = document.getElementById("unidadDeMedida")
    const categoria = document.getElementById("Categoria");
    const form = document.getElementById("formulario");
    
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

      if (!precio.value) {
        toastAlertError(`El campo del precio está vacío`);
        e.preventDefault();
        precio.classList.add("is-invalid");
        return;
      } else if (isNaN(precio.value)) {
        toastAlertError(`El Precio ${precio.value} no tiene un formato válido`);
        e.preventDefault();
        precio.classList.add("is-invalid");
        return;
      }else if(precio.value<0){    
        toastAlertError(`El precio  no puede ser negativo`);
        e.preventDefault();
        precio.classList.add("is-invalid");
        return;
      } 
      else{
        precio.classList.remove("is-invalid");
      }

      e.preventDefault();

      let data={
        nombre:nombre.value,
        precio:precio.value,
        unidad_de_medida:unidad_de_medida.value,
        cantidad:0,
        categoria:categoria.value
      }

      try {
        const response = await axios.post("/AgregarProducto", data);
        const responseData = response.data;    
        if (responseData.data.startsWith("Error")) {
          toastAlertError(responseData.data);
        } else {
          toastAlertSuccess(responseData.data);
        } 
        form.reset();
        return;
      } catch (error) {
        toastAlertError(`Error al enviar los datos: ${error.message}`);
      }
      
    })
    
   

window.addEventListener("load", () => {
  const unidades=["Kilogramos","Libras","Unidades","Litros"]
  unidades.forEach((unidad)=>{
    const option=document.createElement("option")
    option.value=unidad
    option.textContent=unidad
    unidad_de_medida.appendChild(option)
  })  

});

let Categorias = ['Lacteos', 'Carnes', 'Pollo', 'Verduras', 'Insumos Basicos', 'Todos'];
document.addEventListener("DOMContentLoaded", async () => {
 Categorias.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.text = category;
    categoria.appendChild(option);
  });
});
  