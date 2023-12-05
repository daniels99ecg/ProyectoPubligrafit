import { useState, useEffect } from "react";
import '../../css/style.css'
import Nav from '../../components/nav'
import {DataGrid} from '@mui/x-data-grid'
import { useCompra } from "../../context/Compras/ComprasContext";
function Compras (){ //Inicializar
const {cargarCompras,setSearchTerm,filtrarDesactivados} = useCompra()
useEffect(()=>{
    
    cargarCompras()

},[])


    return (
      <>
      <Nav/>


<div className='dashboard-app'>
  
    <div className='dashboard-content'>
        <div className='container'>
            <div className='card'>
                {/* <div class='card-header'>
                    <h1>Welcome back Jim</h1>
                </div> */}
                <div className='card-body'>
                <div className="card-header">
                        <h1>Gestionar Compras</h1>
                      </div>
                <br />
        <div className='row'>
    <div className="col-md-2">  
    <a className="btn btn-primary " href="/compras/create" role="button">Nuevo Registro</a>
    </div>
    <div className="col-md-3" style={{marginLeft: 'auto'}}>
    <input
                  type="text"
                  placeholder="Buscar..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control"
                />
                </div>
                </div>
                <br />
        <div style={{marginLeft:15}}>
          <br />
        <DataGrid 
        rows={filtrarDesactivados.map((item)=>({
          ...item,
          id:item.id_compra,
        }))}
        columns={[
          {field:'id_compra',headerName:'Id',flex:1},
          {field:'proveedor',headerName:'Proveedor',flex:1},
          {field:'cantidad',headerName:'Cantidad',flex:1},
          {field:'fecha',headerName:'Fecha',flex:1},
          {field:'total',headerName:'Total',flex:1},
            
        ]}
        />
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
