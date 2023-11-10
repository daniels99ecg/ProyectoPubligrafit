
import { Formik, Field, Form } from 'formik';
import Nav from '../../components/nav';
import { useInsumo } from '../../context/Insumos/InsumoContext';


function CreateInsumo() {
  const {validacionInsumo}=useInsumo()


  return (
    <>
      <Nav />
      <div className='dashboard-app'>
        <div className='dashboard-content'>
          <div className='container'>
            <div className='card'>
              <div className='card-body'>
              <div className="card-header">
                        <h1>Registrar Insumo</h1>
                      </div>
                <br />
                <div className='card w-75 p-3 mx-auto mt-5'>
                  <Formik
                    initialValues={{
                      id_insumo: '',
                      nombre: '',
                      precio: '',
                      cantidad: ''
                    }}
                    onSubmit={async (values) => {
                        validacionInsumo(values)
                    }}
                  >
                    {({ handleChange, values }) => (
                      <Form className='row g-3'>
                        <div className="col-md-12 mx-auto">
                          <label htmlFor="nombre">Nombre</label>
                          <Field type="text" name='nombre' className="form-control" />
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="precio">Precio</label>
                          <Field type="text" name='precio' className="form-control" />
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="cantidad">Cantidad</label>
                          <Field type="text" name='cantidad' className="form-control" />
                        </div>

                        <div className='col-auto'>
                          <button className='btn btn-primary' type='submit'>Registrar</button>
                        </div>

                        <div className='col-auto'>
                          <a className='btn btn-danger' href='/insumo' type='submit'>Cancelar</a>
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

export default CreateInsumo;