import { loginIngreso } from "../../api/Usuario/rutas.api";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import  { useState } from 'react';

function Login(){

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, contrasena } = values;
    try {
      const response = await loginIngreso(email, contrasena);
      console.log('Valores enviados:', response);
  
      if (response.token) {
        localStorage.setItem('token', response.token);
        navigate('/usuario');
      } else {
        setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión, inténtalo de nuevo.');
    }
    setSubmitting(false);
  };
  
return( 

  <>   
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

   <div className="card p-5">

   <img src="../img/PubliGrafit.png" style={{width:350}}/>
      {error && <div className="alert alert-danger">{error}</div>}
      <Formik initialValues={{
        email:"",
        contrasena:""
      }
      } onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            
            <div>
              <label htmlFor="email">Correo electrónico:</label>
              <Field type="email" id="email" name="email"   className="form-control" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label htmlFor="contrasena">Contraseña:</label>
              <Field type="password" id="contrasena" name="contrasena" className="form-control" />
              <ErrorMessage name="contrasena" component="div" />
            </div>
            
            <br />
            <div className="d-grid gap-2">
              <button type="submit" disabled={isSubmitting} className="btn btn-primary" >
                Iniciar sesión
              </button>
              <span><a href="">Recuperar Contraseña</a></span>

            </div>
          </Form>
        )}
      </Formik>
    </div>
   </div> 
    </>

)

}

export default Login