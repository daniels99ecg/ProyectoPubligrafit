import { loginIngreso } from "../../api/rutas.api";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';

function Login(){

   
  const navigate = useNavigate();

    const handleSubmit =async (values, { setSubmitting }) => {
      const { email, contrasena } = values;
      try{
        const response=await loginIngreso(email, contrasena)
        console.log('Valores enviados:', response.data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/usuario'); 
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      navigate('/ruta-no-exitosa'); 

    }
      setSubmitting(false);
    };
  


    
return( 
    <div className="card w-25 text-center p-5">
      <h2>Iniciar sesión</h2>
      <Formik initialValues={{
        email:"",
        contrasena:""
      }
      } onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            
            <div>
              <label htmlFor="email">Correo electrónico:</label>
              <Field type="email" id="email" name="email" clasName="form-control"  className="form-control" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label htmlFor="contrasena">Contraseña:</label>
              <Field type="password" id="contrasena" name="contrasena" className="form-control" />
              <ErrorMessage name="contrasena" component="div" />
            </div>
            <br />
            <div>
              <button type="submit" disabled={isSubmitting} className="btn btn-primary" >
                Iniciar sesión
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
)

}

export default Login