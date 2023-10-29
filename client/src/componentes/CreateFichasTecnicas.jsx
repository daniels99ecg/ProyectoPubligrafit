import {Formik, Form} from 'formik'
import { postCreateFichaTecnica } from '../api/Rutas.api'
import { useState } from 'react'
import Nav from './nav';
import Header from './header';


function CreateFichasTecnicas(){
    return(
        <div className="page-flex">
        <Nav/>
    
        <div className="main-wrapper">
        <Header/>
        <div className='card w-75 p-3 mx-auto mt-5'>
        <Formik
        initialValues={{
            fk_insumo:"",
            cantidad_insumo:"",
            costo_insumo:"",
            imagen_producto_final:"",
            costo_final_producto:"",
            detalle:""
        }}
        onSubmit={async(values)=>{
            console.log(values)
            try {
                const response=await postCreateFichaTecnica(values)
                console.log(response)
                
            } catch (error) {
                console.log(error)
            }
        }}
        >
            {({handleChange, handleSubmit, values})=>(
                <Form onSubmit={handleSubmit} className='row g-3' id='pruebas' >
                <div className="col-md-6 ">
                <label htmlFor="fk_insumo">Insumo</label>
                <input type="number" name='fk_insumo' onChange={handleChange} value={values.fk_insumo} className="form-control" />
                </div>
                <div className="col-md-6 ">
                <label htmlFor="Cantidad">Cantidad de Insumos</label>
                <input type="text" name='cantidad_insumo' onChange={handleChange} value={values.cantidad_insumo} className="form-control" />
                </div>
                <div className="col-md-6 ">
                <label htmlFor="Costo">Costo del Insumo</label>
                <input type="text" name='costo_insumo' onChange={handleChange} value={values.costo_insumo} className="form-control" />
                </div>
                <div className="col-md-6">
                <label htmlFor="Imagen">Imagen</label>
                <input type="text" name='imagen_producto_final' onChange={handleChange} value={values.imagen_producto_final} className="form-control" />
                </div>
                <div className="col-md-6 ">
                <label htmlFor="Costo_Final">Costo Final</label>
                <input type="text" name='costo_final_producto' onChange={handleChange} value={values.costo_final_producto} className="form-control" />
                </div>
                <div className="col-md-6 ">
                <label htmlFor="Detalle">Detalles</label>
                <input type="text" name='detalle' onChange={handleChange} value={values.detalle} className="form-control" />
                </div>

                <div className="row col-11 text-center"> 
                <div  className="col-5">
                    <button  className="btn btn-primary">Registrar</button>
                </div>
                <div  className="col-1">
                    <a href='/ficha_tecnica' className='btn btn-danger'>Cancelar</a>
                </div>
                </div>

                </Form>

            )}
        </Formik>
        </div>
        </div>
        </div>
    )

}
export default CreateFichasTecnicas