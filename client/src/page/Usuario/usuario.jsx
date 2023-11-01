import { useEffect, useState } from "react"
import {getListarUsuarios} from '../../api/rutas.api'
import Nav from '../../components/nav'
import { useNavigate } from "react-router-dom"
import { useUser } from "../../context/Usuario/UserContext";
import { DataGrid } from '@mui/x-data-grid';


function User() {
  const {listar,cargarUsuario, desactivarCliente, activarCliente}=useUser()

  //  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(()=>{
    
    cargarUsuario()

  },[])

const navigate=useNavigate()


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
                    <br />
<div className='row'>
<div className="col-md-2">  
<a className="btn btn-primary " href="/usuario/create" role="button" >Nuevo Registro</a>

</div>
<div className="col-md-3">
<input
              type="text"
              placeholder="Buscar..."
              // onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
            />
            </div>
            </div>
<br />

<div style={{ height: 360, width: '100%' }}>
          <DataGrid
            rows={listar.map((item) => ({
              ...item,
              id: item.id_usuario,
              nombreRol: item.rol.nombre_rol
            }))}
            columns={[
              { field: 'id_usuario', headerName: 'Documento', flex: 1 },
              { field: 'nombres', headerName: 'Nombre', flex: 1 },
              { field: 'apellidos', headerName: 'Apellido', flex: 1 },
              { field: 'email', headerName: 'Email', flex: 1 },
              { field: 'contrasena', headerName: 'Contraseña', flex: 1 },
              { field: 'nombreRol', headerName: 'Rol', flex: 1 },
              {
                field: 'estado',
                headerName: 'Estado',
                flex: 1,
                renderCell: (params) => (
                  <div className="switch-button">
                     <input
                       type="checkbox"
                        id={`switch-label-${params.row.id_usuario}`}
                        checked={params.row.estado}
                        onChange={(e) => {
                        e.preventDefault(); // Evitar la navegación por defecto
                    if (params.row.estado) {
                      desactivarCliente(params.row.id_usuario);
                  } else {
                      activarCliente(params.row.id_usuario);
                }
          }}
        className="switch-button__checkbox"
      />
      <label
       htmlFor={`switch-label-${params.row.id_usuario}`}
       className="switch-button__label"
      ></label>
                  </div>
                ),
              },
              {
                field: 'acciones',
                headerName: 'Acciones',
                flex: 1,
                renderCell: (params) => (
                  <div>
                    <button
                      className="btn btn-outline-secondary me-1"
                      onClick={() => navigate(`/edit/${params.row.id_usuario}`)}
                      disabled={!params.row.estado}
                      style={{
                        backgroundColor: '#0d6efd',
                        borderColor: '#0d6efd',
                        color: 'black',
                      }}
                      data-id={`edit-button-${params.row.id_usuario}`}
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

                    
                  </div>
                ),
              },
            ]}
            autoHeight
            
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 100,
                },
              },
            }}
            getRowClassName={(params) => {
              if (!params.row.estado) {
                return 'cliente-desactivado';
              }
              return
            }}
          />
        </div>
        </div>

                    </div>
                </div>
            </div>
            </div>
        
        </>
  );
}




export default User
