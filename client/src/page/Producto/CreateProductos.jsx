   import { Formik, Field, Form } from 'formik';
   import Nav from '../../componentes/nav';
   import { useProducto } from '../../context/Productos/ProductoContext';
   
   
   function CreateProducto() {
     const {validacionProducto}=useProducto()
   
   
     return (
       <>
         <Nav />
         <div className='dashboard-app'>
           <div className='dashboard-content'>
             <div className='container'>
               <div className='card'>
                 <div className='card-body'>
                   <br />
                   <div className='card w-75 p-3 mx-auto mt-5'>
                     <Formik
                       initialValues={{
                         id_producto: '',
                         fk_categoria: '',
                         nombre_producto: '',
                         precio: '',
                         imagen: '',
                         stock: ''
                       }}
                       onSubmit={async (values) => {
                           await validacionProducto(values)
                       }}
                     >
                       {({ handleChange, values }) => (
                         <Form className='row g-3'>
                           <div className="col-md-6 ">
                            <label htmlFor="fk_categoria">Categoria</label>
                            <Field type="text" name='fk_categoria' className="form-control" />
                            </div>
                            <div className="col-md-6 ">
                            <label htmlFor="nombre_producto">Nombre</label>
                            <Field type="text" name='nombre_producto' className="form-control" />
                            </div>
                            <div className="col-md-6 ">
                            <label htmlFor="precio">Precio</label>
                            <Field type="text" name='precio' className="form-control" />
                            </div>
                            <div className="col-md-6">
                            <label htmlFor="imagen">Imagen</label>
                            <Field type="text" name='imagen' className="form-control" />
                            </div>
                            <div className="col-md-12 mx-auto ">
                            <label htmlFor="stock">Stock</label>
                            <Field type="text" name='stock' className="form-control" />
                            </div>

                            <div className='col-auto'>
                              <button className='btn btn-primary' type='submit'>Registrar</button>
                            </div>

                            <div className='col-auto'>
                              <a className='btn btn-danger' href='/producto' type='submit'>Cancelar</a>
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
     );
   }
   
   export default CreateProducto;

