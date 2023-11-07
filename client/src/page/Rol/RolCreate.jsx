import { Form, Formik } from 'formik'
import Nav from '../../components/nav'
import { useEffect, useState } from 'react'
import { crearRol } from '../../api/rutas.api'
import { useRol } from '../../context/Rol/RolContext'
function RolCreate(){
    const {crearRoles}=useRol()

    return(
       <>
        <Nav/>
        <div className='dashboard-app'>
        <div className='dashboard-content'>
            <div className='container'>
                <div className='card'>
    <div className='w-75 p-3 mx-auto'>
    <h2 className="text-center">Registar Rol</h2>
        <Formik
        initialValues={
            {
                nombre_rol:"",
                fecha:""
            }
            
        }
        enableReinitialize={true}
        onSubmit={async (values)=>{
        console.log(values)
        crearRoles(values)

   }}
        >
        {({handleChange, handleSubmit, values})=>(
            <Form onSubmit={handleSubmit} className='row g-3' id='pruebas'>
            <div className="col-md-6">
                    <input type='text' name='nombre_rol' className='form-control' placeholder='Nombre Rol' onChange={handleChange}/>
                    </div>
                    <div className="col-md-6">
                    <input type='date' name='fecha' className='form-control' placeholder='Fecha' onChange={handleChange}/>
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


export default RolCreate