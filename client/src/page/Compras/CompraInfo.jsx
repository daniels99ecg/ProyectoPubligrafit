import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";

const CompraInfo = ({ compra, handleCloseModal, open }) => {
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
  const currentProducts = compra.detalles.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const subtotalTotal = compra.detalles.reduce((total, detalle) => total + detalle.subtotal, 0);
    setTotalSubtotal(subtotalTotal);
  }, [compra.detalles]);

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <div style={modalStyle}>
        <div style={contentStyle} className="compra-info-modal">
          <div>
          <h3 style={{ color: 'black'  }}>Información compra</h3>
            <hr />
            <p>
              <strong>Cliente:</strong> {compra.proveedore.nombre} 
            </p>
          
            <p>
              <strong>Fecha:</strong> {compra.fecha}
            </p>
            <p>
              <strong>Total:</strong> {formatearPrecios(compra.total)}
            </p>
             <p>
              <strong>Subtotal:</strong> {formatearPrecios(totalSubtotal)}
            </p>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Productos</th>
                  <th style={thStyle}>Cantidad</th>
                  <th style={thStyle}>Precio</th>
                  <th style={thSubtotalStyle}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((detalle) => (
                  <tr key={detalle.id_detalle_compra}>
                    <td style={tdStyle}>{detalle.insumo.nombre}</td>
                    <td style={tdStyle}>
                      {detalle.cantidad === 1
                        ? `${detalle.cantidad} Und`
                        : `${detalle.cantidad} Unds`}
                    </td>
                    <td style={tdStyle}>{formatearPrecios(detalle.precio)}</td>
                    <td style={tdStyle}>{formatearPrecios(detalle.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <ul className="pagination">
                {[...Array(Math.ceil(compra.detalles.length / productsPerPage)).keys()].map((number) => (
                  <li key={number + 1} className="page-item">
                    <button onClick={() => paginate(number + 1)} className="page-link">
                      {number + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button style={buttonStyle} onClick={handleCloseModal}>
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CompraInfo;