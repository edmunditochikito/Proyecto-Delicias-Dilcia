    const nombre = document.getElementById("nombre");
    const telefono = document.getElementById("telefono");
    const direccion = document.getElementById("direccion");
    const form=document.getElementById("formulario");
    
    document.getElementById("agregar").addEventListener("click",async(e)=>{
      if (!nombre.value) {
        toastAlertError(`El campo de nombre está vacío`);
        e.preventDefault();
        return;
      } else if (!isNaN(nombre.value)) {
        toastAlertError(`El nombre ${nombre.value} no tiene un formato válido`);
        e.preventDefault();
        return;
      } else if (nombre.value.length <= 2) {
        toastAlertError(`El nombre ${nombre.value} es muy corto`);
        e.preventDefault();
        return;
      }

      if (!telefono.value) {
        toastAlertError(`El campo del teléfono está vacío`);
        e.preventDefault();
        return;
      } else if (isNaN(telefono.value)) {
        toastAlertError(`El teléfono ${telefono.value} no tiene un formato válido`);
        e.preventDefault();
        return;
      } else if (telefono.value.length < 8) {
        toastAlertError(`El teléfono ${telefono.value} es muy corto`);
        e.preventDefault();
        return;
      }
    
      if (!direccion.value) {
        toastAlertError(`El campo de la dirección está vacío`);
        e.preventDefault();
        return;
      } else if (!isNaN(direccion.value)) {
        toastAlertError(
          `La dirección ${direccion.value} no tiene un formato válido`
        );
        e.preventDefault();
        return;
      } else if (direccion.value.length < 6) {
        toastAlertError(`La dirección ${direccion.value} es muy corta`);
        e.preventDefault();
        return;
      }

      const data = {
        nombre: nombre.value,
        telefono: telefono.value,
        direccion: direccion.value,
      };
      e.preventDefault();

      try {
        console.log(data);
        const response = await axios.post("/AgregarProveedor", data);
        const responseData = response.data;    
        toastAlertSuccess(responseData.data);   
        clear();
        return;
        // Maneja la respuesta positiva del servidor, por ejemplo, mostrar un mensaje de éxito.
      } catch (error) {
        // Maneja el error, por ejemplo, mostrando un mensaje de error.
        toastAlertError(`Error al enviar los datos: ${error.message}`);
      }
    })
  
  
  window.toastAlertError = (info) => {
    Toast.fire({
      icon: "error",
      title: info,
    });
  };
  window.toastAlertSuccess = (info) => {
    Toast.fire({
      icon: "success",
      title: info,
    });
  };
  
  const Toast = Swal.mixin({
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
  
  const clear=()=>{
    nombre.value="";
    telefono.value="";
    direccion.value="";

  }