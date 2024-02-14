import { Form, Formik,Field } from 'formik';
import Nav from '../../components/nav';
import { useEffect } from 'react';
import { useRol } from '../../context/Rol/RolContext';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';
import { useParams, useNavigate} from 'react-router-dom'

function RolCreate({RolId}) {
    const params=useParams()

  const { listarActualizar,cargarRolActualizar,actualizarValidar } = useRol();

  useEffect(() => {
    cargarRolActualizar(RolId)
    console.log(listarActualizar)
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

                      if(RolId){
                        actualizarValidar(RolId, values)
                      }
                    }}
                  >
                    {({ handleChange, handleSubmit, setFieldValue, values, errors, isValid }) => (
                      <Form onSubmit={handleSubmit} className='row g-3' id='pruebas'>
                 <input  type='hidden' name='rol' onChange={handleChange} value={values.id_rol_x_permiso}  className="form-control" disabled/>

                        <div className='col-md-6'>
                          <Field
                            type='text'
                            name='nombre_rol'
                            label='Nombre Rol'
                            value={values.rol.nombre_rol}
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
                        <div className='col-md-6'>
                          <Field
                            type='text'
                            name='fecha'
                            as={TextField}
                            className='form-control'
                            placeholder='Fecha'
                            onChange={handleChange}
                            value={values.permiso.nombre_permiso}
                           
                            fullWidth
                          />
                        </div>

                        <div className='col-auto'>
                          <button className='btn btn-primary' type='submit' disabled={!isValid}>
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
