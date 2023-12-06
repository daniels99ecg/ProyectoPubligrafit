   import { Formik, Field, Form } from 'formik';
   import Nav from '../../components/nav';
   import { useProducto } from '../../context/Productos/ProductoContext';
   import TextField from '@mui/material/TextField';
  import CheckIcon from '@mui/icons-material/Check';
  import ErrorIcon from '@mui/icons-material/Error';
  import React from 'react';
   
   
   function CreateProducto() {
     const {validacionProducto}=useProducto()
   
   
     return (
       <>
         <Nav />
         <div className='dashboard-app'>
           <div className='dashboard-content'>
             <div className='container'>
               <div className='card'>
                 <div className='card-body'>
                 <div className="card-header">
                        <h1>Registrar Producto</h1>
                      </div>
                   <br />
                   <div className='card w-75 p-3 mx-auto mt-5'>
                     <Formik
                       initialValues={
                        {
                        
                         fk_categoria: '',
                         nombre_producto: '',
                         precio: '',
                         imagen: '',
                         cantidad: ''
                       }
                      }
                       validate={async(values)=>{
                        const errors={}
  
                        if (!values.fk_categoria) {
                          errors.fk_categoria = 'Este campo es requerido';
                    
                        }else if (!/^[0-9]+$/.test(values.fk_categoria)) {
                          errors.fk_categoria = 'Este campo solo debe contener letras';
                        }
                        if(!values.nombre_producto){
                          errors.nombre_producto = 'Este campo es requerido';
  
                        }else if (!/^[a-zA-Z]+$/.test(values.nombre_producto)){
                          errors.nombre_producto = 'Este campo solo debe contener letras';
                        }
                        if(!values.precio){
                          errors.precio = 'Este campo es requerido';
  
                        }else if (!/^[0-9]+$/.test(values.precio)){
                          errors.precio = 'Este campo solo debe contener numeros';
                        }
                        // if(!values.imagen){
                        //   errors.imagen= 'Este campo es requerido';
  
                        // }
                        if(!values.cantidad){
                          errors.cantidad = 'Este campo es requerido';
  
                        }else if (!/^[0-9]+$/.test(values.cantidad)){
                          errors.cantidad = 'Este campo solo debe contener numeros';
                        }
                        return errors
                      }
                    }
                    enableReinitialize={true}

                       onSubmit={async (values) => {
                        console.log(values)

                           await validacionProducto(values)
                       }}
                     >
                       {({ handleChange, handleSubmit, values, errors  }) => (
                         <Form onSubmit={handleSubmit} className='row g-3'>
                           <div className="col-md-6 ">
                            <label htmlFor="fk_categoria"></label>
                            <Field 
                            type="text" 
                            name='fk_categoria' 
                            as={TextField} 
                            label ='Categoria' 
                            onChange={handleChange} 
                            className={` ${
                              values.fk_categoria && /^[0-9]+$/.test(values.fk_categoria) ? 'is-valid' : 'is-invalid'
                            }`}
                            InputProps={{
                              endAdornment: (
                                <React.Fragment>
                                  {values.fk_categoria && /^[0-9]+$/.test(values.fk_categoria) ? (
                                    <CheckIcon style={{ color: 'green' }} />
                                  ) : (
                                    <ErrorIcon style={{ color: 'red' }} />
                                  )}
                                </React.Fragment>
                              ),
                            }}
                            sx={{ width: '100%' }}
                          />
                          {errors.fk_categoria && <div className='invalid-feedback'>{errors.fk_categoria}</div>}
                            </div>
                            <div className="col-md-6 ">
                            <Field 
                            type="text" 
                            name='nombre_producto' 
                            as={TextField} 
                            label ='Nombre' 
                            onChange={handleChange} 
                            className={` ${
                              values.nombre_producto && /^[a-zA-Z]+$/.test(values.nombre_producto) ? 'is-valid' : 'is-invalid'
                            }`}
                            InputProps={{
                              endAdornment: (
                                <React.Fragment>
                                  {values.nombre_producto && /^[a-zA-Z]+$/.test(values.nombre_producto) ? (
                                    <CheckIcon style={{ color: 'green' }} />
                                  ) : (
                                    <ErrorIcon style={{ color: 'red' }} />
                                  )}
                                </React.Fragment>
                              ),
                            }}
                            sx={{ width: '100%' }}
                          />
                          {errors.nombre_producto && <div className='invalid-feedback'>{errors.nombre_producto}</div>}
                            </div>
                            <div className="col-md-6 ">
                            <Field 
                            type="text" 
                            name='precio' 
                            as={TextField} 
                            label ='Precio' 
                            onChange={handleChange} 
                            className={` ${
                              values.precio && /^[0-9]+$/.test(values.precio) ? 'is-valid' : 'is-invalid'
                            }`}
                            InputProps={{
                              endAdornment: (
                                <React.Fragment>
                                  {values.precio && /^[0-9]+$/.test(values.precio) ? (
                                    <CheckIcon style={{ color: 'green' }} />
                                  ) : (
                                    <ErrorIcon style={{ color: 'red' }} />
                                  )}
                                </React.Fragment>
                              ),
                            }}
                            sx={{ width: '100%' }}
                          />
                          {errors.precio && <div className='invalid-feedback'>{errors.precio}</div>}
                            </div>
                            <div className="col-md-6">
                            <Field 
                            type="file" 
                            name='imagen' 
                            as={TextField} 
                            label ='Imagen' 
                            // className={` ${
                            //   values.imagen && /^[0-9]+$/.test(values.imagen) ? 'is-valid' : 'is-invalid'
                            // }`}
                            // InputProps={{
                            //   endAdornment: (
                            //     <React.Fragment>
                            //       {values.imagen && /^[0-9]+$/.test(values.imagen) ? (
                            //         <CheckIcon style={{ color: 'green' }} />
                            //       ) : (
                            //         <ErrorIcon style={{ color: 'red' }} />
                            //       )}
                            //     </React.Fragment>
                            //   ),
                            // }}
                            sx={{ width: '100%' }}
                          />
                          {/* {errors.imagen && <div className='invalid-feedback'>{errors.imagen}</div>} */}
                            </div>
                            <div className="col-md-12 mx-auto ">
                            <Field 
                            type="text" 
                            name='cantidad' 
                            as={TextField} 
                            label ='cantidad' 
                            onChange={handleChange} 
                            className={` ${
                              values.cantidad && /^[0-9]+$/.test(values.cantidad) ? 'is-valid' : 'is-invalid'
                            }`}
                            InputProps={{
                              endAdornment: (
                                <React.Fragment>
                                  {values.cantidad && /^[0-9]+$/.test(values.cantidad) ? (
                                    <CheckIcon style={{ color: 'green' }} />
                                  ) : (
                                    <ErrorIcon style={{ color: 'red' }} />
                                  )}
                                </React.Fragment>
                              ),
                            }}
                            sx={{ width: '100%' }}
                          />
                          {errors.cantidad && <div className='invalid-feedback'>{errors.cantidad}</div>}
                            </div>

                            <div className='col-auto'>
                              <button className='btn btn-primary' type='submit'>Registrar</button>
                            </div>

                            <div className='col-auto'>
                              <a className='btn btn-danger' href='/producto' type='submit'>Cancelar</a>
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
   
   export default CreateProducto;

