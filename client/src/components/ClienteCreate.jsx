import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import { postCrearClientes } from '../api/Rutas.Cliente.api'
import { Form, Formik } from 'formik' 
import Nav from '../components/nav'
import Header from '../components/header' 

function CreateCliente(){

    const navigate = useNavigate()

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

                    let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
                    let regex2 = /^\d+$/;
                    let regex3 = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

                    if(values.documento =="" || values.nombre =="" || values.apellido =="" || values.telefono == "" || values.direccion =="" || values.email ==""){
                    Swal.fire({
                        icon: 'error',
                        title: 'Campos Vacíos',
                        text: 'Debe completar los campos',
                                
                        })

                      } else if (values.documento === "0" || !regex2.test(values.documento)) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Documento Inválido',
                            text: 'El campo solo puede incluir números',
                        });
                    } else if (values.documento.length < 8) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Documento Inválido',
                            text: 'El campo debe tener al menos 8 caracteres',
                        });
    
                    }else if(!regex.test(values.nombre)){
                        Swal.fire({
                            icon: 'error',
                            title: 'Nombre Inválido',
                            text: 'El campo solo puede incluir letras',                                
                        }) 

                    }else if(!regex.test(values.apellido)){
                        Swal.fire({
                            icon: 'error',
                            title: 'Apellido Inválido',
                            text: 'El campo solo puede incluir letras',                                
                        })   
                     
                    }else if(!regex2.test(values.telefono)){
                        Swal.fire({
                            icon: 'error',
                            title: 'Teléfono Inválido',
                            text: 'El campo solo puede incluir números',                               
                        })
                        
                    }else if(!regex3.test(values.email)){
                        Swal.fire({
                            icon: 'error',
                            title: 'Correo Electrónico Inválido',
                            text: 'Ingrese un correo válido',                            
                          })

                        }else {
                            // Verificar si el cliente ya existe antes de crearlo
                            const response = await postCrearClientes(values);

                            if (response.status === 400 && response.data.error) {
                              Swal.fire({
                                  icon: 'error',
                                  title: 'Cliente ya registrado',
                                  text: response.data.error,
                              })
                          

                        }else{
                            const swalWithBootstrapButtons = Swal.mixin({
                                customClass: {
                                confirmButton: 'btn btn-success',
                                cancelButton: 'btn btn-danger'
                            },
                                buttonsStyling: false
                            })
                                  
                            swalWithBootstrapButtons.fire({
                                title: 'Confirmar El Envío Del Formulario?',
                                text: "Tu Registro Será Guardado",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonText: 'Aceptar',
                                cancelButtonText: 'Cancelar',
                                Buttons: true
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    navigate ("/cliente")
                                    swalWithBootstrapButtons.fire(
                                        'Registro Exitoso!',
                                        'Tu Archivo Ha Sido Registrado',
                                        'success'
                                     )
                            } else if (
                                    /* Read more about handling dismissals below */
                                result.dismiss === Swal.DismissReason.cancel
                                ) {
                                swalWithBootstrapButtons.fire(
                                    'Registro Cancelado', 
                                    'Registro No Completado',
                                    'error'
                                    )                                       
                            }
                            
                                    
                        })
                                
                    } 
                  }                             

                    // const response = await postCrearClientes(values)
                    // console.log(response)
                                        
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