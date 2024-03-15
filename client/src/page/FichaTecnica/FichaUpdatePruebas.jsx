import { Formik, Form, Field, ErrorMessage } from "formik";
import Autocomplete from "@mui/material/Autocomplete";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState, useRef  } from "react";
import { MenuItem, TextField } from "@mui/material";
import { useInsumo } from "../../context/Insumos/InsumoContext";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { postCreateFichaTecnica } from "../../api/Ficha/Rutas.ficha";
import Pagination from "react-bootstrap/Pagination";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { TiDeleteOutline } from "react-icons/ti";
import { TiShoppingCart } from "react-icons/ti";
import { useParams } from 'react-router-dom'
import { useFichaTecnica } from "../../context/FichasTecnicas/FichaTecnicaContext"

import { useCliente } from "../../context/Clientes/ClienteContext";


function FichaCreatePruebas({fichaId, handleCloseUpdateModal }) {
  const { listar, ShowInsumos } = useInsumo();
  const [tableData, setTableData] = useState([]);
  const [subtotalTotal, setSubtotalTotal] = useState(0);
  const [total, setTotal] = useState(0);

  const { Listar, showClientes } = useCliente();


  const [tablaVacia, setTablaVacia] = useState(true);
  const [productoSelect, setProductoSelect] = useState(null);
  const [cantidadAlterar, setCantidadAlterar] = useState("");
  const [manoObra, setManoObra] = useState("");

  // useEffect para actualizar el estado local solo al montar el componente



  const [selectedImage, setSelectedImage] = useState(null);

  const [pruebas, setPruebas] = useState([]);

  // const [metodoPagoTouched, setMetodoPagoTouched] = useState(false);
  const [totalTouched, setTotalTouched] = useState(false);
  const [nombreFicha, setNombreFicha] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de elementos por página
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const {fichaTecnicaActualizar, listarFichaTecnica, validarFichaActualizar}=useFichaTecnica()
  const params = useParams()

  const currentItems = tableData.slice(startIndex, endIndex);

 
  const [detalles, setDetalles] = useState(listarFichaTecnica.detalles);



  // Obtener Fecha Actual
  const fechaActual = () => {
    const hoy = new Date();
    const dd = String(hoy.getDate()).padStart(2, "0");
    const mm = String(hoy.getMonth() + 1).padStart(2, "0");
    const yyyy = hoy.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };
  const eliminarProducto = (index) => {
    const nuevosDetalles = [...tableData];
    nuevosDetalles.splice(index, 1);
    setTableData(nuevosDetalles);
  
    // Eliminar el insumo correspondiente de allDetails
    const nuevosAllDetails = [...allDetails];
    nuevosAllDetails.splice(index, 1);
    setDetalles(nuevosAllDetails);
  };
  
  const actualizarSubtotal = (row) => {
    const { cantidad, precio } = row;
    const subtotal = isNaN(cantidad) ? 0 : cantidad * precio;
    return { ...row, subtotal: subtotal };
  };

  const findProductoEnStock = (productoId) => {
    const producto = listar.find((item) => item.id_insumo === productoId);
    return producto ? producto.cantidad : 0;
  };

  const handleEdicionCantidad = (e) => {
    if (e.key === "Enter") {
      // Restablecer el campo a vacío al presionar Enter
      e.preventDefault();
  
      // Verificar si la entrada cumple con el patrón deseado
      const regexPattern = /^(-\d{1,4}|[1-9]\d{0,3})?$/;
      if (!regexPattern.test(cantidadAlterar)) {
        // Mostrar mensaje de error si la entrada no cumple con el patrón
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Campo inválido",
        });
        return;
      }
  
      // Agregar la cantidad a la tabla
      const cantidadAgregada = parseInt(cantidadAlterar, 10);
      if (!isNaN(cantidadAgregada) && cantidadAgregada !== 0) {
        // Actualizar la cantidad en tiempo real en la tabla
        const nuevaTabla = tableData.map((item) => ({
          ...item,
          cantidad: item.cantidad + cantidadAgregada,
          subtotal: (item.cantidad + cantidadAgregada) * item.precio // Actualizar también el subtotal
        }));
  
        setTableData(nuevaTabla);
      }
    }
  };
  
  
  

  
  function formatearValores(global) {
    const [int, decimal] = parseFloat(global).toFixed(2).split(".");
    const formateoInt = int.replace(/\d(?=(\d{3})+$)/g, "$&.");
    return `${formateoInt},${decimal}`;
  }

  // Formatear valores sin decimales
  function formatearPrecios(valor) {
    const valorFormateado = parseFloat(valor).toFixed(0);
    const formateoInt = valorFormateado.replace(/\d(?=(\d{3})+$)/g, "$&.");
    return formateoInt;
  }

  useEffect(() => {
    // Lógica para actualizar automáticamente el subtotal
    const actualizarSubtotales = () => {
      const nuevaTabla = tableData.map((row) => {
        const { cantidad, precio,  } = row;
        const subtotal = isNaN(cantidad) ? 0 : cantidad * precio;
        return { ...row, subtotal: subtotal };
      });

      setTableData(nuevaTabla);
    };

    actualizarSubtotales();
  }, [tableData]);

  // useEffect(() => {
  //   const sumaSubtotales = tableData.reduce(
  //     (total, insumo) => total + insumo.subtotal+(parseInt(manoObra) || 0),
  //     0
  //   );
  //   setSubtotalTotal(sumaSubtotales);

  //   const iva = sumaSubtotales * 0.19;
  //   const totalVenta = sumaSubtotales + iva;

  //   setTotal(totalVenta);
  // }, [tableData]);

  useEffect(() => {
    ShowInsumos();
    showClientes();
  }, []);

  useEffect(() => {
    const tablaVacia = tableData.length === 0;
    setTablaVacia(tablaVacia);
  }, [tableData]);
  
  // useEffect(() => {
  //   const sumaSubtotales = tableData.reduce(

  //     (total, insumo) => total + insumo.subtotal +(parseInt(manoObra) || 0), //Suma de los insumos mas la mano de obra
  //     0
  //   );
  //   setSubtotalTotal(sumaSubtotales);

  //   const iva = sumaSubtotales * 0.19;
  //   const totalVenta = sumaSubtotales + iva;

  //   setTotal(totalVenta);
  // }, [tableData]);

  

  

  const sumaSubtotalesProductos = pruebas.reduce(
    (total, producto) => total + (producto.precio * producto.cantidad) +(parseInt(manoObra) || 0),
    0
  );
  const Iva=sumaSubtotalesProductos*0.19
 

  const GranTotal=sumaSubtotalesProductos+Iva
 



  useEffect(() => {
    fichaTecnicaActualizar(fichaId);
  }, [fichaId]);

  useEffect(() => {
    if (listarFichaTecnica.detalles.length > 0) {
      setDetalles(listarFichaTecnica.detalles);
      setTableData(listarFichaTecnica.detalles);
    }
  }, [listarFichaTecnica]);
  
  useEffect(() => {
    const nuevosDetalles = detalles;
  
    const allDetails = [
      ...nuevosDetalles.map((detalle) => ({
        ...detalle,
        nombre: detalle.insumo.nombre,
      })),
      ...tableData,
    ].filter((detalle) => detalle.nombre && detalle.nombre.trim() !== "");
  
    setPruebas(allDetails);
  }, [listarFichaTecnica, tableData, detalles]);
  


  
  const agregarNuevoInsumo = (nuevoInsumo) => {
    // Verificar si el insumo ya existe en la tabla
    const insumoExistenteIndex = tableData.findIndex(item => item.fk_insumo === nuevoInsumo.id_insumo);
  
    if (insumoExistenteIndex !== -1) {
      // Duplicar el insumo existente en la tabla con una cantidad adicional
      const insumoExistente = tableData[insumoExistenteIndex];
      const nuevaTabla = [
        ...tableData.slice(0, insumoExistenteIndex),
        {
          ...insumoExistente,
          cantidad: insumoExistente.cantidad + 1,
          subtotal: (insumoExistente.cantidad + 1) * insumoExistente.precio,
          
        },
        ...tableData.slice(insumoExistenteIndex + 1)
      ];
  
      setTableData(nuevaTabla);
    } else {
      // Agregar un nuevo insumo a la tabla
      setTableData(prevTableData => [
        ...prevTableData,
        {
          fk_insumo: nuevoInsumo.id_insumo,
          cantidad: 1,
          precio: nuevoInsumo.precio,
          subtotal: nuevoInsumo.precio,
          nombre: nuevoInsumo.nombre,
          esNuevo: true,
        }
      ]);
    }
  };
  

  const actualizarCantidad = (nuevaCantidad, index) => {
    const parsedCantidad = parseInt(nuevaCantidad);
    const cantidad = isNaN(parsedCantidad) ? 0 : parsedCantidad;
  
    setDetalles(prevDetalles => {
      const nuevosDetalles = [...prevDetalles];
      nuevosDetalles[index] = {
        ...nuevosDetalles[index],
        cantidad: cantidad,
        subtotal: cantidad * nuevosDetalles[index].precio,
      };
      return nuevosDetalles;
    });
  };
  
  const fieldRef = useRef(null);


    setTimeout(() => {
      if (fieldRef.current) {
        fieldRef.current.click();
      }
    }, 100); // Ajusta el tiempo según sea necesario

    const handleInputChange = (e) => {
      handleChange(e);
      
  };
  
  const handleInputClick = (e) => {
    setManoObra(e.target.value);
  };
  
  

  return (
    <>
      <div className="dashboard-app">
        <div className="dashboard-content">
          <div className="container">
            <div
              className="card"
              style={{
                maxWidth: "1200px",
                padding: "20px",
                maxHeight: "620px",
              }}
            >
              <div className="card-body">
                <div className="card-header"></div>
                <br />

                <Formik
                  initialValues={
                    listarFichaTecnica
                  }
                  enableReinitialize={true}
                  onSubmit={async (values, { setErrors, resetForm }) => {
                  console.log(values)
                  const datosParaEnviar = {
                    ...values,
                    costo_final_producto:sumaSubtotalesProductos,
                    detalles: pruebas, // Asegúrate de que esto refleje los insumos actuales, incluidos los nuevos insumos
                  };
                
                  console.log(datosParaEnviar);
                
                  // Ahora, enviar `datosParaEnviar` al backend
                  validarFichaActualizar(fichaId, datosParaEnviar);
                }}
                >
                  {({
                    handleChange,
                    handleSubmit,
                    values,
                    setFieldValue,
                    errors,
                    touched,
                  }) => (
                    <Form onSubmit={handleSubmit} className="row g-3">
                      <div className="content">
                        <div className="container-fluid">
                          <div className="row mb-3 p-3 align-items-start">

                                 {/* Componente 2 */}
                                 <div className="col-md-4 col-sm-12 d-flex">
                              <div className="card shadow flex-fill">
                                <div className="card-body p-3">
                                  
                              
                               

                                  <div className="form-group mb-2">
  <Autocomplete
    disablePortal
    id="fixed-tags-demo"
    options={Listar}
    getOptionLabel={(option) =>
      `${option.documento} - ${option.nombre} ${option.apellido}`
    }
    value={Listar.find(option => option.id_cliente === values.fk_cliente) || null}
    onChange={(event, newValue) => {
      
      handleChange({ target: { name: 'fk_cliente', value: newValue ? newValue.id_cliente : null } });

    }}
  
    renderInput={(params) => <TextField {...params} label="Cliente" />}

    
  />

</div>


<div className="form-group mb-2">

                                  <Field
            type='text'
            name='nombre_ficha'
            className='form-control'
            as={TextField}
            value={values.nombre_ficha}
            label="Nombre Ficha"
            onChange={handleChange}

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
                            onChange={handleChange}
                            value={values.detalle}
                          />  
</div>
<div className="form-group mb-2">

<input
                type='file'
                name='imagen_producto_final'
                className='form-control'
                onChange={(event) => {
                    setSelectedImage(event.target.files[0]);
                    setFieldValue('imagen_producto_final', event.target.files[0]);
                }}
            />

          </div>
          <div className="form-group mb-2">

             <label htmlFor="mano_obra">Incremento de Ventas</label>

                          <input  
                            type='number'
                            name='mano_obra'
                            className='form-control'
                            value={values.mano_obra}
                            ref={fieldRef}
                            onChange={(e) => {
                              handleChange(e);
                              setManoObra(e.target.value); // También puedes realizar esta acción aquí si es necesario
                          }}
                           
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
                                      value={fechaActual()}
                                      min={fechaActual()}
                                      max={fechaActual()}
                                      onChange={handleChange}
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
                                    <div className="col-12">
                                      <div className="text-right">
                                        {/* <strong>Costo de producción:</strong> <strong>$</strong>&nbsp;
                                        <span id="comprobante_subtotal">
                                          {formatearPrecios(subtotalTotal)}
                                        </span> */}
                                      </div>
                                      
                                      <div className="form-group mb-2 d-flex">
                                        <button
                                          className="btn btn-primary buttons-doubles"
                                          type="submit"
                                        >
                                          Actualizar
                                        </button>
                                        <br />
                                        <br />
                                        <button
                                          className="btn btn-danger buttons-doubles"
                                          type="button"
                                          onClick={handleCloseUpdateModal}
                                        >
                                          Cancelar
                                        </button>
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
                                    <label className="col-md-9" htmlFor="items">
                                      <span className="small"></span>
                                      <input type="hidden"  value={listarFichaTecnica.id_ft}/>
                                      <Autocomplete
  disablePortal
  id="fixed-tags-demo"
  options={listar.filter((option) => option.estado)}
  getOptionLabel={(option) => `${option.nombre}`}
  onChange={(event, newValue) => {
    if (Array.isArray(newValue)) {
      setProductoSelect(newValue[0]); // Establecer el primer elemento del array como productoSelect
    } else if (newValue === null) {
      setProductoSelect(null);
    } else {
      // Si newValue no es un array ni null, podría ser un nuevo producto seleccionado
      agregarNuevoInsumo(newValue); // Asegúrate de manejar la lógica de agregar el nuevo insumo correctamente
    }
  }}
  value={productoSelect}
  noOptionsText="Producto no encontrado"
  renderInput={(params) => (
    <TextField
      {...params}
      label="Insumos"
      sx={{ width: "70%" }}
    />
  )}
/>

                                    </label>
                                  </div>
                                  <div className="col-md-5 mb-3 new-cant">
                                    <TextField
                                      type="text"
                                      name="alterar"
                                      id="alterar"
                                      label="Cantidad"
                                      className="form-control"
                                      value={cantidadAlterar}
                                      onChange={(e) => {
                                        const newValue = e.target.value.trim();
                                        setCantidadAlterar(newValue);
                                      }}
                                      onKeyPress={handleEdicionCantidad}
                                    />
                                  </div>

                                  {/* Tabla Detalles */}
                                  <div
                                    className="col-md-12"
                                    style={{
                                      marginTop: "-50px",
                                      maxWidth: "100%",
                                    }}
                                  >

                                  
                                      <div>
                                       
                                        <table
                                          id="detallesVenta"
                                          className="display  tabble-striped w-100 shadow custom-table"
                                        >
                                          <thead className="info text-left fs-6">
                                            <tr>
                                              <th>Insumo</th>
                                              <th>Precio</th>
                                              <th>Cantidad</th>
                                              <th></th>
                                              <th>Subtotal</th>
                                              <th>Acciones</th>
                                            </tr>
                                          </thead>
                                          <tbody className="small text-left fs-6">
                                            {pruebas.map((row, index) => (
                                              <tr key={index}>
                                                <td>{row.nombre}</td>
                                                <td>
                                                  {formatearPrecios(row.precio)}
                                                </td>
                                                {/* <td>
                                                  {row.cantidad === 1
                                                    ? `${row.cantidad} Und`
                                                    : `${row.cantidad} Unds`}
                                                </td> */}
                                                <td>
                                                {
          row.esNuevo ? 
          `${row.cantidad}` : // Puedes cambiar esto por cualquier cosa que prefieras mostrar
          <input
            type="number"
            value={row.cantidad}
            style={{width:60, height:25}}
            onChange={(e) => {
              const newValue = e.target.value.trim(); // Quitamos los espacios en blanco alrededor del valor
              if (newValue === '' || !isNaN(newValue) && newValue >= 0) { // Verificamos si es una cadena vacía o un número
                actualizarCantidad(newValue === '' ? '' : parseInt(newValue), index);
              }
            }}
              min="1"
          />
        }
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
                                                      <button
                                                      
                                                        className="btn"
                                                        type="button"
                                                        style={{
                                                          boxShadow: "none",
                                                          background: "none",
                                                          padding: 0,
                                                          marginTop: "-3px",
                                                          display: "flex",
                                                          alignItems: "center",
                                                          justifyContent:
                                                            "center",
                                                        }}
                                                        onClick={() =>
                                                          eliminarProducto(
                                                            index
                                                          )
                                                        }
                                                      >
                                                        <TiDeleteOutline
                                                          size={22}
                                                          color="red"
                                                        />
                                                      </button>
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
          <td><strong>{formatearValores(sumaSubtotalesProductos)}</strong></td>
          <td></td>
        
      </tr>

      <tr>
         
          <td><strong>IVA 19%:</strong></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td><strong>{formatearValores(Iva)}</strong></td>
          <td></td>
      </tr>

      <tr>
         
         <td><strong>TOTAL:</strong></td>
         <td></td>
         <td></td>
         <td></td>
         <td></td>
         <td><strong>{formatearValores(GranTotal)}</strong></td>
         <td></td>
     </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                  
                                  </div>
                                  
                                  {/* Paginación de Bootstrap */}
                                  {tableData.length > 0 && (
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
                                            tableData.length / itemsPerPage
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
                                                  tableData.length /
                                                    itemsPerPage
                                                )
                                              )
                                            )
                                          }
                                          disabled={
                                            currentPage ===
                                            Math.ceil(
                                              tableData.length / itemsPerPage
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
  );
}

export default FichaCreatePruebas;
