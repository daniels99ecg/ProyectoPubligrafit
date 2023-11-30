import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Formik, Field } from 'formik' 
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import Swal from 'sweetalert2'
import Nav from '../../components/nav';
import { useInsumo } from "../../context/Insumos/InsumoContext"


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

function UpdateInsumo(){

    const params = useParams()
    const navigate = useNavigate()
    const {insumoActualizar, listarInsumo, validarInsumoActualizar}=useInsumo()


        useEffect (() => {
    insumoActualizar(params.id_insumo)

        }, [params.id_insumo])

    return(

        <>
    <Nav/>


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
            onSubmit={async (values) => {
                console.log(values)

                validarInsumoActualizar(params.id_insumo, values)
                } 

            }
        >
            {
                ({handleChange, handleSubmit, values}) => (
                    <Form  onSubmit={handleSubmit} className='row g-3'>
                <div className="col-md-6">
                <Field 
                type="text" 
                name='id_insumo' 
                label="ID insumo"
                as={TextField}
                onChange={handleChange} 
                value={values.id_insumo} 
                className="form-control" readOnly/>
                </div>

                <div className="col-md-6">
                <label htmlFor="nombre">Nombre</label>
                <input type="text" name='nombre' onChange={handleChange} value={values.nombre} className="form-control"/>
                </div>

                <div className="col-md-6">
                <label htmlFor="precio">Precio</label>
                <input type="text" name='precio' onChange={handleChange} value={values.precio} className="form-control"/>
                </div>

                <div className="col-md-6"> 
                <label htmlFor="cantidad">Cantidad</label>
                <input type="text" name='cantidad' onChange={handleChange} value={values.cantidad} className="form-control"/>
                </div>   

                <div className='col-auto'>
                <button className='btn btn-primary' type='submit'>Actualizar</button>
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