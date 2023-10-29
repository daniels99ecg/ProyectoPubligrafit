import { Form ,Formik} from 'formik'
import {cargaractualizarUsuario, crearUsuario, getListarRoles, actualizarUsuario} from '../../api/rutas.api'
import { useParams} from 'react-router-dom'
import Nav from '../../components/nav'
import Header from "../../components/header"
import { useState, useEffect } from 'react'
import { useUser } from "../../context/Usuario/UserContext";


function UserCreate() {

  const params=useParams()
  const {creacionValidacion}=useUser()

  const [Listar, setListar]=useState([])
 const[ListarActualizar, setListarActualizar]=useState({
  id_usuario:"",
    nombres:"",
    apellidos:"",
    email:"",
    contrasena:"",
    fk_rol2:"",
 })
  
  useEffect(()=>{
    async function cargarRol(){
     const response =  await getListarRoles()
     setListar(response.data)
     }
     cargarRol()

     async function cargarUsuariosActualizar() {
      try {
      
        const response = await cargaractualizarUsuario(params.id_usuario);
        const usuarioData=response.data
        setListarActualizar({
          id_usuario: usuarioData.id_usuario,
          nombres: usuarioData.nombres,
          apellidos: usuarioData.apellidos,
          email: usuarioData.email,
          contrasena: usuarioData.contrasena,
          fk_rol2: usuarioData.fk_rol2,
        });
      } catch (error) {
        console.log(error);
      }
    }

    cargarUsuariosActualizar();
  
   },[params.id_usuario])

   
  
    return (
      <>

<div className="page-flex">
    <Nav/>

    <div className="main-wrapper">
    <Header/>
    <div className='card w-75 p-3 mx-auto mt-5'>
    <h2 className="text-center">
               {params.id_usuario ? "Actualizar Usuario": "Registar Usuario"}
            </h2>

   <Formik
   initialValues={ListarActualizar}
   enableReinitialize={true}
   onSubmit={async (values)=>{
    console.log(values)
    if(params.id_usuario){
      await actualizarUsuario(params.id_usuario, values)
    }

   creacionValidacion(values)

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
      <button className="btn btn-primary">
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
      </>
    )
  }
  
  export default UserCreate
  