import { getListarClientes } from "../api/Rutas.Cliente.api";
import { useEffect, useState } from "react";
import Nav from '../components/nav'
import Header from '../components/header'

function listarClientes (){

  const [listar, setListar] = useState([])
  const [searchTerm, setSearchTerm] = useState("");

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
      item.apellido.toLowerCase().includes(searchTerm.toLowerCase())
      
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
                <a className="btn btn-warning" href="/cliente/update">Edit</a>  
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