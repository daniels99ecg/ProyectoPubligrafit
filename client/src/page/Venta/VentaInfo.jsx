import React from "react";
import Modal from "@mui/material/Modal";

const VentaInfo = ({ venta, handleCloseModal, open }) => {
  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const contentStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    marginTop: "15%",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const cellStyle = {
    borderBottom: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  };

  const headerCellStyle = {
    ...cellStyle,
    backgroundColor: "#498cf1",
    color: "white",
  };

  const buttonStyle = {
    backgroundColor: "grey",
    borderColor: "grey",
    color: "white",
    padding: "5px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
    width: "10%",
  };

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <div style={modalStyle}>
        <div style={contentStyle} className="venta-info-modal">
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerCellStyle}>Tipo Documento</th>
                <th style={headerCellStyle}>Documento</th>
                <th style={headerCellStyle}>Nombre</th>
                <th style={headerCellStyle}>Apellido</th>
                <th style={headerCellStyle}>Teléfono</th>
                <th style={headerCellStyle}>Dirección</th>
                <th style={headerCellStyle}>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={cellStyle}>{venta.tipo_documento}</td>
                <td style={cellStyle}>{venta.documento}</td>
                <td style={cellStyle}>{venta.nombre}</td>
                <td style={cellStyle}>{venta.apellido}</td>
                <td style={cellStyle}>{venta.telefono}</td>
                <td style={cellStyle}>{venta.direccion}</td>
                <td style={cellStyle}>{venta.email}</td>
              </tr>
            </tbody>
          </table>
          <button style={buttonStyle} onClick={handleCloseModal}>
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default VentaInfo;
