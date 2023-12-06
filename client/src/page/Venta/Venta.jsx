import { DataGrid } from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { useVenta } from "../../context/Ventas/VentaContext";
import { getListarVentas } from "../../api/Rutas.Venta.api";
import VentaInfo from "./VentaInfo";
import Nav from "../../components/nav";
import VentaCreate from "./VentaCreate"

function listarVentas() {
  const { searchTerm, setSearchTerm, listar, setListar, showVentas } = useVenta();
  const [selectedVenta, setSelectedVenta] = useState(null); // Esto para info
  const [showInfoVenta, setShowInfoVenta] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);

const handleOpenVentaModal = () => {
    setOpenCreateModal(true);
};

const handleSubmitForm = async (formData) => {
};

const handleCloseVentaModal = () => {
  setOpenCreateModal(false);
  showVentas();
};

  useEffect(() => {
    async function showVenta() {
      const response = await getListarVentas();
      setListar(response.data);
    }

    showVentas();
  }, [searchTerm]);

  // Abrir modal info
  const handleOpenInfoVenta = (clienteInfo) => {
    setSelectedVenta(clienteInfo);
    setShowInfoVenta(true);
  };

  // Cerrar modal info
  const handleCloseInfoVenta = () => {
    setShowInfoVenta(false);
    setSelectedVenta(null);
  };

  return (
    <>
      <Nav />

      <div className="dashboard-app">
        <div className="dashboard-content">
          <div className="container">
            <div className="card">
              <div className="card-body">
                <div className="card-header">
                  <h1>Listado de Ventas</h1>
                </div>
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
                  <div className="col-md-3" style={{ marginLeft: "auto" }}>
                    <input
                      type="text"
                      placeholder="Buscar"
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                <br />
                <div style={{ flex: 1, height: "100%", width: "100%" }}>
                  <DataGrid
                    rows={listar.map((row) => ({ ...row, id: row.id_venta, documentoCliente: row.cliente.documento }))}
                    columns={[
                      {
                        field: "id_venta",
                        headerName: "ID",
                        headerClassName: "encabezado",
                        flex: 1,
                      },
                      {
                        field: "documentoCliente",
                        headerName: "Documento",
                        headerClassName: "encabezado",
                        flex: 1,
                      },
                      {
                        field: "tipo_comprobante",
                        headerName: "Comprobante",
                        headerClassName: "encabezado",
                        flex: 1,
                      },
                      {
                        field: "fecha",
                        headerName: "Fecha",
                        headerClassName: "encabezado",
                        flex: 1,
                      },
                      {
                        field: "total",
                        headerName: "Total",
                        headerClassName: "encabezado",
                        flex: 1,
                      },
                      {
                        field: "info",
                        headerName: "Info",
                        headerClassName: "encabezado",
                        flex: 1,
                        renderCell: (params) => (
                          <Tooltip title="Información" arrow>
                            <span>
                              <button
                                className="btn btn-light"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "10px",
                                  borderRadius: "50%",
                                }}
                                onClick={() => handleOpenInfoVenta(params.row)}
                                disabled={!params.row.estado}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="25"
                                  height="25"
                                  fill="gray"
                                  className="bi bi-info-circle-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                                </svg>
                              </button>
                            </span>
                          </Tooltip>
                        ),
                      },
                    ]}
                    autoHeight
                    pageSize={5}
                    pageSizeOptions={[5, 25, 50, 100]}
                    getRowId={(row) => row.id}
                  />
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
              <VentaCreate handleSubmitForm={handleSubmitForm} handleCloseVentaModal={handleCloseVentaModal} />
            </div>
          </div>
        </>,
        document.body
      )}
                {showInfoVenta &&
                  selectedVenta &&
                  ReactDOM.createPortal(
                    <VentaInfo
                      venta={selectedVenta}
                      handleCloseModal={handleCloseInfoVenta}
                      open={showInfoVenta}
                    />,
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

export default listarVentas;
