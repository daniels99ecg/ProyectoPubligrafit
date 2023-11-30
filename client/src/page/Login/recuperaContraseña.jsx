import {  cambiarContrasena } from "../../api/Usuario/rutas.api";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import  { useState } from 'react';


function Login(){

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleRecuperarContrasena = async (values, { setSubmitting }) => {
    const { email,contrasena } = values;
    try {
      await cambiarContrasena(email,contrasena);
      alert('Contraseña cambiada.');
    } catch (error) {
      setError('Este correo no esta registrado en la base de datos.');
      console.error('Error al cambiar la contraseña:', error);
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
      } onSubmit={handleRecuperarContrasena}>
        {({ isSubmitting }) => (
          <Form>
            
            <div>
              <label htmlFor="email">Correo electrónico:</label>
              <Field type="email" id="email" name="email"   className="form-control" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label htmlFor="contrasena">Nueva Contraseña:</label>
              <Field type="password" id="contrasena" name="contrasena" className="form-control" />
              <ErrorMessage name="contrasena" component="div" />
            </div>
            
            <br />
            <div className="d-grid gap-2">
              <button type="submit" disabled={isSubmitting} className="btn btn-primary" >
              Recuperar Contraseña
              </button>
             

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