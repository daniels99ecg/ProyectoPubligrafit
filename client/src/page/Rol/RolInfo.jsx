import React from "react";
import Modal from "@mui/material/Modal";

const RolInfo = ({ rol, handleCloseModal, open }) => {
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
        <div style={contentStyle} className="rol-info-modal">
          <div>
            <h3 style={{ color: 'black'  }}>Información rol</h3>
            <hr />
            <p>
              <strong>Nombre:</strong> {rol.usuario.nombres}
            </p>
            <div>
              <strong>Permisos:</strong>
              <ul>
                {rol.permisos.map((permiso, index) => (
                  <li key={index}>{permiso}</li>
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

export default RolInfo;
