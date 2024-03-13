import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import { useFichaTecnica } from '../../context/FichasTecnicas/FichaTecnicaContext';
import { useEffect, useState} from "react";
import Nav from '../../components/nav';
import FichaCreatePruebas from "../FichaTecnica/FichaCreatePruebas"
import ReactDOM from 'react-dom';
import { Modal, Button } from 'react-bootstrap';
import Tooltip from "@mui/material/Tooltip";
import { BsInfoCircleFill } from "react-icons/bs";
import FichaInfo from "../FichaTecnica/FichaInfo"
import { getListarFichaTecnica } from "../../api/Ficha/Rutas.ficha";
import { useMediaQuery } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const baseURL = import.meta.env.VITE_REACT_API_URL;




function ListarFichasTecnicas() {
  const{listar,ShowFichasTecnicasRealizada,filtrarDesactivados, eliminarFichasTecnicas,activarFichaTecnica,desactivarFichaTecnica,searchTerm,setSearchTerm, actualizarOperacion}=useFichaTecnica()
  const navigate=useNavigate()
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [showInfoVenta, setShowInfoVenta] = useState(false);
  const [selectVentaDetalles, setSelectVentaDetalles] = useState(null);
  const isSmallScreen = useMediaQuery('(max-width:1200px)');
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedClienteId, setSelectedClienteId] = useState(null);

  useEffect(() => {
   
    ShowFichasTecnicasRealizada();
  }, [searchTerm]);

  const handleOpenVentaModal = () => {
    setOpenCreateModal(true);
};

const handleSubmitForm = async () => {
};

const handleCloseVentaModal = () => {
  setOpenCreateModal(false);
  ShowFichasTecnicasRealizada()

};

const handleOpenInfoCompra = async (compraInfo) => {
  try {
    const response = await getListarFichaTecnica(compraInfo.id_ft);
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


const handleOpenUpdateModal = (id_ft) => {
  setSelectedClienteId(id_ft);
  setOpenUpdateModal(true);
};

const handleCloseUpdateModal = () => {
  setOpenUpdateModal(false);
  ShowFichasTecnicasRealizada()
};
 
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

const options = [
  { value: 'option1', label: 'Opción 1' },
  { value: 'option2', label: 'Opción 2' },
  { value: 'option3', label: 'Opción 3' },
];
  return (
    <>
    <Nav/>


<div className='dashboard-app'>
  
    <div className='dashboard-content'>
        <div className='container'>
            <div className='card'>
                <div className='card-body'>
                <div className="card-header">
                <h1>Listado de ventas</h1>
                      </div>
                <br />
        <div className="row">
          {/* <div className="col-md-3">
          <button
        className="btn btn-primary"
        onClick={handleOpenVentaModal}
        role="button"
      >
        Nuevo Registro
      </button>
                </div> */}
          {/* Botón de búsqueda */}
          <div className="col-md-3 " style={{ marginLeft: 'auto' }}>
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
                      
                      <Card key={item.id_ft}>
                        
                      <CardContent>
                        
                      <ul className="list-group list-group-flush">
                      <li className="list-group-item">Tipo ID: {item.id_ft}</li>
                     
                      <li className="list-group-item">Nombre: {item.nombre_ficha}</li>
                      <li className="list-group-item">Costo Final: {item.costo_final_producto}</li>
                      <li className="list-group-item"><img
                        src={`${baseURL}${item.imagen_producto_final}`}
                        alt="Imagen del producto"
                        style={{ width: '30%' }}
                      /></li>
                        </ul>
                        
                      </CardContent>
                      
                    </Card>
                    
                    ))}
                  
                  </div>
                
                ) : (

        <div style={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={filtrarDesactivados.map((item) => ({
              ...item,
              id: item.id_ft,
            }))}
            columns={[
              { field: 'id_ft', headerName: 'Id', headerClassName: 'encabezado', flex: 1 },
              { field: 'fecha', headerName: 'Fecha', headerClassName: 'encabezado', flex: 1,},

              { field: 'nombre_ficha', headerName: 'Nombre', headerClassName: 'encabezado', flex: 1 },
              { field: 'costo_final_producto', headerName: 'Costo Final', headerClassName: 'encabezado', flex: 1,
              
              valueFormatter: (params) => formatCurrency(params.value),
            },              
            { field: 'operacion', 
            headerName: 'Operación', 
            headerClassName: 'encabezado', 
            cellClassName: 'green-text',  
            flex: 1, 
            
          },

              {
                field: 'imagen_producto_final', headerName: 'Imagen', headerClassName: 'encabezado', flex: 0,
                renderCell: (params) => {
                  const [showModal, setShowModal] = useState(false);

                  const handleOpenModal = () => setShowModal(true);
                  const handleCloseModal = () => setShowModal(false);

                  return (
                    <div>

                      {/* <Button variant="secondary" onClick={handleOpenModal} style={{ marginLeft: '15px', padding: '20px' }}>
            <i class="bi bi-search"></i> {/* Bootstrap icon for search */}
                     <button type="button" className="btn btn-secondary" onClick={handleOpenModal}>
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-image-fill" viewBox="0 0 16 16">
  <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707v5.586l-2.73-2.73a1 1 0 0 0-1.52.127l-1.889 2.644-1.769-1.062a1 1 0 0 0-1.222.15L2 12.292V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2zm-1.498 4a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
  <path d="M10.564 8.27 14 11.708V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-.293l3.578-3.577 2.56 1.536 2.426-3.395z"/>
</svg>
</button>


                      <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                          <Modal.Title>Detalle de la Imagen</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <img
                            src={`${baseURL}${params.row.imagen_producto_final}`}
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
              },
      //         {
      //           field: 'estado',
      //           headerName: 'Estado',
      //           headerClassName: 'encabezado',
      //           flex: 1,
      //           renderCell: (params) => (
      //             <div className="switch-button">
      //                <input
      //                  type="checkbox"
      //                   id={`switch-label-${params.row.id_ft}`}
      //                   checked={params.row.estado}
      //                   onChange={(e) => {
      //                   e.preventDefault(); // Evitar la navegación por defecto
      //               if (params.row.estado) {
      //                 desactivarFichaTecnica(params.row.id_ft);
      //             } else {
      //                 activarFichaTecnica(params.row.id_ft);
      //           }
      //     }}
      //   className="switch-button__checkbox"
      // />
      // <label
      //   htmlFor={`switch-label-${params.row.id_ft}`}
      //   className="switch-button__label"
      // ></label>
      //             </div>
      //           ),
      //         },
      //         {
      //           field: 'acciones',
      //           headerName: 'Acciones',
      //           headerClassName: 'encabezado',
      //           flex: 1,
      //           renderCell: (params) => (
      //             <div>
      //               <button
      //                 className="btn btn-outline-secondary me-1"
      //                 onClick={() =>handleOpenUpdateModal(params.row.id_ft)}
      //                 disabled={!params.row.estado}
      //                 style={{
      //                   backgroundColor: '#0d6efd',
      //                   borderColor: '#0d6efd',
      //                   color: 'black',
      //                 }}
      //                 data-id={`edit-button-${params.row.id_ft}`}
      //               >
      //                 <svg
      //                   xmlns="http://www.w3.org/2000/svg"
      //                   width="16"
      //                   height="16"
      //                   fill="currentColor"
      //                   className="bi bi-arrow-clockwise"
      //                   viewBox="0 0 16 16"
      //                 >
      //                   <path
      //                     fillRule="evenodd"
      //                     d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
      //                   ></path>
      //                   <path
      //                     d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"
      //                   ></path>
      //                 </svg>
      //               </button>
      //               {params.row.tieneVentas || params.row.operacion=="Realizada" ? (
      //                           // Si el cliente tiene ventas, el botón de eliminar está deshabilitado
      //                           <button
      //                             className="btn btn-danger"
      //                             disabled
      //                           >
      //                             <svg
      //                               xmlns="http://www.w3.org/2000/svg"
      //                               width="16"
      //                               height="16"
      //                               fill="currentColor"
      //                               className="bi bi-trash"
      //                               viewBox="0 0 16 16"
      //                             >
      //                               <path
      //                                 d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"
      //                               ></path>
      //                               <path
      //                                 d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
      //                               ></path>
      //                             </svg>
      //                           </button>
      //                         ) : (
      //               <button
      //                 className="btn btn-danger"
      //                 onClick={() => eliminarFichasTecnicas(params.row.id_ft)}
      //                 disabled={!params.row.estado}
      //               >
      //                 <svg
      //                   xmlns="http://www.w3.org/2000/svg"
      //                   width="16"
      //                   height="16"
      //                   fill="currentColor"
      //                   className="bi bi-trash"
      //                   viewBox="0 0 16 16"
      //                 >
      //                   <path
      //                     d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"
      //                   ></path>
      //                   <path
      //                     d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
      //                   ></path>
      //                 </svg>
      //               </button>
      //               )}
      //             </div>
      //           ),
      //         },
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
                return 'Ficha-desactivado';
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
              <FichaCreatePruebas handleSubmitForm={handleSubmitForm} handleCloseVentaModal={handleCloseVentaModal} />
            </div>
          </div>
        </>,
        document.body
      )}{showInfoVenta && selectVentaDetalles &&
        ReactDOM.createPortal(
          <FichaInfo
          ficha={selectVentaDetalles}
            handleCloseModal={handleCloseInfoVenta}
            open={showInfoVenta}
          />,
          document.body
        )} {openUpdateModal && ReactDOM.createPortal(
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
              <div style={{ width: '1200px', height: '200%' }}>
                <FichaUpdate handleCloseUpdateModal={handleCloseUpdateModal} fichaId={selectedClienteId}/>
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

export default ListarFichasTecnicas;