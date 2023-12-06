import React from "react";
import Modal from "@mui/material/Modal";

const ClienteInfo = ({ cliente, handleCloseModal, open }) => {
  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const contentStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    marginTop: "8%",
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

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <div style={modalStyle}>
        <div style={contentStyle} className="cliente-info-modal">
          <div>
            <h3 style={{ color: '#FFFAFA', background: '#4169E1'  }}>Info cliente</h3>
            <p>
              <strong>ID Cliente:</strong> {cliente.id_cliente}
            </p>
            <p>
              <strong>Nombre:</strong> {cliente.nombre} {cliente.apellido}
            </p>
            <p>
              <strong>Tipo Documento:</strong> {cliente.tipo_documento}
            </p>
            <p>
              <strong>Documento:</strong> {cliente.documento}
            </p>
            <p>
              <strong>Teléfono:</strong> {cliente.telefono}
            </p>
            <p>
              <strong>Dirección:</strong> {cliente.direccion}
            </p>
            <p>
              <strong>Email:</strong> {cliente.email}
            </p>
          </div>
          <button style={buttonStyle} onClick={handleCloseModal}>
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ClienteInfo;
