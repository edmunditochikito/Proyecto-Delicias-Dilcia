window.addEventListener("load", () => {
    const nombre = document.getElementById("nombre");
    const precio = document.getElementById("precio");
    const unidad_de_medida = document.getElementById("unidadDeMedida")
    const cantidad = document.getElementById("cantidad")
    const form = document.getElementById("formulario");
    
    
    form.addEventListener('submit', async(event)=>{
      
        if (!nombre.value.trim()) {
          nombre.classList.add("is-invalid");
          event.preventDefault()
        } else {
          nombre.classList.remove("is-invalid");
        }
      
        
        if (!precio.value.trim()) {
          precio.classList.add("is-invalid");
          event.preventDefault()
        } else {
          precio.classList.remove("is-invalid");
        }
        
        if (!unidad_de_medida.value.trim()) {
          unidad_de_medida.classList.add("is-invalid");
          event.preventDefault()
        } else {
          unidad_de_medida.classList.remove("is-invalid");
        }
        if (!cantidad.value.trim()) {
          cantidad.classList.add("is-invalid");
         event.preventDefault()
        } else {
          cantidad.classList.remove("is-invalid");
        }
      
        
  
    })
  });
  
  
  