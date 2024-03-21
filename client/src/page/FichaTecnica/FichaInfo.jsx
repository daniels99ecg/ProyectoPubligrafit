import Modal from "@mui/material/Modal";
import {  Button } from 'react-bootstrap';

import { Formik, Form, Field } from "formik";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import {TextField } from "@mui/material";
import Pagination from "react-bootstrap/Pagination";
import { TiDeleteOutline } from "react-icons/ti";

const FichaInfo = ({ ficha, handleCloseModal, open }) => {
  const [totalSubtotal, setTotalSubtotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const contentStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    marginTop: "5%",
  };

  const buttonStyle = {
    backgroundColor: "grey",
    borderColor: "grey",
    color: "white",
    padding: "5px",
    borderRadius: "5px",
    cursor: "pointer",
    width: "30%",
  };

  const thStyle = {
    borderBottom: "1px solid #dddddd",
    borderRight: "1px solid #dddddd", 
    padding: "8px",
  };

  const tdStyle = {
    borderBottom: "1px solid #dddddd", 
    padding: "0px",
  };

  const tableStyle = {
    width: "100%",
    textAlign: "center",
    borderCollapse: "collapse",
  };

  const thSubtotalStyle = {
    borderBottom: "1px solid #dddddd",
    padding: "8px",
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

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = ficha.detalles.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const itemsPerPage = 5; // Número de elementos por página
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;


  function formatearValores(global) {
    const [int, decimal] = parseFloat(global).toFixed(2).split(".");
    const formateoInt = int.replace(/\d(?=(\d{3})+$)/g, "$&.");
    return `${formateoInt},${decimal}`;
  }

  // Formatear valores sin decimales
  // function formatearPrecios(valor) {
  //   const valorFormateado = parseFloat(valor).toFixed(0);
  //   const formateoInt = valorFormateado.replace(/\d(?=(\d{3})+$)/g, "$&.");
  //   return formateoInt;
  // }





  return (
    <Modal open={open} onClose={handleCloseModal}>
       <>
      <div className="dashboard-app">
        <div className="dashboard-content">
          <div className="container">
            <div
              className="card"
              style={{
                maxWidth: "1000px",
                padding: "20px",
                maxHeight: "620px",
              }}
            >
     <div className="d-flex justify-content-end">
  <button className="btn btn-outline-secondary" onClick={handleCloseModal}>
    <i className="bi bi-x">X</i>
  </button>
</div>
              <div className="card-body">
              
                       
                       
                <div className="card-header"></div>
                <br />

                <Formik
                
                 
                  
                >
                  {({
                
                  }) => (
                    <Form  className="row g-3">
                      <div className="content">
                        <div className="container-fluid">
                          <div className="row mb-3 p-3 align-items-start">

                                 {/* Componente 2 */}
                                 <div className="col-md-4 col-sm-12 d-flex">
                              <div className="card shadow flex-fill">
                                <div className="card-body p-3">
                                  
                              
                               

                                  <div className="form-group mb-2">
                                  <Field
            type='text'
            name='nombre_ficha'
            className='form-control'
            as={TextField}
            value={ficha.cliente.nombre}
            label="Cliente"
        

            // onChange={(e) => {
            //   handleChange(e);
            //   // setNombreFicha(e.target.value); // Actualizar el estado local
            // }}
          />

</div>
<div className="form-group mb-2">

                                  <Field
            type='text'
            name='nombre_ficha'
            className='form-control'
            as={TextField}
            value={ficha.nombre_ficha}
            label="Nombre Ficha"
         

            // onChange={(e) => {
            //   handleChange(e);
            //   // setNombreFicha(e.target.value); // Actualizar el estado local
            // }}
          />

</div>
<div className="form-group mb-2">

<Field
                            type='text'
                            name='detalle'
                            as={TextField}
                            label="Descripción"
                            className='form-control'
                           
                            value={ficha.detalle}
                          />  
</div>
<div className="form-group mb-2">


          </div>
          <div className="form-group mb-2">

             <label htmlFor="mano_obra">Incremento de Ventas</label>

                          <input  
                            type='number'
                            name='mano_obra'
                            className='form-control'
                            value={ficha.mano_obra}
                         
                
                            style={{
        width: '100%',
        border: '1px solid rgba(0, 0, 0, 0.23)', // Establece el estilo del borde
        borderRadius: '4px', // Ajusta el radio del borde
        padding: '10px 14px', // Ajusta el relleno
        backgroundColor: '#fff', // Ajusta el color de fondo
        '&:focus': {
            outline: 'none', // Elimina el contorno al enfocar
            borderColor: '#1976d2', // Cambia el color del borde al enfocar
        },
    }}
                          /> 
                         
         </div>  

                      
                                  <div className="form-group mb-2">
                                    <Field
                                      type="hidden"
                                      name="fecha"
                                      id="fecha"
                                      className="form-control"
                                      value={ficha.fecha}
                                
                                    />
                                  </div>
<br />
                                  {/* <div className="form-group mb-2">
                                    <Field
                                      type="text"
                                      name="costo_final_producto"
                                      id="total"
                                      as={TextField}
                                      label="Total"
                                      value={formatearValores(sumaSubtotalesProductos)}
                                      onChange={(e) => {
                                        setTotalTouched(true);
                                        handleChange(e);
                                      
                                      }}
                                      InputProps={{
                                        endAdornment: (
                                          <div style={{ display: "flex" }}>
                                            {totalTouched && !errors.total && (
                                              <CheckCircleIcon
                                                style={{
                                                  color: "green",
                                                  marginLeft: "10px",
                                                }}
                                              />
                                            )}
                                            {totalTouched && errors.total && (
                                              <ErrorIcon
                                                style={{
                                                  color: "red",
                                                  marginLeft: "10px",
                                                }}
                                              />
                                            )}
                                          </div>
                                        ),
                                      }}
                                    />
                                    <ErrorMessage
                                      name="total"
                                      component="div"
                                      className="error-message"
                                    />
                                  </div> */}
                                          
                                  <div className="row mt-2">
                                    <div className="col-8">
                                      <div className="text-right">
                                        {/* <strong>Costo de producción:</strong> <strong>$</strong>&nbsp;
                                        <span id="comprobante_subtotal">
                                          {formatearPrecios(subtotalTotal)}
                                        </span> */}
                                      </div>
                                      
                                     
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* Fin componente 2 */}
                            {/* Componente 1*/}
                            <div className="col-md-8 col-sm-12 d-flex">
                              <div className="row flex-fill">
                                {/* Contenedor tabla y formulario */}
                                <div className="col-md-12 mb-3">
                                <div className="form-group mb-2">
                                  
                                  </div>
                           

                                  {/* Tabla Detalles */}
                                  <div
                                    className="col-md-12"
                                    style={{
                                      marginTop: "-50px",
                                      maxWidth: "100%",
                                    }}
                                  >

                                  <br />
                                  <br />
                                  <br />
                                      <div>
                                       
                                        <table
                                          id="detallesVenta"
                                          className="display  tabble-striped w-100 shadow custom-table"
                                        >
                                          <thead className="info text-left fs-6">
                                            <tr>
                                            <th>Id</th>
                                              <th>Insumo</th>
                                              <th>Precio</th>
                                              <th>Cantidad</th>
                                              <th></th>
                                              <th>Costo</th>
                                             
                                            </tr>
                                          </thead>
                                          <tbody className="small text-left fs-6">
                                            {currentProducts.map((row, index) => (
                                              <tr key={index}>
                                                <td>{row.insumo.id_insumo}</td>
                                                <td>{row.insumo.nombre}</td>
                                                <td>
                                                  {formatearPrecios(row.precio)}
                                                </td>
                                                <td>
                                                {row.cantidad} de {row.insumo.presentacione.nombre_presentacion}
                                          </td>
                                                <td></td>
                                                <td>
                                                  {formatearPrecios(
                                                    row.precio * row.cantidad
                                                  )}
                                                </td>
                                                <td>
                                                  <Tooltip
                                                    title="Eliminar"
                                                    arrow
                                                  >
                                                    <span>
                                                      
                                                    </span>
                                                  </Tooltip>
                                                </td>
                                              </tr>
                                            ))}


<tr>
          
          <td colSpan="0"><strong>Subtotal:</strong></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td><strong>{formatearPrecios(ficha.costo_final_producto)}</strong></td>
          <td></td>
        
      </tr>

      <tr>
         
          <td><strong>IVA 19%:</strong></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td><strong>{formatearPrecios(ficha.costo_final_producto*0.19)}</strong></td>
          <td></td>
      </tr>

      <tr>
         
         <td><strong>TOTAL:</strong></td>
         <td></td>
         <td></td>
         <td></td>
         <td></td>
         <td><strong>{formatearPrecios(ficha.costo_final_producto*0.19+ficha.costo_final_producto)}</strong></td>
         <td></td>
     </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                  
                                  </div>
                                  
                                  {/* Paginación de Bootstrap */}
                                  {currentProducts.length > 0 && (
                                    <div className="d-flex mt-2">
                                      <Pagination>
                                        <Pagination.Prev
                                          onClick={() =>
                                            setCurrentPage((prev) =>
                                              Math.max(prev - 1, 1)
                                            )
                                          }
                                          disabled={currentPage === 1}
                                        />
                                        {Array.from({
                                          length: Math.ceil(
                                            currentProducts.length / itemsPerPage
                                          ),
                                        }).map((_, index) => (
                                          <Pagination.Item
                                            key={index + 1}
                                            active={index + 1 === currentPage}
                                            onClick={() =>
                                              setCurrentPage(index + 1)
                                            }
                                          >
                                            {index + 1}
                                          </Pagination.Item>
                                        ))}
                                        <Pagination.Next
                                          onClick={() =>
                                            setCurrentPage((prev) =>
                                              Math.min(
                                                prev + 1,
                                                Math.ceil(
                                                  currentProducts.length /
                                                    itemsPerPage
                                                )
                                              )
                                            )
                                          }
                                          disabled={
                                            currentPage ===
                                            Math.ceil(
                                              currentProducts.length / itemsPerPage
                                            )
                                          }
                                        />
                                      </Pagination>
                                    </div>
                                  )}
                                  <p>Boton de detalles</p>
                              
                                </div>
                              </div>
                            </div>
                            
                            {/* Fin componente 1 */}

                       
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </> 
    </Modal>
  );
};

export default FichaInfo;