import { Formik, Field, Form, FieldArray } from 'formik';
import Nav from '../../components/nav';
import { useFichaTecnica } from '../../context/FichasTecnicas/FichaTecnicaContext';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';


function CreateFichaTecnica() {
  const {validacionFichaTecnica}=useFichaTecnica()


  return (
    <>
      <Nav />
      <div className='dashboard-app'>
        <div className='dashboard-content'>
          <div className='container'>
            <div className='card'>
              <div className='card-body'>
              <div className="card-header">
                        <h1>Registrar Ficha Tecnica</h1>
                      </div>
                <br />
                <div className='card w-75 p-3 mx-auto mt-5'>
                  <Formik
                    initialValues={{
                      id_ft: '',
                      insumo: [{
                        id_insumo: '',
                      }],
                      cantidad_insumo: '',
                      costo_insumo: '',
                      imagen_producto_final: '',
                      costo_final_producto: '',
                      detalle: ''
                    }}
                    validate={async(values)=>{
                      const errors={}

                      if (!values.insumo) {
                        errors.insumo = 'Este campo es requerido';
                  
                      }else if (!/^[0-9]+$/.test(values.insumo)) {
                        errors.insumo = 'Este campo solo debe contener letras';
                      }
                      if(!values.cantidad_insumo){
                        errors.cantidad_insumo = 'Este campo es requerido';

                      }else if (!/^[0-9]+$/.test(values.cantidad_insumo)){
                        errors.cantidad_insumo = 'Este campo solo debe contener numeros';
                      }
                      if(!values.costo_insumo){
                        errors.costo_insumo = 'Este campo es requerido';

                      }else if (!/^[0-9]+$/.test(values.costo_insumo)){
                        errors.costo_insumo = 'Este campo solo debe contener numeros';
                      }
                      if(!values.imagen_producto_final){
                        errors.imagen_producto_final = 'Este campo es requerido';

                      }
                      if(!values.costo_final_producto){
                        errors.costo_final_producto = 'Este campo es requerido';

                      }else if (!/^[0-9]+$/.test(values.costo_final_producto)){
                        errors.costo_final_producto = 'Este campo solo debe contener numeros';
                      }
                      if(!values.detalle){
                        errors.detalle = 'Este campo es requerido';

                      }else if (!/^[a-zA-Z]+$/.test(values.detalle)){
                        errors.detalle = 'Este campo solo debe contener letras';
                      }
                      return errors
                    }
                  }
                    onSubmit={async (values) => {
                        validacionFichaTecnica(values)
                    }}
                  >
                    {({ handleChange,handleSubmit, values, errors }) => (
                        <Form onSubmit={handleSubmit} className='row g-3' id='pruebas' >
                        <FieldArray
                          name='insumo'
                          render={(arrayHelpers) => (
                            
                            <div>
                                
                              {values.insumo.map((insumo,index) => (
                                
                                <div key={index} className='col-md-6'>
                                  <Field
                                    type='text'
                                    name={`insumo.${index}.id_insumo`}
                                    className='form-control'
                                    label='Insumo'
                                    as={TextField} 
                                    onChange={handleChange}
                                  />


                                  <br />
                                  <button 
                                   className='boton-plus'
                                    type='button'
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                     <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
  <path fill="#e53935" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
  <rect x="14" y="21" width="20" height="6" fill="#fff"></rect>
</svg>
                                  </button>
                                </div>
                              ))}
                              <br />
                              <div className='col-auto'>
                                <button
                                  className='boton-plus'
                                  type='button'
                                  onClick={() =>
                                    arrayHelpers.push({ id_insumo: '' })
                                  }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
<path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#fff" d="M21,14h6v20h-6V14z"></path><path fill="#fff" d="M14,21h20v6H14V21z"></path>
</svg>
                                </button>
                              </div>
                            </div>
                          )}
                        />
                        
                        <div className="col-md-6 ">
                        <label htmlFor="Costo"></label>
                        <Field 
                        type="text" 
                        name='costo_insumo' 
                        as={TextField} 
                        label ='Costo Insumo'
                        className={` ${
                          values.costo_insumo && /^[0-9]+$/.test(values.costo_insumo) ? 'is-valid' : 'is-invalid'
                        }`}
                        InputProps={{
                          endAdornment: (
                            <React.Fragment>
                              {values.costo_insumo && /^[0-9]+$/.test(values.costo_insumo) ? (
                                <CheckIcon style={{ color: 'green' }} />
                              ) : (
                                <ErrorIcon style={{ color: 'red' }} />
                              )}
                            </React.Fragment>
                          ),
                        }}
                        sx={{ width: '100%' }}
                      />
                      {errors.detalle && <div className='invalid-feedback'>{errors.costo_insumo}</div>}
                        </div>
                        <div className="col-md-6">
                        <label htmlFor="Imagen"></label>
                        <Field 
                        type="file" 
                        name='imagen_producto_final' 
                        className="form-control" 
                        as={TextField} 
                        label ='Imagen' 
                        />
                        </div>
                        <div className="col-md-6 ">
                        <label htmlFor="Costo_Final"></label>
                        <Field 
                        type="text" 
                        name='costo_final_producto' 
                        as={TextField} 
                        label ='Costo_Final'
                        className={` ${
                          values.costo_final_producto && /^[0-9]+$/.test(values.costo_final_producto) ? 'is-valid' : 'is-invalid'
                        }`}
                        InputProps={{
                          endAdornment: (
                            <React.Fragment>
                              {values.costo_final_producto && /^[0-9]+$/.test(values.costo_final_producto) ? (
                                <CheckIcon style={{ color: 'green' }} />
                              ) : (
                                <ErrorIcon style={{ color: 'red' }} />
                              )}
                            </React.Fragment>
                          ),
                        }}
                        sx={{ width: '100%' }}
                      />
                      {errors.detalle && <div className='invalid-feedback'>{errors.costo_final_producto}</div>}
                        </div>
                        <div className="col-md-6 ">
                        <label htmlFor="Detalle"></label>
                        <Field 
                        type="text" 
                        name='detalle' 
                        as={TextField} 
                        label ='Detalle'
                        className={` ${
                          values.detalle && /^[a-zA-Z]+$/.test(values.detalle) ? 'is-valid' : 'is-invalid'
                        }`}
                          InputProps={{
            endAdornment: (
              <React.Fragment>
                {values.detalle && /^[a-zA-Z]+$/.test(values.detalle) ? (
                  <CheckIcon style={{ color: 'green' }} />
                ) : (
                  <ErrorIcon style={{ color: 'red' }} />
                )}
              </React.Fragment>
            ),
          }}
          sx={{ width: '100%' }}
        />
        {errors.detalle && <div className='invalid-feedback'>{errors.detalle}</div>}
      </div>
                        <br />
                        
                        <div  className="col-auto">
                            <button  className="btn btn-primary">Registrar</button>
                        </div>
                        
                        <div  className="col-auto">
                            <a href='/fichaTecnica' className='btn btn-danger'>Cancelar</a>
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

export default CreateFichaTecnica;