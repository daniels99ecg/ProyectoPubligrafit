import { Form, Formik,FieldArray } from 'formik'
import Nav from '../../components/nav'
import { useEffect, useState } from 'react'
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
                <div className='card-body'>
                <div className="card-header">
                <h2 className="text-center">Registar Rol</h2>  
                </div>
    <div className='w-75 p-3 mx-auto'>

        <Formik
        initialValues={
            {
                nombre_rol:"",
                fecha:"",
                permisos:[{
                    id_permiso:""
                }
                ]
                
            }
            
        }
        enableReinitialize={true}
        onSubmit={async (values)=>{
        console.log(values)
       
            const response = await crearRoles(values)    

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

                    <FieldArray
                          name='permisos'
                          render={(arrayHelpers) => (
                            
                            <div>
                                
                              {values.permisos.map((permiso, index) => (
                                
                                <div key={index} className='col-md-6'>
                                  <input
                                    type='text'
                                    name={`permisos.${index}.id_permiso`}
                                    className='form-control'
                                    placeholder='Permiso'
                                    onChange={handleChange}
                                  />
                                  <br />
                                  <button className='btn btn-danger'
                                    type='button'
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    Eliminar Permiso
                                  </button>
                                </div>
                              ))}
                              <br />
                              <div className='col-auto'>
                                <button className='btn btn-primary'
                                  type='button'
                                  onClick={() =>
                                    arrayHelpers.push({ id_permiso: '' })
                                  }
                                >
                                  Agregar Permiso
                                </button>
                              </div>
                            </div>
                          )}
                        />

                    <div className="col-auto">
      <button className="btn btn-primary" type='submit'>
        Registrar
      </button>
</div>
<div className="col-auto">
      <a href='/rol' className='btn btn-danger'>Cancelar</a>
      </div>

            </Form>
        )}
           
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


export default RolCreate