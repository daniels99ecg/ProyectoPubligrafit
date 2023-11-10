  import { Form ,Formik} from 'formik'
  import { useParams, useNavigate} from 'react-router-dom'
  import Nav from '../../components/nav'
  import { useEffect } from 'react'
  import { useUser } from "../../context/Usuario/UserContext";



  function UserCreate() {
    const navigate = useNavigate();

    const params=useParams()
    const {Listar, cargarRol,ListarActualizar, cargarUsuariosActualizar,actualizarValidar}=useUser()

    useEffect(()=>{
      
      cargarRol()
 
      cargarUsuariosActualizar(params.id_usuario);
  
    },[params.id_usuario])

      return (
        <>

  <Nav/>

  <div className='dashboard-app'>
      <div className='dashboard-content'>
          <div className='container'>
              <div className='card'>
              <div className='card-body'>
              <div className="card-header">
                <h2 className="text-center">Actualizar Usuario</h2>  
                </div>
              <div className='w-75 p-3 mx-auto'>

   

    <Formik
    initialValues={ListarActualizar}
    enableReinitialize={true}
    onSubmit={async (values)=>{
      console.log(values)
      if(params.id_usuario){
        actualizarValidar(params.id_usuario, values)
      }

    }}
    
    >
    {({handleChange, handleSubmit, values})=>(
      
        <Form onSubmit={handleSubmit}  className='row g-3' id='pruebas'>
          
            <div className="col-md-6">
        <label>Id usuario</label>
        <input  type='text' name='id_usuario' onChange={handleChange} value={values.id_usuario} className="form-control" disabled={params.id_usuario ? true : false}/>
        </div>
        <div className="col-md-6">
        <label>Nombre</label>
        <input  type='text' name='nombres' onChange={handleChange} value={values.nombres} className="form-control"/>
        </div>
        <div className="col-md-6">
        <label>Apellido</label>
        <input  type='text' name='apellidos' onChange={handleChange} value={values.apellidos} className="form-control"/>
  </div>
  <div className="col-md-6">
        <label>Correo</label>
        <input  type='text' name='email' onChange={handleChange} value={values.email} className="form-control"/>
  </div>
  <div className="col-md-6">
        <label>Contraseña</label>
        <input  type='text' name='contrasena' onChange={handleChange} value={values.contrasena} className="form-control" disabled={params.id_usuario ? true : false}/>
  </div>
  <div className="col-md-6">
        <label>Rol</label>

  <select name="fk_rol2" onChange={handleChange} value={values.fk_rol2} className="form-control">
  <option value="Seleccionar">Seleccionar</option>
    {
      Listar.map(Listar=>(
        <option key={Listar.id_rol} value={Listar.id_rol}>
        {Listar.nombre_rol}
      </option>
      ))
    }
  </select>

  </div>
  <br />

  <div className="col-auto">
        <button className="btn btn-primary" type='submit'>
          {params.id_usuario ? "Actualizar":"Registrar"}
        </button>
  </div>
  <div className="col-auto">
        <a href='/usuario' className='btn btn-danger'>Cancelar</a>
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
      )
    }
    
    export default UserCreate
    