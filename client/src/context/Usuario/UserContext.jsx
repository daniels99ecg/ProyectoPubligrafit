import { createContext, useContext, useState } from "react";
import {getListarUsuarios, crearUsuario, getListarRoles, putActivarCliente, putDesactivarCliente, eliminar, cargaractualizarUsuario,actualizarUsuario} from '../../api/Usuario/rutas.api'
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
    const [searchTerm, setSearchTerm] = useState("");

async function cargarUsuario(){
        const response =  await getListarUsuarios()

        
        const filterList = response.data.filter((item) => 
          item.id_usuario.toString().includes(searchTerm) ||
          item.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.email.toString().includes(searchTerm)
         
        );
    
        setListar(filterList);
      
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
                 }).then(async(result) => {
                   if (result.isConfirmed) {
           
                    const responde=await crearUsuario(values)
                    console.log(responde)
                    
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
             
                 
                   // actions.resetForm()
                   
               }catch (error){
                   console.log(error)
               }
      }    

async function cargarRol(){
      const response =  await getListarRoles()
      setListar2(response.data)
      }

    const desactivarCliente = async (id_usuario) => {
        try {
          const response = await putDesactivarCliente(id_usuario);
          if (response.status === 200) {
            // Actualiza la lista de clientes después de desactivar uno
            const updatedList = listar.map((item) => {
              if (item.id_usuario === id_usuario) {
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
    
    const activarCliente = async (id_usuario) => {
        try {
          const response = await putActivarCliente(id_usuario);
          if (response.status === 200) {
            // Actualiza la lista de clientes después de activar uno
            const updatedList = listar.map((item) => {
              if (item.id_usuario === id_usuario) {
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
const eliminarUsuario=async(id_usuario)=>{
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
            
              const responde = await eliminar(id_usuario)
              setListar(listar.filter(listar=>listar.id_usuario!==id_usuario))

            }
          })
         

        } catch (error) {
          console.log(error)
        }
      }
    


// Funcciones para actualizar      

const[ListarActualizar, setListarActualizar]=useState({
    id_usuario:"",
    nombres:"",
    apellidos:"",
    email:"",
    contrasena:"",
    fk_rol2:"",
 })
    
 async function cargarUsuariosActualizar(id_usuario) {
  try {
  
    const response = await cargaractualizarUsuario(id_usuario);
    const usuarioData=response.data
    setListarActualizar({
      id_usuario: usuarioData.id_usuario,
      nombres: usuarioData.nombres,
      apellidos: usuarioData.apellidos,
      email: usuarioData.email,
      contrasena: usuarioData.contrasena,
      fk_rol2: usuarioData.fk_rol2,
    });
  } catch (error) {
    console.log(error);
  }
}

const actualizarValidar= async(id_usuario, values)=>{
  try {
        
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
          }).then(async(result) => {
            if (result.isConfirmed) {
    
              await actualizarUsuario(id_usuario, values)

            
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
      
          


  } catch (error) {
    console.log(error)
  }

}
    return( 
      <UserContext.Provider value={{listar, Listar,cargarUsuario,searchTerm,setSearchTerm, creacionValidacion,  cargarRol, desactivarCliente, activarCliente, eliminarUsuario, filtrarDesactivados, ListarActualizar,setListarActualizar,actualizarValidar,cargarUsuariosActualizar}}>
          {children}
      </UserContext.Provider>
    )
}