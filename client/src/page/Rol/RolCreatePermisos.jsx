import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useRol } from '../../context/Rol/RolContext';
import { useUser } from "../../context/Usuario/UserContext";

function RolCreatePermisos() {
  const { listar, crearRoles, cargarpermiso } = useRol();
  const { Listar, listar3, cargarUsuariolista, cargarRol } = useUser();
  const [newRol, setNewRol] = useState(null); 
  const [selectedRol, setSelectedRol] = useState(null);

  useEffect(() => {
    cargarRol();
    cargarpermiso();
    cargarUsuariolista();
  }, []);

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
                    nombre_rol: "",
                    fecha:obtenerFechaActual(),
                    permisos: [], // Inicialmente vacío
                    fk_usuario: '', 
                  }}
                  onSubmit={async (values) => {
                    // Extraer los IDs de los permisos seleccionados
                    const permisosIds = values.permisos.map(permiso => permiso.id_permiso);
                    // Si se seleccionó un nuevo rol manualmente, enviarlo en lugar del rol seleccionado
                    const rolToSend = selectedRol ? selectedRol : values.nombre_rol;
                
                    // Enviar el formulario con el nuevo rol y los permisos como un array de IDs
                    await crearRoles({ ...values, nombre_rol: rolToSend, permisos: permisosIds });
                  }}
                >
                  {({ handleChange, handleSubmit, setFieldValue, values }) => (
                    <Form onSubmit={handleSubmit} className='row g-3' id='pruebas'>
                      <div className="col-md-6">
                      <Autocomplete 
          disablePortal
          id="rol"
          options={[...Listar.filter((rol) => rol.estado), { nombre_rol: newRol, inputValue: newRol }]}
          getOptionLabel={(option) => option.nombre_rol}
          onChange={(event, newValue) => {
            if (newValue && newValue.id_rol) {
              // Actualiza el estado con el nombre del rol seleccionado
              setSelectedRol(newValue.nombre_rol);
              handleChange({ target: { name: 'nombre_rol', value: newValue.nombre_rol } });
            } else if (newValue && newValue.inputValue) {
              // Actualiza el estado con el valor ingresado manualmente
              setNewRol(newValue.inputValue);
              setSelectedRol(newValue.inputValue);
              handleChange({ target: { name: 'nombre_rol', value: newValue.inputValue } });
            }
          }}
          value={selectedRol}
          selectOnFocus
          clearOnBlur={false}
          handleHomeEndKeys
          freeSolo
          renderInput={(params) => (
            <TextField {...params} label="Rol" sx={{ width: '100%' }}/>
          )}
        />
                      </div> 
                      <div className="col-md-6">
                        <Autocomplete 
                          disablePortal
                          id="fixed-tags-demo"
                          options={listar3.filter((usuario) => usuario.estado)}
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
  );
}

export default RolCreatePermisos;
