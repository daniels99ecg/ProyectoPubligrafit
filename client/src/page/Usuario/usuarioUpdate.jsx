  import { Form ,Formik, Field} from 'formik'
  import { useParams, useNavigate} from 'react-router-dom'
  import Nav from '../../components/nav'
  import { useEffect } from 'react'
  import { useUser } from "../../context/Usuario/UserContext";
  import TextField from '@mui/material/TextField';
  import CheckIcon from '@mui/icons-material/Check';
  import ErrorIcon from '@mui/icons-material/Error';
  import Autocomplete from '@mui/material/Autocomplete';


  function UserCreate() {
    const navigate = useNavigate();

    const params=useParams()
    const {Listar, cargarRol,ListarActualizar, cargarUsuariosActualizar,actualizarValidar}=useUser()

    useEffect(()=>{
      
      cargarRol()
 
      cargarUsuariosActualizar(params.id_usuario);
  
    },[params.id_usuario])

      return (
        <>

  <Nav/>

  <div className='dashboard-app'>
      <div className='dashboard-content'>
          <div className='container'>
              <div className='card'>
              <div className='card-body'>
              <div className="card-header">
                <h2 className="text-center">Actualizar Usuario</h2>  
                </div>
              <div className='w-75 p-3 mx-auto'>

   

    <Formik
    initialValues={ListarActualizar}
    enableReinitialize={true}
    onSubmit={async (values)=>{
      console.log(values)
      if(params.id_usuario){
        actualizarValidar(params.id_usuario, values)
      }

    }}
    
    >
    {({handleChange, handleSubmit, values})=>(
      
        <Form onSubmit={handleSubmit}  className='row g-3' id='pruebas'>
          
            <div className="col-md-6">
        <Field
          type='text'
           name='id_usuario' 
           onChange={handleChange} 
           label='Documento'
            as={TextField}
           value={values.id_usuario} 
           className="form-control" 
           disabled={params.id_usuario ? true : false}/>
        </div>
        <div className="col-md-6">
        <Field  
        type='text'
        name='nombres'
        label='Nombre'
        as={TextField}
        onChange={handleChange}
        value={values.nombres} className="form-control"/>
        </div>
        <div className="col-md-6">
        <Field  
        type='text' 
        name='apellidos' 
        onChange={handleChange} 
        label='Apellido'
        as={TextField}
        value={values.apellidos} className="form-control"/>
  </div>
  <div className="col-md-6">
        <Field  
        type='text' 
        name='email' 
        onChange={handleChange} 
        label='Correo'
        as={TextField}
        value={values.email} className="form-control"/>
  </div>
  <div className="col-md-6">
        <Field  
        type='text' 
        name='contrasena' 
        onChange={handleChange} 
        label='Contraseña'
        as={TextField}
        value={values.contrasena} 
        className="form-control" 
        disabled={params.id_usuario ? true : false}/>
  </div>
  <div className="col-md-6">
      <Autocomplete 

          disablePortal
          id="fixed-tags-demo"
          options={Listar}
          getOptionLabel={(option) => option.nombre_rol}
          onChange={(event, newValue) => {
            // Aquí puedes manejar el cambio de valor seleccionado en Autocomplete
            // Puedes actualizar el estado o realizar otras acciones necesarias
            handleChange({ target: { name: 'fk_rol2', value: newValue ? newValue.id_rol : '' } });
          }}
          value={Listar.find((rol) => rol.id_rol === values.fk_rol2) || null}
          sx={{ width: '100%' }}
          renderInput={(params) => <TextField {...params} label="Rol" sx={{ width: '100%' }}/>}
        />






  </div>
  <br />

  <div className="col-auto">
        <button className="btn btn-primary" type='submit'>
          {params.id_usuario ? "Actualizar":"Registrar"}
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
          </div>
      </div>
      </div>
        </>
      )
    }
    
    export default UserCreate
    