import { postCrearClientes } from '../api/Rutas.Cliente.api'
import { Form, Formik } from 'formik' 
import Nav from '../components/nav'
import Header from '../components/header' 

function CreateCliente(){

    return(

        <div className="page-flex">
    <Nav/>

    <div className="main-wrapper">
    <Header/>
<br/>
<div className='card w-75 p-3 mx-auto mt-5'>
        <Formik 
            initialValues={
                {
                    documento: '',
                    nombre: '',
                    apellido: '',
                    telefono: '',
                    direccion: '',
                    email: ''
                }
            }
            onSubmit={async (values) => {
                console.log(values)
                try {
                    const response = await postCrearClientes(values)
                    console.log(response)
                    
                } catch (error) {
                    console.log(error)
                }
            }}
        >
            {   
                
                ({handleChange, handleSubmit, values}) => (
                    <Form  onSubmit={handleSubmit} className='row g-3'>
                <div className="col-md-6">
                <label htmlFor="documento">Documento</label>
                <input type="text" name='documento' onChange={handleChange} value={values.documento} className="form-control"/>
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
                <button className='btn btn-primary' href='' type='submit'>Guardar</button>
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

export default CreateCliente