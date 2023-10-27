import { getListarProductos } from "../api/Rutas.api";
import { useEffect, useState } from "react";
import Nav from '../componentes/nav';
import Header from '../componentes/header';


function listarProductos(){
    
    const [listar, setListar]=useState([])

    useEffect(()=>{
        async function showProductos(){
            const response = await getListarProductos()
            setListar(response.data)
        }

        showProductos()   
    }, [])

    return(
    
    <div className="page-flex">
    <Nav/>

    <div className="main-wrapper">
    <Header/>
<br />
<a className="btn btn-primary ms-4" href="/producto/create" role="button">Nuevo Registro</a>
<br/>
<br/>
<div className="card" style={{marginLeft:15}}>
  <table className="table table-hover">
  <thead>
    <tr>
      <th scope="col">Id Producto</th>
      <th scope="col">Categoría</th>
      <th scope="col">Producto</th>
      <th scope="col">Precio</th>
      <th scope="col">Imagen</th>
      <th scope="col">Stock</th>
      <th scope="col">Estado</th>
      <th scope="col">Acción</th>
    </tr>
  </thead>
  <tbody>
    {
        listar.map(listar=>(
            <tr key={listar.id_producto}>
            <th scope="row">{listar.id_producto}</th>
            <td>{listar.categoria.categoria}</td>
            <td>{listar.nombre_producto}</td>
            <td>{listar.precio}</td>
            <td>{listar.imagen}</td>
            <td>{listar.stock}</td>
            <td>{listar.estado}</td>
            {/* <td>
                    <div className="switch-button">
                        <input type="checkbox" name="switch-button" id="switch-label-{listar.id_producto}" checked className="switch-button__checkbox"/>
                        <label for="switch-label-{listar.id_producto}" className="switch-button__label"></label>
                    </div>
                </td> */}
                <td>Estado</td>
      
        <td><button className="btn btn-warning">Edit</button></td>
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

export default listarProductos