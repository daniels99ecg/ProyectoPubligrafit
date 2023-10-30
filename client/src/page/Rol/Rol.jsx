import { useEffect, useState } from "react"
import { getListarRoles } from "../../api/rutas.api"
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
  </div>
    </>

    )
}

export default Rol