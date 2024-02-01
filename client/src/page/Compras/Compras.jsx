import { useState, useEffect } from "react";
import '../../css/style.css'
import Nav from '../../components/nav'
import {DataGrid} from '@mui/x-data-grid'
import { useCompra } from "../../context/Compras/ComprasContext";
import ComprasCreatePruebas from "../Compras/ComprasCreatePruebas"
import ReactDOM from 'react-dom';
import { getListaCompra } from "../../api/Compras/rutas.api";
import Tooltip from "@mui/material/Tooltip";
import { BsInfoCircleFill } from "react-icons/bs";
import CompraInfo from "../Compras/CompraInfo"
import { FaFileInvoiceDollar } from "react-icons/fa6";
import ComprobanteCliente from "./VentaComprobante";

function Compras (){ //Inicializar
const {cargarCompras,setSearchTerm,searchTerm,filtrarDesactivados} = useCompra()
const [openCreateModal, setOpenCreateModal] = useState(false);
const [showInfoVenta, setShowInfoVenta] = useState(false);
const [selectVentaDetalles, setSelectVentaDetalles] = useState(null);
const [selectVenta, setSelectVenta] = useState(null);
const [comprobanteModal, setComprobanteModal] = useState(false);



 // Formatear valores sin decimales
 function formatearPrecios(amount) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

useEffect(()=>{
    
    cargarCompras()

},[searchTerm])

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

};

const handleOpenInfoCompra = async (compraInfo) => {
  try {
    const response = await getListaCompra(compraInfo.id_compra);
    setSelectVentaDetalles(response.data);
    setShowInfoVenta(true);
  } catch (error) {
    console.error("Error al obtener detalles de la compra", error);
  }
};

// Cerrar modal info
const handleCloseInfoVenta = () => {
  setShowInfoVenta(false);
  setSelectVentaDetalles(null);
};

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
    
    <div className="col-md-3">
                  <button
        className="btn btn-primary"
        onClick={handleOpenVentaModal}
        role="button"
      >
        Nuevo Registro
      </button>
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
          {field:'id_compra',headerName:'ID', headerClassName: 'encabezado',flex:1},
          {field:'proveedor',headerName:'Proveedor', headerClassName: 'encabezado',flex:1},
          {field:'cantidad',headerName:'Cantidad', headerClassName: 'encabezado',flex:1},
          {field:'fecha',headerName:'Fecha', headerClassName: 'encabezado',flex:1},
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
                    onClick={() => handleOpenInfoCompra(params.row)}
                  >
                    <BsInfoCircleFill
                      size={30}
                      color="grey"
                    />
                  </button>
                </span>
              </Tooltip>
            ),
          },,
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
              <ComprasCreatePruebas handleSubmitForm={handleSubmitForm} handleCloseVentaModal={handleCloseVentaModal} />
            </div>
          </div>
        </>,
        document.body
      )}
      {showInfoVenta && selectVentaDetalles &&
        ReactDOM.createPortal(
          <CompraInfo
          compra={selectVentaDetalles}
            handleCloseModal={handleCloseInfoVenta}
            open={showInfoVenta}
          />,
          document.body
        )}{comprobanteModal && (
          <ComprobanteCliente
          compra={selectVenta}
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
    )
}
export default Compras
