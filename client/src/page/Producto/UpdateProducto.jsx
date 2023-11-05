import { useNavigate } from "react-router-dom"
import { putActualizarProductos, getListarProducto } from '../../api/Rutas.producto'
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

function UpdateProducto(){

    const params = useParams()
    const navigate = useNavigate()

    const [listarProducto, setListarProducto] = useState(
        {
            id_producto: '',
            fk_categoria: '',
            nombre_producto: '',
            precio: '',
            imagen: '',
            stock: '',

        })

        useEffect (() => {

            async function productoActualizar (){

                try{
                
                    const productoUpdate = await getListarProducto(params.id_producto)
                    const response = productoUpdate.data
        
                    setListarProducto({
                        id_producto: response.id_producto,
                        fk_categoria: response.fk_categoria,
                        nombre_producto: response.nombre_producto,
                        precio: response.precio,
                        imgane: response.imagen,
                        stock: response.stock
                    })
                } catch (error) {
                    console.log(error)
                }
            }
 
    productoActualizar()

        }, [params.id_producto])

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
            initialValues = {listarProducto}      
            enableReinitialize = {true}      
            onSubmit={async (values) => {
                console.log(values)

                try {
                    let Caracteres = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
                    let NumberPattern = /^[0-9]+$/;
                    if(values.nombre_producto =="" || values.precio =="" || values.stock =="" || values.imagen=="" ){
                        Swal.fire({
                            icon: 'error',
                            title: 'Campos Vacios',
                            text: 'Por favor ingresar datos!',
                            
                          })
                    }else if((!Caracteres.test(values.nombre_producto))){
                        Swal.fire({
                            icon: 'error',
                            title: 'Nombre Producto',
                            text: 'Por favor ingresar solo letras!',
                            
                          })
                    }else if((!NumberPattern.test(values.stock))){
                        Swal.fire({
                            icon: 'error',
                            title: 'Cantidad',
                            text: 'Por favor ingresar solo numeros!',
                            
                          })
                    }else if((!NumberPattern.test(values.precio))){
                        Swal.fire({
                            icon: 'error',
                            title: 'Precio',
                            text: 'Por favor ingresar solo numeros!',
                            
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
                            title: 'Confirmar en envio del formulario?',
                            text: "You won't be able to revert this!",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Aceptar!',
                            cancelButtonText: 'Cancelar!',
                            reverseButtons: true
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              // Línea de código importante para cambiar de tipo "button" a "submit"
                              await putActualizarProductos(params.id_producto, values);
                              navigate("/producto");
                      
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
                <label htmlFor="id_producto">Id</label>
                <input type="text" name='id_producto' onChange={handleChange} value={values.id_producto} className="form-control" readOnly/>
                </div>

                <div className="col-md-6">
                <label htmlFor="fk_categoria">Categoria</label>
                <input type="text" name='fk_categoria' onChange={handleChange} value={values.fk_categoria} className="form-control"/>
                </div>

                <div className="col-md-6"> 
                <label htmlFor="nombre_producto">Nombre</label>
                <input type="text" name='nombre_producto' onChange={handleChange} value={values.nombre_producto} className="form-control"/>
                </div>

                <div className="col-md-6">
                <label htmlFor="precio">Precio</label>
                <input type="text" name='precio' onChange={handleChange} value={values.precio} className="form-control"/>
                </div>

                <div className="col-md-6">
                <label htmlFor="imagen">Imagen</label>
                <input type="text" name='imagen' onChange={handleChange} value={values.imagen} className="form-control"/>
                </div>

                <div className="col-md-6">
                <label htmlFor="stock">Stock</label>
                <input type="text" name='stock' onChange={handleChange} value={values.stock} className="form-control"/>
                </div>      

                <div className='col-auto'>
                <button className='btn btn-primary' type='submit'>Actualizar</button>
                </div>

                <div className='col-auto'>
                <a className='btn btn-danger' href='/producto' type='submit'>Cancelar</a>
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

export default UpdateProducto