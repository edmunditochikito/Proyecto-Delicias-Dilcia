window.addEventListener("load", () => {
  const nombre = document.getElementById("nombre");
  const cedula = document.getElementById("cedula");
  const telefono = document.getElementById("telefono");
  const direccion = document.getElementById("direccion");
  const form=document.getElementById("formulario");
  
  
  form.addEventListener('submit', async(event)=>{
    

    if (!nombre.value) {
        nombre.classList.add("is-invalid");
        event.preventDefault();
      } else {
        nombre.classList.remove("is-invalid");
      }
  
      if (!cedula.value) {
        cedula.classList.add("is-invalid");
        event.preventDefault();
      } else {
        cedula.classList.remove("is-invalid");
      }
  
      if (!telefono.value) {
        telefono.classList.add("is-invalid");
        event.preventDefault();
      } else {
        telefono.classList.remove("is-invalid");
      }
  
      if (!direccion.value) {
        direccion.classList.add("is-invalid");
        event.preventDefault();
      } else {
        direccion.classList.remove("is-invalid");
      }


  })
});


