import { getListarInsumos } from "../api/Rutas.api";
import { useEffect, useState } from "react";
import Nav from '../componentes/nav';
import Header from '../componentes/header';


function listarInsumos(){
    
    const [listar, setListar]=useState([])

    useEffect(()=>{
        async function showInsumos(){
            const response = await getListarInsumos()
            setListar(response.data)
        }

        showInsumos()   
    }, [])

    return(
    
    <div className="page-flex">
    <Nav/>

    <div className="main-wrapper">
    <Header/>
<br />
<a className="btn btn-primary ms-4" href="/insumo/create" role="button">Nuevo Registro</a>
<br/>
<br/>
<div className="card" style={{marginLeft:15}}>
  <table className="table table-hover">
  <thead>
    <tr>
      <th scope="col">Id Insumo</th>
      <th scope="col">Nombre</th>
      <th scope="col">Precio</th>
      <th scope="col">Cantidad</th>
      <th scope="col">Estado</th>
    </tr>
  </thead>
  <tbody>
    {
        listar.map(listar=>(
            <tr key={listar.id_insumo}>
            <th scope="row">{listar.id_insumo}</th>
            <td>{listar.nombre}</td>
            <td>{listar.precio}</td>
            <td>{listar.cantidad}</td>
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

export default listarInsumos