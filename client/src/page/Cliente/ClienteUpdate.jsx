import { useNavigate } from "react-router-dom"
import { putActualizarCliente, showClienteUpdate } from '../../api/Cliente/Rutas.Cliente.api'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Formik } from 'formik' 
import Swal from 'sweetalert2'
import Nav from '../../components/nav'

function primeraMayuscula(input) {
    return input
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  function letraRepetida(cadena) {
    const lowerCadena = cadena.toLowerCase();
    for (let i = 0; i < cadena.length - 2; i++) {
        if (lowerCadena[i] === lowerCadena[i + 1] && lowerCadena[i] === lowerCadena[i + 2] && /[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/.test(lowerCadena[i])) {
            return true; // Encuentra más de dos veces la misma letra válida
        }
    }
    return false; // No encuentra más de dos veces la misma letra válida
}

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

        <>
    <Nav/>


<div className='dashboard-app'>
  
    <div className='dashboard-content'>
        <div className='container'>
            <div className='card'>
                <div className='card-body'>
                <br />
<div className='card w-75 p-3 mx-auto mt-5'>
        <Formik 
            initialValues = {listarActualizar}      
            enableReinitialize = {true}      
            onSubmit={async (values) => {
                console.log(values)

                try{

                    let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
                    let regex3 = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

                     // Capitalizar la primera letra de nombre, apellido y dirección
                    values.nombre = primeraMayuscula(values.nombre);
                    values.apellido = primeraMayuscula(values.apellido);
                    values.direccion = primeraMayuscula(values.direccion);

                    if(
                        values.nombre =="" || values.apellido =="" || values.telefono == "" || values.direccion =="" || values.email ==""
                    ) {
                        Swal.fire({
                        icon: 'error',
                        title: 'Campos Vacíos',
                        text: 'Debe completar los campos',
                                
                        })
 
                    }else if(
                        !regex.test(values.nombre) || letraRepetida(values.nombre) ||
                        values.nombre.length < 2 || values.nombre.length > 40
                    ) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Nombre Inválido',
                            text: (
                                !regex.test(values.nombre) ? 'El campo solo debe incluir letras' :
                                letraRepetida(values.nombre) ? 'El campo no debe consistir en una sola letra repetitiva' :
                                values.nombre.length < 2 || values.nombre.length > 40 ? 'El campo debe contener entre 2 y 40 caracteres' :
                                'Nombre inválido'
                            )                           
                        })  

                    }else if(
                        !regex.test(values.apellido) || letraRepetida(values.apellido) ||
                        values.apellido.length < 2 || values.apellido.length > 40
                    ) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Apellido Inválido',
                            text: (
                                !regex.test(values.apellido) ? 'El campo solo debe incluir letras' :
                                letraRepetida(values.apellido) ? 'El campo no debe consistir en una sola letra repetitiva' :
                                values.apellido.length < 2 || values.apellido.length > 40 ? 'El campo debe contener entre 2 y 40 caracteres' :
                                'Apellido inválido'
                            )                                
                        })   
                     
                    }else if(
                        values.telefono === "0" || /^0+$/.test(values.telefono) || values.telefono.length < 10 
                        || values.telefono.length > 10 || values.telefono.charAt(0) === '0' || !/^\d+$/.test(values.telefono)
                    ) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Teléfono Inválido',
                            text: (
                                values.telefono === "0" ? 'El campo no debe ser 0' :
                                /^0+$/.test(values.telefono) ? 'El campo no debe consistir en 0 repetitivo' :
                                values.telefono.length < 10 || values.telefono.length > 10 ? 'El campo debe contener entre 10 y 11 caracteres' :
                                values.telefono.charAt(0) === '0' ? 'El campo no debe comenzar en 0' :
                                !/^\d+$/.test(values.telefono) ? 'El campo debe contener caracteres numéricos' :
                                'Documento inválido'
                            )                               
                        })

                    }else if (
                        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s#]+$/.test(values.direccion) || /^#+$/.test(values.direccion) ||
                        values.direccion.length < 7 || values.direccion.length > 40 || values.direccion === "0" ||
                        /^0+$/.test(values.direccion) || values.direccion.charAt(0) === '0'
                    ) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Dirección Inválida',
                            text: (
                                /^#+$/.test(values.direccion) ? 'El campo no debe ser "#" o "##"' :
                                values.direccion.length < 7 || values.direccion.length > 40 ? 'El campo debe contener entre 7 y 40 caracteres' :
                                values.direccion === "0" ? 'El campo no debe ser "0"' :
                                /^0+$/.test(values.documento) ? 'El campo no debe consistir en 0 repetitivo' : 
                                values.documento.charAt(0) === '0' ? 'El campo no debe comenzar en 0' :
                                'Dirección inválida'
                            )                                
                        })
                        
                    }else if(!regex3.test(values.email)){
                        Swal.fire({
                            icon: 'error',
                            title: 'Correo Electrónico Inválido',
                            text: 'Ingrese un correo válido',                            
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
                            }).then(async (result) => {
                                if (result.isConfirmed) {

                                    try {
                                        // Realizar la actualización del cliente
                                        await putActualizarCliente(params.documento, values);

                                        // Navegar a la página "/cliente" después de la actualización exitosa
                                        navigate("/cliente");

                                        // Mostrar mensaje de éxito
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Actualización Exitosa',
                                            text: 'Su Archivo Ha Sido Actualizado.'
                                        });
                                    } catch (error) {
                                        console.log(error);
                                        // Manejo de errores durante la actualización
                                    }
                            } else if (
                                    /* Read more about handling dismissals below */
                                result.dismiss === Swal.DismissReason.cancel
                                ) {
                                swalWithBootstrapButtons.fire(
                                    'Actualización Cancelada',
                                    'Su Archivo Está Seguro',
                                    'error'
                                )                                       
                            }
                                                              
                        })
                                
                    } 
                  
                } catch (error) {
                    console.log(error)
                }

                } 

            }
        >
            {
                ({handleChange, handleSubmit, values}) => (
                    <Form  onSubmit={handleSubmit} className='row g-3'>
                <div className="col-md-6">
                    <label htmlFor="tipo_documento">Tipo Documento <span style={{ color: "red" }}>*</span></label>
                    <select className="form-select" name="tipo_documento" id="tipo_documento" onChange={handleChange} value={values.tipo_documento} readOnly>
                        <option value="CC">CC</option>
                        <option value="CE">CE</option>
                    </select>
                </div>        
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
                    <label htmlFor="email">Email</label>
                    <input type="text" name='email' onChange={handleChange} value={values.email} className="form-control"/>
                </div>   
                <div className="col-md-12">
                    <label htmlFor="direccion">Dirección</label>
                    <input type="text" name='direccion' onChange={handleChange} value={values.direccion} className="form-control"/>
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
                </div>
            </div>
        </div>
        </>
    )
}

export default UpdateCliente