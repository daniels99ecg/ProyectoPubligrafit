import { cambiarContrasena } from "../../api/Usuario/rutas.api";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';  // Importa Yup

function RecuperarContrasena() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Define el esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Correo electrónico inválido').required('Campo requerido'),
    contrasena: Yup.string().min(8, 'Mínimo 8 caracteres').required('Campo requerido').matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
      'Debe contener al menos una letra, un número y un carácter especial'
    ),
  });

  const handleRecuperarContrasena = async (values, { setSubmitting }) => {
    const { email, contrasena } = values;
    try {
      await cambiarContrasena(email, contrasena);
      Swal.fire({
        icon: 'success',
        title: 'Contraseña Cambiada.',
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
      setError('Este correo no está registrado en la base de datos.');
      console.error('Error al cambiar la contraseña:', error);
    }
    setSubmitting(false);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="card p-5">
          <img src="../img/PubliGrafit.png" style={{ width: 350 }} />
          {error && <div className="alert alert-danger">{error}</div>}
          <Formik
            initialValues={{
              email: "",
              contrasena: "",
            }}
            onSubmit={handleRecuperarContrasena}
            validationSchema={validationSchema} // Asigna el esquema de validación
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                  <label htmlFor="email">Correo electrónico:</label>
                  <Field type="email" id="email" name="email" className="form-control" />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>
                <div>
                  <label htmlFor="contrasena">Nueva Contraseña:</label>
                  <Field type="password" id="contrasena" name="contrasena" className="form-control" />
                  <ErrorMessage name="contrasena" component="div" className="text-danger" />
                </div>
                <br />
                <div className="d-grid gap-2">
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                    Recuperar Contraseña
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default RecuperarContrasena;
