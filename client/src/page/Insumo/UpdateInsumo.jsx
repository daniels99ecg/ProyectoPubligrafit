import { useNavigate } from "react-router-dom"
import { putActualizarInsumos, getListarInsumo } from '../../api/Insumo/Rutas.api'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Field,  Form, Formik } from 'formik' 
import Swal from 'sweetalert2'
import Nav from '../../components/nav'
import { useInsumo } from "../../context/Insumos/InsumoContext"
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';
import { useProducto } from '../../context/Productos/ProductoContext';
import Autocomplete from '@mui/material/Autocomplete';



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

function UpdateInsumo({clienteId}){


    const params = useParams()
    const navigate = useNavigate()
    const {insumoActualizar, listarInsumo, validarInsumoActualizar,cargarPresentacion, listarPresentacion}=useInsumo()
    const {validacionProducto, cargarCategoria, Listar}=useProducto()

 useEffect (() => {
    insumoActualizar(clienteId)
    cargarCategoria()
    cargarPresentacion()
 }, [clienteId])

 const options = ['1 Litro', '2 Litros'];
    return(

        <>
 


<div className='dashboard-app'>
  
    <div className='dashboard-content'>
        <div className='container'>
            <div className='card'>

                <div className='card-body'>
                <div className="card-header">
                        <h1>Actualizar insumo</h1>
                      </div>
                <br />
<div className='card w-75 p-3 mx-auto mt-5'>
        <Formik 
            initialValues = {listarInsumo}      
            enableReinitialize = {true}  
            validate={async(values)=>{
                const errors={}
            
            if(!values.nombre){
                errors.nombre = 'Este campo es requerido';

              }else if (!/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(values.nombre)){
                errors.nombre = 'Este campo solo debe contener letras y no puede tener un espacio antes o despues de digitar';
              }
              return errors
            }
          }   
            onSubmit={async (values) => {
                console.log(values)

                validarInsumoActualizar(clienteId, values)
                } 

            }
        >
            {
                ({handleChange, handleSubmit, values, errors, isValid}) => (
                    <Form  onSubmit={handleSubmit} className='row g-3'>
                <input
                type="hidden" 
                name='id_insumo' 
                onChange={handleChange}
                value={values.id_insumo} 
                className="form-control" 
                readOnly 
                 />





                <div className="col-md-12">
                <label htmlFor="nombre"></label>
                <Field 
                type="text" 
                name='nombre' 
                onChange={handleChange} 
                label ='Nombre'
                value={values.nombre} 
                as={TextField} 
                className={` ${
                    values.nombre && /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(values.nombre) ? 'is-valid' : 'is-invalid'
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


                <div className="col-md-6 ">
                         

                         <Autocomplete 
                           disablePortal
                           id="fixed-tags-demo"
                           options={Listar}  // Filtrar roles con estado true
                           getOptionLabel={(option) => option.categoria}
                           value={values.categoria   || null} 
                           onChange={(event, newValue) => {
                             handleChange({ target: { name: 'fk_categoria', value: newValue ? newValue.id_categoria : null } } );
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
        options={listarPresentacion}
        getOptionLabel={(option) => option.nombre_presentacion}
        value={values.presentacione}
        onChange={(event, newValue) => {
          handleChange({ target: { name: 'fk_presentacion', value: newValue ? newValue.id_presentacion : null } } );
        }}
        sx={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} label="Presentación" sx={{ width: '100%' }} />}
      />
    </div>


                <div className='col-auto'>
                <button className='btn btn-primary' type='submit' disabled={!isValid}>Actualizar</button>
                </div>

                <div className='col-auto'>
                <a className='btn btn-danger' href='/insumo' type='submit'>Cancelar</a>
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

export default UpdateInsumo