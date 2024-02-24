import { DataGrid } from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { useVenta } from "../../context/Ventas/VentaContext";
import { getListarVentas, getListaVenta } from "../../api/Rutas.Venta.api";
import { FaCreditCard } from "react-icons/fa6";
import { BsInfoCircleFill } from "react-icons/bs";
import { BsCashCoin } from "react-icons/bs";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import VentaInfo from "./VentaInfo";
import ComprobanteCliente from "./VentaComprobante";
import Nav from "../../components/nav";
import VentaCreate from "./VentaCreate"
import { BsDownload } from "react-icons/bs";
import * as XLSX from "xlsx";
import { saveAs } from 'file-saver';
import { useMediaQuery } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
function listarVentas() {
  const { searchTerm, setSearchTerm, listar, setListar, showVentas } = useVenta();
  const [showInfoVenta, setShowInfoVenta] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectVentaDetalles, setSelectVentaDetalles] = useState(null);
  const [selectVenta, setSelectVenta] = useState(null);
  const [comprobanteModal, setComprobanteModal] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:1200px)');

  const handleExportToExcel = async () => {
    try {
      const response = await getListarVentas();
      const ventasConDetalles = response.data;
  
      const data = [];
  
      ventasConDetalles.forEach((row) => {
        const ventaInfo = {
          ID: row.id_venta,
          Cliente: `${row.cliente.nombre} ${row.cliente.apellido}`,
          Método: row.metodo_pago,
          Fecha: row.fecha,
          Total: formatearPrecios(row.total),
        };
  
        row.detalles.forEach((detalle, index) => {
          const detalleInfo = {
            Producto: detalle.producto.nombre_producto,
            Cantidad: detalle.cantidad,
            Precio: formatearPrecios(detalle.precio),
            Subtotal: formatearPrecios(detalle.subtotal),
          };
  
          if (index === 0) {
            data.push({ ...ventaInfo, ...detalleInfo });
          } else {
            data.push({ ...detalleInfo, ID: '', Cliente: '', Método: '', Fecha: '', Total: '' });
          }
        });
      });
  
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Ventas');
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  
      const fileName = 'ListadoVentas.xlsx';
  
      const excelBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  
      saveAs(excelBlob, fileName);
    } catch (error) {
      console.error("Error al obtener las ventas", error);
    }
  };

  const handleOpenComprobanteModal = (venta) => {
    setSelectVenta(venta);
    setComprobanteModal(true);
  };

  const handleOpenVentaModal = () => {
      setOpenCreateModal(true);
  };

  const handleSubmitForm = async () => {
  };

  const handleCloseVentaModal = () => {
    setOpenCreateModal(false);
    showVentas();
  };

  // Abrir modal info
  const handleOpenInfoVenta = async (ventaInfo) => {
    try {
      const response = await getListaVenta(ventaInfo.id_venta);
      setSelectVentaDetalles(response.data);
      setShowInfoVenta(true);
    } catch (error) {
      console.error("Error al obtener detalles de la venta", error);
    }
  };

  // Cerrar modal info
  const handleCloseInfoVenta = () => {
    setShowInfoVenta(false);
    setSelectVentaDetalles(null);
  };

  // Formatear valores sin decimales
  function formatearPrecios(amount) {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  useEffect(() => {
    async function showVentas() {
      const response = await getListarVentas();
      setListar(response.data);
    }

    showVentas();
  }, [searchTerm]);


  return (
    <>
      <Nav />

      <div className="dashboard-app">
        <div className="dashboard-content">
          <div className="container">
            <div className="card">
              <div className="card-body">
                <div className="card-header">
                  <h1>Listado de ventas</h1>
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
                  <br />
                  <br />
                  <div className="col-md-3">
        <button
          className="btn btn-dark button-exportar"
          onClick={handleExportToExcel}
          role="button"
        >
          <BsDownload />
          &nbsp;&nbsp;Exportar
        </button>
      </div>
  <br />
  <br />
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
                {isSmallScreen ? (
                  // Render cards when the screen is small
                  <div>
                    {/* Map over your data and render cards here */}
                    {listar.map((item) => (
                      
                      <Card key={item.id_venta}>
                      <CardContent>
                      <ul className="list-group list-group-flush">
                      <li className="list-group-item">Tipo ID: {item.id_venta}</li>
                      <li className="list-group-item">Nombre: {item.cliente.nombre}</li>
                      <li className="list-group-item">Apellido: {item.cliente.apellido}</li>
                      <li className="list-group-item">Método:
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                            {item.metodo_pago === 'Efectivo' ? (
                              <BsCashCoin style={{ color: 'green', marginRight: '5px' }} />
                            ) : (
                              item.metodo_pago === 'Transferencia' && (
                                <FaCreditCard style={{ color: '#2E4053', marginRight: '5px' }} />
                              )
                            )}
                            <span>{item.metodo_pago}</span>
                            </div>
                      </li>
                      <li className="list-group-item">Fecha: {item.fecha}</li> 
                      <li className="list-group-item">Total: {item.total}</li> 
                        </ul>
                        
                        <div className="col-md-6">
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
                                onClick={() => handleOpenInfoVenta(item)}
                              >
                                <BsInfoCircleFill
                                  size={30}
                                  color="grey"
                                />
                              </button>
                            </span>
                          </Tooltip>

                          <Tooltip title="Factura" arrow>
                            <span>
                            <button
                              onClick={() => handleOpenComprobanteModal(item)}
                              className="btn btn-link"
                            >
                              <FaFileInvoiceDollar style={{ fontSize: '24px', color: '#1A5276' }} />
                            </button>
                            </span>
                            </Tooltip>
                            </div>
                        
                      </CardContent>
                    </Card>
                    ))}
                  
                  </div>
                
                ) : (
                <div style={{ flex: 1, height: "100%", width: "100%" }}>
                  <DataGrid
                    rows={listar.map((row) => ({ ...row, id: row.id_venta, nombreCliente: `${row.cliente.nombre} ${row.cliente.apellido}` }))}
                    columns={[
                      {
                        field: "id_venta",
                        headerName: "ID",
                        headerClassName: "encabezado",
                        flex: 0.5,
                      },
                      {
                        field: "nombreCliente",
                        headerName: "Cliente",
                        headerClassName: "encabezado",
                        flex: 1,
                      },
                      {
                        field: "metodo_pago",
                        headerName: "Método",
                        headerClassName: "encabezado",
                        flex: 1,
                        renderCell: (params) => (
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            {params.row.metodo_pago === 'Efectivo' ? (
                              <BsCashCoin style={{ color: 'green', marginRight: '5px' }} />
                            ) : (
                              params.row.metodo_pago === 'Transferencia' && (
                                <FaCreditCard style={{ color: '#2E4053', marginRight: '5px' }} />
                              )
                            )}
                            <span>{params.row.metodo_pago}</span>
                          </div>
                        ),
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
                        renderCell: (params) => (
                          <span>{formatearPrecios(params.row.total)}</span>
                        ),
                      },
                      {
                        field: 'info',
                        headerName: 'Info',
                        headerClassName: 'encabezado',
                        flex: 0,
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
                                onClick={() => handleOpenInfoVenta(params.row)}
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
                        field: 'factura',
                        headerName: 'Acciones',
                        headerClassName: 'encabezado',
                        flex: 0,
                        renderCell: (params) => (
                          <Tooltip title="Factura" arrow>
                            <span>
                            <button
                              onClick={() => handleOpenComprobanteModal(params.row)}
                              className="btn btn-link"
                            >
                              <FaFileInvoiceDollar style={{ fontSize: '24px', color: '#1A5276' }} />
                            </button>
                            </span>
                            </Tooltip>
                        )
                      }
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
                      if (!params.row.estado) {
                        return 'Compra-desactivado';
                      }
                      return
                    }}
                  />
                </div>
                )}
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
                  selectVentaDetalles &&
                  ReactDOM.createPortal(
                    <VentaInfo
                    venta={selectVentaDetalles}
                      handleCloseModal={handleCloseInfoVenta}
                      open={showInfoVenta}
                    />,
                    document.body
                  )}
                  {comprobanteModal && (
        <ComprobanteCliente
          venta={selectVenta}
          handleCloseModal={() => setComprobanteModal(false)}
          open={comprobanteModal}
        />
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
