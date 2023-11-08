import '../../css/style.css'
import Nav from '../../components/nav'
import {Formik, Form} from "Formik"
import { useEffect, useState } from 'react'

function UserCreate(){

 

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
              <br />

                
<Formik 
initialValues={
    {

    proveedor:'',
    cantidad:'',
    fecha:'',
    total:''
    }
}
onSubmit={(values)=>{
console.log(values)
}}
>
    {({handleChange, handleSubmit, values})=>(

 <Form className='row g-3' id='pruebas'>
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