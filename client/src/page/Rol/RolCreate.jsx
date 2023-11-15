import { Form, Formik } from 'formik';
import Nav from '../../components/nav';
import { useEffect } from 'react';
import { useRol } from '../../context/Rol/RolContext';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function RolCreate() {
  const { listar, crearRoles, cargarpermiso } = useRol();

  useEffect(() => {
    cargarpermiso();
  }, []);

  return (
    <>
      <Nav />
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
                      fecha: '',
                      permisos: [],
                    }}
                    enableReinitialize={true}
                    onSubmit={async (values) => {
                      // Aquí puedes usar values directamente, ya que permisos ahora es un array de objetos
                      const response = await crearRoles(values);
                      // Maneja la respuesta de la base de datos según tus necesidades
                    }}
                  >
                    {({ handleChange, handleSubmit, setFieldValue, values }) => (
                      <Form onSubmit={handleSubmit} className='row g-3' id='pruebas'>
                        <div className='col-md-6'>
                          <input
                            type='text'
                            name='nombre_rol'
                            className='form-control'
                            placeholder='Nombre Rol'
                            onChange={handleChange}
                          />
                        </div>
                        <div className='col-md-6'>
                          <input
                            type='date'
                            name='fecha'
                            className='form-control'
                            placeholder='Fecha'
                            onChange={handleChange}
                          />
                        </div>

                        <div className='col-md-12'>
                          <Autocomplete
                            multiple
                            id='permisos'
                            options={listar || []}
                            getOptionLabel={(option) => option.nombre_permiso}
                            getOptionSelected={(option, value) =>
                              option.id_permiso === value.id_permiso
                            }
                            value={values.permisos}
                            onChange={(_, newValue) => {
                              setFieldValue('permisos', newValue);
                            }}
                            renderInput={(params) => (
                              <TextField {...params} label='Permisos' variant='outlined' />
                            )}
                          />
                        </div>

                        <div className='col-auto'>
                          <button className='btn btn-primary' type='submit'>
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
