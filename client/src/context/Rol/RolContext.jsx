import { createContext, useContext, useState } from "react";
import Swal from 'sweetalert2'; // Import SweetAlert2
import { useNavigate } from "react-router-dom";
import { getListarRoles, putActivarCliente,putDesactivarCliente, crearRol, listarPermiso } from "../../api/Rol/rutas.api"

export const RolContext = createContext()

export const useRol=()=>{
    const context= useContext(RolContext)
     if(!context){
         throw new Error ("El useRol debe de estar del provider")
     }
     return context;
 }

 export const RolContextProvider = ({ children }) => {

    const navigate=useNavigate()
    const [listar, setListar]=useState([])//Lista todos los roles
    const [searchTerm, setSearchTerm] = useState("");

async function cargarRol(){
       
        const response= await getListarRoles()//LLamar la ruta del server

        const filterList = response.data.filter((item) => 
        item.id_rol.toString().includes(searchTerm) ||
        item.nombre_rol.toLowerCase().includes(searchTerm.toLowerCase())
       
       
      );
        setListar(filterList) //Se le pasa los datos al setListar 
 }

async function cargarpermiso(){
  const response =await listarPermiso()
  setListar(response.data)
}



const crearRoles=async(values)=>{
try {
  if( values.nombre_rol=="" || values.fecha==""||values.permisos==""){
           
    Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
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
        confirmButtonText: 'Aceptar!',
        cancelButtonText: 'Cancelar!',
        Buttons: true
      }).then(async(result) => {
        if (result.isConfirmed) {

      
          await crearRol(values)
          navigate("/rol")

          swalWithBootstrapButtons.fire(
            'Registro Enviado!',
            'Your file has been deleted.',
            'success'
          )
        
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Se cancelo el envio',
            'Your imaginary file is safe :)',
            'error'
          )
        }
       

      })
     
     
    }

} catch (error) {
  console.log(error)
}
}

const filtrarDesactivados = listar.sort((a, b) => {
  if (a.estado === b.estado) {
    return 0;
  }
  return a.estado ? -1 : 1;
});

const desactivarCliente = async (id_rol) => {
    try {
      const response = await putDesactivarCliente(id_rol);
      if (response.status === 200) {
        // Actualiza la lista de clientes después de desactivar uno
        const updatedList = listar.map((item) => {
          if (item.id_rol === id_rol) {
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
const activarCliente = async (id_rol) => {
    try {
      const response = await putActivarCliente(id_rol);
      if (response.status === 200) {
        // Actualiza la lista de clientes después de activar uno
        const updatedList = listar.map((item) => {
          if (item.id_rol === id_rol) {
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
    return( 
        <RolContext.Provider value={{listar, cargarRol, desactivarCliente, activarCliente, crearRoles,searchTerm,setSearchTerm, cargarpermiso,filtrarDesactivados}}>
            {children}
        </RolContext.Provider>
      )
 }