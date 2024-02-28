import { createContext, useContext, useState } from "react";
import Swal from 'sweetalert2'; // Import SweetAlert2
import { useNavigate } from "react-router-dom";
import { getListarRoles, putActivarCliente,putDesactivarCliente, crearRol,crearRolNuevo, listarPermiso, eliminar,cargaractualizarRol,actualizarRol,getListarRolesxPermiso,getNewRol } from "../../api/Rol/rutas.api"

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
    const [listar2, setListar2]=useState([])//Lista todos los roles
    const [listar4, setListar4]=useState([])
    
    const [searchTerm, setSearchTerm] = useState("");
async function cargarRol(){
       
        const response= await getListarRoles()//LLamar la ruta del server

        const filterList = response.data.filter((item) => 
        item.id_rol_x_permiso.toString().includes(searchTerm) ||
        item.rol.nombre_rol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.rol.id_rol.toString().includes(searchTerm) 
     
      );
        setListar(filterList) //Se le pasa los datos al setListar 
 }

 async function showNewRoles(){
  const response =await getNewRol()
  setListar4(response.data)
 }

async function cargarpermiso(){
  const response =await listarPermiso()
  setListar(response.data)
}

async function cargarRolxPermiso(){
  const response =await getListarRolesxPermiso()
  setListar2(response.data)
  
}


const crearRoles=async(values)=>{
try {
  if(values.fk_usuario==""||values.permisos==""){
           
    Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'Por favor ingresar datos!',
        
      })
    }else{
           
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success me-3',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      Swal.fire({
        title: 'Confirmar el envio del formulario?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar!',
        cancelButtonText: 'Cancelar!',
        Buttons: true
      }).then(async(result) => {
        if (result.isConfirmed) {
          try {
            const response = await crearRol(values);
            console.log(response);
      
            if (response.data && response.data.error) {
              // Verificar errores específicos
              if (response.data.error === 'el nombre del rol ya existe') {
                console.log('Mostrar alerta de rol existente');
      
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'El nombre del rol ya existe.',
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
              if (response.data && response.data.rol) {
                // Si no hay errores, redirige a la página de usuario
                navigate("/rol");
                window.location.reload()
                swalWithBootstrapButtons.fire(
                  'Registro Enviado!',
                  'Your file has been deleted.',
                  'success'
                );
              } else {
                navigate("/rol");
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
              'Ocurrió un error al crear el usuario.',
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
   

const crearRolesNuevos=async(values)=>{
  try {
    if( values.nombre_rol=="" || values.fecha==""){
             
      Swal.fire({
          icon: 'error',
          title: 'Campos Vacios',
          text: 'Por favor ingresar datos!',
          
        })
      }else{
             
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success me-3',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        
        Swal.fire({
          title: 'Confirmar el envio del formulario?',
          text: "¡No podrás revertir esto!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Aceptar!',
          cancelButtonText: 'Cancelar!',
          Buttons: true
        }).then(async(result) => {
          if (result.isConfirmed) {
            try {
              const response = await crearRolNuevo(values);
              console.log(response);
        
              if (response.data && response.data.error) {
                // Verificar errores específicos
                if (response.data.error === 'el nombre del rol ya existe') {
                  console.log('Mostrar alerta de rol existente');
        
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El nombre del rol ya existe.',
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
                if (response.data && response.data.rol) {
                  // Si no hay errores, redirige a la página de usuario
                  navigate("/rol");
                  window.location.reload()
                  swalWithBootstrapButtons.fire(
                    'Registro Enviado!',
                    'Your file has been deleted.',
                    'success'
                  );
                } else {
                  navigate("/rol");
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
                'Ocurrió un error al crear el usuario.',
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
  }
  const eliminarRol=async(id_rol)=>{
    try {
      Swal.fire({
        title: 'Eliminar Registro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then(async(result) => {
        if (result.isConfirmed) {
        
          const responde = await eliminar(id_rol)
          // setListar(listar.filter(listar=>listar.id_rol_x_permiso!==id_rol_x_permiso))
          window.location.reload()
       }
      })
    }  catch (error) {
      console.log(error)
    }
  }

  const[listarActualizar, setListarActualizar]=useState({
  
    id_rol:"",
    nombre_rol:"",
    detalles:[]
 })
    
 async function cargarRolActualizar(id_rol) {
  try {
  
    const response = await cargaractualizarRol(id_rol);
    const rolData=response.data

    const detallesArray = rolData.detalles.map(detalle => ({
      usuario: detalle.usuario,
      permiso: detalle.permiso,
      // fk_usuario:detalle.fk_usuario
    }));   
    
    setListarActualizar({
      id_rol:rolData.id_rol,
      nombre_rol:rolData.nombre_rol,
      detalles: detallesArray
    });


  } catch (error) {
    console.log(error);
  }
}

const actualizarValidar= async(id_rol, values)=>{
  try {
    if( values.nombre_rol==""){
             
      Swal.fire({
          icon: 'error',
          title: 'Campos Vacios',
          text: 'Por favor ingresar datos!',
          
        })
      }else{
             
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success me-3',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        
        Swal.fire({
          title: 'Confirmar el envio del formulario?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Aceptar!',
          cancelButtonText: 'Cancelar!',
          Buttons: true
        }).then(async(result) => {
          if (result.isConfirmed) {
  
        
            await actualizarRol(id_rol,values)
            navigate("/rol")
            window.location.reload()
  
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
        <RolContext.Provider value={{listar, listar2, listar4,listarActualizar,cargarRol, showNewRoles,cargarRolxPermiso,desactivarCliente, activarCliente, crearRoles, crearRolesNuevos,searchTerm,setSearchTerm, cargarpermiso,filtrarDesactivados, eliminarRol,cargarRolActualizar,actualizarValidar}}>
            {children}
        </RolContext.Provider>
      )
 }