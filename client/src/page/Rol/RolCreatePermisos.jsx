import { Form, Formik,Field } from 'formik';
import { useEffect } from 'react';
import { useRol } from '../../context/Rol/RolContext';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';
import { useUser } from "../../context/Usuario/UserContext";

function RolCreatePermisos() {
  const { listar, crearRoles, cargarpermiso } = useRol();
  const {Listar, listar3, cargarUsuariolista, cargarRol}=useUser()

  useEffect(() => {
    cargarpermiso();

    cargarRol()
    cargarUsuariolista()
  }, []);
 

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
                      fk_rol: '',
                      permisos: [],
                      fk_usuario: '', 
                    }}
                    validate={async(values)=>{
                      const errors={}
                  
                      if (!values.fk_rol ) {
                        errors.fk_rol = 'Este campo es requerido';
                  
                      }
                       
                      return errors;
                  
                     }}
                    enableReinitialize={true}
                    onSubmit={async (values) => {
                      // Aquí puedes usar values directamente, ya que permisos ahora es un array de objetos
                      const response = await crearRoles(values);
                      // Maneja la respuesta de la base de datos según tus necesidades
                    }}
                  >
                    {({ handleChange, handleSubmit, setFieldValue, values, errors, isValid }) => (
                      <Form onSubmit={handleSubmit} className='row g-3' id='pruebas'>


                      <div className="col-md-6">
<Autocomplete 
  disablePortal
  id="fixed-tags-demo"
  options={Listar.filter((rol) => rol.estado)}  // Filtrar roles con estado true
  getOptionLabel={(option) => option.nombre_rol}
  onChange={(event, newValue) => {
    handleChange({ target: { name: 'fk_rol', value: newValue ? newValue.id_rol : '' } });
  }}
  value={Listar.find((rol) => rol.id_rol === values.fk_rol) || null}
  sx={{ width: '100%' }}
  renderInput={(params) => <TextField {...params} label="Rol" sx={{ width: '100%' }}/>}
/>
</div> 



                    
                        
   <div className="col-md-6">
<Autocomplete 
  disablePortal
  id="fixed-tags-demo"
  options={listar3.filter((usuario) => usuario.estado)}  // Filtrar roles con estado true
  getOptionLabel={(option) => option.nombres}
  onChange={(event, newValue) => {
    handleChange({ target: { name: 'fk_usuario', value: newValue ? newValue.id_usuario : '' } });
  }}
  value={listar3.find((usuario) => usuario.id_usuario === values.fk_usuario) || null}
  sx={{ width: '100%' }}
  renderInput={(params) => <TextField {...params} label="Usuario" sx={{ width: '100%' }}/>}
/>
</div> 

                        <div className='col-md-12'>
                        <Autocomplete
  multiple
  id='permisos'
  name="permisos"
  options={listar || []}
  getOptionLabel={(option) => option.nombre_permiso}
  value={values.permisos}
  onChange={(_, newValue) => {
    setFieldValue('permisos', newValue);
  }}
  isOptionEqualToValue={(option, value) => option.id_permiso === value.id_permiso}
  renderInput={(params) => (
    <TextField {...params} label='Permisos' variant='outlined' />
  )}
/>

                        </div>

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

export default RolCreatePermisos;
