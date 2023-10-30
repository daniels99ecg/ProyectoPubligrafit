import { useEffect, useState } from "react"
import {getListarUsuarios, cambiarEstadoUsuario} from '../../api/rutas.api'
import Nav from '../../components/nav'
import { useNavigate } from "react-router-dom"
import '../../css/style.css'
import { useUser } from "../../context/Usuario/UserContext";


function User() {
  const {listar, cargarUsuario}=useUser()

   const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(()=>{
    
    cargarUsuario()

  },[])
const navigate=useNavigate()

const toggleUserState = async (userId) => {
  try {
    await cambiarEstadoUsuario(userId); // Cambia el estado del usuario en la base de datos
    setListar((prevListar) =>
      prevListar.map((listar) => {
        if (listar.id_usuario === userId) {
          listar.estado = !listar.estado; // Toggle the user's state
        }
        return listar;
      })
    );
  } catch (error) {
    console.error('Error al cambiar el estado del usuario', error);
  }
};

  return (
    <>
<Nav/>


    <div class='dashboard-app'>
      
        <div class='dashboard-content'>
            <div class='container'>
                <div class='card'>
                    {/* <div class='card-header'>
                        <h1>Welcome back Jim</h1>
                    </div> */}
                    <div class='card-body'>
                    <br />
<div className='row'>
<div className="col-md-2">  
<a className="btn btn-primary " href="/usuario/create" role="button" >Nuevo Registro</a>

</div>
<div className="col-md-3">
<input
              type="text"
              placeholder="Buscar..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
            />
            </div>
            </div>
<br />

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
          <th scope="col">Acciones</th>

        </tr>
      </thead>
  <tbody>
   {
    
  listar.filter((item) =>
  // Filtrar usuarios que coincidan con el término de búsqueda
  item.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
  item.apellidos.toLowerCase().includes(searchTerm.toLowerCase())||
  item.email.toLowerCase().includes(searchTerm.toLowerCase())

).map(listar=>(
    <tr key={listar.id_usuario}>
   
      <th scope="row">{listar.id_usuario}</th>
      <td>{listar.nombres}</td>
      <td>{listar.apellidos}</td>
      <td>{listar.email}</td>
      <td>{listar.contrasena}</td>
      <td>{listar.rol.nombre_rol}</td>
      <td>
     
                      <div className="switch-button">
                        <input
                          type="checkbox"
                          name={`switch-button-${listar.id_usuario}`}
                          id={`switch-label-${listar.id_usuario}`}
                          checked={listar.estado}
                          className="switch-button__checkbox"
                          onChange={() => toggleUserState(listar.id_usuario)}
                          
                        />
                        <label
                          htmlFor={`switch-label-${listar.id_usuario}`}
                          className="switch-button__label"
                        ></label>
                      </div>
                    </td>
      
      <td><button className="btn btn-outline-secondary" onClick={()=>navigate(`/edit/${listar.id_usuario}`)} style={{backgroundColor:"#0d6efd", borderColor:"#0d6efd"}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16" style={{color:"#000000",borderColor:"#000000"}}>
    <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"></path>
    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"></path>
  </svg>
        
        </button></td>
    </tr>
    ))
  }  

  </tbody>
  
</table>

</div>

                    </div>
                </div>
            </div>
        </div>
  
    </>
  )
}

export default User
