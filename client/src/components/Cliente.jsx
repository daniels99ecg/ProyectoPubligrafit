import { useNavigate } from "react-router-dom"
import { getListarClientes } from "../api/Rutas.Cliente.api";
import { useEffect, useState } from "react";
import Nav from '../components/nav'
import Header from '../components/header'

function listarClientes (){

  const [listar, setListar] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()

    useEffect(() => {
      async function showClientes(){
        const response = await getListarClientes()
        setListar(response.data)
    }

      showClientes()
    }, [])
    
    return (
      
    <div className="page-flex">
    <Nav/>

    <div className="main-wrapper">
    <Header/>    

<br />
<div className='row'>
<div className='col-md-3'> 
<a className="btn btn-primary ms-4" href="/cliente/create" role="button">Nuevo Registro</a>
</div>

{/* Botón de búsqueda */}
<div className="col-md-3">
      <input
          type="text"
          placeholder="Documento"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
      />
    </div>
    </div>

<br/>

<div className="card" style={{marginLeft:15}}>
  <table className="table table-hover">
  <thead>
    <tr>
      <th scope="col">Documento</th>
      <th scope="col">Nombre</th>
      <th scope="col">Apellido</th>
      <th scope="col">Teléfono</th>
      <th scope="col">Dirección</th>
      <th scope="col">Email</th>
      <th scope="col">Acción</th>
    </tr>
  </thead>
  <tbody>
    {

      listar.filter((item) => 
      item.documento.toString().includes(searchTerm) ||
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.telefono.toString().includes(searchTerm) ||
      item.direccion.toString().includes(searchTerm) ||
      item.email.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      
      ).map(listar=>(
          <tr key={listar.documento}>
            <th scope="row">{listar.documento}</th>
            <td>{listar.nombre}</td>
            <td>{listar.apellido}</td>
            <td>{listar.telefono}</td>
            <td>{listar.direccion}</td>
            <td>{listar.email}</td>
            
            {/* <td>
              <div className="switch-button">
                  <input type="checkbox" name={`switch-button-${listar.documento}`} id={`switch-label-${listar.documento}`} checked={listar.estado} className="switch-button__checkbox"/>
                  <label htmlFor={`switch-label-${listar.documento}`} className="switch-button__label"></label>
              </div>
            </td> */}

      <td>
        <button className="btn btn-outline-secondary" onClick={()=>navigate(`/edit/${listar.documento}`)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"></path>
    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"></path>
  </svg>
        
      </button>
      </td>       
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
export default listarClientes