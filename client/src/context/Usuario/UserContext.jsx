import { createContext, useContext, useState } from "react";
import {getListarUsuarios, crearUsuario, getListarRoles} from '../../api/rutas.api'
import Swal from 'sweetalert2'; // Import SweetAlert2
import { useNavigate } from "react-router-dom";
export const UserContext = createContext()

export const useUser=()=>{
   const context= useContext(UserContext)
    if(!context){
        throw new Error ("El useUser debe de estar del provider")
    }
    return context;
}

export const UserContextProvider = ({ children }) => {
    const navigate = useNavigate();

    const [listar, setListar]=useState([])
    const [Listar, setListar2]=useState([])



    async function cargarUsuario(){
        const response =  await getListarUsuarios()
        setListar(response.data)
        }
       
    async function creacionValidacion(values){
        
        try{
            // Perform your validation checks here
            if( values.nombres=="" || values.apellidos==""||values.email==""||values.contrasena==""){
           
             Swal.fire({
                 icon: 'error',
                 title: 'Campos Vacios',
                 text: 'Por favor ingresar datos!',
                 
               })
             }else if(!values.email.includes("@") || !values.email.includes(".com")){
               Swal.fire({
                   icon: 'error',
                   title: 'Correo no valido',
                   text: 'Por favor ingresar un correo valido!',
                   
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
                 }).then((result) => {
                   if (result.isConfirmed) {
           
                     //Linea de codigo muy importante para el cambio de type button a submit
                     // const formulario=document.getElementById('pruebas');
                     // formulario.submit();
                     navigate("/usuario");

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
             
                   const responde=await crearUsuario(values)
                   console.log(responde)
                   
                 
                   // actions.resetForm()
                   
               }catch (error){
                   console.log(error)
               }
    }    

    async function cargarRol(){
      const response =  await getListarRoles()
      setListar2(response.data)
      }


  
    return( 
    <UserContext.Provider value={{listar, Listar,cargarUsuario, creacionValidacion,  cargarRol}}>
        {children}
    </UserContext.Provider>
    )
}