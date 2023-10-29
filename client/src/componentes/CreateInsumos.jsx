import {Formik, Form} from 'formik'
import { postCreateInsumo } from '../api/Rutas.api'
import { useState } from 'react'
import Nav from './nav';
import Header from './header';


function CreateInsumos(){

    return(
        <div className="page-flex">
        <Nav/>
    
        <div className="main-wrapper">
        <Header/>
        <div className='card w-75 p-3 mx-auto mt-5'>
        <Formik
        initialValues={{
            nombre:"",
            cantidad:"",
            precio:""
        }}
        onSubmit={async(values)=>{
            console.log(values)
            try {
                const response=await postCreateInsumo(values)
                console.log(response)
                
            } catch (error) {
                console.log(error)
            }
        }}
        >
            {({handleChange, handleSubmit, values})=>(
                <Form onSubmit={handleSubmit} className='row g-3' id='pruebas'>
                <div className="col-md-7 mx-auto">
                    <label htmlFor="Nombre">Nombre</label>
                    <input type="text" name='nombre' onChange={handleChange} value={values.nombre} className="form-control" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="Cantidad">Cantidad</label>
                    <input type="number" name='cantidad' onChange={handleChange} value={values.cantidad} className="form-control" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="Precio">Precio</label>
                    <input type="text" name='precio' onChange={handleChange} value={values.precio} className="form-control" />
                </div>
            
                <div className="row col-11 text-center"> 
                <div  className="col-5">
                    <button  className="btn btn-primary">Registrar</button>
                </div>
                <div  className="col-1">
                    <a href='/insumo' className='btn btn-danger'>Cancelar</a>
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
export default CreateInsumos