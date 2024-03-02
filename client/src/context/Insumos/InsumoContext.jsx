import {createContext , useContext, useState} from "react"
import { useNavigate } from "react-router-dom"
import {getListarInsumos, postCreateInsumo, getListarInsumo, putActualizarInsumos,eliminarInsumo, putActivarInsumo, putDesactivarInsumo} from "../../api/Insumo/Rutas.api"
import Swal from 'sweetalert2'
export const InsumoContext = createContext()


export const useInsumo = () => {
    const context = useContext(InsumoContext)
    if (!context){
        throw new Error("useInsumo debe estar en provider")
    }
    return context
}

export const InsumoContextProvider = ({children})=>{
    const [listar, setListar] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    
    async function ShowInsumos() {
    const response = await getListarInsumos();

    const filterList = response.data.filter((item) => 

        item.id_insumo.toString().includes(searchTerm) ||
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.precio.toString().includes(searchTerm) ||
        item.cantidad.toString().includes(searchTerm)
       
      );
      setListar(filterList);
}
const desactivarInsumo = async (id_insumo) => {
    try {
      const response = await putDesactivarInsumo(id_insumo);
      if (response.status === 200) {
        // Actualiza la lista de clientes después de desactivar uno
        const updatedList = listar.map((item) => {
          if (item.id_insumo === id_insumo) {
            // Actualiza el estado del cliente en la lista
            return { ...item, estado: false };
          }
          return item;
        });
        setListar(updatedList);
      }
    } catch (error) {
      console.error(error);
      // Maneja el error de manera adecuada
    }
  };

  const activarInsumo = async (id_insumo) => {
    try {
      const response = await putActivarInsumo(id_insumo);
      if (response.status === 200) {
        // Actualiza la lista de clientes después de activar uno
        const updatedList = listar.map((item) => {
          if (item.id_insumo === id_insumo) {
            // Actualiza el estado del cliente en la lista
            return { ...item, estado: true };
          }
          return item;
        });
        setListar(updatedList);
      }
    } catch (error) {
      console.error(error);
      // Maneja el error de manera adecuada
    }
  };

  const filtrarDesactivados = listar.sort((a, b) => {
    if (a.estado === b.estado) {
      return 0;
    }
    return a.estado ? -1 : 1;
  });

const validacionInsumo = async (values)=>{
    try {
        let Caracteres = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
        let NumberPattern = /^[0-9]+$/;
      
        if (values.nombre === "" ) {
          Swal.fire({
            icon: 'error',
            title: 'Campos Vacíos',
            text: 'Por favor ingresar datos.',
          });
        } else if (!Caracteres.test(values.nombre)) {
          Swal.fire({
            icon: 'error',
            title: 'Nombre',
            text: 'Por favor ingresar solo letras.',
          });
        // } else if (!NumberPattern.test(values.cantidad)) {
        //   Swal.fire({
        //     icon: 'error',
        //     title: 'Cantidad',
        //     text: 'Por favor ingresar solo números.',
        //   });
        // } else if (!NumberPattern.test(values.precio)) {
        //   Swal.fire({
        //     icon: 'error',
        //     title: 'Precio',
        //     text: 'Por favor ingresar solo números.',
        //   });
        } else {
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success me-3',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          });
      
          Swal.fire({
            title: 'Confirmar el envío del formulario?',
            text: '¿Estás seguro de realizar la acción?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Aceptar!',
            cancelButtonText: 'Cancelar!',
            buttons: true
          }).then(async(result) => {
            if (result.isConfirmed) {
          try {
            const response = await postCreateInsumo(values);
            console.log(response);
      
            if (response.data && response.data.error) {
              // Verificar errores específicos
              if (response.data.error === 'el nombre del insumo ya existe') {
                console.log('Mostrar alerta de insumo existente');
      
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'El nombre del insumo ya existe.',
                });
              }
 else {
                console.log('Mostrar alerta de otro error');
      
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: response.data.error,
                });
              }
            } else {
              // Verificar si se creó el usuario correctamente
              if (response.data && response.data.insumo) {
                // Si no hay errores, redirige a la página de usuario
                navigate("/insumo");
                window.location.reload()
                swalWithBootstrapButtons.fire(
                  'Registro Enviado!',
                  'Your file has been deleted.',
                  'success'
                );
              } else {
                navigate("/insumo");
                window.location.reload()

                swalWithBootstrapButtons.fire(
                  'Registro Enviado!',
                  'Your file has been deleted.',
                  'success'
                );
              }
            }
          } catch (error) {
            console.error(error);
            swalWithBootstrapButtons.fire(
              'Error',
              'Ocurrió un error al crear el insumo.',
              'error'
            );
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Se cancelo el envio',
            'Este usuario no se registro',
            'error'
          );
        }
      });
    }              
  } catch (error) {
    console.log(error);
  }
}
   


    const eliminarInsumos = async (id_insumo) => {
      try {
        Swal.fire({
          title: 'Eliminar Registro?',
          text: "No podrás revertir esto!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar'
        }).then(async(result) => {
          if (result.isConfirmed) {
          
            const response = await eliminarInsumo(id_insumo)
            setListar(listar.filter(listar=>listar.id_insumo!==id_insumo))

          }
        })
       

      } catch (error) {
        console.log(error)
      }
    }
    const [listarInsumo, setListarInsumo] = useState(
      {
          id_insumo: '',
          nombre: '',
          // precio: '',
          // cantidad: '' 

      })
    const validarInsumoActualizar= async (id_insumo, values)=>{
    try {
      let Caracteres = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
      let NumberPattern = /^[0-9]+$/;
    
      if (values.nombre === "" ) {
        Swal.fire({
          icon: 'error',
          title: 'Campos Vacíos',
          text: 'Por favor ingrese datos.',
        });
      } else if (!Caracteres.test(values.nombre)) {
        Swal.fire({
          icon: 'error',
          title: 'Nombre',
          text: 'Por favor ingrese solo letras.',
        });
      // } else if (!NumberPattern.test(values.cantidad)) {
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Cantidad',
      //     text: 'Por favor ingrese solo números.',
      //   });
      // } else if (!NumberPattern.test(values.precio)) {
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Precio',
      //     text: 'Por favor ingrese solo números.',
      //   });
      } else {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success me-3',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        });
    
        Swal.fire({
          title: '¿Confirmar el envío del formulario?',
          text: "No podrá revertir esto!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
          buttons: true
        }).then(async (result) => {
          if (result.isConfirmed) {
            try{
              const response=await putActualizarInsumos(id_insumo, values);
              console.log(response)
                    
                      if (response.data && response.data.error) {
                        // Verificar errores específicos
                        if (response.data.error === 'el nombre del insumo ya existe') {
                          console.log('Mostrar alerta de usuario existente');
                
                          Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'El Insumo ya existe.',
                          });
                        } else {
                          console.log('Mostrar alerta de otro error');
                
                          Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: response.data.error,
                          });
                        }
                      } else {
                        // Verificar si se creó el usuario correctamente
                        if (response.data && response.data.usuario) {
                          // Si no hay errores, redirige a la página de usuario
                        
                          window.location.reload()
                          swalWithBootstrapButtons.fire(
                            'Registro Enviado!',
                            'Your file has been deleted.',
                            'success'
                          );
                        } else {
                          
                          window.location.reload()
        
                          swalWithBootstrapButtons.fire(
                            'Registro Enviado!',
                            'Your file has been deleted.',
                            'success'
                          );
                        }
                      }
                    } catch (error) {
                      console.error(error);
                      swalWithBootstrapButtons.fire(
                        'Error',
                        'Ocurrió un error al crear el insumo.',
                        'error'
                      );
                    }
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                      'Se cancelo el envio',
                      'Your imaginary file is safe :)',
                      'error'
                    );
                  }
                });
              }              
            } catch (error) {
              console.log(error);
            }
          }



  async function insumoActualizar (id_insumo){

    try{
    
        const insumoUpdate = await getListarInsumo(id_insumo)
        const response = insumoUpdate.data

        setListarInsumo({
            id_insumo: response.id_insumo,
            nombre: response.nombre,
            precio: response.precio,
            cantidad: response.cantidad
        })
    } catch (error) {
        console.log(error)
    }
  }
return(
    <InsumoContext.Provider
    value={{listar,ShowInsumos,searchTerm,setSearchTerm, validarInsumoActualizar,insumoActualizar,listarInsumo,activarInsumo, eliminarInsumos, desactivarInsumo, validacionInsumo ,filtrarDesactivados}}>
    {children}
    </InsumoContext.Provider>
)
}
