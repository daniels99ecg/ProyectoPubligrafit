import { Form, Formik,Field } from 'formik';
import Nav from '../../components/nav';
import { useEffect } from 'react';
import { useRol } from '../../context/Rol/RolContext';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';
function RolCreate() {
  const { listar, crearRolesNuevos,listar4, crearRoles, cargarpermiso, showNewRoles } = useRol();
  // useEffect(() => {
    

  //   showNewRoles()
   
  // }, []);


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
                  <h2 className='text-center'>Registrar Rol</h2>
                </div>
                <div className='w-75 p-3 mx-auto'>
                  <Formik
                    initialValues={{
                      nombre_rol: '',
                      fecha: obtenerFechaActual(), 
                      permisos: [],
                    }}
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
                      // Aquí puedes usar values directamente, ya que permisos ahora es un array de objetos
                      const response = await crearRolesNuevos(values);
                      // Maneja la respuesta de la base de datos según tus necesidades
                    }}
                  >
                    {({ handleChange, handleSubmit, setFieldValue, values, errors, isValid }) => (
                      <Form onSubmit={handleSubmit} className='row g-3' id='pruebas'>
                        <div className='col-md-6'>
                          <Field
                            type='text'
                            name='nombre_rol'
                            label='Nombre Rol'
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
                            type='date'
                            name='fecha'
                            as={TextField}
                            className='form-control'
                            placeholder='Fecha'
                            onChange={handleChange}
                            value={values.fecha}
                            variant='outlined'
                            disabled  
                            fullWidth
                          />
                        </div>

                        {/* <div className="col-md-6">
<Autocomplete 
  disablePortal
  id="fixed-tags-demo"
  options={listar4.filter((rol) => rol.estado)}  // Filtrar roles con estado true
  getOptionLabel={(option) => option.nombre_rol}
  onChange={(event, newValue) => {
    handleChange({ target: { name: 'fk_rol', value: newValue ? newValue.id_rol : '' } });
  }}
  value={listar4.find((rol) => rol.id_rol === values.fk_rol) || null}
  sx={{ width: '100%' }}
  renderInput={(params) => <TextField {...params} label="Rol" sx={{ width: '100%' }}/>}
/>
</div>  */}


                        <div className='col-auto'>
                          <button className='btn btn-primary' type='submit' disabled={!isValid}>
                            Registrar
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
