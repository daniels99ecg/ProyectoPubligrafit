import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import { putActualizarCliente, showClienteUpdate } from '../api/Rutas.Cliente.api'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Formik } from 'formik' 
import Nav from '../components/nav'
import Header from '../components/header' 

function UpdateCliente(){

    const params = useParams()
    const navigate = useNavigate()

    const [listarActualizar, setListarActualizar] = useState(
        {
            documento: '',
            nombre: '',
            apellido: '',
            telefono: '',
            direccion: '',
            email: ''  

        })

        useEffect (() => {

            async function clienteActualizar (){

                try{
                
                    const clienteUpdate = await showClienteUpdate(params.documento)
                    const response = clienteUpdate.data
        
                    setListarActualizar({
                        documento: response.documento,
                        nombre: response.nombre,
                        apellido: response.apellido,
                        telefono: response.telefono,
                        direccion: response.direccion,
                        email: response.email
                    })
                } catch (error) {
                    console.log(error)
                }
            }
 
    clienteActualizar()

        }, [params.documento])

    return(

        <div className="page-flex">
    <Nav/>

    <div className="main-wrapper">
    <Header/>
<br/>
<div className='card w-75 p-3 mx-auto mt-5'>
        <Formik 
            initialValues = {listarActualizar}      
            enableReinitialize = {true}      
            onSubmit={async (values) => {
                console.log(values)

                if (params.documento) {

                    if(values.documento =="" || values.nombre =="" || values.apellido =="" || values.telefono == "" || values.direccion =="" || values.email ==""){

                        Swal.fire({
                            icon: 'error',
                            title: 'Campos Vacíos',
                            text: 'Por Favor Ingresar Datos',
                                
                        })
                    }

                   await putActualizarCliente(params.documento, values)
                   navigate ("/cliente")

                }

            }}
        >
            {
                ({handleChange, handleSubmit, values}) => (
                    <Form  onSubmit={handleSubmit} className='row g-3'>
                <div className="col-md-6">
                <label htmlFor="documento">Documento</label>
                <input type="text" name='documento' onChange={handleChange} value={values.documento} className="form-control" readOnly/>
                </div>

                <div className="col-md-6">
                <label htmlFor="nombre">Nombre</label>
                <input type="text" name='nombre' onChange={handleChange} value={values.nombre} className="form-control"/>
                </div>

                <div className="col-md-6">
                <label htmlFor="apellido">Apellido</label>
                <input type="text" name='apellido' onChange={handleChange} value={values.apellido} className="form-control"/>
                </div>

                <div className="col-md-6"> 
                <label htmlFor="telefono">Teléfono</label>
                <input type="text" name='telefono' onChange={handleChange} value={values.telefono} className="form-control"/>
                </div>   

                <div className="col-md-6">
                <label htmlFor="direccion">Dirección</label>
                <input type="text" name='direccion' onChange={handleChange} value={values.direccion} className="form-control"/>
                </div>  

                <div className="col-md-6">
                <label htmlFor="email">Email</label>
                <input type="text" name='email' onChange={handleChange} value={values.email} className="form-control"/>
                </div> 

                <div className='col-auto'>
                <button className='btn btn-primary' type='submit'>Actualizar</button>
                </div>

                <div className='col-auto'>
                <a className='btn btn-danger' href='/cliente' type='submit'>Cancelar</a>
                </div>
            </Form>
                )
            }
        </Formik>
        </div>
        </div>
        </div>
    )
}


export default UpdateCliente