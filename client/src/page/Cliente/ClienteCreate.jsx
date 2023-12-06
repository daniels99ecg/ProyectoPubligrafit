import { ErrorMessage, Formik, Field } from "formik";
import * as Yup from "yup";
import { postCrearClientes } from "../../api/Rutas.Cliente.api";
import Swal from "sweetalert2";
import { MenuItem, TextField } from "@mui/material";

function CreateCliente({ handleCloseModal }) {
  const validationSchema = Yup.object().shape({
    documento: Yup.string()
      .min(8, "El documento debe tener al menos 8 caracteres")
      .max(99999999999, "El documento no puede tener más de 11 caracteres")
      .required("Este campo es requerido")
      .matches(/^[0-9]+$/, "Documento inválido"),
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
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'El correo electrónico debe contener "@" y dominio ".com"'
      )
      .required("Este campo es requerido"),
  });

  return (
    <>
      <div className="dashboard-app">
        <div className="dashboard-content">
          <div className="container">
            <div className="card">
              <div className="card-body">
                <br />
                <Formik
                  initialValues={{
                    tipo_documento: "CC",
                    documento: "",
                    nombre: "",
                    apellido: "",
                    telefono: "",
                    direccion: "",
                    email: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={async (values, { resetForm }) => {
                    try {
                      const swalWithBootstrapButtons = Swal.mixin({
                        customClass: {
                          confirmButton: "btn btn-success me-3",
                          cancelButton: "btn btn-danger",
                        },
                        buttonsStyling: false,
                      });

                      swalWithBootstrapButtons
                        .fire({
                          title: "Confirmar el registro?",
                          text: "Tu registro será guardado",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonText: "Aceptar",
                          cancelButtonText: "Cancelar",
                          buttons: true,
                        })
                        .then((result) => {
                          if (result.isConfirmed) {
                            postCrearClientes(values)
                              .then((response) => {
                                if (
                                  response.status === 400 &&
                                  response.data.error
                                ) {
                                  Swal.fire({
                                    icon: "error",
                                    title: "Cliente ya registrado",
                                    text: response.data.error,
                                  });
                                } else {
                                  swalWithBootstrapButtons
                                    .fire(
                                      "Registro exitoso!",
                                      "Tu archivo ha sido registrado",
                                      "success"
                                    )
                                    .then(() => {
                                      handleCloseModal();
                                      resetForm();
                                    });
                                }
                              })
                              .catch((error) => {
                                console.error(error);
                                Swal.fire({
                                  icon: "error",
                                  title: "Error en la solicitud",
                                  text: "Documento existente en la base de datos",
                                });
                              });
                          } else if (
                            result.dismiss === Swal.DismissReason.cancel
                          ) {
                            swalWithBootstrapButtons.fire(
                              "Registro cancelado",
                              "Registro no completado",
                              "error"
                            );
                          }
                        });
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                >
                  {({ values, handleSubmit, errors, touched }) => (
                    <form onSubmit={handleSubmit} className="row g-3">
                      <div className="col-md-6">
                        <Field
                          className={`form-select ${
                            errors.tipo_documento && touched.tipo_documento
                              ? "is-invalid"
                              : touched.tipo_documento
                              ? "is-valid"
                              : ""
                          }`}
                          name="tipo_documento"
                          id="tipo_documento"
                          as={TextField}
                          select
                          label="Tipo de Documento"
                          variant="outlined"
                          fullWidth
                        >
                          <MenuItem value="CC">
                            CC - Cédula de ciudadanía
                          </MenuItem>
                          <MenuItem value="CE">
                            CE - Cédula de extranjería
                          </MenuItem>
                          <MenuItem value="TI">
                            TI - Tarjeta de identidad
                          </MenuItem>
                        </Field>
                      </div>
                      <div className="col-md-6">
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
                          as={TextField}
                          label="Documento"
                          placeholder="Número de documento"
                          value={values.documento}
                        />
                        <ErrorMessage
                          name="documento"
                          component="small"
                          className="error-message"
                        />
                      </div>
                      <div className="col-md-6">
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
                          as={TextField}
                          label="Nombre"
                          placeholder="Rocco"
                          value={values.nombre}
                        />
                        <ErrorMessage
                          name="nombre"
                          component="small"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="col-md-6">
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
                          as={TextField}
                          label="Apellido"
                          placeholder="Gráficas"
                          value={values.apellido}
                        />
                        <ErrorMessage
                          name="apellido"
                          component="small"
                          className="error-message"
                        />
                      </div>
                      <div className="col-md-6">
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
                          as={TextField}
                          label="Teléfono"
                          placeholder="1234567890"
                          value={values.telefono}
                        />
                        <ErrorMessage
                          name="telefono"
                          component="small"
                          className="error-message"
                        />
                      </div>
                      <div className="col-md-6">
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
                          as={TextField}
                          label="Email"
                          placeholder="correo@correo.com"
                          value={values.email}
                        />
                        <ErrorMessage
                          name="email"
                          component="small"
                          className="error-message"
                        />
                      </div>
                      <div className="col-md-12">
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
                          as={TextField}
                          label="Dirección"
                          placeholder="Cl. 42 # 68-38"
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
                          onClick={handleCloseModal}
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

export default CreateCliente;
