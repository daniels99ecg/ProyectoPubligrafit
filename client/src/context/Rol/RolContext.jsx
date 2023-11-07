import { createContext, useContext, useState } from "react";
import Swal from 'sweetalert2'; // Import SweetAlert2
import { useNavigate } from "react-router-dom";
import { getListarRoles, putActivarCliente,putDesactivarCliente, crearRol } from "../../api/rutas.api"

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

const crearRoles=async(values)=>{
try {
  await crearRol(values)
  navigate("/rol")
} catch (error) {
  console.log(error)
}
}

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
        <RolContext.Provider value={{listar, cargarRol, desactivarCliente, activarCliente, crearRoles,searchTerm,setSearchTerm}}>
            {children}
        </RolContext.Provider>
      )
 }