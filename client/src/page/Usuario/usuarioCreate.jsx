import { Form ,Formik, Field} from 'formik'
import Nav from '../../components/nav'
import {  useEffect } from 'react'
import { useUser } from "../../context/Usuario/UserContext";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';
function UserCreate() {

  const {Listar, creacionValidacion, cargarRol}=useUser()

  useEffect(()=>{
    
    cargarRol()
    
   },[])

   
    return (
      <>

    <Nav/>

    <div className='dashboard-app'>
        <div className='dashboard-content'>
            <div className='container'>
                <div className='card'>
                <div className='card-body'>

                <div className="card-header">
                <h2 className="text-center">Registrar Usuario</h2>  
                </div>
    <div className='w-75 p-3 mx-auto'>
   

   <Formik
   initialValues={
    {
    id_usuario:"",
    fk_rol2:"",
    nombres:"",
    apellidos:"",
    email:"",
    contrasena:""
    }
   }
   validate={async(values)=>{
    const errors={}

    if (!values.nombres || !values.apellidos) {
      errors.nombres = 'Este campo es requerido';
      errors.apellidos = 'Este campo es requerido';

    }else if (!/^[a-zA-Z]+$/.test(values.nombres)) {
      errors.nombres = 'Este campo solo debe contener letras';

    }else if(!/^[a-zA-Z]+$/.test(values.apellidos)){
      errors.apellidos = 'Este campo solo debe contener letras';
    }
    if (!values.id_usuario) {
        errors.id_usuario = 'Este campo es requerido';
      } else if (!/^[0-9]+$/.test(values.id_usuario)) {
        errors.id_usuario = 'Este campo solo debe contener números';
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
    
 
   creacionValidacion(values)

   }}
   
   >
  {({handleChange, handleSubmit, values, errors, isValid})=>(
    
      <Form onSubmit={handleSubmit}  className='row g-3' id='pruebas'>
        
        <div className='col-md-6'>
        <Field
          type='text'
          name='id_usuario'
          onChange={handleChange}
          label='Documento'
          as={TextField}
          value={values.id_usuario}
          className={` ${
            values.id_usuario && /^[0-9]+$/.test(values.id_usuario) ? 'is-valid' : 'is-invalid'
          }`}
          InputProps={{
            endAdornment: (
              <React.Fragment>
                {values.id_usuario && /^[0-9]+$/.test(values.id_usuario) ? (
                  <CheckIcon style={{ color: 'green' }} />
                ) : (
                  <ErrorIcon style={{ color: 'red' }} />
                )}
              </React.Fragment>
            ),
          }}
          sx={{ width: '100%' }}
        />
        {errors.id_usuario && <div className='invalid-feedback'>{errors.id_usuario}</div>}
      </div>
      <div className="col-md-6">
                          <Field
                            type='text'
                            name='nombres'
                            onChange={handleChange}
                            value={values.nombres}
                            label='Nombre'
                            as={TextField}
                            className={`${values.nombres && /^[a-zA-Z]+$/.test(values.nombres) ? 'is-valid' : 'is-invalid'}`}
                            InputProps={{
                              endAdornment: (
                                <React.Fragment>
                                  {values.nombres && /^[a-zA-Z]+$/.test(values.nombres) ? (
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
          value={values.apellidos}
          label='Apellido'
          as={TextField}
          className={` ${values.apellidos && /^[a-zA-Z]+$/.test(values.apellidos) ? 'is-valid' : 'is-invalid'}`}
          InputProps={{
            endAdornment: (
              <React.Fragment>
                {values.apellidos && /^[a-zA-Z]+$/.test(values.apellidos) ? (
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
      label='Contraseña'
      as={TextField}
      className={` ${errors.contrasena ? 'is-invalid' : 'is-valid'}`}
       
      InputProps={{
        endAdornment: (
          <React.Fragment>
            {values.contrasena  ? (
              <CheckIcon style={{ color: 'green' }} />
            ) : (
              <ErrorIcon style={{ color: 'red' }} />
            )}
          </React.Fragment>
        ),
      }}
      sx={{ width: '100%' }}/>
      {errors.contrasena && (
          <div className='invalid-feedback'>{errors.contrasena}</div>
        )}    
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
      <button className="btn btn-primary" type='submit' disabled={!isValid}>
        Registrar
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
  