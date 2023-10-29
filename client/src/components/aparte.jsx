import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { postCrearClientes, validarDocumento } from "../api/Rutas.Cliente.api"; // Importa la función para verificar la existencia del documento
import { Form, Formik } from "formik";
import Nav from "../components/nav";
import Header from "../components/header";

function CreateCliente() {
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    try {
      // Verificar si el documento ya existe en la base de datos
      const documentoExistente = await validarDocumento(values.documento);
      if (documentoExistente) {
        Swal.fire({
          icon: "error",
          title: "Documento Existente",
          text: "El documento ya existe en la base de datos",
        });
      } else {
        // El documento no existe, puedes proceder con la creación
        const response = await postCrearClientes(values);
        if (response.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Registro Exitoso",
            text: "Tu Archivo Ha Sido Registrado",
          });
          navigate("/cliente");
        } else if (response.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.data.error,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ha ocurrido un error al registrar el cliente",
          });
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error al registrar el cliente",
      });
    }
  };

  return (
    <div className="page-flex">
      <Nav />

      <div className="main-wrapper">
        <Header />
        <br />
        <div className="card w-75 p-3 mx-auto mt-5">
          <Formik
            initialValues={{
              documento: "",
              nombre: "",
              apellido: "",
              telefono: "",
              direccion: "",
              email: "",
            }}
            onSubmit={(values) => {
              handleFormSubmit(values); // Llama a la función actualizada para el manejo del formulario
            }}
          >
            {({ handleChange, handleSubmit, values }) => (
              <Form onSubmit={handleSubmit} className="row g-3">
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

                {/* Resto de tus campos de formulario aquí */}
                {/* ... */}

                <div className="col-auto">
                  <button className="btn btn-primary" type="submit">
                    Guardar
                  </button>
                </div>

                <div className="col-auto">
                  <a className="btn btn-danger" href="/cliente" type="submit">
                    Cancelar
                  </a>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default CreateCliente;
