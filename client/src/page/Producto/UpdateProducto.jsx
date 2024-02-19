import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'
import { useProducto } from "../../context/Productos/ProductoContext"
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { useFichaTecnica } from '../../context/FichasTecnicas/FichaTecnicaContext';


function primeraMayuscula(input) {
  return input
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function letraRepetida(cadena) {
  const lowerCadena = cadena.toLowerCase();
  for (let i = 0; i < cadena.length - 2; i++) {
    if (lowerCadena[i] === lowerCadena[i + 1] && lowerCadena[i] === lowerCadena[i + 2] && /[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/.test(lowerCadena[i])) {
      return true; // Encuentra más de dos veces la misma letra válida
    }
  }
  return false; // No encuentra más de dos veces la misma letra válida
}

function UpdateProducto({productoId }) {

  const params = useParams()
  const navigate = useNavigate()
  const { productoActualizar, listarProducto, validarProductoActualizar,cargarCategoria, Listar } = useProducto()
  const{listar,ShowFichasTecnicas}=useFichaTecnica()


  useEffect(() => {

    productoActualizar(productoId)
    cargarCategoria()
    ShowFichasTecnicas()
    console.log(listarProducto)
    
  }, [productoId])

  return (

    <>
      
      <div className='dashboard-app'>

        <div className='dashboard-content'>
          <div className='container'>
            <div className='card'>

              <div className='card-body'>
                <div className="card-header">
                  <h1>Actualizar Producto</h1>
                </div>
                <br />
                <div className='card w-75 p-3 mx-auto mt-5'>
                  <Formik
                    initialValues={listarProducto}
                    enableReinitialize={true}
                    validate={async (values) => {
                      console.log(values)
                      //const errors = {}
                      // if (!values.fk_categoria) {
                      //   errors.fk_categoria = 'Este campo es requerido';

                      // } else if (!/^[0-9]+$/.test(values.fk_categoria)) {
                      //   errors.fk_categoria = 'Este campo solo debe contener letras';
                      // }
                      // if (!values.fk_ft) {
                      //   errors.nombre_producto = 'Este campo es requerido';

                      // } else if (!/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(values.fk_ft)) {
                      //   errors.fk_ft = 'Este campo solo debe contener letras';
                      // }
                      // if (!values.precio) {
                      //   errors.precio = 'Este campo es requerido';

                      // } else if (!/^[0-9]+$/.test(values.precio)) {
                      //   errors.precio = 'Este campo solo debe contener numeros';
                      // }
                      // if (!values.cantidad) {
                      //   errors.cantidad = 'Este campo es requerido';

                      // } else if (!/^[0-9]+$/.test(values.cantidad)) {
                      //   errors.cantidad = 'Este campo solo debe contener numeros';
                      // }
                      // return errors
                    }
                    }
                    onSubmit={async (values) => {
                      console.log(values)
                      validarProductoActualizar(productoId, values)
                    }

                    }
                  >
                    {
                      ({ handleChange, handleSubmit, setFieldValue ,values, errors }) => (
                        <Form onSubmit={handleSubmit} className='row g-3'>
                         
                            <label htmlFor="id_producto"></label>
                            <input type="hidden" name='id_producto' value={values.id_producto}/>
                          

                          <div className="col-md-6">
  <Autocomplete 
    disablePortal
    id="fixed-tags-demo"
    options={Listar}  
    getOptionLabel={(option) => option.categoria}
    onChange={(event, newValue) => {
        handleChange({ target: { name: 'fk_categoria', value: newValue ? newValue.id_categoria : '' } });
    }}
    value={Listar.find(categoria => categoria.id_categoria === values.fk_categoria)} // Buscar el valor seleccionado en la lista
    sx={{ width: '100%' }}
    renderInput={(params) => <TextField {...params} label="Categoria" sx={{ width: '100%' }} />}
/>
 {errors.fk_categoria && <div className='invalid-feedback'>{errors.fk_categoria}</div>}
                          </div>

                          <div className="col-md-6">

                            <Autocomplete 
                            disablePortal
                            id="fixed-tags-demo"
                            options={listar}  // Filtrar roles con estado true
                            getOptionLabel={(option) => option.nombre_ficha}
                            onChange={(event, newValue) => {
                              handleChange({ target: { name: 'fk_ft', value: newValue ? newValue.id_ft : '' } });
                            }}
                            value={listar.find(fichas_tecnica => fichas_tecnica.id_ft === values.fk_ft)} // Buscar el valor seleccionado en la lista
                            sx={{ width: '100%' }}
                            renderInput={(params) => <TextField {...params} label="Nombre" sx={{ width: '100%' }}/>}
                          />
                            {/* {errors.fk_ft && <div className='invalid-feedback'>{errors.fk_ft}</div>} */}
                          </div>

                          <div className="col-md-6">
                            <label htmlFor="precio"></label>

                            <Field
                              type="text"
                              name='precio'
                              onChange={handleChange}
                              label='Precio'
                              value={values.precio}
                              as={TextField}
                              className={` ${values.precio && /^[0-9]+$/.test(values.precio) ? 'is-valid' : 'is-invalid'
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
                            <label htmlFor="cantidad"></label>
                            <Field
                              type="text"
                              name='cantidad'
                              onChange={handleChange}
                              label='cantidad'
                              value={values.cantidad}
                              as={TextField}
                              className={` ${values.cantidad && /^[0-9]+$/.test(values.cantidad) ? 'is-valid' : 'is-invalid'
                                }`}
                              InputProps={{
                                endAdornment: (
                                  <React.Fragment>
                                    {values.cantidad && /^[0-9]+$/.test(values.precio) ? (
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
                            <button className='btn btn-primary' type='submit'>Actualizar</button>
                          </div>

                          <div className='col-auto'>
                            <a className='btn btn-danger' href='/producto' >Cancelar</a>
                          </div>
                        </Form>
                      )
                    }
                  </Formik>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateProducto