   import { Formik, Field, Form } from 'formik';
   import Nav from '../../components/nav';
   import { useProducto } from '../../context/Productos/ProductoContext';
   import TextField from '@mui/material/TextField';
  import CheckIcon from '@mui/icons-material/Check';
  import ErrorIcon from '@mui/icons-material/Error';
  import React from 'react';
  import Autocomplete from '@mui/material/Autocomplete';
  import {  useEffect } from 'react'

   
   function CreateProducto() {

     const {validacionProducto, cargarCategoria, Listar}=useProducto()
     useEffect(()=>{
    
      cargarCategoria()
      
     },[])

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
  
                        }else if (!/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(values.nombre_producto)){
                          errors.nombre_producto = 'Este campo solo debe contener letras';
                        }
                        if(!values.precio){
                          errors.precio = 'Este campo es requerido';
  
                        }else if (!/^[0-9]+$/.test(values.precio)){
                          errors.precio = 'Este campo solo debe contener numeros';
                        }
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
                        const formData = new FormData();
                        formData.append('fk_categoria', values.fk_categoria);
                        formData.append('nombre_producto', values.nombre_producto);
                        formData.append('precio', values.precio);
                        formData.append('imagen', values.imagen[0]); // Assuming 'imagen' is the key for the image
                        formData.append('cantidad', values.cantidad);

                        console.log("FormData:", formData);

                        try {
                          await validacionProducto(formData);
                          
                        } catch (error) {
                          console.error("Error en la solicitud:", error);
                        }
                          
                       }}
                     >
                       {({ handleChange, handleSubmit, setFieldValue ,values, errors  }) => (
                         <Form onSubmit={handleSubmit} className='row g-3'>
                           <div className="col-md-6 ">
                           <Autocomplete 
                              disablePortal
                              id="fixed-tags-demo"
                              options={Listar}  // Filtrar roles con estado true
                              getOptionLabel={(option) => option.categoria}
                              onChange={(event, newValue) => {
                                handleChange({ target: { name: 'fk_categoria', value: newValue ? newValue.id_categoria : '' } });
                              }}
                              value={Listar && values && Listar.find((categoria) => categoria.id_categoria === values.fk_categoria) || null}
                              sx={{ width: '100%' }}
                              renderInput={(params) => <TextField {...params} label="Categoria" sx={{ width: '100%' }}/>}
                            />

                            </div>
                            <div className="col-md-6 ">
                            <Field 
                            type="text" 
                            name='nombre_producto' 
                            as={TextField} 
                            label ='Nombre' 
                            onChange={handleChange} 
                            className={` ${
                              values.nombre_producto && /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(values.nombre_producto) ? 'is-valid' : 'is-invalid'
                            }`}
                            InputProps={{
                              endAdornment: (
                                <React.Fragment>
                                  {values.nombre_producto && /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(values.nombre_producto) ? (
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
                            <input 
                            type="file" 
                            name='imagen' 
                          
                            
                            onChange={(event) => setFieldValue('imagen', event.currentTarget.files[0])} 
                          
                            
                          />
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

