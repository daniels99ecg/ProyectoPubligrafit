import { Form ,Formik} from 'formik'
import {crearUsuario} from '../api/rutas.api'
import { useParams, useNavigate } from 'react-router-dom'
import '../../src/css/style.css'
import Nav from '../components/nav'
import Header from "../components/header"
import Swal from 'sweetalert2'; // Import SweetAlert2



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

    return (
      <>

<div className="page-flex">
    <Nav/>

    <div className="main-wrapper">
    <Header/>
    <div className='card w-75 p-3 mx-auto mt-5'>
    <h2 className='text-center'>Registrar Usuario</h2>

   <Formik
   initialValues={{
    id_usuario:"",
    nombres:"",
    apellidos:"",
    email:"",
    contrasena:"",
    fk_rol2:""

   }}
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

   }}
   >
  {({handleChange, handleSubmit, values})=>(
    
      <Form onSubmit={handleSubmit}  className='row g-3' id='pruebas'>
        
          <div class="col-md-6">
      <label>Id usuario</label>
      <input  type='text' name='id_usuario' onChange={handleChange} value={values.id_usuario} class="form-control"/>
      </div>
      <div class="col-md-6">
      <label>Nombre</label>
      <input  type='text' name='nombres' onChange={handleChange} value={values.nombres} class="form-control"/>
      </div>
      <div class="col-md-6">
      <label>Apellido</label>
      <input  type='text' name='apellidos' onChange={handleChange} value={values.apellidos} class="form-control"/>
</div>
<div class="col-md-6">
      <label>Correo</label>
      <input  type='text' name='email' onChange={handleChange} value={values.email} class="form-control"/>
</div>
<div class="col-md-6">
      <label>Contraseña</label>
      <input  type='text' name='contrasena' onChange={handleChange} value={values.contrasena} class="form-control"/>
</div>
<div class="col-md-6">
      <label>Rol</label>

<select name="fk_rol2" onChange={handleChange} value={values.fk_rol2} class="form-control">
<option value="Seleccionar">Seleccionar</option>
  <option value="1"  onChange={handleChange}>Administrador</option>
  <option value="2"  onChange={handleChange}>Empleado</option>
</select>

</div>
<br />

<div class="col-auto">
      <button class="btn btn-primary">
          Guardar
      </button>
</div>
<div class="col-auto">
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
  