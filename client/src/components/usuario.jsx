import { useEffect, useState } from "react"
import {getListarUsuarios} from '../api/rutas.api'
import Nav from '../components/nav'
import { useNavigate } from "react-router-dom"
import Header from "../components/header"
import '../css/style.css'



function User() {

   const [listar, setListar]=useState([])

  useEffect(()=>{
    
   async function cargarUsuario(){
    const response =  await getListarUsuarios()
    setListar(response.data)
    }
    cargarUsuario()

  },[])
const navigate=useNavigate()



  return (
    <>
    
    <div className="page-flex">
    <Nav/>

    <div className="main-wrapper">
    <Header/>
<br />
<a class="btn btn-primary ms-4" href="/usuario/create" role="button">Nuevo Registro</a>
<br />
<br />
    <div className="card" style={{marginLeft:15}}>
      <table className="table table-hover">
      <thead>
        <tr>
        
          <th scope="col">Id</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
          <th scope="col">Email</th>
          <th scope="col">Contraseña</th>
          <th scope="col">Rol</th>
          <th scope="col">Estado</th>
          <th scope="col">Acción</th>

        </tr>
      </thead>
  <tbody>
   {
  listar.map(listar=>(
    <tr key={listar.id_usuario}>
   
      <th scope="row">{listar.id_usuario}</th>
      <td>{listar.nombres}</td>
      <td>{listar.apellidos}</td>
      <td>{listar.email}</td>
      <td>{listar.contrasena}</td>
      <td>{listar.rol.nombre_rol}</td>
      <td>
                    <div class="switch-button">
                        <input type="checkbox" name="switch-button" id="switch-label-{listar.id_usuario}" checked class="switch-button__checkbox"/>
                        <label for="switch-label-{listar.id_usuario}" class="switch-button__label"></label>
                    </div>
                </td>
      
      <td><button className="btn btn-warning" onClick={()=>navigate(`/edit/${listar.id_usuario}`)}>Edit</button></td>
    </tr>
    ))
  }  

  </tbody>
  
</table>

</div>
</div>
</div>

    </>
  )
}

export default User
