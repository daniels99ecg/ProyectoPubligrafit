import { getListarCompras } from "../../api/rutas.api";
import { useState, useEffect } from "react";
import '../../css/style.css'
import Nav from '../../components/nav'

function Compras (){ //Inicializar
const [listar,setListar] = useState([])
const [searchTerm, setSearchTerm] = useState(""); //Para hacer la busqueda por filtro
useEffect(()=>{
    async function cargarCompras(){
        const response=await getListarCompras()
        setListar(response.data)
    }
    cargarCompras()

},[])


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
    <a className="btn btn-primary " href="/compras/create" role="button">Nuevo Registro</a>
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
          <br />
        <table className="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Proveedor</th>
      <th scope="col">Cantidad</th>
      <th scope="col">Fecha</th>
      <th scope="col">Total</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
    {
        listar.filter((item)=>
        item.proveedor.toLowerCase().includes(searchTerm.toLowerCase())
        ).
        map(listar=>(
            <tr key={listar.id_compra}>
      <th>{listar.id_compra}</th>
      <th>{listar.proveedor}</th>
      <th>{listar.cantidad}</th>
      <th>{listar.fecha}</th>
      <th>{listar.total}</th>
      <td><button className="btn btn-primary">Detalles</button></td>
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
export default Compras
