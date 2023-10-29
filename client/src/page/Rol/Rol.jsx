import { useEffect, useState } from "react"
import { getListarRoles } from "../../api/rutas.api"
import Header from "../../components/header"
import Nav from '../../components/nav'

function Rol(){
const [listar, setListar]=useState([])//Lista todos los roles
const [searchTerm, setSearchTerm] = useState(""); //Para hacer la busqueda por filtro 

    useEffect(()=>{
    async function cargarRol(){
       
           const response= await getListarRoles()//LLamar la ruta del server
           setListar(response.data) //Se le pasa los datos al setListar 
    }
    cargarRol()
    },[])

    return(
        <div className="page-flex">
        <Nav/>
    
        <div className="main-wrapper">
        <Header/>
    <br />
    <div className='row'>
    <div className="col-md-2">  
    <a className="btn btn-primary " href="/rol/create" role="button">Nuevo Registro</a>
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
    
        <div className="card" style={{marginLeft:15}}>
     <table className="table table-hover">
      <thead>
        <tr>
        
          <th scope="col">Id</th>
          <th scope="col">Nombre Rol</th>
          <th scope="col">Fecha</th>
          <th scope="col">Estado</th>
          <th scope="col">Acciones</th>

        </tr>
      </thead>
  <tbody>
   {
    
  listar.filter((item) =>
  // Filtrar usuarios que coincidan con el término de búsqueda

  item.nombre_rol.toLowerCase().includes(searchTerm.toLowerCase())||
  item.fecha.toLowerCase().includes(searchTerm.toLowerCase())

).map(listar=>(
    <tr key={listar.id_rol}>
   
      <th scope="row">{listar.id_rol}</th>
      <td>{listar.nombre_rol}</td>
      <td>{listar.fecha}</td>
  
      <td>
     
                      <div className="switch-button">
                        <input
                          type="checkbox"
                          name={`switch-button-${listar.id_usuario}`}
                          id={`switch-label-${listar.id_usuario}`}
                          checked={listar.estado}
                          className="switch-button__checkbox"
                        //   onChange={() => toggleUserState(listar.id_usuario)}
                          
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
    )
}

export default Rol