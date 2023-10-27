import { getListarFichasTecnicas } from "../api/Rutas.api";
import { useEffect, useState } from "react";
import Nav from '../componentes/nav';
import Header from '../componentes/header';


function listarFichasTecnicas(){
    
    const [listar, setListar]=useState([])

    useEffect(()=>{
        async function showFichasTecnicas(){
            const response = await getListarFichasTecnicas()
            setListar(response.data)
        }

        showFichasTecnicas()   
    }, [])

    return(
    
    <div className="page-flex">
    <Nav/>

    <div className="main-wrapper">
    <Header/>
<br />
<a className="btn btn-primary ms-4" href="/ficha_tecnica/create" role="button">Nuevo Registro</a>
<br/>
<br/>
<div className="card" style={{marginLeft:15}}>
  <table className="table table-hover">
  <thead>
    <tr>
      <th scope="col">Id Ficha Tecnica</th>
      <th scope="col">Insumo</th>
      <th scope="col">Cantidad</th>
      <th scope="col">Imagen</th>
      <th scope="col">Costo</th>
      <th scope="col">Detalles</th>
    </tr>
  </thead>
  <tbody>
    {
        listar.map(listar=>(
            <tr key={listar.id_ft}>
            <th scope="row">{listar.id_ft}</th>
            <td>{listar.insumo.nombre}</td>
            <td>{listar.cantidad_insumo}</td>
            <td>{listar.costo_insumo}</td>
            <td>{listar.imagen_final_producto}</td>
            <td>{listar.detalle}</td>
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

export default listarFichasTecnicas