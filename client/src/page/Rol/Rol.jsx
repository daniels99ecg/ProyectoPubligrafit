import { useEffect, useState } from "react"
import { getListarRoles, putActivarCliente,putDesactivarCliente } from "../../api/Usuario/rutas.api"
import Nav from '../../components/nav'
import { DataGrid } from '@mui/x-data-grid';
import { useRol } from "../../context/Rol/RolContext";
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function Rol(){
const {listar,cargarRol, desactivarCliente, activarCliente,searchTerm,setSearchTerm,filtrarDesactivados, eliminarRol}=useRol()
const navigate=useNavigate()
const isSmallScreen = useMediaQuery('(max-width:1200px)');

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
    <div className="col-md-2 col-12 mb-2">  
    <a className="btn btn-primary " href="/rol/create" role="button">Nuevo Registro</a>
    </div>
    <div className="col-md-3 col-12" style={{ marginLeft: 'auto' }}>
    <input
                  type="text"
                  placeholder="Buscar..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control"
                />
                </div>
                </div>
    <br />
    {isSmallScreen ? (
                  // Render cards when the screen is small
                  <div>
                    {/* Map over your data and render cards here */}
                    {filtrarDesactivados.map((item) => (
                      
                      <Card key={item.id_rol}>
                      <CardContent>
                      <ul className="list-group list-group-flush">

                      <li className="list-group-item">Tipo ID: {item.id_rol}</li>
                      <li className="list-group-item">Nombre: {item.nombre_rol}</li>
                      <li className="list-group-item">Fecha: {item.fecha}</li>
                  
                        </ul>
                      
                        <div className="row">
          <div className="col-md-6"></div>
                        <div className="switch-button">
                     <input
                       type="checkbox"
                        id={`switch-label-${item.id_rol}`}
                        checked={item.estado}
                        onChange={(e) => {
                        e.preventDefault(); // Evitar la navegación por defecto
                    if (item.estado) {
                      desactivarCliente(item.id_rol);
                  } else {
                      activarCliente(item.id_rol);
                }
          }}
        className="switch-button__checkbox"
      />
      <label
        htmlFor={`switch-label-${item.id_rol}`}
        className="switch-button__label"
      ></label>
                  </div>
                  </div>
                  <div className="col-md-6">

                        <button
                      className="btn btn-outline-secondary me-1"
                      onClick={() =>{ navigate(`/editr/${item.id_rol}`) 
                       window.location.reload();
                    }}
                      disabled={!item.estado}
                      style={{
                        backgroundColor: '#0d6efd',
                        borderColor: '#0d6efd',
                        color: 'black',
                      }}
                      data-id={`edit-button-${item.id_rol}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-arrow-clockwise"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                        ></path>
                        <path
                          d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"
                        ></path>
                      </svg>
                    </button>


                        <button
                      className="btn btn-danger"
                      onClick={() => eliminarRol(item.id_rol)}
                      disabled={!item.estado}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"
                        ></path>
                        <path
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
                        ></path>
                      </svg>
                    </button>
</div>
                      </CardContent>
                    </Card>
                    ))}
                  
                  </div>
                
                ) : (  


        <div className="card" style={{marginLeft:15}}>
        <DataGrid
            rows={filtrarDesactivados.map((item) => ({
              ...item,
              id: item.id_rol,
             
            }))}
            columns={[
              { field: 'id_rol', headerName: 'ID', headerClassName: 'encabezado', flex: 1 },
              { field: 'nombre_rol', headerName: 'Nombre', headerClassName: 'encabezado', flex: 1 },
              { field: 'fecha', headerName: 'Fecha', headerClassName: 'encabezado', flex: 1 },
         
              {
                field: 'estado',
                headerName: 'Estado',
                headerClassName: 'encabezado',
                flex: 1,
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
},
{
  field: 'acciones',
  headerName: 'Acciones',
  headerClassName: 'encabezado',
  flex: 1,
  renderCell: (params) => (
    <div className="d-flex">
      <button
        className="btn btn-outline-secondary me-1"
        onClick={() =>{ navigate(`/editr/${params.row.id_rol}`) 
         window.location.reload();
      }}
        disabled={!params.row.estado}
        style={{
          backgroundColor: '#0d6efd',
          borderColor: '#0d6efd',
          color: 'black',
        }}
        data-id={`edit-button-${params.row.id_rol}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-clockwise"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
          ></path>
          <path
            d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"
          ></path>
        </svg>
      </button>
      {params.row.tieneVentas ? (
        // Si el cliente tiene ventas, el botón de eliminar está deshabilitado
            <button
              className="btn btn-danger"
              disabled
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"
                ></path>
                <path
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
                ></path>
              </svg>
            </button>
           ) : (

      <button
        className="btn btn-danger"
        onClick={() => eliminarRol(params.row.id_rol)}
        disabled={!params.row.estado}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-trash"
          viewBox="0 0 16 16"
        >
          <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"
          ></path>
          <path
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
          ></path>
        </svg>
      </button>
)}
    </div>
  ),
},
]}
            autoHeight
            getRowClassName={(params) => {
              if (!params.row.estado) {
                return 'cliente-desactivado';
              }
              return
            }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 100,
                },
              },
            }}
          />
  


</div>
                )}
                    </div>
                </div>
            </div>
        </div>
  </div>
    </>

    )
}

export default Rol