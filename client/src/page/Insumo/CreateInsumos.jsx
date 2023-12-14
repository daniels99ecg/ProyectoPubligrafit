
import { Formik, Field, Form } from 'formik';
import Nav from '../../components/nav';
import { useInsumo } from '../../context/Insumos/InsumoContext';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';


function CreateInsumo() {
  const {validacionInsumo}=useInsumo()


  return (
    <>
      <Nav />
      <div className='dashboard-app'>
        <div className='dashboard-content'>
          <div className='container'>
            <div className='card'>
              <div className='card-body'>
              <div className="card-header">
                        <h1>Registrar Insumo</h1>
                      </div>
                <br />
                <div className='card w-75 p-3 mx-auto mt-5'>
                  <Formik
                    initialValues={{
                      id_insumo: '',
                      nombre: '',
                     
                    }}
                    validate={async(values)=>{
                      const errors={}

                      if (!values.nombre) {
                        errors.nombre = 'Este campo es requerido';
                      } else if (!/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(values.nombre)) {
                        errors.nombre = 'Este campo solo debe contener letras';
                      } else if (values.nombre.length < 5 || values.nombre.length > 40) {
                        errors.nombre = 'La longitud debe estar entre 5 y 40 caracteres';
                      }
                      return errors;
                    }}

                      

                    onSubmit={async (values) => {
                        validacionInsumo(values)
                    }}
                  >
                    {({ handleChange, values , errors, isValid}) => (
                      <Form className='row g-3'>
                        <div className="col-md-12 mx-auto">
                          <label htmlFor="nombre"></label>
                          <Field 
                          type="text" 
                          name='nombre' 
                          as={TextField} 
                          label ='Nombre' 
                          className={`${
                            values.nombre &&
                            /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(values.nombre) &&
                            values.nombre.length > 5 &&
                            values.nombre.length < 40
                              ? 'is-valid'
                              : 'is-invalid'
                          }`}
                          InputProps={{
                            endAdornment: (
                              <React.Fragment>
                                {values.nombre && /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(values.nombre) ? (
                                  <CheckIcon style={{ color: 'green' }} />
                                ) : (
                                  <ErrorIcon style={{ color: 'red' }} />
                                )}
                              </React.Fragment>
                            ),
                          }}
                          sx={{ width: '100%' }}
                          />
                          {errors.nombre && <div className='invalid-feedback'>{errors.nombre}</div>}
                        </div>

                        {/* <div className="col-md-6">
                          <label htmlFor="precio">Precio</label>
                          <Field type="text" name='precio' className="form-control" />
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="cantidad">Cantidad</label>
                          <Field type="text" name='cantidad' className="form-control" />
                        </div> */}

                        <div className='col-auto'>
                          <button className='btn btn-primary' type='submit' disabled={!isValid}>Registrar</button>
                        </div>

                        <div className='col-auto'>
                          <a className='btn btn-danger' href='/insumo' type='submit'>Cancelar</a>
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

export default CreateInsumo;