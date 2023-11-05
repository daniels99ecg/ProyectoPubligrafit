import { useNavigate } from "react-router-dom"
import { putActualizarInsumos, getListarInsumo } from '../../api/Rutas.api'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Formik } from 'formik' 
import Swal from 'sweetalert2'
import Nav from '../../componentes/nav'


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

function UpdateInsumo(){

    const params = useParams()
    const navigate = useNavigate()

    const [listarInsumo, setListarInsumo] = useState(
        {
            id_insumo: '',
            nombre: '',
            precio: '',
            cantidad: '' 

        })

        useEffect (() => {

            async function insumoActualizar (){

                try{
                
                    const insumoUpdate = await getListarInsumo(params.id_insumo)
                    const response = insumoUpdate.data
        
                    setListarInsumo({
                        id_insumo: response.id_insumo,
                        nombre: response.nombre,
                        precio: response.precio,
                        cantidad: response.cantidad
                    })
                } catch (error) {
                    console.log(error)
                }
            }
 
    insumoActualizar()

        }, [params.id_insumo])

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
            initialValues = {listarInsumo}      
            enableReinitialize = {true}      
            onSubmit={async (values) => {
                console.log(values)

                try {
                    let Caracteres = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
                    let NumberPattern = /^[0-9]+$/;
                  
                    if (values.nombre === "" || values.precio === "" || values.cantidad === "") {
                      Swal.fire({
                        icon: 'error',
                        title: 'Campos Vacíos',
                        text: 'Por favor ingrese datos.',
                      });
                    } else if (!Caracteres.test(values.nombre)) {
                      Swal.fire({
                        icon: 'error',
                        title: 'Nombre',
                        text: 'Por favor ingrese solo letras.',
                      });
                    } else if (!NumberPattern.test(values.cantidad)) {
                      Swal.fire({
                        icon: 'error',
                        title: 'Cantidad',
                        text: 'Por favor ingrese solo números.',
                      });
                    } else if (!NumberPattern.test(values.precio)) {
                      Swal.fire({
                        icon: 'error',
                        title: 'Precio',
                        text: 'Por favor ingrese solo números.',
                      });
                    } else {
                      const swalWithBootstrapButtons = Swal.mixin({
                        customClass: {
                          confirmButton: 'btn btn-success',
                          cancelButton: 'btn btn-danger'
                        },
                        buttonsStyling: false
                      });
                  
                      swalWithBootstrapButtons.fire({
                        title: '¿Confirmar el envío del formulario?',
                        text: "No podrá revertir esto.",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Aceptar',
                        cancelButtonText: 'Cancelar',
                        buttons: true
                      }).then(async (result) => {
                        if (result.isConfirmed) {
                          // Línea de código importante para cambiar de tipo "button" a "submit"
                          await putActualizarInsumos(params.id_insumo, values);
                          navigate("/insumo");
                  
                          swalWithBootstrapButtons.fire(
                            '¡Insumo Actualizado!',
                            'Su archivo ha sido eliminado.',
                            'success'
                          );
                        } else if (result.dismiss === Swal.DismissReason.cancel) {
                          swalWithBootstrapButtons.fire(
                            'Se canceló el envío para la actualización',
                            'Su archivo imaginario está a salvo :)',
                            'error'
                          );
                        }
                      });
                    }
                  } catch (error) {
                    console.log(error);
                  }

                } 

            }
        >
            {
                ({handleChange, handleSubmit, values}) => (
                    <Form  onSubmit={handleSubmit} className='row g-3'>
                <div className="col-md-6">
                <label htmlFor="id_insumo">Id</label>
                <input type="text" name='id_insumo' onChange={handleChange} value={values.id_insumo} className="form-control" readOnly/>
                </div>

                <div className="col-md-6">
                <label htmlFor="nombre">Nombre</label>
                <input type="text" name='nombre' onChange={handleChange} value={values.nombre} className="form-control"/>
                </div>

                <div className="col-md-6">
                <label htmlFor="precio">Precio</label>
                <input type="text" name='precio' onChange={handleChange} value={values.precio} className="form-control"/>
                </div>

                <div className="col-md-6"> 
                <label htmlFor="cantidad">Cantidad</label>
                <input type="text" name='cantidad' onChange={handleChange} value={values.cantidad} className="form-control"/>
                </div>   

                <div className='col-auto'>
                <button className='btn btn-primary' type='submit'>Actualizar</button>
                </div>

                <div className='col-auto'>
                <a className='btn btn-danger' href='/insumo' type='submit'>Cancelar</a>
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

export default UpdateInsumo