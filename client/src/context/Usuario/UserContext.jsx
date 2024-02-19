import { createContext, useContext, useState } from "react";
import {getListarUsuarios, enviarUsuario, getListarRoles, putActivarCliente, putDesactivarCliente, eliminar, cargaractualizarUsuario,actualizarUsuario} from '../../api/Usuario/rutas.api'
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
    const [listar3, setListar3]=useState([])

    const [Listar, setListar2]=useState([])
    const [searchTerm, setSearchTerm] = useState("");

async function cargarUsuario(){
        const response =  await getListarUsuarios()
        
        const filterList = response.data.filter((item) => 
          item.tipo_documento.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.documento.toString().includes(searchTerm) ||
          item.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.email.toString().includes(searchTerm)||
          item.nombre_rol.toLowerCase().includes(searchTerm.toLowerCase())

        );
    
        setListar(filterList);
      
        }

async function cargarUsuariolista(){
          const response =  await getListarUsuarios()
      
          setListar3(response.data);
        
          }     
  
async function creacionValidacion(values) {
          try {
           if (!values.email.includes("@") || !values.email.includes(".com")) {
              Swal.fire({
                icon: 'error',
                title: 'Correo no valido',
                text: 'Por favor ingresar un correo valido!',
              });
            } else {
              const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success me-3',
                  cancelButton: 'btn btn-danger'

                  
                },
                buttonsStyling: false
              });
        
              Swal.fire({
                title: 'Confirmar el envio del formulario?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Aceptar!',
                cancelButtonText: 'Cancelar!',
                buttons: true
              }).then(async (result) => {
                if (result.isConfirmed) {
                  try {
                    const response = await enviarUsuario(values);
                  

                    console.log(response);

                    if (response.data && response.data.error) {
                      // Verificar errores específicos
                      if (response.data.error === 'el id de usuario ya existe') {
                        console.log('Mostrar alerta de usuario existente');
                        Swal.fire({
                          icon: 'error',
                          title: 'Error',
                          text: 'El Documento de usuario ya existe. Por favor.',
                        });
                      } else if (response.data.error === 'El correo electrónico ya está registrado') {
                        // Mostrar alerta específica para correo existente
                        swalWithBootstrapButtons.fire({
                          icon: 'error',
                          title: 'Error',
                          text: 'El correo electrónico ya está registrado. Por favor, elige otro correo electrónico.',
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
                                    
                        swalWithBootstrapButtons.fire(
                          'Registro Enviado!',
                          'Your file has been deleted.',
                          'success'
                        );
                      } else {
              
                        swalWithBootstrapButtons.fire(
                          'Registro Enviado!',
                          'Your file has been deleted.',
                          'success'
                        );
                              window.location.reload()
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

      const eliminarUsuario = async (id_usuario) => {
        try {
         
          // Mostrar la confirmación solo si el usuario no es administrador
          Swal.fire({
            title: 'Eliminar Registro?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
          }).then(async (result) => {
            if (result.isConfirmed) {
              // Realizar la eliminación solo si se confirma
              const response = await eliminar(id_usuario);
              setListar(listar.filter((listar) => listar.id_usuario !== id_usuario));
            }
          });
        } catch (error) {
          console.log(error);
        }
      };
      
      
  
      


// Funcciones para actualizar      

const[ListarActualizar, setListarActualizar]=useState({
    id_usuario:"",
    tipo_documento:"",
    documento:"",
    nombres:"",
    apellidos:"",
    email:"",
    contrasena:"",
   
 })
    
 async function cargarUsuariosActualizar(id_usuario) {
  try {
  
    const response = await cargaractualizarUsuario(id_usuario);
    const usuarioData=response.data
    setListarActualizar({
      id_usuario: usuarioData.id_usuario,
      tipo_documento:usuarioData.tipo_documento,
      documento:usuarioData.documento,
      nombres: usuarioData.nombres,
      apellidos: usuarioData.apellidos,
      email: usuarioData.email,
      contrasena: usuarioData.contrasena,
      
    });
  } catch (error) {
    console.log(error);
  }
}

const actualizarValidar= async(id_usuario, values)=>{
  try {
        
    if(!values.email.includes("@") || !values.email.includes(".com")){
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
    try{
              const response=await actualizarUsuario(id_usuario, values)
              console.log(response)
            
              if (response.data && response.data.error) {
                // Verificar errores específicos
                if (response.data.error === 'el id de usuario ya existe') {
                  console.log('Mostrar alerta de usuario existente');
        
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El Documento de usuario ya existe. Por favor.',
                  });
                } else if (response.data.error === 'El correo electrónico ya está registrado') {
                  // Mostrar alerta específica para correo existente
                  swalWithBootstrapButtons.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El correo electrónico ya está registrado. Por favor, elige otro correo electrónico.',
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
                  navigate("/usuario");
                  window.location.reload()
                  swalWithBootstrapButtons.fire(
                    'Registro Enviado!',
                    'Your file has been deleted.',
                    'success'
                  );
                } else {
                  navigate("/usuario");
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

    return( 
      <UserContext.Provider value={{listar, Listar,cargarUsuario,cargarUsuariolista,listar3,searchTerm,setSearchTerm, creacionValidacion,  cargarRol, desactivarCliente, activarCliente, eliminarUsuario, filtrarDesactivados, ListarActualizar,setListarActualizar,actualizarValidar,cargarUsuariosActualizar}}>
          {children}
      </UserContext.Provider>
    )
}