import { useEffect, useState } from "react"
import { getListarRoles, putActivarCliente,putDesactivarCliente } from "../../api/Usuario/rutas.api"
import Nav from '../../components/nav'
import { DataGrid } from '@mui/x-data-grid';
import { useRol } from "../../context/Rol/RolContext";
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ReactDOM from 'react-dom';
import RolCreate from './RolCreate'
import RolCreatePermisos from './RolCreatePermisos'
import RolInfo from './RolInfo'

import Tooltip from '@mui/material/Tooltip';
import { BsInfoCircleFill, BsArrowClockwise, BsTrash } from "react-icons/bs";

import RolUpdate from './UpdateRol'

function Rol(){
const {listar,cargarRol, desactivarCliente, activarCliente,searchTerm,setSearchTerm,filtrarDesactivados, eliminarRol}=useRol()
const navigate=useNavigate()
const isSmallScreen = useMediaQuery('(max-width:1200px)');
const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedClienteId, setSelectedClienteId] = useState(null);
  const [openPermisoModal, setOpenPermisoModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedRol, setSelectedRol] = useState(null);
//Para hacer la busqueda por filtro 

    useEffect(()=>{
    cargarRol()
    },[searchTerm])

  //   const handleOpenVentaModal = () => {
  //     setOpenCreateModal(true);
  // };
  
  // const handleSubmitForm = async () => {
  // };
  
  // const handleCloseVentaModal = () => {
  //   setOpenCreateModal(false);
  //   cargarRol()
  
  // };
  
  // Modal de Actualizar
  const handleOpenUpdateModal = (id) => {
    setSelectedClienteId(id);
    setOpenUpdateModal(true);
  };
  
  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    cargarRol()
  };

//Permisos
  const handleOpenPermisoModal = () => {
    setOpenPermisoModal(true);
};

const handleSubmitFormPermiso = async () => {
};

const handleClosePermisoModal = () => {
  setOpenPermisoModal(false);
  cargarRol()

};

// Modal de información
const handleOpenInfoModal = (clienteInfo) => {
  setSelectedRol(clienteInfo);
  setShowInfoModal(true);
};

const handleCloseInfoModal = () => {
  setSelectedRol(null);
  setShowInfoModal(false);
};
const handleEliminarUsuario = (idrol, nombre_rol) => {
  // Validar si el usuario tiene el rol de administrador
  if (nombre_rol === 'Administrador') {
    // Puedes mostrar un mensaje o ejecutar alguna lógica para indicar que no se puede eliminar un administrador
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No puedes eliminar al usuario con el rol de administrador.',
    });    } else {
    // Llamar a la función de eliminación solo si no es un administrador
    eliminarRol(idrol);
  }
};

    return(
      <>
      <Nav/>
          <div className='dashboard-app'>
              <div className='dashboard-content'>
                  <div className='container'>
                      <div className='card'>
                     
                          <div className='card-body'>
                          <div className="card-header">
                        <h1>Gestionar Roles y Permisos</h1>
                      </div>
                          <br />
   
    <div className='row'>
    <div className="col-md-2 col-12 mb-2">  
    {/* <button
        className="btn btn-primary"
        onClick={handleOpenVentaModal}
        role="button"
      >
        Nuevo Registro
      </button> */}

    </div>
    {/* <div className="col-md-2">  

      <button
        className="btn btn-primary"
        onClick={handleOpenPermisoModal}
        role="button"
      >
        Nuevo Permiso
      </button>
      </div> */}
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
                  <div>
                   
                    {filtrarDesactivados.map((item) => (
                      
                      <Card key={item.id_rol_x_permiso}>
                      <CardContent>
                      <ul className="list-group list-group-flush">
                      <li className="list-group-item">Tipo ID: {item.rol?.id_rol}</li>
                      <li className="list-group-item">Nombre: {item.rol?.nombre_rol}</li>
                    
                        </ul>
                      
                        <div className="row">
          <div className="col-md-6"></div>
                        <div className="switch-button">
                     <input
                       type="checkbox"
                        id={`switch-label-${item.rol?.id_rol}`}
                        checked={item.rol?.estado}
                        onChange={(e) => {
                        e.preventDefault(); // Evitar la navegación por defecto
                    if (item.rol?.estado) {
                      desactivarCliente(item.rol?.id_rol);
                      window.location.reload()
                  } else {
                      activarCliente(item.rol?.id_rol);
                      window.location.reload()
                }
          }}
        className="switch-button__checkbox"
      />
      <label
        htmlFor={`switch-label-${item.rol?.id_rol}`}
        className="switch-button__label"
      ></label>
                  </div>

                  
                  </div>
                  <div className="col-md-6">

                  <div className="info-button-container">
                    
      <Tooltip title="Información" arrow>
        <button
          className="btn btn-light info-button"
          onClick={() => handleOpenInfoModal(item)}
          disabled={!item.rol?.estado}
        >
          <BsInfoCircleFill size={30} color="grey" />
        </button>
      </Tooltip>
    </div>
                        <button
                      className="btn btn-outline-secondary me-1"
                      onClick={() =>{handleOpenUpdateModal(item.rol?.id_rol);

                      }}
                      disabled={!item.rol?.estado}
                      style={{
                        backgroundColor: '#0d6efd',
                        borderColor: '#0d6efd',
                        color: 'black',
                      }}
                      data-id={`edit-button-${item.rol?.id_rol}`}
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
                    {item.rol?.nombre_rol === 'Administrador' || item.tieneVentas ? (
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
                      onClick={() => handleEliminarUsuario(item.rol?.id_rol)}
                      disabled={!item.rol?.estado}
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
                      </CardContent>
                    </Card>
                    ))}
                  
                  </div>
                
                ) : (  


        <div className="card" style={{marginLeft:15}}>
        <DataGrid
            rows={filtrarDesactivados.map((item) => ({
              id: item.id_rol_x_permiso,
              id_rol:item.rol?.id_rol,
              nombre_rol:item.rol?.nombre_rol,
              estado:item.rol?.estado,
              ...item,
            }))}
            columns={[
              { field: 'id_rol', headerName: 'ID', headerClassName: 'encabezado', flex: 1 },
              { field: 'nombre_rol', headerName: 'Rol', headerClassName: 'encabezado', flex: 1 },
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
                      checked={params.row.rol?.estado}
                      onChange={(e) => {
                        e.preventDefault();
                        if (params.row.rol?.estado) {
                          desactivarCliente(params.row.rol?.id_rol);
                          window.location.reload()
                        } else {
                          activarCliente(params.row.rol?.id_rol);
                          window.location.reload()
                        }
                      }}
                      className="switch-button__checkbox"
                    />
                    <label
                      htmlFor={`switch-label-${params.row.rol?.id_rol}`}
                      className="switch-button__label"
                    ></label>
                  </div>
                ),
              },
{
  field: 'info',
  headerName: 'Info',
  headerClassName: 'encabezado',
  flex: 1,
  renderCell: (params) => (
    <Tooltip title="Información" arrow>
      <span>
        <button
          className="btn btn-light info-button"
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '5px',
            borderRadius: '50%',
            backgroundColor: 'white',
          }}
          onClick={() => handleOpenInfoModal(params.row)}
          disabled={!params.row.rol?.estado}
        >
          <BsInfoCircleFill
            size={30}
            color="grey"
          />
        </button>
      </span>
    </Tooltip>
  ),
},{
  field: 'acciones',
  headerName: 'Acciones',
  headerClassName: 'encabezado',
  flex: 1,
  renderCell: (params) => (
    <div className="d-flex">
      <button
        className="btn btn-outline-secondary me-1"
        onClick={() =>{     handleOpenUpdateModal(params.row.id_rol);

      }}
        disabled={!params.row.estado}
        style={{
          backgroundColor: '#0d6efd',
          borderColor: '#0d6efd',
          color: 'black',
        }}
        data-id={`edit-button-${params.row.id}`}
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
      {params.row.nombre_rol === 'Administrador' || params.row.tieneVentas ? (
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
        onClick={() => handleEliminarUsuario(params.row.id_rol)}
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
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5
                },
              },
            }} 
            pageSizeOptions={[5]} 
            getRowClassName={(params) => {
              if (!params.row.rol?.estado) {
                return 'cliente-desactivado';
              }
              return
            }}
            getRowId={(row) => row.id_rol || row.id_permiso} 
          />
  


</div>
                )}
  {showInfoModal && selectedRol && ReactDOM.createPortal(
            <RolInfo
              rol={selectedRol}
              handleCloseModal={handleCloseInfoModal}
              open={showInfoModal}
            />,
            document.body
          )} 
                 {/* {openCreateModal && ReactDOM.createPortal(
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1049,
            }}
            onClick={handleCloseVentaModal}
          />
          <div
            className="modal-create"
            style={{
              position: 'fixed',
              top: '43%',  
              left: '42%',
              transform: 'translate(-50%, -50%)', 
              zIndex: 1050,
              width: '400%', 
              maxWidth: '1200px', 
              overflowY: 'visible',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div style={{ width: '100%', height: '100%' }}>
              <RolCreatePermisos handleSubmitForm={handleSubmitForm} handleCloseVentaModal={handleCloseVentaModal} />
            </div>
          </div>
        </>,
        document.body
      )} */}
      
      {openUpdateModal && ReactDOM.createPortal(
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1049,
            }}
            onClick={handleCloseUpdateModal}
          />
          <div
            className="modal-update"
            style={{
              maxHeight: '0vh',
              position: 'fixed',
              top: '30%',
              left: '42%',
              transform: 'translateX(-50%)',
              zIndex: 1050,
              maxHeight: '25vh',
              overflowY: 'visible',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div style={{ width: '150%', height: '180%' }}>
              <RolUpdate handleCloseUpdateModal={handleCloseUpdateModal} RolId={selectedClienteId}/>
            </div>
          </div>
        </>,
        document.body
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