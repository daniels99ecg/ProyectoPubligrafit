import { Form ,Formik} from 'formik'
import {actualizarUsuario, crearUsuario, getListarRoles} from '../api/rutas.api'
import { useParams, useNavigate } from 'react-router-dom'
import '../../src/css/style.css'
import Nav from '../components/nav'
import Header from "../components/header"
import Swal from 'sweetalert2'; // Import SweetAlert2
import { useState, useEffect } from 'react'



function UserCreate() {
  const params=useParams()
  const navigate = useNavigate();
  

  const showValidationError = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: message,
    });
  };

  const [Listar, setListar]=useState([])
 const[ListarActualizar, setListarActualizar]=useState({
  id_usuario:"",
    nombres:"",
    apellidos:"",
    email:"",
    contrasena:"",
    fk_rol2:"",
 })
  
  useEffect(()=>{
    
    async function cargarRol(){
     const response =  await getListarRoles()
     setListar(response.data)
     }
     cargarRol()

   
     async function cargarUsuariosActualizar() {
      try {
      
        const response = await actualizarUsuario(params.id_usuario);
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

    cargarUsuariosActualizar();
    
   },[params.id_usuario])
    return (
      <>

<div className="page-flex">
    <Nav/>

    <div className="main-wrapper">
    <Header/>
    <div className='card w-75 p-3 mx-auto mt-5'>
    <h2 className="text-center">
               Registrar Usuario
            </h2>

   <Formik
   initialValues={ListarActualizar}
   enableReinitialize={true}
   onSubmit={async (values)=>{
    console.log(values)
 
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
          customclass: {
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

   }}
   >
  {({handleChange, handleSubmit, values})=>(
    
      <Form onSubmit={handleSubmit}  className='row g-3' id='pruebas'>
        
          <div className="col-md-6">
      <label>Id usuario</label>
      <input  type='text' name='id_usuario' onChange={handleChange} value={values.id_usuario} className="form-control"/>
      </div>
      <div className="col-md-6">
      <label>Nombre</label>
      <input  type='text' name='nombres' onChange={handleChange} value={values.nombres} className="form-control"/>
      </div>
      <div className="col-md-6">
      <label>Apellido</label>
      <input  type='text' name='apellidos' onChange={handleChange} value={values.apellidos} className="form-control"/>
</div>
<div className="col-md-6">
      <label>Correo</label>
      <input  type='text' name='email' onChange={handleChange} value={values.email} className="form-control"/>
</div>
<div className="col-md-6">
      <label>Contraseña</label>
      <input  type='text' name='contrasena' onChange={handleChange} value={values.contrasena} className="form-control"/>
</div>
<div className="col-md-6">
      <label>Rol</label>

<select name="fk_rol2" onChange={handleChange} value={values.fk_rol2} className="form-control">
<option value="Seleccionar">Seleccionar</option>
  {
    Listar.map(Listar=>(
      <option key={Listar.id_rol} value={Listar.id_rol}>
      {Listar.nombre_rol}
    </option>
    ))
  }
</select>

</div>
<br />

<div className="col-auto">
      <button className="btn btn-primary">
         Guardar
      </button>
</div>
<div className="col-auto">
      <a href='/usuario' className='btn btn-danger'>Cancelar</a>
      </div>

      </Form>
  )}
    </Formik> 

    </div>
    </div>
    </div>
      </>
    )
  }
  
  export default UserCreate
  