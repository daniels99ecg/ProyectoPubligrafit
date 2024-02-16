import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import { useProducto } from '../../context/Productos/ProductoContext';
import { useEffect } from "react";
import { useMediaQuery } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent'
import Nav from '../../components/nav';
import { Modal, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import CreateProductos from './CreateProductos'
import ReactDOM from 'react-dom';
import UpdateProducto from './UpdateProducto'

function formatCurrency(amount) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
function formatNumber(value) {
  return new Intl.NumberFormat('es-AR').format(value);
}
function listarProductos() {

  const { listar, ShowProducto, filtrarDesactivados, eliminarProductos, activarProducto, desactivarProducto, searchTerm, setSearchTerm } = useProducto()
  const navigate = useNavigate()
  const isSmallScreen = useMediaQuery('(max-width:1200px)');
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedClienteId, setSelectedClienteId] = useState(null);


const handleOpenVentaModal = () => {
    setOpenCreateModal(true);
};

const handleSubmitForm = async () => {
};

const handleCloseVentaModal = () => {
  setOpenCreateModal(false);
  ShowProducto()

};

// Modal de Actualizar
const handleOpenUpdateModal = (id_producto) => {
  setSelectedClienteId(id_producto);
  setOpenUpdateModal(true);
};

const handleCloseUpdateModal = () => {
  setOpenUpdateModal(false);
  ShowProducto()
};

  useEffect(() => {
    ShowProducto()
  }, [searchTerm]);


  return (

    <>
      <Nav />


      <div className='dashboard-app'>

        <div className='dashboard-content'>
          <div className='container'>
            <div className='card'>
              <div className='card-body'>
                <div className="card-header">
                  <h1>Gestionar Productos</h1>
                </div>
                <br />
                <br />
                <div className="row">
                  <div className="col-md-3">
                  <button
        className="btn btn-primary"
        onClick={handleOpenVentaModal}
        role="button"
      >
        Nuevo Registro
      </button>
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
                {isSmallScreen ? (
                  // Render cards when the screen is small
                  <div>
                    {/* Map over your data and render cards here */}
                    {filtrarDesactivados.map((item) => (

                      <Card key={item.id_producto}>
                        <CardContent>
                          <ul className="list-group list-group-flush">

                            <li className="list-group-item">ID: {item.id_producto}</li>
                            <li className="list-group-item">Categoria: {item.fk_categoria}</li>
                            <li className="list-group-item">Nombre: {item.nombre_producto}</li>
                            <li className="list-group-item">Precio: {formatCurrency(item.precio)}</li>
                            <li className="list-group-item"><img
  src={`http://localhost:3001/${item.imagen}`}
  alt="Imagen del producto"
  style={{ width: '30%' }}
/></li>
                            <li className="list-group-item">cantidad: {formatNumber(item.cantidad)}</li>

                          </ul>
                         
                          <div className="row">
                            <div className="col-md-6"></div>
                            <div className="switch-button">
                              <input
                                type="checkbox"
                                id={`switch-label-${item.id_producto}`}
                                checked={item.estado}
                                onChange={(e) => {
                                  e.preventDefault(); // Evitar la navegación por defecto
                                  if (item.estado) {
                                    desactivarCliente(item.id_producto);
                                  } else {
                                    activarCliente(item.id_producto);
                                  }
                                }}
                                className="switch-button__checkbox"
                              />
                              <label
                                htmlFor={`switch-label-${item.id_producto}`}
                                className="switch-button__label"
                              ></label>
                            </div>
                          </div>
                          <div className="col-md-6">

                            <button
                              className="btn btn-outline-secondary me-1"
                              onClick={() => {
                                navigate(`/editP/${item.id_producto}`)
                                window.location.reload();
                              }}
                              disabled={!item.estado}
                              style={{
                                backgroundColor: '#0d6efd',
                                borderColor: '#0d6efd',
                                color: 'black',
                              }}
                              data-id={`edit-button-${item.id_producto}`}
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
                              onClick={() => eliminarProductos(item.id_producto)}
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
                  <div style={{ height: 500, width: '100%' }}>
                    <DataGrid
                      rows={filtrarDesactivados.map((item) => ({
                        ...item,
                        id: item.id_producto,
                        categoria: item.categoria.categoria,
                        imagen_ft:item.fichas_tecnica.imagen_producto_final,
                        nombre_producto:item.fichas_tecnica.nombre_ficha
                      }))}
                      columns={[
                        { field: 'id_producto', headerName: 'Id', headerClassName: 'encabezado', flex: 1 },
                        { field: 'categoria', headerName: 'Categoria', headerClassName: 'encabezado', flex: 1 },

                        { field: 'nombre_producto', headerName: 'Nombre', headerClassName: 'encabezado', flex: 1 },
                        { field: 'precio', headerName: 'Precio', headerClassName: 'encabezado', flex: 1,
                        valueFormatter: (params) => formatCurrency(params.value),
                      },
                        { field: 'cantidad', headerName: 'cantidad', headerClassName: 'encabezado', flex: 1,
                        valueFormatter: (params) =>formatNumber(params.value)
                      },
                        {
                          field: 'imagen', headerName: 'Imagen', headerClassName: 'encabezado', flex: 1,
                          renderCell: (params) => {
                            const [showModal, setShowModal] = useState(false);

                            const handleOpenModal = () => setShowModal(true);
                            const handleCloseModal = () => setShowModal(false);

                            return (
                              <div>

                                {/* <Button variant="secondary" onClick={handleOpenModal} style={{ marginLeft: '15px', padding: '20px' }}>
                      <i class="bi bi-search"></i> {/* Bootstrap icon for search */}
                                <button type="button" className="btn btn-secondary" onClick={handleOpenModal}>
                                  
                                  Visualizar
                                </button>


                                <Modal show={showModal} onHide={handleCloseModal}>
                                  <Modal.Header closeButton>
                                    <Modal.Title>Detalle de la Imagen</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    <img
                                      src={`http://localhost:3001/${params.row.imagen_ft}`}
                                      alt="Imagen del producto"
                                      style={{ width: '100%' }}
                                    />
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseModal}>
                                      Cerrar
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                              </div>
                            )
                          }
                        },




                        {
                          field: 'estado',
                          headerName: 'Estado',
                          flex: 1,
                          headerClassName: 'encabezado',
                          renderCell: (params) => (
                            <div className="switch-button">
                              <input
                                type="checkbox"
                                id={`switch-label-${params.row.id_producto}`}
                                checked={params.row.estado}
                                onChange={(e) => {
                                  e.preventDefault(); // Evitar la navegación por defecto
                                  if (params.row.estado) {
                                    desactivarProducto(params.row.id_producto);
                                  } else {
                                    activarProducto(params.row.id_producto);
                                  }
                                }}
                                className="switch-button__checkbox"
                              />
                              <label
                                htmlFor={`switch-label-${params.row.id_producto}`}
                                className="switch-button__label"
                              ></label>
                            </div>
                          ),
                        },
                        {
                          field: 'acciones',
                          headerName: 'Acciones',
                          flex: 1,
                          headerClassName: 'encabezado',
                          renderCell: (params) => (
                            <div>
                              <button
                                className="btn btn-outline-secondary me-1"
                                onClick={() => handleOpenUpdateModal(params.row.id_producto)}
                                disabled={!params.row.estado}
                                style={{
                                  backgroundColor: '#0d6efd',
                                  borderColor: '#0d6efd',
                                  color: 'black',
                                }}
                                data-id={`edit-button-${params.row.id_producto}`}
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
                              ) : (

                                <button
                                  className="btn btn-danger"
                                  onClick={() => eliminarProductos(params.row.id_producto)}
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
                            pageSize: 5,
                          },
                        },
                      }}
                      pageSizeOptions={[5]} 
                      getRowClassName={(params) => {
                        if (!params.row.estado) {
                          return 'cliente-desactivado';
                        }
                        return
                      }}
                    />
                  </div>
                )}
              </div>
              {openCreateModal && ReactDOM.createPortal(
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
              <CreateProductos handleSubmitForm={handleSubmitForm} handleCloseVentaModal={handleCloseVentaModal} />
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
        <UpdateProducto handleCloseUpdateModal={handleCloseUpdateModal} productoId={selectedClienteId}/>
      </div>
    </div>
  </>,
  document.body
)}



            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default listarProductos;