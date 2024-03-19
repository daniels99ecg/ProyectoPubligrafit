
import { Formik, Field, Form } from 'formik';
import Nav from '../../components/nav';
import { useInsumo } from '../../context/Insumos/InsumoContext';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';
import { useProducto } from '../../context/Productos/ProductoContext';
import {  useEffect,useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete';

function CreateInsumo() {
  const {validacionInsumo}=useInsumo()

  const {validacionProducto, cargarCategoria, Listar}=useProducto()
  const [nombreRol, setNombreRol]=useState("")
  useEffect(()=>{
    
    cargarCategoria()
 

   },[])
   const options = ['1 Litro', '2 Litros'];

  return (
    <>
      
      <div className='dashboard-app'>
        <div className='dashboard-content'>
          <div className='container'>
            <div className='card'>
              <div className='card-body'>
              <div className="card-header">
                        <h1>Registrar Insumo</h1>
                      </div>
                
                <div className='card w-75 p-3 mx-auto mt-5'>
                  <Formik
                    initialValues={{
                      id_insumo: '',
                      nombre: '',
                      nombreCategoria:'',
                      presentacion:""
                     
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
                        validacionInsumo({...values, nombreCategoria:nombreRol })
                        console.log(values)
                    }}
                  >
                    {({ handleChange, values , errors, isValid}) => (
                      <Form className='row g-3'>


                        <div className="col-md-12">
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

<div className="col-md-6 ">
                         

<Autocomplete 
  disablePortal
  id="fixed-tags-demo"
  options={Listar?.filter(option => option.estado === true) || []} // Ensure it's always an array
  getOptionLabel={(option) => option.categoria}
  value={values.nombreCategoria || null} 
  onInputChange={(event, newInputValue) => {// Con esta parte se puede agregar el rol escrito
    setNombreRol(newInputValue);
  }}
  freeSolo
   renderInput={(params) => (
    <TextField {...params} label="Categoria" sx={{ width: '100%' }}/>
  )}  
/>


                            </div>

<div className="col-md-6">
      <Autocomplete
        disablePortal
        id="fixed-tags-demo"
        options={options}
        onChange={(event, newValue) => {
          handleChange({ target: { name: 'presentacion', value: newValue || '' } });
        }}
        sx={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} label="Presentación" sx={{ width: '100%' }} />}
      />
    </div>

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