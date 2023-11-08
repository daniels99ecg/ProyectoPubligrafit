import { useNavigate } from "react-router-dom"
import { putActualizarFichasTecnicas, getListarFichaTecnica } from '../../api/Rutas.ficha'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Formik } from 'formik' 
import Swal from 'sweetalert2'
import Nav from '../../componentes/nav'
import { useFichaTecnica } from "../../context/FichasTecnicas/FichaTecnicaContext"

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
                <br />
<div className='card w-75 p-3 mx-auto mt-5'>
        <Formik 
            initialValues = {listarFichaTecnica}      
            enableReinitialize = {true}      
            onSubmit={async (values) => {
                console.log(values)
                validarFichaActualizar(params.id_ft, values)
            }
            }
        >
            {
                ({handleChange, handleSubmit, values}) => (
                    <Form  onSubmit={handleSubmit} className='row g-3'>
                <div className="col-md-6">
                <label htmlFor="id_ft">Insumo</label>
                <input type="text" name='id_ft' onChange={handleChange} value={values.id_ft} className="form-control" readOnly/>
                </div>

                <div className="col-md-6">
                <label htmlFor="cantidad_insumo">Cantidad</label>
                <input type="text" name='cantidad_insumo' onChange={handleChange} value={values.cantidad_insumo} className="form-control"/>
                </div>

                <div className="col-md-6">
                <label htmlFor="costo_insumo">Costo</label>
                <input type="text" name='costo_insumo' onChange={handleChange} value={values.costo_insumo} className="form-control"/>
                </div>

                <div className="col-md-6"> 
                <label htmlFor="imagen_producto_final">Imagen</label>
                <input type="text" name='imagen_producto_final' onChange={handleChange} value={values.imagen_producto_final} className="form-control"/>
                </div>

                <div className="col-md-6"> 
                <label htmlFor="costo_final_producto">Costo final</label>
                <input type="text" name='costo_final_producto' onChange={handleChange} value={values.costo_final_producto} className="form-control"/>
                </div>

                <div className="col-md-6"> 
                <label htmlFor="detalle">Detalles</label>
                <input type="text" name='detalle' onChange={handleChange} value={values.detalle} className="form-control"/>
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