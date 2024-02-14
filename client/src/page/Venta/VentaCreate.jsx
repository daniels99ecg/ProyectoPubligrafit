import { Formik, Form, Field, ErrorMessage } from "formik";
import Autocomplete from "@mui/material/Autocomplete";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import { useProducto } from "../../context/Productos/ProductoContext";
import { useCliente } from "../../context/Clientes/ClienteContext";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { postCreateVentas } from "../../api/Rutas.Venta.api";
import Pagination from "react-bootstrap/Pagination";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { TiDeleteOutline } from "react-icons/ti";
import { TiShoppingCart } from "react-icons/ti";

function CreateVenta({ handleCloseVentaModal }) {
  const { listar, ShowProducto } = useProducto();
  const { Listar, showClientes } = useCliente();
  const [tableData, setTableData] = useState([]);
  const [subtotalTotal, setSubtotalTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [tablaVacia, setTablaVacia] = useState(true);
  const [productoSelect, setProductoSelect] = useState(null);
  const [cantidadAlterar, setCantidadAlterar] = useState("");
  const [metodoPagoTouched, setMetodoPagoTouched] = useState(false);
  const [totalTouched, setTotalTouched] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de elementos por página
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = tableData.slice(startIndex, endIndex);

  const ventaSchema = Yup.object().shape({
    id_cliente: Yup.object().shape({
      fk_id_cliente: Yup.string().required("Campo requerido"),
    }),
    metodo_pago: Yup.string().required("Campo requerido").nullable(),
    total: Yup.number()
      .required("Campo requerido")
      .test("notZero", "El total no puede ser cero", (value) => value !== 0),
    productos: Yup.array().of(
      Yup.object().shape({
        fk_producto: Yup.string().required("Campo requerido"),
        cantidad: Yup.number().required("Campo requerido"),
        precio: Yup.number().required("Campo requerido"),
        subtotal: Yup.number().required("Campo requerido"),
      })
    ),
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
    const producto = listar.find((item) => item.id_producto === productoId);
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
        const productoEnTabla = tableData.find(
          (item) => item.fk_producto === productoSelect.id_producto
        );

        if (productoEnTabla) {
          const cantidadActual = productoEnTabla.cantidad;
          const nuevaCantidad = cantidadActual + cantidadAgregada;

          // Validar si la nueva cantidad supera el stock disponible
          const productoEnStock = findProductoEnStock(
            productoEnTabla.fk_producto
          );
          if (nuevaCantidad > productoEnStock) {
            Swal.fire({
              icon: "warning",
              title: "Advertencia",
              text: "Cantidad superior al stock",
            });
            return;
          }

          // Verificar que la nueva cantidad no sea menor que la cantidad original del producto
          const cantidadOriginal = productoEnTabla.cantidad_original; // Ajustar el nombre según la estructura de tus datos

          // Establecer la cantidad mínima en la cantidad original o 1
          const cantidadMinima = Math.max(cantidadOriginal, 1);

          // Verificar que la nueva cantidad no sea menor que la cantidad mínima
          if (nuevaCantidad < cantidadMinima) {
            Swal.fire({
              icon: "warning",
              title: "Advertencia",
              text: "La cantidad no puede ser menor a la original del producto.",
            });
            return;
          }

          // Verificar que la cantidad a disminuir no sea mayor que la cantidad actual
          if (
            cantidadAgregada < 0 &&
            Math.abs(cantidadAgregada) > cantidadActual
          ) {
            Swal.fire({
              icon: "warning",
              title: "Advertencia",
              text: "La cantidad a disminuir no puede ser mayor a la actual del producto.",
            });
            return;
          }

          // Verificar que la nueva cantidad no sea cero o menos
          if (nuevaCantidad <= 0) {
            Swal.fire({
              icon: "warning",
              title: "Advertencia",
              text: "La cantidad no puede ser menor a 1.",
            });
            return;
          }

          // Actualizar la cantidad en tiempo real en la tabla
          const nuevaTabla = tableData.map((item) =>
            item.fk_producto === productoSelect.id_producto
              ? actualizarSubtotal({ ...item, cantidad: nuevaCantidad })
              : item
          );

          setTableData(nuevaTabla);
        }
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
        const { cantidad, precio } = row;
        const subtotal = isNaN(cantidad) ? 0 : cantidad * precio;
        return { ...row, subtotal: subtotal };
      });

      setTableData(nuevaTabla);
    };

    actualizarSubtotales();
  }, [tableData]);

  useEffect(() => {
    const sumaSubtotales = tableData.reduce(
      (total, producto) => total + producto.subtotal,
      0
    );
    setSubtotalTotal(sumaSubtotales);

    const iva = sumaSubtotales * 0.19;
    const totalVenta = sumaSubtotales + iva;

    setTotal(totalVenta);
  }, [tableData]);

  useEffect(() => {
    ShowProducto();
    showClientes();
  }, []);

  useEffect(() => {
    const tablaVacia = tableData.length === 0;
    setTablaVacia(tablaVacia);
  }, [tableData]);

  useEffect(() => {
    const sumaSubtotales = tableData.reduce(
      (total, producto) => total + producto.subtotal,
      0
    );
    setSubtotalTotal(sumaSubtotales);

    const iva = sumaSubtotales * 0.19;
    const totalVenta = sumaSubtotales + iva;

    setTotal(totalVenta);
  }, [tableData]);

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
                  initialValues={{
                    id_cliente: { fk_id_cliente: "" },
                    metodo_pago: "",
                    fecha: fechaActual(),
                    total: total,
                    productos: tableData.map((item) => ({
                      fk_producto: item.fk_producto,
                      cantidad: item.cantidad,
                      precio: item.precio,
                      subtotal: item.subtotal,
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
                                postCreateVentas(values)
                                  .then(() => {
                                    Swal.fire({
                                      icon: "success",
                                      title: "Registro exitoso!",
                                      text: "Tu archivo ha sido registrado",
                                    }).then(() => {
                                      handleCloseVentaModal();
                                      resetForm();
                                    });
                                  })
                                  .catch((error) => {
                                    console.error(error);
                                    Swal.fire({
                                      icon: "error",
                                      title: "Error en la solicitud",
                                      text: "Hubo un problema al procesar la solicitud",
                                    });
                                  });
                              } else if (
                                result.dismiss === Swal.DismissReason.cancel
                              ) {
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
                          <div className="row mb-3 p-3 align-items-start">
                            {/* Componente 1*/}
                            <div className="col-md-8 col-sm-12 d-flex">
                              <div className="row flex-fill">
                                {/* Contenedor tabla y formulario */}
                                <div className="col-md-12 mb-3">
                                  <div className="form-group mb-2">
                                    <label className="col-md-9" htmlFor="items">
                                      <span className="small"></span>
                                      <Autocomplete
                                        disablePortal
                                        id="fixed-tags-demo"
                                        options={listar.filter((option) => option.estado)}
                                        getOptionLabel={(option) =>
                                          `${option.fichas_tecnica.nombre_ficha}`
                                        }
                                        onChange={(event, newValue) => {
                                          if (newValue) {
                                            setProductoSelect(newValue);

                                            const productoAgregadoTabla =
                                              tableData.some(
                                                (item) =>
                                                  item.fk_producto ===
                                                  newValue.id_producto
                                              );

                                            if (!productoAgregadoTabla) {
                                              const precioProducto = newValue
                                                ? newValue.precio
                                                : 0;
                                              const cantidadPredeterminada =
                                                newValue.cantidad !== 0 ? 1 : 0;

                                              if (
                                                cantidadPredeterminada === 0
                                              ) {
                                                Swal.fire({
                                                  icon: "warning",
                                                  title: "Advertencia",
                                                  text: "Producto sin stock",
                                                });
                                              } else {
                                                setTableData(
                                                  (prevTableData) => [
                                                    ...prevTableData,
                                                    {
                                                      fk_producto:
                                                        newValue.id_producto,
                                                      cantidad:
                                                        cantidadPredeterminada,
                                                      precio: precioProducto,
                                                      subtotal:
                                                        cantidadPredeterminada *
                                                        precioProducto,
                                                      nombre_producto:
                                                        newValue.nombre_producto,
                                                    },
                                                  ]
                                                );

                                                setFieldValue("productos", [
                                                  ...values.productos,
                                                  {
                                                    fk_producto:
                                                      newValue.id_producto,
                                                    cantidad:
                                                      cantidadPredeterminada,
                                                    precio: precioProducto,
                                                    subtotal:
                                                      cantidadPredeterminada *
                                                      precioProducto,
                                                    nombre_producto:
                                                      newValue.nombre_producto,
                                                  },
                                                ]);
                                                event.target.value = null;
                                              }
                                            } else {
                                              console.log(
                                                "Producto existente en la tabla"
                                              );
                                            }
                                          } else {
                                            console.log("Nuevo valor es nulo");
                                          }
                                        }}
                                        value={productoSelect}
                                        noOptionsText="Producto no encontrado"
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            label="Producto"
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
                                    {tablaVacia && (
                                      <div
                                        style={{
                                          fontFamily:
                                            "Helvetica, Arial, sans-serif",
                                          fontStyle: "italic",
                                        }}
                                      >
                                        &nbsp;¡Sin productos en el carrito!
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
                                              <th>Producto</th>
                                              <th>Precio</th>
                                              <th>Cantidad</th>
                                              <th></th>
                                              <th>Subtotal</th>
                                              <th>Acciones</th>
                                            </tr>
                                          </thead>
                                          <tbody className="small text-left fs-6">
                                            {currentItems.map((row, index) => (
                                              <tr key={index}>
                                                <td>{row.nombre_producto}</td>
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

                            {/* Componente 2 */}
                            <div className="col-md-4 col-sm-12 d-flex">
                              <div className="card shadow flex-fill">
                                <div className="card-body p-3">
                                  <div className="nav-item-divider venta-division"></div>
                                  <div>
                                    <h4 className="text-center fs-md-4 fs-sm-3"
                                      style={{
                                        fontFamily: "Candara",
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        marginTop: '-25px'
                                      }}
                                    >
                                      Rocco Gráficas
                                    </h4>
                                    <div>
                                      <h5
                                        style={{
                                          fontSize: "80%",
                                          color: "#999999",
                                          textAlign: "center",
                                        }}
                                      >
                                        Nit: 15.318.366-1
                                      </h5>
                                    </div>
                                    <div>
                                      <h5
                                        style={{
                                          fontSize: "80%",
                                          color: "#999999",
                                          textAlign: "center",
                                        }}
                                      >
                                        Calle 42 No. 68-38 Medellín - Ant
                                      </h5>
                                    </div>
                                  </div>
                                  <hr />
                                  <div className="form-group mb-2">
  <Autocomplete
    disablePortal
    id="fixed-tags-demo"
    options={Listar.filter((option) => option.estado)}
    getOptionLabel={(option) =>
      `${option.documento} - ${option.nombre} ${option.apellido}`
    }
    onChange={(event, newValue) => {
      setFieldValue("id_cliente.fk_id_cliente", newValue ? newValue.id_cliente : "");
      setFieldValue("clienteSeleccionado", newValue);
    }}
    value={values.clienteSeleccionado || null}
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
              {(touched.id_cliente?.fk_id_cliente && values.clienteSeleccionado) && (
                <CheckCircleIcon
                  sx={{ color: "green", marginLeft: "10px" }}
                />
              )}
              {(touched.id_cliente?.fk_id_cliente && !values.clienteSeleccionado) && (
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
    name="id_cliente.fk_id_cliente"
    component="div"
    className="error-message"
  />
</div>
                                  <div className="form-group mb-2">
                                    <Field
                                      name="metodo_pago"
                                      id="metodo_pago"
                                      as={TextField}
                                      className="form-control"
                                      fullWidth
                                      select
                                      value={values.metodo_pago}
                                      onChange={(e) => {
                                        setMetodoPagoTouched(true); // Marcar como interactuado
                                        handleChange(e);
                                      }}
                                      error={
                                        metodoPagoTouched &&
                                        Boolean(errors.metodo_pago)
                                      }
                                      InputProps={{
                                        endAdornment: (
                                          <div style={{ display: "flex" }}>
                                            {metodoPagoTouched &&
                                              !errors.metodo_pago && (
                                                <CheckCircleIcon
                                                  style={{ color: "green" }}
                                                />
                                              )}
                                            {metodoPagoTouched &&
                                              errors.metodo_pago && (
                                                <ErrorIcon
                                                  style={{ color: "red" }}
                                                />
                                              )}
                                          </div>
                                        ),
                                      }}
                                    >
                                      <MenuItem value="Efectivo">
                                        Efectivo
                                      </MenuItem>
                                      {/* <MenuItem value="Transferencia">
                                        Transferencia
                                      </MenuItem> */}
                                    </Field>
                                    <ErrorMessage
                                      name="metodo_pago"
                                      component="div"
                                      className="error-message"
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

                                  <div className="form-group mb-2">
                                    <Field
                                      type="text"
                                      name="total"
                                      id="total"
                                      disabled
                                      as={TextField}
                                      label="Total"
                                      value={formatearValores(total)}
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
                                  </div>

                                  <div className="row mt-2">
                                    <div className="col-12">
                                      <div className="text-right">
                                        <strong>Subtotal:</strong> <strong>$</strong>&nbsp;
                                        <span id="comprobante_subtotal">
                                          {formatearPrecios(subtotalTotal)}
                                        </span>
                                      </div>
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

export default CreateVenta;
