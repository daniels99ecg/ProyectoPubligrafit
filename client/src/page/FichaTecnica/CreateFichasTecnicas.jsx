import { Formik, Field, Form } from 'formik';
import Nav from '../../components/nav';
import { useFichaTecnica } from '../../context/FichasTecnicas/FichaTecnicaContext';


function CreateFichaTecnica() {
  const {validacionFichaTecnica}=useFichaTecnica()


  return (
    <>
      <Nav />
      <div className='dashboard-app'>
        <div className='dashboard-content'>
          <div className='container'>
            <div className='card'>
              <div className='card-body'>
              <div className="card-header">
                        <h1>Registrar Ficha Tecnica</h1>
                      </div>
                <br />
                <div className='card w-75 p-3 mx-auto mt-5'>
                  <Formik
                    initialValues={{
                      id_ft: '',
                      fk_insumo: '',
                      cantidad_insumo: '',
                      costo_insumo: '',
                      imagen_producto_final: '',
                      costo_final_producto: '',
                      detalle: ''
                    }}
                    onSubmit={async (values) => {
                        validacionFichaTecnica(values)
                    }}
                  >
                    {({ handleChange,handleSubmit, values }) => (
                        <Form onSubmit={handleSubmit} className='row g-3' id='pruebas' >
                        <div className="col-md-6 ">
                        <label htmlFor="fk_insumo">Insumo</label>
                        <Field type="text" name='fk_insumo' className="form-control" />
                        </div>
                        <div className="col-md-6 ">
                        <label htmlFor="Cantidad">Cantidad de Insumos</label>
                        <Field type="text" name='cantidad_insumo' className="form-control" />
                        </div>
                        <div className="col-md-6 ">
                        <label htmlFor="Costo">Costo del Insumo</label>
                        <Field type="text" name='costo_insumo' className="form-control" />
                        </div>
                        <div className="col-md-6">
                        <label htmlFor="Imagen">Imagen</label>
                        <Field type="file" name='imagen_producto_final' className="form-control" />
                        </div>
                        <div className="col-md-6 ">
                        <label htmlFor="Costo_Final">Costo Final</label>
                        <Field type="text" name='costo_final_producto' className="form-control" />
                        </div>
                        <div className="col-md-6 ">
                        <label htmlFor="Detalle">Detalles</label>
                        <Field type="text" name='detalle' className="form-control" />
                        </div>
                        <br />
                        
                        <div  className="col-auto">
                            <button  className="btn btn-primary">Registrar</button>
                        </div>
                        
                        <div  className="col-auto">
                            <a href='/fichaTecnica' className='btn btn-danger'>Cancelar</a>
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

export default CreateFichaTecnica;