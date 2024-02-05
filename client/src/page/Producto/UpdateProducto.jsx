import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'
import Nav from '../../components/nav';
import { useProducto } from "../../context/Productos/ProductoContext"
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';



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

function UpdateProducto() {

  const params = useParams()
  const navigate = useNavigate()
  const { productoActualizar, listarProducto, validarProductoActualizar } = useProducto()


  useEffect(() => {

    productoActualizar(params.id_producto)

  }, [params.id_producto])

  return (

    <>
      <Nav />


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
                      const errors = {}
                      if (!values.fk_categoria) {
                        errors.fk_categoria = 'Este campo es requerido';

                      } else if (!/^[0-9]+$/.test(values.fk_categoria)) {
                        errors.fk_categoria = 'Este campo solo debe contener letras';
                      }
                      if (!values.nombre_producto) {
                        errors.nombre_producto = 'Este campo es requerido';

                      } else if (!/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(values.nombre_producto)) {
                        errors.nombre_producto = 'Este campo solo debe contener letras';
                      }
                      if (!values.precio) {
                        errors.precio = 'Este campo es requerido';

                      } else if (!/^[0-9]+$/.test(values.precio)) {
                        errors.precio = 'Este campo solo debe contener numeros';
                      }
                    console.log(values.imagen.type)
                    // if (!values.imagen) {
                    //   errors.imagen = 'Este campo es requerido';
                    // }else if(['image/png', 'image/jpeg', 'image/jpg'].includes(values.imagen.type)){errors.imagen = 'Este campo solo debe contener archivos';}
    //                 } else if (/^[a-zA-Z]+\.(jpg|jpeg|png|gif|bmp|svg|webp)$/.test(values.imagen)) {
    //                   errors.imagen = 'Este campo solo debe contener archivos';
    //                 }
                      if (!values.cantidad) {
                        errors.cantidad = 'Este campo es requerido';

                      } else if (!/^[0-9]+$/.test(values.cantidad)) {
                        errors.cantidad = 'Este campo solo debe contener numeros';
                      }
                      return errors

                    }
                    }
                    onSubmit={async (values) => {
                      console.log(values)
                      validarProductoActualizar(params.id_producto, values)
                    }

                    }
                  >
                    {
                      ({ handleChange, handleSubmit, setFieldValue ,values, errors }) => (
                        <Form onSubmit={handleSubmit} className='row g-3'>
                          <div className="col-md-6">
                            <label htmlFor="id_producto"></label>
                            <Field
                              type="text"
                              name='id_producto'
                              onChange={handleChange}
                              label='Id'
                              value={values.id_producto}
                              as={TextField}
                              className={` ${values.id_producto && /^[0-9]+$/.test(values.id_producto) ? 'is-valid' : 'is-invalid'
                                }`}
                              InputProps={{
                                endAdornment: (
                                  <React.Fragment>
                                    {values.id_producto && /^[0-9]+$/.test(values.id_producto) ? (
                                      <CheckIcon style={{ color: 'green' }} />
                                    ) : (
                                      <ErrorIcon style={{ color: 'red' }} />
                                    )}
                                  </React.Fragment>
                                ),
                              }}
                              sx={{ width: '100%' }}
                            />
                            {errors.id_producto && <div className='invalid-feedback'>{errors.id_producto}</div>}
                          </div>

                          <div className="col-md-6">
                            <label htmlFor="fk_categoria"></label>
                            <Field
                              type="text"
                              name='fk_categoria'
                              onChange={handleChange}
                              label='Categoria'
                              value={values.fk_categoria}
                              as={TextField}
                              className={` ${values.fk_categoria && /^[0-9]+$/.test(values.fk_categoria) ? 'is-valid' : 'is-invalid'
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

                          <div className="col-md-6">
                            <label htmlFor="nombre_producto"></label>
                            <Field
                              type="text"
                              name='nombre_producto'
                              onChange={handleChange}
                              label='Nombre'
                              value={values.nombre_producto}
                              as={TextField}
                              className={` ${values.nombre_producto && /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(values.nombre_producto) ? 'is-valid' : 'is-invalid'
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
                          <input 
                            type="file" 
                            name='imagen' 
                            onChange={(event) => setFieldValue('imagen', event.currentTarget.files[0])} 
                            label ='Imagen' 
                            sx={{ width: '100%' }}
                            className={` ${
                              ['image/png', 'image/jpeg', 'image/jpg'].includes(values.imagen.type)? 'is-valid' : 'is-invalid'
                            } form-control form-control-lg`}
                            InputProps={{
                              endAdornment: (
                                <React.Fragment>
                                  {['image/png', 'image/jpeg', 'image/jpg'].includes(values.imagen.type) ? (
                                    <CheckIcon style={{ color: 'green' }} />
                                  ) : (
                                    <ErrorIcon style={{ color: 'red' }} />
                                  )}
                                </React.Fragment>
                              ),
                            }}
                          />
                          {errors.imagen && <div className='invalid-feedback'>{errors.imagen}</div>}
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