import '../../css/style.css'
import Nav from '../../components/nav'
import {Formik, Form} from "Formik"
import { useEffect, useState } from 'react'
import { useCompra } from "../../context/Compras/ComprasContext";



function UserCreate(){
    const {validacionCreacionCompras} = useCompra()

 

    return(
     <>  

 <Nav/>      
<div className='dashboard-app'>
  
  <div className='dashboard-content'>
      <div className='container'>
          <div className='card'>
              {/* <div class='card-header'>
                  <h1>Welcome back Jim</h1>
              </div> */}
              <div className='card-body'>
              <div className="card-header">
                        <h1>Registrar Compras</h1>
                      </div>
              <br />

                
<Formik 
initialValues={
    {

    proveedor:'',
    cantidad:'',
    fecha:'',
    total:'',
    insumo:{fk_insumo:''},
    cantidad:'',
    precio:'',
    iva:'',
    subtotal:'',

    }
}
onSubmit={(values)=>{
console.log(values)
validacionCreacionCompras(values)
}}
>
    {({handleChange, handleSubmit, values})=>(

 <Form onSubmit={handleSubmit} className='row g-3' id='pruebas'>
    <div className="col-md-6">
<label htmlFor="">Proveedor</label>
<input type="text" name='proveedor'className='form-control' onChange={handleChange} value={values.proveedor}/>
</div>
<div className="col-md-6">
<label htmlFor="">Fecha</label>
<input type="date" name='fecha' className='form-control' onChange={handleChange} value={values.fecha}/>
</div>
<div className="col-md-6">
<label htmlFor="">Cantidad</label>
<input type="text" name='cantidad' className='form-control' onChange={handleChange} value={values.cantidad}/>
</div>

<div className="col-md-6">
<label htmlFor="">Total</label>
<input type="text" name='total' className='form-control'onChange={handleChange} value={values.total}/>
</div>


<div className="col-md-6">
<label htmlFor="">fk_insumo</label>
<input type="text" name='insumo.fk_insumo' className='form-control'onChange={handleChange} value={values.insumo.fk_insumo}/>
</div>

<div className="col-md-6">
<label htmlFor="">Cantidad</label>
<input type="text" name='cantidad' className='form-control'onChange={handleChange} value={values.cantidad}/>
</div>

<div className="col-md-6">
<label htmlFor="">Precio</label>
<input type="text" name='precio' className='form-control'onChange={handleChange} value={values.precio}/>
</div>

<div className="col-md-6">
<label htmlFor="">Iva</label>
<input type="text" name='iva' className='form-control'onChange={handleChange} value={values.iva}/>
</div>

<div className="col-md-6">
<label htmlFor="">Subtotal</label>
<input type="text" name='subtotal' className='form-control'onChange={handleChange} value={values.subtotal}/>
</div>


<div className="col-auto">
      <button className="btn btn-primary" type='submit'>
         Registrar
      </button>
</div>
<div className="col-auto">
      <a href='/usuario' className='btn btn-danger'>Cancelar</a>
      </div>

 </Form>
    )}
   
</Formik>
               
              </div>
                </div>
            </div>
        </div>
</div>
</>
    )
}

export default UserCreate