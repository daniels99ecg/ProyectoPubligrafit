import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import Nav from '../../components/nav';
import { useCliente } from '../../context/Clientes/ClienteContext';
import ClienteCreate from './ClienteCreate'
import ClienteInfo from './ClienteInfo'
import ClienteUpdate from './ClienteUpdate'
import { BsInfoCircleFill, BsArrowClockwise, BsTrash } from "react-icons/bs";

function ListarClientes() {
  const {showClientes, searchTerm, setSearchTerm, activarCliente, desactivarCliente, filtrarDesactivados, destroyCliente}= useCliente()
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

const handleSubmitForm = async () => {
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
  setSelectedCliente(null);
  setShowInfoModal(false);
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
          <br />
          <br />
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
              { field: "tipo_documento", headerName: "Tipo ID", headerClassName: 'encabezado', flex: 1.5},
              { field: "documento", headerName: "Documento", headerClassName: 'encabezado', flex: 2 },
              { field: "nombre", headerName: "Nombre", headerClassName: 'encabezado', flex: 2 },
              { field: "apellido", headerName: "Apellido", headerClassName: 'encabezado', flex: 2 },
              { field: "email", headerName: "Email", headerClassName: 'encabezado', flex: 4 },
              {
                field: 'estado',
                headerName: 'Estado',
                headerClassName: 'encabezado',
                flex: 1.5,
                renderCell: (params) => (
                  <Tooltip
                    title={params.row.estado ? 'Inhabilitar' : 'Habilitar'}
                    arrow
                  >
                  <div className="switch-button estado-bottom">
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
                        className="btn btn-light info-button"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '5px',
                          borderRadius: '50%',
                          backgroundColor: 'white',
                        }}
                        onClick={() => handleOpenInfoModal(params.row)}
                        disabled={!params.row.estado}
                      >
                        <BsInfoCircleFill
                          size={30}
                          color="grey"
                        />
                      </button>
                    </span>
                  </Tooltip>
                ),
              },
              {
                field: 'acciones',
                headerName: 'Acciones',
                headerClassName: 'encabezado',
                flex: 2,
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
                          <BsArrowClockwise />
                        </button>
                      </span>
                    </Tooltip>
              
                    {params.row.tieneVentas ? (
                      <Tooltip title="Eliminar (Cliente asociado a venta)" arrow>
                        <span>
                          <button
                            className="btn btn-danger client-button"
                            disabled
                          >
                            <BsTrash />
                          </button>
                        </span>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Eliminar" arrow>
                        <span>
                          <button
                            className="btn btn-danger client-button"
                            onClick={() => destroyCliente(params.row.id_cliente)}
                            disabled={!params.row.estado}
                          >
                            <BsTrash />
                          </button>
                        </span>
                      </Tooltip>
                    )}
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
          <div style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1049,
          }}
            onClick={handleCloseModal}
          />
          <div className="modal-create" 
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
            alignItems: 'center' }}>
          <div 
          style={{ 
            width: '150%', 
            height: '180%' }}>
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