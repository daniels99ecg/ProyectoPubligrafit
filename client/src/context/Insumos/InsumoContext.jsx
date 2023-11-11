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
      
        if (values.nombre === "" || values.precio === "" || values.cantidad === "") {
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
        } else if (!NumberPattern.test(values.cantidad)) {
          Swal.fire({
            icon: 'error',
            title: 'Cantidad',
            text: 'Por favor ingresar solo números.',
          });
        } else if (!NumberPattern.test(values.precio)) {
          Swal.fire({
            icon: 'error',
            title: 'Precio',
            text: 'Por favor ingresar solo números.',
          });
        } else {
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          });
      
          swalWithBootstrapButtons.fire({
            title: 'Confirmar el envío del formulario?',
            text: '¿Estás seguro de realizar la acción?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Aceptar!',
            cancelButtonText: 'Cancelar!',
            buttons: true
          }).then((result) => {
            if (result.isConfirmed) {
                postCreateInsumo(values)
                    .then((response) => {
                        if (response.status === 400 && response.data.error) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Insumo ya registrado',
                                text: response.data.error
                            });
                        } else {
                            navigate("/insumo");
                            swalWithBootstrapButtons.fire(
                                'Registro Exitoso!',
                                'Tu Archivo Ha Sido Registrado',
                                'success'
                            );
                            resetForm();
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    'Registro Cancelado',
                    'Registro No Completado',
                    'error'
                );
            }
        });
    }
} catch (error) {
    console.error(error);
      }
    }
    const eliminarInsumos = async (id_insumo) => {
      try {
        Swal.fire({
          title: 'Eliminar Registro?',
          text: "You won't be able to revert this!",
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
          precio: '',
          cantidad: '' 

      })
    const validarInsumoActualizar= async (id_insumo, values)=>{
    try {
      let Caracteres = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
      let NumberPattern = /^[0-9]+$/;
    
      if (values.nombre === "" || values.precio === "" || values.cantidad === "") {
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
      } else if (!NumberPattern.test(values.cantidad)) {
        Swal.fire({
          icon: 'error',
          title: 'Cantidad',
          text: 'Por favor ingrese solo números.',
        });
      } else if (!NumberPattern.test(values.precio)) {
        Swal.fire({
          icon: 'error',
          title: 'Precio',
          text: 'Por favor ingrese solo números.',
        });
      } else {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        });
    
        swalWithBootstrapButtons.fire({
          title: '¿Confirmar el envío del formulario?',
          text: "No podrá revertir esto.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
          buttons: true
        }).then(async (result) => {
          if (result.isConfirmed) {
            // Línea de código importante para cambiar de tipo "button" a "submit"
            await putActualizarInsumos(id_insumo, values);
            navigate("/insumo");
    
            swalWithBootstrapButtons.fire(
              '¡Insumo Actualizado!',
              'Su archivo ha sido eliminado.',
              'success'
            );
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              'Se canceló el envío para la actualización',
              'Su archivo imaginario está a salvo :)',
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
    value={{listar,ShowInsumos,searchTerm,setSearchTerm, validarInsumoActualizar,insumoActualizar,listarInsumo,insumoActualizar,activarInsumo, eliminarInsumos, desactivarInsumo, validacionInsumo ,filtrarDesactivados}}>
    {children}
    </InsumoContext.Provider>
)
}
