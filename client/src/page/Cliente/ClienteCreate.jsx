import { ErrorMessage, Formik, Field } from "formik"
import { postCrearClientes } from "../../api/Rutas.Cliente.api";
import { useCliente } from "../../context/Clientes/ClienteContext";
import { MenuItem, TextField } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

import * as Yup from "yup";
import Swal from "sweetalert2";

function CreateCliente({ handleCloseModal }) {
  const { primeraMayuscula } = useCliente();
  const validationSchema = Yup.object().shape({
    documento: Yup.string()
      .min(6, "El documento debe tener al menos 6 caracteres")
      .max(12, "El documento no puede tener más de 12 caracteres")
      .matches(/^[0-9]+$/, {
        message: "El campo debe contener solo números",
        excludeEmptyString: true,
      })
      .required("Este campo es requerido"),
    nombre: Yup.string()
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El campo debe contener letras")
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(40, "El nombre no puede tener más de 40 caracteres")
      .test(
        "no-leading-trailing-space",
        "El nombre no puede empezar ni terminar con un espacio en blanco",
        (value) => !/^\s|\s$/.test(value)
      )
      .required("Este campo es requerido"),
    apellido: Yup.string()
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El campo debe contener letras")
      .min(2, "El apellido debe tener al menos 2 caracteres")
      .max(40, "El apellido no puede tener más de 40 caracteres")
      .test(
        "no-leading-trailing-space",
        "El apellido no puede empezar ni terminar con un espacio en blanco",
        (value) => !/^\s|\s$/.test(value)
      )
      .required("Este campo es requerido"),
    telefono: Yup.string()
      .min(10, "El teléfono debe tener 10 caracteres")
      .max(10, "El teléfono debe tener 10 caracteres")
      .matches(/^[0-9]+$/, {
        message: "El campo debe contener solo números",
        excludeEmptyString: true,
      })
      .required("Este campo es requerido"),
    direccion: Yup.string()
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d.#\-]+$/, "Dirección inválida")
      .min(7, "La dirección debe tener al menos 7 caracteres")
      .max(40, "La dirección no puede tener más de 40 caracteres")
      .test(
        "no-leading-trailing-space",
        "La dirección no puede empezar ni terminar con un espacio en blanco",
        (value) => !/^\s|\s$/.test(value)
      )
      .required("Este campo es requerido"),
    email: Yup.string()
      .test(
        "has-at-sign",
        "El email debe contener al menos un '@'",
        (value) => value && value.includes("@")
      )
      .test(
        "has-domain",
        "El email debe contener al menos un dominio válido '.com' '.co'",
        (value) => {
          const domainRegex = /\.(com|net|org|edu|gov)$/; // Ajusta los dominios permitidos según tus necesidades
          return domainRegex.test(value);
        }
      )
      .test(
        "no-leading-trailing-space",
        "El email no puede empezar ni terminar con un espacio en blanco",
        (value) => !/^\s|\s$/.test(value)
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
              <h5>Registrar cliente</h5>

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
                      values.nombre = primeraMayuscula(values.nombre);
                      values.apellido = primeraMayuscula(values.apellido);
                      values.direccion = primeraMayuscula(values.direccion);
                      values.email = values.email.toLowerCase();

                      const swalWithBootstrapButtons = Swal.mixin({
                        customClass: {
                          confirmButton: "btn btn-success me-3",
                          cancelButton: "btn btn-danger",
                        },
                        buttonsStyling: false,
                      });

                      Swal
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
                                } else {
                                  Swal
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
  type="text"
  name="documento"
  id="documento"
  as={TextField}
  label="Documento"
  placeholder="Número de documento"
  value={values.documento}
  error={touched.documento && Boolean(errors.documento)}
  InputProps={{
    endAdornment: (
      <div style={{ display: "flex" }}>
        {touched.documento && !errors.documento && (
          <CheckCircleIcon style={{ color: "green" }} />
        )}
        {touched.documento && errors.documento && (
          <ErrorIcon style={{ color: "red" }} />
        )}
      </div>
    ),
  }}
/>
      <ErrorMessage
        name="documento"
        component="small"
        className="error-message"
      />
                        
                      </div>
                      <div className="col-md-6">
                        <Field
                          type="text"
                          name="nombre"
                          id="nombre"
                          as={TextField}
                          label="Nombre"
                          placeholder="Rocco"
                          value={values.nombre}
                          error={touched.nombre && Boolean(errors.nombre)}
  InputProps={{
    endAdornment: (
      <div style={{ display: "flex" }}>
        {touched.nombre && !errors.nombre && (
          <CheckCircleIcon style={{ color: "green" }} />
        )}
        {touched.nombre && errors.nombre && (
          <ErrorIcon style={{ color: "red" }} />
        )}
      </div>
    ),
  }}
/>
                        <ErrorMessage
                          name="nombre"
                          component="small"
                          className="error-message"
                        />
                      </div>
                      <div className="col-md-6">
                        <Field
                          type="text"
                          name="apellido"
                          id="apellido"
                          as={TextField}
                          label="Apellido"
                          placeholder="Gráficas"
                          value={values.apellido}
                          error={touched.apellido && Boolean(errors.apellido)}
                          InputProps={{
                            endAdornment: (
                              <div style={{ display: "flex" }}>
                                {touched.apellido && !errors.apellido && (
                                  <CheckCircleIcon style={{ color: "green" }} />
                                )}
                                {touched.apellido && errors.apellido && (
                                  <ErrorIcon style={{ color: "red" }} />
                                )}
                              </div>
                            ),
                          }}
                        />
                                                <ErrorMessage
                                                  name="apellido"
                                                  component="small"
                                                  className="error-message"
                                                />
                      </div>
                      <div className="col-md-6">
                        <Field
                          type="text"
                          name="telefono"
                          as={TextField}
                          label="Teléfono"
                          placeholder="1234567890"
                          value={values.telefono}
                          error={touched.telefono && Boolean(errors.telefono)}
                          InputProps={{
                            endAdornment: (
                              <div style={{ display: "flex" }}>
                                {touched.telefono && !errors.telefono && (
                                  <CheckCircleIcon style={{ color: "green" }} />
                                )}
                                {touched.telefono && errors.telefono && (
                                  <ErrorIcon style={{ color: "red" }} />
                                )}
                              </div>
                            ),
                          }}
                        />
                                                <ErrorMessage
                                                  name="telefono"
                                                  component="small"
                                                  className="error-message"
                                                />
                      </div>
                      <div className="col-md-6">
                      <Field
    type="text"
    name="email"
    id="email"
    as={TextField}
    label="Email"
    placeholder="correo@correo.com"
    value={values.email}
    error={touched.email && Boolean(errors.email)}
    InputProps={{
      endAdornment: (
        <div style={{ display: "flex" }}>
          {touched.email && !errors.email && (
            <CheckCircleIcon style={{ color: "green" }} />
          )}
          {touched.email && errors.email && (
            <ErrorIcon style={{ color: "red" }} />
          )}
        </div>
      ),
    }}
  />
  <ErrorMessage
    name="email"
    component="small"
    className="error-message"
  />
                      </div>
                      <div className="col-md-12">
                      <Field
  type="text"
  name="direccion"
  as={TextField}
  label="Dirección"
  placeholder="Cl. 42 # 68-38"
  value={values.direccion}
  error={touched.direccion && Boolean(errors.direccion)}
  sx={{ width: "100%" }}
  InputProps={{
    endAdornment: (
      <div style={{ display: "flex" }}>
        {touched.direccion && !errors.direccion && (
          <CheckCircleIcon style={{ color: "green" }} />
        )}
        {touched.direccion && errors.direccion && (
          <ErrorIcon style={{ color: "red" }} />
        )}
      </div>
    ),
  }}
/>

<ErrorMessage
  name="direccion" // Corrige el nombre del campo aquí
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
