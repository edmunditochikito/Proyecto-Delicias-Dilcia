window.addEventListener("load", () => {
    const nombre = document.getElementById("nombre");
    const precio = document.getElementById("precio");
    const descripcion = document.getElementById("descripcion");
    const form=document.getElementById("formulario");
    
    
    form.addEventListener('submit', async(event)=>{
      
  
      if (!nombre.value) {
          nombre.classList.add("is-invalid");
          event.preventDefault();
        } else {
          nombre.classList.remove("is-invalid");
        }
    
        if (!precio.value) {
            precio.classList.add("is-invalid");
          event.preventDefault();
        } else {
            precio.classList.remove("is-invalid");
        }
    
        if (!descripcion.value) {
            descripcion.classList.add("is-invalid");
          event.preventDefault();
        } else {
            descripcion.classList.remove("is-invalid");
        }

  
    })
  });
  
  
  