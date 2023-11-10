import {createContext , useContext, useState} from "react"
import { useNavigate } from "react-router-dom"
import {getListarProductos, postCreateProducto,getListarProducto, putActualizarProductos,eliminarProducto, putActivarProducto, putDesactivarProducto} from "../../api/Rutas.producto"
import Swal from 'sweetalert2'
export const ProductoContext = createContext()


export const useProducto = () => {
    const context = useContext(ProductoContext)
    if (!context){
        throw new Error("useFicha debe estar en provider")
    }
    return context
}

export const ProductoContextProvider = ({children})=>{
  const [listar, setListar] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  async function ShowProducto() {
  const response = await getListarProductos();

  const filterList = response.data.filter((item) => 

   
      item.id_producto.toString().includes(searchTerm) ||
      item.fk_categoria.toString().includes(searchTerm) ||
      item.nombre_producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.precio.toString().includes(searchTerm) ||
      // item.imagen.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.stock.toString().includes(searchTerm)
     
    );
    setListar(filterList);
}
const desactivarProducto = async (id_producto) => {
    try {
      const response = await putDesactivarProducto(id_producto);
      if (response.status === 200) {
        // Actualiza la lista de clientes después de desactivar uno
        const updatedList = listar.map((item) => {
          if (item.id_producto === id_producto) {
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

  const activarProducto = async (id_producto) => {
    try {
      const response = await putActivarProducto(id_producto);
      if (response.status === 200) {
        // Actualiza la lista de clientes después de activar uno
        const updatedList = listar.map((item) => {
          if (item.id_producto === id_producto) {
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

const validacionProducto = async (values)=>{
    try {
        let Caracteres = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
        let NumberPattern = /^[0-9]+$/;
        if(values.nombre_producto =="" || values.precio =="" || values.stock =="" /*|| values.imagen=="" */){
            Swal.fire({
                icon: 'error',
                title: 'Campos Vacios',
                text: 'Por favor ingresar datos!',
                
              })
        }else if((!Caracteres.test(values.nombre_producto))){
            Swal.fire({
                icon: 'error',
                title: 'Nombre Producto',
                text: 'Por favor ingresar solo letras!',
                
              })
        }else if((!NumberPattern.test(values.stock))){
            Swal.fire({
                icon: 'error',
                title: 'Stock',
                text: 'Por favor ingresar solo numeros!',
                
              })
        }else if((!NumberPattern.test(values.precio))){
            Swal.fire({
                icon: 'error',
                title: 'Precio',
                text: 'Por favor ingresar solo numeros!',
                
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
                title: 'Confirmar en envio del formulario?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Aceptar!',
                cancelButtonText: 'Cancelar!',
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                    postCreateProducto(values)
                        .then((response) => {
                            if (response.status === 400 && response.data.error) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Producto ya registrado',
                                    text: response.data.error
                                });
                            } else {
                                navigate("/producto");
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
    const eliminarProductos = async (id_producto) => {
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
          
            const response = await eliminarProducto(id_producto)
            setListar(listar.filter(listar=>listar.id_producto!==id_producto))

          }
        })
       

      } catch (error) {
        console.log(error)
      }

    }
    const [listarProducto, setListarProducto] = useState(
      {
          id_producto: '',
          fk_categoria: '',
          nombre_producto: '',
          precio: '',
          imagen: '',
          stock: '',

      })
      async function productoActualizar (id_producto){

        try{
        
            const productoUpdate = await getListarProducto(id_producto)
            const response = productoUpdate.data

            setListarProducto({
                id_producto: response.id_producto,
                fk_categoria: response.fk_categoria,
                nombre_producto: response.nombre_producto,
                precio: response.precio,
                imgane: response.imagen,
                stock: response.stock
            })
        } catch (error) {
            console.log(error)
        }
      }
      const validarProductoActualizar= async (id_producto, values)=>{
        try {
          let Caracteres = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
          let NumberPattern = /^[0-9]+$/;
          if(values.nombre_producto =="" || values.precio =="" || values.stock =="" || values.imagen=="" ){
              Swal.fire({
                  icon: 'error',
                  title: 'Campos Vacios',
                  text: 'Por favor ingresar datos!',
                  
                })
          }else if((!Caracteres.test(values.nombre_producto))){
              Swal.fire({
                  icon: 'error',
                  title: 'Nombre Producto',
                  text: 'Por favor ingresar solo letras!',
                  
                })
          }else if((!NumberPattern.test(values.stock))){
              Swal.fire({
                  icon: 'error',
                  title: 'Cantidad',
                  text: 'Por favor ingresar solo numeros!',
                  
                })
          }else if((!NumberPattern.test(values.precio))){
              Swal.fire({
                  icon: 'error',
                  title: 'Precio',
                  text: 'Por favor ingresar solo numeros!',
                  
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
                  title: 'Confirmar en envio del formulario?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Aceptar!',
                  cancelButtonText: 'Cancelar!',
                  reverseButtons: true
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    // Línea de código importante para cambiar de tipo "button" a "submit"
                    await putActualizarProductos(id_producto, values);
                    navigate("/producto");
            
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
      

return(
    <ProductoContext.Provider
    value={{listar,ShowProducto,searchTerm,setSearchTerm, validarProductoActualizar,productoActualizar,listarProducto,activarProducto, eliminarProductos, desactivarProducto, validacionProducto ,filtrarDesactivados}}>
    {children}
    </ProductoContext.Provider>
)
}
