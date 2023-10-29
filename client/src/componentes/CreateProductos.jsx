import {Formik, Form} from 'formik'
import { postCreateProducto } from '../api/Rutas.api'
import { useState } from 'react'
import Nav from './nav';
import Header from './header';


function CreateProductos(){
    return(
        <div className="page-flex">
        <Nav/>
    
        <div className="main-wrapper">
        <Header/>
        <div className='card w-75 p-3 mx-auto mt-5'>
        <Formik
        initialValues={{
            fk_categoria:"",
            nombre_producto:"",
            precio:"",
            imagen:"",
            stock:""
        }}
        onSubmit={async(values)=>{
            console.log(values)
            try {
                const response=await postCreateProducto(values)
                console.log(response)
                
            } catch (error) {
                console.log(error)
            }
        }}
        >
            {({handleChange, handleSubmit, values})=>(
                <Form onSubmit={handleSubmit} className='row g-3' id='pruebas' >
                <div className="col-md-6 ">
                <label htmlFor="Categoria">Categoria</label>
                <input type="text" name='fk_categoria' onChange={handleChange} value={values.fk_categoria} className="form-control" />
                </div>
                <div className="col-md-6 ">
                <label htmlFor="Nombre">Nombre</label>
                <input type="text" name='nombre_producto' onChange={handleChange} value={values.nombre_producto} className="form-control" />
                </div>
                <div className="col-md-6 ">
                <label htmlFor="Precio">Precio</label>
                <input type="text" name='precio' onChange={handleChange} value={values.precio} className="form-control" />
                </div>
                <div className="col-md-6">
                <label htmlFor="Imagen">Imagen</label>
                <input type="text" name='imagen' onChange={handleChange} value={values.imagen} className="form-control" />
                </div>
                <div className="col-md-7 mx-auto ">
                <label htmlFor="Stock">Stock</label>
                <input type="text" name='stock' onChange={handleChange} value={values.stock} className="form-control" />
                </div>

                <div className="row col-11 text-center"> 
                <div  className="col-5">
                    <button  className="btn btn-primary">Registrar</button>
                </div>
                <div  className="col-1">
                    <a href='/producto' className='btn btn-danger'>Cancelar</a>
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
export default CreateProductos