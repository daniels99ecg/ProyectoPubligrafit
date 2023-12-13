import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { FaFacebook } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";

const ComprobanteCliente = ({ venta, handleCloseModal, open }) => {
  const [totalSubtotal, setTotalSubtotal] = useState(0);
  const [descargar, setDescargar] = useState(false);

  useEffect(() => {
    const subtotalTotal = venta.detalles.reduce((total, detalle) => total + detalle.subtotal, 0);
    setTotalSubtotal(subtotalTotal);
  }, [venta.detalles]);

  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const logoStyle = {
    maxWidth: "100%",
    marginBottom: "10px",
  };
  
  const titleStyle = {
    fontSize: "20px",
    textAlign: "center",
    marginTop: "10px",
  };

  const contentStyle = {
    backgroundColor: "white",
    padding: "2%",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "800px",
    margin: "0 auto",
    fontSize: "1rem",
  };

  const sectionStyle = {
    marginBottom: "2vh",
  };

  const tableStyle = {
    width: "100%",
    textAlign: "center",
    borderCollapse: "collapse",
  };

  const thStyle = {
    borderBottom: "1px solid #dddddd",
    borderRight: "1px solid #dddddd",
    padding: "8px",
  };
  
  const tdStyle = {
    borderRight: "1px solid #dddddd",
    padding: "8px",
  };
  
  const tdNoBorderBottomStyle = {
    borderBottom: "none", 
    padding: "8px",
  };

  const thSubtotalStyle = {
    borderBottom: "1px solid #dddddd",
    padding: "8px",
  };

  function formatearPrecios(valor) {
    const valorFormateado = parseFloat(valor).toFixed(0);
    const formateoInt = valorFormateado.replace(/\d(?=(\d{3})+$)/g, "$&.");
    return formateoInt;
  }

  useEffect(() => {
    const subtotalTotal = venta.detalles.reduce((total, detalle) => total + detalle.subtotal, 0);
    setTotalSubtotal(subtotalTotal);
  }, [venta.detalles]);

  const handleDescargar = () => {
    setDescargar(true);
  };

  useEffect(() => {
    const exportToPDF = async () => {
      const content = document.getElementById("VentaComprobante");
      content.style.width = "1000px"; 
      content.style.height = "auto";

      const canvas = await html2canvas(content, {
        scale: 3, 
        logging: true,
      });
      content.style.width = "100%";
      content.style.height = "100%";

      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(canvas, "PNG", 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      pdf.save(`factura_${venta.id_venta}.pdf`);
      setDescargar(false);
      handleCloseModal();
    };

    if (descargar) {
      exportToPDF();
    }
  }, [descargar, venta, handleCloseModal]);


  return (
    <Modal open={open} onClose={handleCloseModal}>
      <div style={modalStyle}>
        <div id="VentaComprobante" style={contentStyle} className="venta-info-modal">
          <div style={{ textAlign: 'center' }}>
          <div className="logoR" style={logoStyle}>
              <img src="/logoR.png" alt="Logo" />
            </div>
            <br />
            <div style={{ background: '#34495E', padding: '1px', borderRadius: '20px', textAlign: 'center' }}>
              <p style={{ color: 'white' }}>
                <strong>ROCCO GRÁFICAS</strong>
                <br />
                <strong>Nit:</strong> 15.318.366-1
                <br />
                <strong>Dirección:</strong> Calle 42 No. 68-38 Medellín, Antioquia
                <br />
                <strong>Teléfono:</strong> 604 448 90 95
              </p>
            </div>
            <br />
            <div style={titleStyle}>
              <h3 style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Candara', fontSize: '25px' }}>
                  COMPROBANTE DE PAGO - SALDO
              </h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <p>
    <strong style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Candara' }}>Método de pago: </strong>
    {venta.metodo_pago}
  </p>
  <p>
    <strong style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Candara' }}>Fecha: </strong>
    {venta.fecha}
  </p>
</div>
            <div style={{ sectionStyle }}>
              <h4 style={{ color: 'black', borderTop: '1px solid black', borderBottom: '1px solid black', padding: '8px 0' }}>
                <span style={{ fontWeight: 'bold', fontFamily: 'Candara', fontSize: '16px' }}>
                  DATOS DEL CLIENTE
                </span>
              </h4>
            </div>
            <div style={{ textAlign: 'left' }}>
            <p style={{ marginBottom: '1px' }}>
              <strong style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Candara' }}>Nombre: </strong>
              {venta.cliente.nombre} {venta.cliente.apellido}
            </p>
            </div>
            <div style={{ textAlign: 'left' }}>
            <p style={{ marginBottom: '1px' }}>
              <strong style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Candara' }}>Documento: </strong>
              {venta.cliente.documento}
            </p>
            </div>
            <p>
            </p>
            <div style={{ sectionStyle }}>
              <h4 style={{ color: 'black', borderTop: '1px solid black', borderBottom: '1px solid black', padding: '8px 0' }}>
                <span style={{ fontWeight: 'bold', fontFamily: 'Candara', fontSize: '16px' }}>
                  DETALLES DEL COBRO
                </span>
              </h4>
            </div>
            <table style={{ ...tableStyle, border: "1px solid #dddddd", marginTop: '10px' }}>
              <thead>
                <tr>
                  <th style={thStyle}>Código</th>
                  <th style={thStyle}>Descripción</th>
                  <th style={thStyle}>Precio unitario</th>
                  <th style={thSubtotalStyle}>Valor de venta</th>
                </tr>
              </thead>
              <tbody>
                {venta.detalles.map((detalle) => (
                  <tr key={detalle.id_detalle_venta}>
                    <td style={tdStyle}>{detalle.fk_producto}</td>
                    <td style={tdStyle}>{detalle.producto.nombre_producto} x {detalle.cantidad === 1
                      ? `${detalle.cantidad} Und`
                      : `${detalle.cantidad} Unds`}</td>
                    <td style={tdStyle}>{formatearPrecios(detalle.precio)}</td>
                    <td style={tdNoBorderBottomStyle}>{formatearPrecios(detalle.subtotal)}</td>
                  </tr>
                ))}           
              </tbody>
            </table>
            <p style={{ textAlign: 'right', margin: '8px 0' }}>
  <strong style={{ color: 'black', padding: '1px', fontWeight: 'bold', fontFamily: 'Candara' }}>Subtotal:</strong> {formatearPrecios(totalSubtotal)}
</p>
<p style={{ textAlign: 'right', margin: '8px 0' }}>
  <strong style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Candara' }}>Valor a pagar:</strong> {formatearPrecios(venta.total)}
</p>
<hr />
<div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'left' }}>
  <div>
    Atendido por: Nombre del Atendente
    <br />
    Referencia de venta: {venta.id_venta}
    <br />
    Fecha: {venta.fecha}
    <br />
    ¡Visítanos en nuestras redes sociales!
  </div>
  <div style={{ textAlign: 'right' }}>
    <div>
     <FaFacebook style={{ color: 'blue', fontSize: '1.5em' }}/>
    </div>
    <div>
     <FiInstagram style={{ fontSize: '1.5em', color: '#8a3ab9' }} />
    </div>
    <div>
     <FaXTwitter style={{ color: 'black', fontSize: '1.5em' }} />


    </div>
  </div>
</div>
</div>
          </div>
          <button
  onClick={handleDescargar}
  style={{
    backgroundColor: 'black',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    position: 'fixed',
    top: '20px',
    left: '70%',
    transform: 'translateX(-50%)',
    transition: 'background-color 0.3s',
  }}
  className="descargar-button"
>
  Descargar
</button>
        </div>
    </Modal>
  );
};

export default ComprobanteCliente;
