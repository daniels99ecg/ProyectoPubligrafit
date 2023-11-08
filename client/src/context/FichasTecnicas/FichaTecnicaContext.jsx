import {createContext , useContext, useState} from "react"
import { useNavigate } from "react-router-dom"
import {getListarFichasTecnicas, postCreateFichaTecnica,putActualizarFichasTecnicas, eliminarFichaTecnica, putActivarFichaTecnica, putDesactivarFichaTecnica} from "../../api/Rutas.ficha"
import Swal from 'sweetalert2'
export const FichaTecnicaContext = createContext()


export const useFichaTecnica = () => {
    const context = useContext(FichaTecnicaContext)
    if (!context){
        throw new Error("useFicha debe estar en provider")
    }
    return context
}

export const FichaTecnicaContextProvider = ({children})=>{
    const [listar, setListar] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    
    async function ShowFichasTecnicas() {
    const response = await getListarFichasTecnicas();

    const filterList = response.data.filter((item) => 

        item.id_ft.toString().includes(searchTerm) ||
        item.fk_insumo.toString().includes(searchTerm) ||
        item.cantidad_insumo.toString().includes(searchTerm) ||
        item.detalle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.costo_insumo.toString().includes(searchTerm) ||
        item.costo_producto_final.toString().includes(searchTerm) ||
        item.detalle.toLowerCase().includes(searchTerm.toLowerCase()) 
       
      );
      setListar(filterList);
}
const desactivarFichaTecnica = async (id_ft) => {
    try {
      const response = await putDesactivarFichaTecnica(id_ft);
      if (response.status === 200) {
        // Actualiza la lista de clientes después de desactivar uno
        const updatedList = listar.map((item) => {
          if (item.id_ft === id_ft) {
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

  const activarFichaTecnica = async (id_ft) => {
    try {
      const response = await putActivarFichaTecnica(id_ft);
      if (response.status === 200) {
        // Actualiza la lista de clientes después de activar uno
        const updatedList = listar.map((item) => {
          if (item.id_ft === id_ft) {
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

const validacionFichaTecnica = async (values)=>{
    try {
        let Caracteres = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
        let NumberPattern = /^[0-9]+$/;

    
    
        if( values.cantidad_insumo =="" || values.costo_insumo =="" || values.costo_final_producto =="" || values.detalle ==""){
            Swal.fire({
                icon: 'error',
                title: 'Campos Vacios',
                text: 'Por favor ingresar datos!',
                
              })
        }else if((!NumberPattern.test(values.cantidad_insumo))){
            Swal.fire({
                icon: 'error',
                title: 'Cantidad',
                text: 'Por favor ingresar solo numeros!',
                
              })
        }else if((!NumberPattern.test(values.costo_insumo))){
            Swal.fire({
                icon: 'error',
                title: 'Costo de insumo',
                text: 'Por favor ingresar solo numeros!',
                
              })
        }
        else if((!NumberPattern.test(values.costo_final_producto))){
          Swal.fire({
              icon: 'error',
              title: 'Campos Vacio',
              text: 'Costo final del producto!',
              
            })
      }
        else if((!Caracteres.test(values.detalle))){
            Swal.fire({
                icon: 'error',
                title: 'Campos Vacio',
                text: 'Por favor ingresar datos!',
                
              })
        }else{
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
              })
              
              swalWithBootstrapButtons.fire({
                title: 'Confirmar el envio del formulario?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancelar!',
                confirmButtonText: 'Aceptar!',
                Buttons: true
              }).then((result) => {
            if (result.isConfirmed) {
                postCreateFichaTecnica(values)
                    .then((response) => {
                        if (response.status === 400 && response.data.error) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Ficha ya registrado',
                                text: response.data.error
                            });
                        } else {
                            navigate("/fichaTecnica");
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
    const eliminarFichasTecnicas = async (id_ft) => {
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
          
            const response = await eliminarFichaTecnica(id_ft)
            setListar(listar.filter(listar=>listar.id_ft!==id_ft))

          }
        })
       

      } catch (error) {
        console.log(error)
      }
    }
    const [listarFichaTecnica, setListarFichaTecnica] = useState(
      {
          id_ft: '',
          fk_insumo: '',
          cantidad_insumo: '',
          costo_insumo: '',
          imagen_producto_final: '',
          costo_final_producto: '',
          detalle: ''

      })
    const validarFichaActualizar= async (id_ft, values)=>{
    try {
      let Caracteres = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
      let NumberPattern = /^[0-9]+$/;
    
      if(values.insumo =="" || values.cantidad_insumo =="" || values.costo_insumo =="" || values.costo_final_producto =="" || values.detalle ==""){
          Swal.fire({
              icon: 'error',
              title: 'Campos Vacios',
              text: 'Por favor ingresar datos!',
              
            })
      
      }else if((!NumberPattern.test(values.cantidad_insumo))){
          Swal.fire({
              icon: 'error',
              title: 'Cantidad',
              text: 'Por favor ingresar solo numeros!',
              
            })
      }else if((!NumberPattern.test(values.costo_insumo))){
          Swal.fire({
              icon: 'error',
              title: 'Costo de insumo',
              text: 'Por favor ingresar solo numeros!',
              
            })
      }
      else if((!NumberPattern.test(values.costo_final_producto))){
        Swal.fire({
            icon: 'error',
            title: 'Campos Vacio',
            text: 'Costo final del producto!',
            
          })
    }
      else if((!Caracteres.test(values.detalle))){
          Swal.fire({
              icon: 'error',
              title: 'Campos Vacio',
              text: 'Por favor ingresar datos!',
              
            })
      }else{
          const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
              },
              buttonsStyling: false
            })
            
            swalWithBootstrapButtons.fire({
              title: 'Confirmar el envio del formulario?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              cancelButtonText: 'Cancelar!',
              confirmButtonText: 'Aceptar!',
              Buttons: true
            }).then(async (result) => {
          if (result.isConfirmed) {
            // Línea de código importante para cambiar de tipo "button" a "submit"
            await putActualizarFichasTecnicas(id_ft, values);
            navigate("/fichaTecnica");
    
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
  async function fichaTecnicaActualizar (id_ft){

    try{
    
        const fichaTecnicaUpdate = await getListarFichaTecnica(id_ft)
        const response = fichaTecnicaUpdate.data

        setListarFichaTecnica({
            id_ft: response.id_ft,
            fk_insumo: response.fk_insumo,
            cantidad_insumo: response.cantidad_insumo,
            costo_insumo: response.costo_insumo,
            imagen_producto_final: response.imagen_producto_final,
            costo_final_producto: response.costo_final_producto,
            detalle: response.detalle
        })
    } catch (error) {
        console.log(error)
    }
  }

return(
    <FichaTecnicaContext.Provider
    value={{listar,ShowFichasTecnicas,searchTerm,setSearchTerm,listarFichaTecnica, validarFichaActualizar,fichaTecnicaActualizar,activarFichaTecnica, eliminarFichasTecnicas, desactivarFichaTecnica, validacionFichaTecnica ,filtrarDesactivados}}>
    {children}
    </FichaTecnicaContext.Provider>
)
}