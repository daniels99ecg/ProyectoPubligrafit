  import { Form ,Formik, Field} from 'formik'
  import { useParams, useNavigate} from 'react-router-dom'
  import Nav from '../../components/nav'
  import { useEffect } from 'react'
  import { useUser } from "../../context/Usuario/UserContext";
  import TextField from '@mui/material/TextField';
  import Autocomplete from '@mui/material/Autocomplete';
  import CheckIcon from '@mui/icons-material/Check';
  import ErrorIcon from '@mui/icons-material/Error';
  import React from 'react';


  function UserUpdate({usuarioId }) {
    const navigate = useNavigate();

    const params=useParams()
    const {Listar, cargarRol,ListarActualizar, cargarUsuariosActualizar,actualizarValidar}=useUser()

    useEffect(()=>{
      
      cargarRol()
 
      cargarUsuariosActualizar(usuarioId);
  
    },[usuarioId])

      return (
        <>



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
    validate={async(values)=>{
      const errors={}
  
      if (!values.nombres || !values.apellidos) {
        errors.nombres = 'Este campo es requerido';
        errors.apellidos = 'Este campo es requerido';
  
      }else if (! /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(values.nombres)) {
        errors.nombres = 'Este campo solo debe contener letras';
  
      }else if(! /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(values.apellidos)){
        errors.apellidos = 'Este campo solo debe contener letras';
      }
      if (!values.documento) {
          errors.documento = 'Este campo es requerido';
        } else if (!/^[0-9]+$/.test(values.documento)) {
          errors.documento = 'Este campo solo debe contener números';
        }else if (values.documento.length < 6 || values.documento.length > 12) {
          errors.documento = "La longitud debe estar entre 6 y 12 caracteres";
        }
      if (!values.email) {
        errors.email = 'Este campo es requerido';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Correo electrónico no válido';
      }
      if (!values.contrasena) {
        errors.contrasena = 'Este campo es requerido';
      } else if (values.contrasena.length < 8) {
        errors.contrasena = 'La contraseña debe tener al menos 8 caracteres';
      }
       
      return errors;
  
     }}



    enableReinitialize={true}
    onSubmit={async (values)=>{
      console.log(values)
      if(usuarioId){
        actualizarValidar(usuarioId, values)
      }

    }}
    
    >
    {({handleChange, handleSubmit, values, errors, isValid})=>(
      
        <Form onSubmit={handleSubmit}  className='row g-3' id='pruebas'>
          
         
        <input  type='hidden' name='id_usuario' onChange={handleChange} value={values.id_usuario} className="form-control" disabled/>
        <div className="col-md-6">
  <Autocomplete
    disablePortal
    id="tipo-documento-autocomplete"
    options={[
      { id: 'Cc', label: 'Cédula de Ciudadanía' },
      { id: 'Ti', label: 'Tarjeta de Identidad' },
      { id: 'Ce', label: 'Cédula de Extranjería' },
      // Agrega más opciones según tus necesidades
    ]}
    getOptionLabel={(option) => option ? option.label || option : ''}
    onChange={(event, newValue) => {
      handleChange({ target: { name: 'tipo_documento', value: newValue ? newValue.id : '' } });
    }}
    value={values.tipo_documento} // Puedes establecer un valor predeterminado si lo necesitas
    sx={{ width: '100%' }}
    renderInput={(params) => <TextField {...params} label="Tipo de Documento" sx={{ width: '100%' }} />}
  />
</div>
        <div className='col-md-6'>
        <Field
          type='text'
          name='documento'
          onChange={handleChange}
          label='Documento'
          as={TextField}
          value={values.documento}
          sx={{ width: '100%' }}
          className={` ${
            values.documento &&
            /^[0-9]+$/.test(values.documento) &&
            values.documento.length >= 6 &&
            values.documento.length <= 12
              ? 'is-valid'
              : 'is-invalid'
          }`}
          InputProps={{
            endAdornment: (
              <React.Fragment>
                {values.documento && /^[0-9]+$/.test(values.documento) ? (
                  <CheckIcon style={{ color: 'green' }} />
                ) : (
                  <ErrorIcon style={{ color: 'red' }} />
                )}
              </React.Fragment>
            ),
          }}
        
        />
        {errors.documento && <div className='invalid-feedback'>{errors.documento}</div>}
      </div>



        <div className="col-md-6">
        <Field  
        type='text' 
        name='nombres' 
        onChange={handleChange}
        label='Nombre'
          as={TextField}
         value={values.nombres}
         className={`${values.nombres &&  /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(values.nombres) ? 'is-valid' : 'is-invalid'}`}
         InputProps={{
           endAdornment: (
             <React.Fragment>
               {values.nombres &&  /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(values.nombres) ? (
                 <CheckIcon style={{ color: 'green' }} />
               ) : (
                 <ErrorIcon style={{ color: 'red' }} />
               )}
             </React.Fragment>
           ),
         }}
         sx={{ width: '100%' }}
       />
       {errors.nombres && (
         <div className='invalid-feedback'>{errors.nombres}</div>
       )}
     </div>
        <div className="col-md-6">
        <Field  
        type='text' 
        name='apellidos' 
        onChange={handleChange} 
        label='Apellido'
          as={TextField}
        value={values.apellidos} 
        className={` ${values.apellidos && /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(values.apellidos) ? 'is-valid' : 'is-invalid'}`}
          InputProps={{
            endAdornment: (
              <React.Fragment>
                {values.apellidos && /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(values.apellidos) ? (
                  <CheckIcon style={{ color: 'green' }} />
                ) : (
                  <ErrorIcon style={{ color: 'red' }} />
                )}
              </React.Fragment>
            ),
          }}
          sx={{ width: '100%' }}
          />
                          {errors.apellidos && (
                            <div className='invalid-feedback'>{errors.apellidos}</div>
                          )}
</div>
  <div className="col-md-6">
        <Field  
        type='text' 
        name='email' 
        onChange={handleChange} 
        value={values.email} 
        label='Correo'
        as={TextField}
        className={` ${values.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ? 'is-valid' : 'is-invalid'}`}
        
        InputProps={{
          endAdornment: (
            <React.Fragment>
              {values.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ? (
                <CheckIcon style={{ color: 'green' }} />
              ) : (
                <ErrorIcon style={{ color: 'red' }} />
              )}
            </React.Fragment>
          ),
        }}
        sx={{ width: '100%' }}/>
        {errors.email && (
          <div className='invalid-feedback'>{errors.email}</div>
        )}
      </div>
  <div className="col-md-6">
        <Field  
        type='password' 
        name='contrasena' 
        onChange={handleChange} 
        value={values.contrasena} 
        className="form-control" 
        label='Contraseña'
          as={TextField}
        disabled={params.id_usuario ? true : false}/>
  </div>
  {/* <div className="col-md-12">
        

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


  </div> */}
  <br />

  <div className="col-auto">
        <button className="btn btn-primary" type='submit' disabled={!isValid}>
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
    
    export default UserUpdate
    