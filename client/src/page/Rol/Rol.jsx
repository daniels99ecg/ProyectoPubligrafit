import { useEffect, useState } from "react"
import { getListarRoles, putActivarCliente,putDesactivarCliente } from "../../api/Usuario/rutas.api"
import Nav from '../../components/nav'
import { DataGrid } from '@mui/x-data-grid';
import { useRol } from "../../context/Rol/RolContext";

function Rol(){
const {listar,cargarRol, desactivarCliente, activarCliente,searchTerm,setSearchTerm}=useRol()

//Para hacer la busqueda por filtro 

    useEffect(()=>{
    cargarRol()
    },[searchTerm])
    return(
      <>
      <Nav/>
          <div className='dashboard-app'>
              <div className='dashboard-content'>
                  <div className='container'>
                      <div className='card'>
                     
                          <div className='card-body'>
                          <div className="card-header">
                        <h1>Gestionar Rol</h1>
                      </div>
                          <br />
   
    <div className='row'>
    <div className="col-md-2">  
    <a className="btn btn-primary " href="/rol/create" role="button">Nuevo Registro</a>
    </div>
    <div className="col-md-3" style={{ marginLeft: 'auto' }}>
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


        <DataGrid
            rows={listar.map((item) => ({
              ...item,
              id: item.id_rol,
             
            }))}
            columns={[
              { field: 'id_rol', headerName: 'Id', flex: 0 },
              { field: 'nombre_rol', headerName: 'Nombre', flex: 0.5 },
              { field: 'fecha', headerName: 'Fecha', flex: 0.5 },
         
              {
                field: 'estado',
                headerName: 'Estado',
                flex: 0.5,
                renderCell: (params) => (
                  <div className="switch-button">
                     <input
                       type="checkbox"
                        id={`switch-label-${params.row.id_rol}`}
                        checked={params.row.estado}
                        onChange={(e) => {
                        e.preventDefault(); // Evitar la navegación por defecto
                    if (params.row.estado) {
                      desactivarCliente(params.row.id_rol);
                  } else {
                      activarCliente(params.row.id_rol);
                }
          }}
        className="switch-button__checkbox"
      />
      <label
        htmlFor={`switch-label-${params.row.id_rol}`}
        className="switch-button__label"
      ></label>
                  </div>
                ),
              }
            ]}
            autoHeight
            
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 100,
                },
              },
            }}
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

export default Rol