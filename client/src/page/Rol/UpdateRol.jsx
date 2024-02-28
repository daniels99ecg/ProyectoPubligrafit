import { Form, Formik,Field } from 'formik';
import Nav from '../../components/nav';
import { useEffect, useState } from 'react';
import { useRol } from '../../context/Rol/RolContext';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';
import { useParams, useNavigate} from 'react-router-dom'

function RolCreate({RolId}) {
    const params=useParams()

  const { listar,listarActualizar,cargarRolActualizar,cargarpermiso,actualizarValidar } = useRol();
  

  useEffect(() => {
    cargarRolActualizar(RolId)
    cargarpermiso()
  }, [RolId]);
  
  const obtenerFechaActual = () => {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    let mes = hoy.getMonth() + 1;
    let dia = hoy.getDate();

    // Agrega un cero inicial para meses y días de un solo dígito
    mes = mes < 10 ? `0${mes}` : mes;
    dia = dia < 10 ? `0${dia}` : dia;

    return `${anio}-${mes}-${dia}`;
  };

  function getUniqueUserNames(detalles) {
    const userNamesSet = new Set();
  
    detalles.forEach((detalle) => {
      if (detalle.usuario && detalle.usuario.id_usuario) { // Verifica si detalle.usuario y detalle.usuario.nombres están definidos
        userNamesSet.add(detalle.usuario.id_usuario);
      }
    });
  
    // Convertir el conjunto a un array y tomar el primer nombre
    return [...userNamesSet][0] || ''; // Si no hay nombres, devuelve una cadena vacía
  }

  return (
    <>
     
      <div className='dashboard-app'>
        <div className='dashboard-content'>
          <div className='container'>
            <div className='card'>
              <div className='card-body'>
                <div className='card-header'>
                  <h2 className='text-center'>Actualizar Rol</h2>
                </div>
                <div className='w-75 p-3 mx-auto'>
                  <Formik
                    initialValues={listarActualizar}
                    
                    validate={async(values)=>{
                      const errors={}
                  
                      if (!values.nombre_rol ) {
                        errors.nombre_rol = 'Este campo es requerido';
                  
                      }else if (!/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(values.nombre_rol)) {
                        errors.nombre_rol = 'Este campo solo debe contener letras';
                  
                      }
                       
                      return errors;
                  
                     }}
                    enableReinitialize={true}
                    onSubmit={async (values) => {
                      console.log(values)
                     
                      const selectedPermissions = values.detalles.map(detalle => detalle.permiso);

                      // Incluir fk_usuario en el objeto values
                    const updatedValues = {
                      ...values,
                      nombre_rol:values.nombre_rol,
                      permiso: selectedPermissions.map(permiso => permiso.id_permiso),
                      fk_usuario:getUniqueUserNames(values.detalles)
                       };
                       console.log(updatedValues)
                    // Llamar a la función actualizarValidar con los valores actualizados
                    actualizarValidar(RolId, updatedValues);
                                        
                      
                    }}
                  >
                    {({ handleChange, handleSubmit, setFieldValue, values, errors, isValid }) => (
                      <Form onSubmit={handleSubmit} className='row g-3' id='pruebas'>
                 <input  type='hidden' name='rol' onChange={handleChange} value={values.id_rol}  className="form-control" disabled/>

                        <div className='col-md-6'>
                          <Field
                            type='text'
                            name='nombre_rol'
                            label='Nombre Rol'
                            value={values.nombre_rol}
                            as={TextField}
                            onChange={handleChange}
                            className={` ${
                              values.nombre_rol && /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(values.nombre_rol) ? 'is-valid' : 'is-invalid'
                            }`}
                            InputProps={{
                              endAdornment: (
                                <React.Fragment>
                                  {values.nombre_rol && /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(values.nombre_rol) ? (
                                    <CheckIcon style={{ color: 'green' }} />
                                  ) : (
                                    <ErrorIcon style={{ color: 'red' }} />
                                  )}
                                </React.Fragment>
                              ),
                            }}
                            sx={{ width: '100%' }}
                          />
                          {errors.nombre_rol && <div className='invalid-feedback'>{errors.nombre_rol}</div>}
                        </div>
                        {/* <div className='col-md-6'>
                        <Field
                            type='text'
                            name='fk_usuario'
                            label='Usuario'
                            as={TextField}
                            className='form-control'
                            onChange={handleChange}
                            value={getUniqueUserNames(values.detalles)} // Obtener nombres de usuario únicos
                            fullWidth
                          />

                        </div> */}
                    
                          <div className='col-md-12'>
                
<Autocomplete
  multiple
  id='permisos'
  name='permiso'
  options={listar || []}
  getOptionLabel={(option) => option ? option.nombre_permiso : ''}
  onChange={(event, newValue) => {
    // Creamos una nueva lista de detalles combinando los usuarios existentes con los nuevos permisos seleccionados
    const updatedDetalles = newValue.map(permiso => ({
      permiso,
      usuario: values.detalles.find(detalle => detalle.permiso.nombre_permiso === permiso.nombre_permiso)?.usuario || null
  
    }));
    setFieldValue('detalles', updatedDetalles);
  }}
  value={values.detalles.map(detalle => detalle.permiso)}
  renderInput={(params) => (
    <TextField {...params} label='Permisos' variant='outlined' />
  )}
/>



                        </div>  

                        <div className='col-auto'>
                          <button className='btn btn-primary' type='submit'>
                            Actualizar
                          </button>
                        </div>
                        <div className='col-auto'>
                          <a href='/rol' className='btn btn-danger'>
                            Cancelar
                          </a>
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
  );
}

export default RolCreate;
