import { Formik, Form, Field, ErrorMessage } from "formik";
import Autocomplete from "@mui/material/Autocomplete";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";
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
import { useCliente } from "../../context/Clientes/ClienteContext";
import { useFichaTecnica } from '../../context/FichasTecnicas/FichaTecnicaContext';

function FichaCreatePruebas({ handleCloseVentaModal }) {
  const { listar, ShowInsumos } = useInsumo();
  const [tableData, setTableData] = useState([]);
  const [subtotalTotal, setSubtotalTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalIva, setTotalIva]=useState(0)
  const [granTotal, setGranTotal]=useState(0)
  const [tablaVacia, setTablaVacia] = useState(true);
  const [productoSelect, setProductoSelect] = useState(null);
  const [cantidadAlterar, setCantidadAlterar] = useState("");
  const [manoObra, setManoObra] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { Listar, showClientes } = useCliente();

  // const [metodoPagoTouched, setMetodoPagoTouched] = useState(false);
  const [totalTouched, setTotalTouched] = useState(false);
  const [nombreFicha, setNombreFicha] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [clientes, setClientes] = useState('');


  const{ShowFichasTecnicasParaId,listarPId}=useFichaTecnica()
  const [ultimoRegistro, setUltimoRegistro] = useState({});
  useEffect(() => {
    const obtenerUltimoRegistro = async () => {
        if (listarPId.length > 0) {
            const ultimo = listarPId[listarPId.length - 1];
            setUltimoRegistro(ultimo);
        }
    };

    obtenerUltimoRegistro();
}, [listarPId]);

useEffect(() => {
  const cargarDatosIniciales = async () => {
      await ShowFichasTecnicasParaId();
  };

  cargarDatosIniciales();
}, []); 

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de elementos por página
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = tableData.slice(startIndex, endIndex);

  const [error, setError] = useState('');

  const handleChangee = (e) => {
    const newValue = e.target.value.trim();
    if (newValue === '' || (!isNaN(newValue) && newValue > 0)) {
      setManoObra(newValue);
      setError(''); // Limpiar el mensaje de error si el valor es válido
    } else {
      setError('El valor debe ser un número positivo y diferente de cero');
    }
  };
  

  const ventaSchema = Yup.object().shape({

     id_cliente: Yup.object().shape({
       fk_cliente: Yup.string().required("Campo requerido"),
     }),
     nombre_ficha: Yup.string().required("Campo requerido"),
     detalle:Yup.string().required("Campo requerido"),
    // metodo_pago: Yup.string().required("Campo requerido").nullable(),
    mano_obra: Yup.string()
      .required("Campo requerido")
      .test("notZero", "El total no puede ser cero", (value) => value !== 0),
      imagen_producto_final: Yup.mixed().test('fileType', 'Formato de archivo no válido', (value) => {
        if (!value) {
          // Si no se ha seleccionado ningún archivo
          return false;
        }
        // Obtener el tipo de archivo
        const fileType = value.type;
        // Definir los tipos de archivos permitidos
        const allowedFormats = ['image/jpeg', 'image/png', 'image/gif']; // Puedes agregar más tipos de archivo según tus necesidades
        // Verificar si el tipo de archivo está permitido
        return allowedFormats.includes(fileType);
      })
  });

  // Obtener Fecha Actual
  const fechaActual = () => {
    const hoy = new Date();
    const dd = String(hoy.getDate()).padStart(2, "0");
    const mm = String(hoy.getMonth() + 1).padStart(2, "0");
    const yyyy = hoy.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  const eliminarProducto = (index) => {
    if (index >= 0 && index < tableData.length) {
      const nuevaTabla = tableData.filter((_, i) => i !== index);
      setTableData(nuevaTabla);
    } else {
      console.error("Índice inválido al intentar eliminar producto");
    }
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
      e.preventDefault();
  
      const regexPattern = /^[0-9]*$/;
      if (!regexPattern.test(cantidadAlterar)) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Cantidad inválida",
        });
        return;
      }
  
      const cantidadAgregada = parseInt(cantidadAlterar, 10);
      if (isNaN(cantidadAgregada) || cantidadAgregada <= 0) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "La cantidad debe ser mayor que cero",
        });
        return;
      }
  
      const productoEnTabla = tableData.find(
        (item) => item.fk_insumo === productoSelect.id_insumo
      );
  
      if (productoEnTabla) {
        const cantidadActual = productoEnTabla.cantidad;
        const nuevaCantidad = cantidadActual + cantidadAgregada;
  
        const productoEnStock = findProductoEnStock(
          productoEnTabla.fk_insumo
        );
        if (nuevaCantidad > productoEnStock) {
          Swal.fire({
            icon: "warning",
            title: "Advertencia",
            text: `Cantidad superior al stock (disponible ${productoEnStock})`,
          });
          return;
        }
  
        const nuevaTabla = tableData.map((item) =>
          item.fk_insumo === productoSelect.id_insumo
            ? actualizarSubtotal({ ...item, cantidad: nuevaCantidad })
            : item
        );
  
        setTableData(nuevaTabla);
  
        // Calcular la cantidad restante
        const cantidadRestante = productoEnStock - nuevaCantidad;
        Swal.fire({
          icon: "success",
          title: "Producto agregado",
          text: `Cantidad disponible: ${cantidadRestante}`,
        });
      } else {
        const nuevoProducto = {
          fk_insumo: productoSelect.id_insumo,
          cantidad: cantidadAgregada,
          precio: productoSelect.precio,
          subtotal: cantidadAgregada * productoSelect.precio,
          id_insumo:productoSelect.id_insumo,
          nombre: productoSelect.nombre,
        };
  
        const productoEnStock = findProductoEnStock(
          productoSelect.id_insumo
        );
        if (cantidadAgregada > productoEnStock) {
          Swal.fire({
            icon: "warning",
            title: "Advertencia",
            text: `Cantidad superior al stock... (disponible ${productoEnStock})`,
          });
          return;
        }
  
        setTableData([...tableData, nuevoProducto]);
        setCantidadAlterar("");
  
        // Calcular la cantidad restante
        const cantidadRestante = productoEnStock - cantidadAgregada;
        Swal.fire({
          icon: "success",
          title: "Producto agregado",
          text: `Cantidad disponible: ${cantidadRestante}`,
        });
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

 

  useEffect(() => {
    ShowInsumos();
    showClientes();
   
  }, []);

  useEffect(() => {
    const tablaVacia = tableData.length === 0;
    setTablaVacia(tablaVacia);
  }, [tableData]);
  
  useEffect(() => {
    const sumaSubtotales = tableData.reduce(

      (total, insumo) => total + insumo.subtotal +(parseInt(manoObra) || 0), //Suma de los insumos mas la mano de obra
      0
    );
    setSubtotalTotal(sumaSubtotales);
    setTotal(sumaSubtotales);

    const Iva=total*0.19
    setTotalIva(Iva)

    const GranTotal=total+Iva
    setGranTotal(GranTotal)

  }, [tableData]);

  return (
    <>
      <div className="dashboard-app">
        <div className="dashboard-content">
          <div className="container">
            <div
              className="card"
              style={{
                maxWidth: "100%",
                padding: "20px",
                maxHeight: "100%",
              }}
            >
              <div className="card-body">
                <div className="card-header"></div>
                

                <Formik
                  initialValues={{
                    id_cliente: { fk_cliente: clientes.id_cliente },
                    nombre_ficha: nombreFicha,
                    imagen_producto_final:selectedImage,
                    costo_final_producto: subtotalTotal,
                    detalle:descripcion,
                    fecha:fechaActual(),
                    mano_obra:manoObra,
                    insumo: tableData.map((item) => ({
                      fk_insumo: item.fk_insumo,
                      cantidad:item.cantidad,
                      precio: item.precio,
                      // subtotal:item.subtotal,
                    })),
                  }}
              

                  enableReinitialize={true}
                  onSubmit={async (values, { setErrors, resetForm }) => {
                    try {
                      ventaSchema
                          .validate(values, { abortEarly: false })
                          .then(() => {
                              const swalWithBootstrapButtons = Swal.mixin({
                                  customClass: {
                                      confirmButton: "btn btn-success me-3",
                                      cancelButton: "btn btn-danger",
                                  },
                                  buttonsStyling: false,
                              });
                  
                              Swal
                                  .fire({
                                      title: "¿Confirmar el registro?",
                                      text: "Tu registro será guardado",
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonText: "Aceptar",
                                      cancelButtonText: "Cancelar",
                                      buttons: true,
                                  })
                                  .then((result) => {
                                      if (result.isConfirmed) {
                                       
                                          postCreateFichaTecnica(values)
                                              .then(() => {
                                                  Swal.fire({
                                                      icon: "success",
                                                      title: "Registro exitoso!",
                                                      text: "Tu archivo ha sido registrado",
                                                  }).then(() => {
                                                      handleCloseVentaModal();
                                                      setNombreFicha(values.nombre_ficha);
                                                      resetForm();
                                                  });
                                              })
                                              .catch((error) => {
                                                  console.error(error);
                                                  Swal.fire({
                                                      icon: "error",
                                                      title: "Error en la solicitud",
                                                      text: error.response ? error.response.data.error : error.message,
                                                  });
                                              });
                                      } else if (result.dismiss === Swal.DismissReason.cancel) {
                                          swalWithBootstrapButtons.fire(
                                              "Registro cancelado",
                                              "Registro no completado",
                                              "error"
                                          );
                                      }
                                  });
                          })
                          .catch((validationErrors) => {
                              const formattedErrors = {};
                              validationErrors.inner.forEach((error) => {
                                  formattedErrors[error.path] = error.message;
                              });
                              setErrors(formattedErrors);
                          });
                  } catch (error) {
                      console.error(error);
                      // Aquí puedes manejar errores generales si es necesario
                  }
                  
                  
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
                          <div className="row p-3 align-items-start" >

     {/* Componente 2 */}
     <div className="col-md-4 col-sm-12 d-flex align-items-start" >
                              <div className="card shadow flex-fill">
                                <div className="card-body p-3" >
                                  
                                <div className="form-group mb-2">
                                  <Field
                                  type="text"
                                  value={ultimoRegistro.id_ft+1 || 1}
                                  label="Orden #"
                                  disabled
                                  className="form-control"
                                  as={TextField}
                                  />
                                  </div>
                                  <div className="form-group mb-2">

                                    <Field
                                      type="date"
                                      name="fecha"
                                      id="fecha"
                                      label="Fecha"
                                      as={TextField}
                                      className="form-control"
                                      disabled
                                      value={fechaActual()}
                                      min={fechaActual()}
                                      max={fechaActual()}
                                      onChange={handleChange}
                                    />
                                  </div>

<div className="form-group mb-2">
  <Autocomplete
    disablePortal
    id="fixed-tags-demo"
    options={Listar.filter((option) => option.estado)}
    getOptionLabel={(option) =>
      `${option.documento} - ${option.nombre} ${option.apellido}`
    }
    onChange={(event, newValue) => {
      setClientes(newValue ? newValue : "");
      // Aquí puedes realizar cualquier acción adicional necesaria cuando se selecciona un cliente
    }}
    value={clientes || null}
    sx={{ width: "100%" }}
    noOptionsText="Cliente no encontrado"
    renderInput={(params) => (
      <TextField
        {...params}
        label="Cliente"
        sx={{ width: "100%" }}
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <>
              {(touched.id_cliente?.fk_cliente && values.clienteSeleccionado) && (
                <CheckCircleIcon
                  sx={{ color: "green", marginLeft: "10px" }}
                />
              )}
              {(touched.id_cliente?.fk_cliente && !values.clienteSeleccionado) && (
                <ErrorIcon
                  sx={{ color: "red", marginLeft: "10px" }}
                />
              )}
            </>
          ),
        }}
      />
    )}
  />
  <ErrorMessage
    name="id_cliente.fk_cliente"
    component="div"
    className="error-message"
  />
</div>
                                  <div className="form-group mb-2">
                                  <Field
    type='text'
    name='nombre_ficha'
    className='form-control'
    as={TextField}
    label="Nombre Producto"
    onChange={(e) => {
      handleChange(e);
      setNombreFicha(e.target.value); // Actualizar el estado local
    }}
    InputProps={{
      endAdornment: (
        <div style={{ display: "flex" }}>
          {
            !errors.nombre_ficha && (
              <CheckCircleIcon
                style={{ color: "green" }}
              />
            )}
          {
            errors.nombre_ficha && (
              <ErrorIcon
                style={{ color: "red" }}
              />
            )}
        </div>
      ),
    }}
/>

<ErrorMessage
    name="nombre_ficha"
    component="div"
    className="error-message"
/>

       </div>  

                                  <div className="form-group mb-2">

<Field
                            type='text'
                            name='detalle'
                            className='form-control'
                            as={TextField}
                            label="Descripción"
                            
                            value={values.detalle}
                            onChange={(e) => {
                              handleChange(e);
                              setDescripcion(e.target.value); // Actualizar el estado local
                            }}
                            InputProps={{
                              endAdornment: (
                                <div style={{ display: "flex" }}>
                                  {
                                    !errors.detalle && (
                                      <CheckCircleIcon
                                        style={{ color: "green" }}
                                      />
                                    )}
                                  {
                                    errors.detalle && (
                                      <ErrorIcon
                                        style={{ color: "red" }}
                                      />
                                    )}
                                </div>
                              ),
                            }}
                          /> 
                          <ErrorMessage
    name="nombre_ficha"
    component="div"
    className="error-message"
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
            <ErrorMessage
    name="imagen_producto_final"
    component="div"
    className="error-message"
/>
</div>
<div className="form-group mb-2">

<Field
                            type='number'
                            name='mano_obra'
                            className='form-control'
                            as={TextField}
                            value={manoObra}
                            label="Incremento de Venta"
                            onChange={handleChangee}
                            error={!!error} // Marcar el campo como error si hay un mensaje de error
                            helperText={error} 
                            InputProps={{
                              endAdornment: (
                                <div style={{ display: "flex" }}>
                                  {
                                    !errors.mano_obra && (
                                      <CheckCircleIcon
                                        style={{ color: "green" }}
                                      />
                                    )}
                                  {
                                    errors.mano_obra && (
                                      <ErrorIcon
                                        style={{ color: "red" }}
                                      />
                                    )}
                                </div>
                              ),
                            }}
                          /> 
                           <ErrorMessage
                              name="mano_obra"
                              component="div"
                              className="error-message"
                          />
                          </div>
                       
           

                                          
                                  <div className="row mt-2">
                                    <div className="col-12">
                                    
                                      
                                      <div className="form-group mb-2 d-flex">
                                        <button
                                          className="btn btn-primary buttons-doubles"
                                          type="submit"
                                        >
                                          Registrar
                                        </button>
                                        <br />
                                        <br />
                                        <button
                                          className="btn btn-danger buttons-doubles"
                                          onClick={handleCloseVentaModal}
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
                                      {/* <Autocomplete
  disablePortal
  id="fixed-tags-demo"
  options={listar.filter((option) => option.estado)}
  getOptionLabel={(option) => `${option.nombre} - ${option.presentacion}` }
  onChange={(event, newValue) => {
    if (newValue) {
      setProductoSelect(newValue);
    }
  }}
  value={productoSelect}
  noOptionsText="Producto no encontrado"
  filterOptions={(options, { inputValue }) => {
    return options.filter((option) =>
      option.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(inputValue.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
    );
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Insumo"
      sx={{ width: "70%" }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
      }}
    />
  )}
/> */}



                                      <Autocomplete
                                        disablePortal
                                        id="fixed-tags-demo"
                                        options={listar.filter((option) => option.estado)}
                                        getOptionLabel={(option) =>
                                          `${option.nombre} - ${option.presentacion}` 
                                        }
                                        onChange={(event, newValue) => {
                                          if (newValue) {
                                            setProductoSelect(newValue);
                                          }
                                        }}
                                        value={productoSelect}
                                        noOptionsText="Producto no encontrado"
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            label="Insumos"
                                            sx={{ width: "70%" }}
                                            onKeyDown={(e) => {
                                              if (e.key === 'Enter') {
                                                e.preventDefault();
                                              }
                                            }}
                                          />
                                        )}
                                        filterOptions={(options, params) => {
                                          return options.filter(option => {
                                              if (!params.inputValue) {
                                                  return true;
                                              }
                                              return option.nombre.toLowerCase().includes(params.inputValue.toLowerCase()) ||
                                                  option.categoria.categoria.toLowerCase().includes(params.inputValue.toLowerCase());
                                          });
                                      }}
                                      />
                                    </label>
                                  </div>
                                  <div className="col-md-3 mb-3 new-cant">
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
                                    {tablaVacia && (
                                      <div
                                        style={{
                                          fontFamily:
                                            "Helvetica, Arial, sans-serif",
                                          fontStyle: "italic",
                                        }}
                                      >
                                        &nbsp;¡Sin insumo en el carrito!
                                      </div>
                                    )}
                                    {!tablaVacia && (
                                      <div>
                                        <h4
                                          style={{
                                            fontFamily: "Candara",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          Descripción <TiShoppingCart />
                                        </h4>
                                        <table
                                          id="detallesVenta"
                                          className="display  tabble-striped w-100 shadow custom-table"
                                        >
                                          <thead className="info text-left fs-6">
                                            <tr>
                                              <th>ID</th>
                                              <th>Insumo</th>
                                              <th>Precio</th>
                                              <th>Cantidad</th>
                                              <th></th>
                                              <th>Precio</th>
                                              <th>Acciones</th>
                                            </tr>
                                          </thead>
                                          <tbody className="small text-left fs-6">
                                            {currentItems.map((row, index) => (
                                              <tr key={index}>
                                                 <td>{row.id_insumo}</td> 
                                                <td>{row.nombre}</td>
                                                <td>
                                                  {formatearPrecios(row.precio)}
                                                </td>
                                                <td>
                                                  {row.cantidad === 1
                                                    ? `${row.cantidad} Und`
                                                    : `${row.cantidad} Unds`}
                                                </td>
                                                <td></td>
                                                <td>
                                                  {formatearPrecios(
                                                    row.subtotal
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
                  <td colSpan="7" style={{ borderTop: '1px solid black' }}></td>
                </tr>
                                            <tr>
          
            <td colSpan="0"><strong>Subtotal:</strong></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><strong>{formatearValores(subtotalTotal)}</strong></td>
            <td></td>
          
        </tr>

        <tr>
           
            <td><strong>IVA 19%:</strong></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><strong>{formatearValores(totalIva)}</strong></td>
            <td></td>
        </tr>

        <tr>
           
           <td><strong>TOTAL:</strong></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td><strong>{formatearValores(granTotal)}</strong></td>
           <td></td>
       </tr>
                                          </tbody>
                                        </table>
                                       
                                      </div>
                                    )}
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