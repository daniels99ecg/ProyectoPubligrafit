import { Form, Formik } from 'formik';
import Nav from '../../components/nav';
import { useCliente } from "../../context/Clientes/ClienteContext";

function CreateCliente() {
    const {validacionCliente} = useCliente()

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
                                            tipo_documento: 'CC',
                                            documento: '',
                                            nombre: '',
                                            apellido: '',
                                            telefono: '',
                                            direccion: '',
                                            email: ''
                                        }}
                                        onSubmit={async (values, { resetForm }) => {
                                            validacionCliente(values)
                                        }}
                                    >
                                        {({ handleChange, handleSubmit, values }) => (
                                            <Form onSubmit={handleSubmit} className='row g-3'>
                                                <div className="col-md-6">
                                                    <label htmlFor="tipo_documento">Tipo Documento <span style={{ color: "red" }}>*</span></label>
                                                    <select className="form-select" name="tipo_documento" id="tipo_documento" onChange={handleChange} value={values.tipo_documento}>
                                                        <option value="CC">CC</option>
                                                        <option value="CE">CE</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="documento">Documento <span style={{ color: "red" }}>*</span></label>
                                                    <input type="text" name='documento' onChange={handleChange} value={values.documento} className="form-control" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="nombre">Nombre <span style={{ color: "red" }}>*</span></label>
                                                    <input type="text" name='nombre' onChange={handleChange} value={values.nombre} className="form-control" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="apellido">Apellido <span style={{ color: "red" }}>*</span></label>
                                                    <input type="text" name='apellido' onChange={handleChange} value={values.apellido} className="form-control" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="telefono">Teléfono <span style={{ color: "red" }}>*</span></label>
                                                    <input type="text" name='telefono' onChange={handleChange} value={values.telefono} className="form-control" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="email">Email <span style={{ color: "red" }}>*</span></label>
                                                    <input type="text" name='email' onChange={handleChange} value={values.email} className="form-control" />
                                                </div>
                                                <div className="col-md-12">
                                                    <label htmlFor="direccion">Dirección <span style={{ color: "red" }}>*</span></label>
                                                    <input type="text" name='direccion' onChange={handleChange} value={values.direccion} className="form-control" />
                                                </div>
                                                <div className='col-auto'>
                                                    <button className='btn btn-primary' type="submit">Guardar</button>
                                                </div>
                                                <div className='col-auto'>
                                                    <a className='btn btn-danger' href='/cliente'>Cancelar</a>
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

export default CreateCliente;