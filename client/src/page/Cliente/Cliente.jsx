import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import Nav from '../../components/nav';
import { useCliente } from '../../context/Clientes/ClienteContext';
import ClienteCreate from './ClienteCreate'
import ClienteInfo from './ClienteInfo'
import ClienteUpdate from './ClienteUpdate'

function ListarClientes() {
  const {showClientes, searchTerm, setSearchTerm, activarCliente, desactivarCliente, filtrarDesactivados, destroyCliente, validacionCliente}= useCliente()
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedClienteId, setSelectedClienteId] = useState(null);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    
    showClientes();
  }, [searchTerm]);

// Modal de Registro
const handleOpenModal = () => {
    setOpenCreateModal(true);
};

const handleSubmitForm = async (formData) => {
  validacionCliente(formData)
};

const handleCloseModal = () => {
  setOpenCreateModal(false);
  showClientes();
};

// Modal de información
const handleOpenInfoModal = (clienteInfo) => {
  setSelectedCliente(clienteInfo);
  setShowInfoModal(true);
};

const handleCloseInfoModal = () => {
  setShowInfoModal(false);
  setSelectedCliente(null);
};

// Modal de Actualizar
const handleOpenUpdateModal = (id_cliente) => {
  setSelectedClienteId(id_cliente);
  setOpenUpdateModal(true);
};

const handleCloseUpdateModal = () => {
  setOpenUpdateModal(false);
  showClientes();
};

  return (
    <>
    <Nav/>

<div className='dashboard-app'>
  
    <div className='dashboard-content'>
        <div className='container'>
            <div className='card'>
                <div className='card-body'>
                <div className="card-header">
              <h1>Gestión de Clientes</h1>
            </div>
          <br />
        <div className="row">
          <div className="col-md-3">
            <a className="btn btn-primary" 
            onClick={handleOpenModal}
            style={{ textDecoration: 'none', outline: 'none' }}
            >Nuevo Registro</a>
          </div>
          {/* Botón de búsqueda */}
          <div className="col-md-3" style={{ marginLeft: 'auto' }}> 
            <input
              type="text"
              placeholder="Buscar"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
        <br />
        <div style={{ flex: 1, height: '100%', width: '100%' }}>
          <DataGrid
            rows={filtrarDesactivados.map((item) => ({
              ...item,
              id: item.documento,
            }))}
            columns={[
              { field: "tipo_documento", headerName: "Tipo Documento", headerClassName: 'encabezado', flex: 1 },
              { field: "documento", headerName: "Documento", headerClassName: 'encabezado', flex: 1 },
              { field: "nombre", headerName: "Nombre", headerClassName: 'encabezado', flex: 1 },
              { field: "apellido", headerName: "Apellido", headerClassName: 'encabezado', flex: 1 },
              { field: "email", headerName: "Email", headerClassName: 'encabezado', flex: 1 },
              {
                field: 'estado',
                headerName: 'Estado',
                headerClassName: 'encabezado',
                flex: 1,
                renderCell: (params) => (
                  <Tooltip
                    title={params.row.estado ? 'Inhabilitar' : 'Habilitar'}
                    arrow
                  >
                  <div className="switch-button">
                     <input
                       type="checkbox"
                        id={`switch-label-${params.row.id_cliente}`}
                        checked={params.row.estado}
                        onChange={(e) => {
                        e.preventDefault(); // Evitar la navegación por defecto
                    if (params.row.estado) {
                      desactivarCliente(params.row.id_cliente);
                  } else {
                      activarCliente(params.row.id_cliente);
                }
              }}
                className="switch-button__checkbox"
              />
              <label
                htmlFor={`switch-label-${params.row.id_cliente}`}
                className="switch-button__label"
              ></label>
                  </div>
                  </Tooltip>
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
                      className="btn btn-light"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px',
                        borderRadius: '50%',
                      }}
                      onClick={() => handleOpenInfoModal(params.row)}
                      disabled={!params.row.estado}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" 
                        fill="gray" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                      </svg>
                    </button>
                    </span>
                  </Tooltip>
                ),
              },
              {
                field: 'acciones',
                headerName: 'Acciones',
                headerClassName: 'encabezado',
                flex: 1,
                renderCell: (params) => (
                  <div>
                    <Tooltip title="Actualizar" arrow>
                      <span>
                      <button
                      className="btn btn-outline-secondary me-1"
                      onClick={() => {
                        handleOpenUpdateModal(params.row.id_cliente);
                      }}
                      disabled={!params.row.estado}
                      style={{
                        backgroundColor: '#0d6efd',
                        borderColor: '#0d6efd',
                        color: 'white',
                      }}
                      data-id={`edit-button-${params.row.id_cliente}`}
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
                    </span>
                    </Tooltip>

                          <Tooltip title="Eliminar" arrow>
                            <span>
                           <button
                              className="btn btn-danger"
                              onClick={() => destroyCliente(params.row.id_cliente)}
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
                            </span>
                            </Tooltip>
                            </div>
                          ),
                        },
                      ]}
                      autoHeight
                    pageSize={5}
                    pageSizeOptions={[5, 25, 50, 100]}
                      getRowClassName={(params) => {
                        if (!params.row.estado) {
                          return 'cliente-desactivado';
                        }
                        return null
                      }}
                      />
          </div>
            {showInfoModal && selectedCliente && ReactDOM.createPortal(
            <ClienteInfo
              cliente={selectedCliente}
              handleCloseModal={handleCloseInfoModal}
              open={showInfoModal}
            />,
            document.body
          )}           

          {openCreateModal && ReactDOM.createPortal(
           <>
           <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1049,
             }}
             onClick={handleCloseModal}
           />
        <div className="modal-create" style={{ maxHeight: '0vh', position: 'fixed', top: '30%', left: '42%', transform: 'translateX(-50%)', zIndex: 1050, 
            maxHeight: '25vh', overflowY: 'visible', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '150%', height: '180%' }}>
            <ClienteCreate handleSubmitForm={handleSubmitForm} handleCloseModal={handleCloseModal} />
          </div>
        </div>
        </>,
        document.body
        )}
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
        <ClienteUpdate handleCloseUpdateModal={handleCloseUpdateModal} clienteId={selectedClienteId}/>
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
);
}

export default ListarClientes;