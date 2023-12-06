import * as Yup from "yup";
import { useEffect } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { useCliente } from "../../context/Clientes/ClienteContext";
import Swal from "sweetalert2";
import { putActualizarCliente } from "../../api/Rutas.Cliente.api";

function UpdateCliente({ handleCloseUpdateModal, clienteId }) {
  const { listarActualizar, clienteActualizar } = useCliente();

  const validationSchema = Yup.object().shape({
    documento: Yup.number()
      .typeError("El documento debe ser un número")
      .positive("El documento debe ser un número positivo")
      .integer("El documento debe ser un número entero")
      .min(8, "El documento debe tener al menos 8 caracteres")
      .max(99999999999, "El documento no puede tener más de 11 caracteres")
      .required("Este campo es requerido"),
    nombre: Yup.string()
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Nombre inválido")
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(40, "El nombre no puede tener más de 40 caracteres")
      .required("Este campo es requerido"),
    apellido: Yup.string()
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Apellido inválido")
      .min(2, "El apellido debe tener al menos 2 caracteres")
      .max(40, "El apellido no puede tener más de 40 caracteres")
      .required("Este campo es requerido"),
    telefono: Yup.string()
      .matches(/^[1-9]\d*$/, "Teléfono inválido")
      .min(10, "El teléfono debe tener 10 caracteres")
      .max(10, "El teléfono debe tener 10 caracteres")
      .required("Este campo es requerido"),
    direccion: Yup.string()
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d.#\-]+$/, "Dirección inválida")
      .min(7, "La dirección debe tener al menos 7 caracteres")
      .max(40, "La dirección no puede tener más de 40 caracteres")
      .required("Este campo es requerido"),
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("Este campo es requerido"),
  });

  useEffect(() => {
    clienteActualizar(clienteId);
  }, [clienteId]);

  const handleConfirmation = async (values) => {
    await putActualizarCliente(clienteId, values);
    Swal.fire({
      icon: "success",
      title: "Actualización exitosa",
      text: "Su archivo ha sido actualizado.",
    });
    handleCloseUpdateModal();
  };

  const handleCancel = () => {
    Swal.fire("Actualización cancelada", "Su archivo está seguro", "error");
  };

  const handleFormSubmit = async (values) => {
    try {
      const result = await Swal.fire({
        title: "Confirmar actualización?",
        text: "Tu registro será actualizado",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        buttons: true,
      });
      

      if (result.isConfirmed) {
        handleConfirmation(values);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        handleCancel();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="dashboard-app">
        <div className="dashboard-content">
          <div className="container">
            <div className="card">
              <div className="card-body">
                <br />

                <Formik
                  initialValues={listarActualizar}
                  enableReinitialize={true}
                  validationSchema={validationSchema}
                  onSubmit={handleFormSubmit}
                >
                  {({ handleSubmit, values, errors, touched }) => (
                    <form onSubmit={handleSubmit} className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="tipo_documento">
                          Tipo Documento <span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          className="form-select"
                          name="tipo_documento"
                          id="tipo_documento"
                        >
                          <option value="CC">CC</option>
                          <option value="CE">CE</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="documento">
                          Documento <span style={{ color: "red" }}>*</span>
                        </label>
                        <Field
                          className={`form-control ${
                            errors.documento && touched.documento
                              ? "is-invalid"
                              : touched.documento
                              ? "is-valid"
                              : ""
                          }`}
                          type="text"
                          name="documento"
                          id="documento"
                          placeholder="No. identificación"
                          value={values.documento}
                        />
                        <ErrorMessage
                          name="documento"
                          component="small"
                          className="error-message"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="nombre">
                          Nombre <span style={{ color: "red" }}>*</span>
                        </label>
                        <Field
                          className={`form-control ${
                            errors.nombre && touched.nombre
                              ? "is-invalid"
                              : touched.nombre
                              ? "is-valid"
                              : ""
                          }`}
                          type="text"
                          name="nombre"
                          id="nombre"
                          value={values.nombre}
                        />
                        <ErrorMessage
                          name="nombre"
                          component="small"
                          className="error-message"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="apellido">
                          Apellido <span style={{ color: "red" }}>*</span>
                        </label>
                        <Field
                          className={`form-control ${
                            errors.apellido && touched.apellido
                              ? "is-invalid"
                              : touched.apellido
                              ? "is-valid"
                              : ""
                          }`}
                          type="text"
                          name="apellido"
                          id="apellido"
                          value={values.apellido}
                        />
                        <ErrorMessage
                          name="apellido"
                          component="small"
                          className="error-message"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="telefono">
                          Teléfono <span style={{ color: "red" }}>*</span>
                        </label>
                        <Field
                          className={`form-control ${
                            errors.telefono && touched.telefono
                              ? "is-invalid"
                              : touched.telefono
                              ? "is-valid"
                              : ""
                          }`}
                          type="text"
                          name="telefono"
                          value={values.telefono}
                        />
                        <ErrorMessage
                          name="telefono"
                          component="small"
                          className="error-message"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="email">
                          Email <span style={{ color: "red" }}>*</span>
                        </label>
                        <Field
                          className={`form-control ${
                            errors.email && touched.email
                              ? "is-invalid"
                              : touched.email
                              ? "is-valid"
                              : ""
                          }`}
                          type="text"
                          name="email"
                          id="email"
                          value={values.email}
                        />
                        <ErrorMessage
                          name="email"
                          component="small"
                          className="error-message"
                        />
                      </div>
                      <div className="col-md-12">
                        <label htmlFor="direccion">
                          Dirección <span style={{ color: "red" }}>*</span>
                        </label>
                        <Field
                          className={`form-control ${
                            errors.direccion && touched.direccion
                              ? "is-invalid"
                              : touched.direccion
                              ? "is-valid"
                              : ""
                          }`}
                          type="text"
                          name="direccion"
                          value={values.direccion}
                        />
                        <ErrorMessage
                          name="direccion"
                          component="small"
                          className="error-message"
                        />
                      </div>
                      <div className="col-auto">
                        <button className="btn btn-primary" type="submit">
                          Guardar
                        </button>
                      </div>
                      <div className="col-auto">
                        <a
                          className="btn btn-danger"
                          style={{ textDecoration: "none", outline: "none" }}
                          onClick={handleCloseUpdateModal}
                        >
                          Cancelar
                        </a>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateCliente;
