import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Field, Form, Formik } from 'formik' 
import Nav from '../../components/nav';
import { useFichaTecnica } from "../../context/FichasTecnicas/FichaTecnicaContext"
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';


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

function UpdateFichaTecnica(){

    const params = useParams()
    const navigate = useNavigate()
    const {fichaTecnicaActualizar, listarFichaTecnica, validarFichaActualizar}=useFichaTecnica()

        useEffect (() => {
          fichaTecnicaActualizar(params.id_ft)

        }, [params.id_ft])

    return(

        <>
    <Nav/>


<div className='dashboard-app'>
  
    <div className='dashboard-content'>
        <div className='container'>
            <div className='card'>

                <div className='card-body'>
                <div className="card-header">
                        <h1>Actualizar Ficha Tecnica</h1>
                      </div>
                <br />
<div className='card w-75 p-3 mx-auto mt-5'>
        <Formik 
            initialValues = {listarFichaTecnica}      
            enableReinitialize = {true}
            
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
                console.log(values)
                validarFichaActualizar(params.id_ft, values)
            }
            }
        >
            {
                ({handleChange, handleSubmit, values, errors}) => (
                    <Form  onSubmit={handleSubmit} className='row g-3'>
                <div className="col-md-6">
                <label htmlFor="id_ft"></label>
                <Field
                type="text" 
                name='id_ft' 
                onChange={handleChange}
                label ='Id'
                value={values.id_ft} 

                readOnly 
                as={TextField} 
                className={` ${
                    values.id_ft && /^[0-9]+$/.test(values.id_ft) ? 'is-valid' : 'is-invalid'
                  }`}
                  InputProps={{
                    endAdornment: (
                      <React.Fragment>
                        {values.id_ft && /^[0-9]+$/.test(values.id_ft) ? (
                          <CheckIcon style={{ color: 'green' }} />
                        ) : (
                          <ErrorIcon style={{ color: 'red' }} />
                        )}
                      </React.Fragment>
                    ),
                  }}
                  sx={{ width: '100%' }}
                />
                {errors.id_ft && <div className='invalid-feedback'>{errors.id_ft}</div>}
                </div>

                <div className="col-md-6">
                <label htmlFor="cantidad_insumo"></label>
                <Field 
                type="text" 
                name='cantidad_insumo' 
                onChange={handleChange}
                label ='Cantidad'
                value={values.cantidad_insumo} 
                as={TextField}  
                className={` ${
                    values.cantidad_insumo && /^[0-9]+$/.test(values.cantidad_insumo) ? 'is-valid' : 'is-invalid'
                  }`}
                  InputProps={{
                    endAdornment: (
                      <React.Fragment>
                        {values.cantidad_insumo && /^[0-9]+$/.test(values.cantidad_insumo) ? (
                          <CheckIcon style={{ color: 'green' }} />
                        ) : (
                          <ErrorIcon style={{ color: 'red' }} />
                        )}
                      </React.Fragment>
                    ),
                  }}
                  sx={{ width: '100%' }}
                />
                {errors.cantidad_insumo && <div className='invalid-feedback'>{errors.cantidad_insumo}</div>}
                </div>

                <div className="col-md-6">
                <label htmlFor="costo_insumo"></label>
                <Field
                type="text" 
                name='costo_insumo' 
                onChange={handleChange}
                label ='Costo'
                value={values.costo_insumo} 
                as={TextField}  
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
                {errors.costo_insumo && <div className='invalid-feedback'>{errors.costo_insumo}</div>}
                </div>

                <div className="col-md-6"> 
                <label htmlFor="imagen_producto_final"></label>
                <Field 
                type="text" 
                name='imagen_producto_final' 
                onChange={handleChange}
                label ='Imagen'
                value={values.imagen_producto_final} 
                as={TextField}  
                className={` ${
                    values.imagen_producto_final && /^[0-9]+$/.test(values.imagen_producto_final) ? 'is-valid' : 'is-invalid'
                  }`}
                  InputProps={{
                    endAdornment: (
                      <React.Fragment>
                        {values.imagen_producto_final && /^[0-9]+$/.test(values.imagen_producto_final) ? (
                          <CheckIcon style={{ color: 'green' }} />
                        ) : (
                          <ErrorIcon style={{ color: 'red' }} />
                        )}
                      </React.Fragment>
                    ),
                  }}
                  sx={{ width: '100%' }}
                />
                {errors.imagen_producto_final && <div className='invalid-feedback'>{errors.imagen_producto_final}</div>}
                </div>

                <div className="col-md-6"> 
                <label htmlFor="costo_final_producto"></label>
                <Field
                type="text" 
                name='costo_final_producto' 
                onChange={handleChange}
                label ='Costo final'
                value={values.costo_final_producto} 
                as={TextField}  
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
                {errors.costo_final_producto && <div className='invalid-feedback'>{errors.costo_final_producto}</div>}
                </div>

                <div className="col-md-6"> 
                <label htmlFor="detalle"></label>
                <Field
                type="text" 
                name='detalle' 
                onChange={handleChange}
                label ='Detalle'
                value={values.detalle} 
                as={TextField} 
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

                <div className='col-auto'>
                <button className='btn btn-primary' type='submit'>Actualizar</button>
                </div>

                <div className='col-auto'>
                <a className='btn btn-danger' href='/fichaTecnica' type='submit'>Cancelar</a>
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

export default UpdateFichaTecnica