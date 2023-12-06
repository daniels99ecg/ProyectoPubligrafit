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

function CreateVenta({ handleCloseVentaModal }) {
  const { listar, ShowProducto } = useProducto();
  const { Listar, showClientes } = useCliente();
  const [tableData, setTableData] = useState([]);
  const [subtotalTotal, setSubtotalTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [montoEfectivo, setMontoEfectivo] = useState(0);
  const [montoDevolucion, setMontoDevolucion] = useState(0);
  const [tablaVacia, setTablaVacia] = useState(true);
  const [productoSelect, setProductoSelect] = useState(null);

  const findProductoEnStock = (productoId) => {
    const producto = listar.find((item) => item.id_producto === productoId);
    return producto ? producto.cantidad : 0;
  };

  const ventaSchema = Yup.object().shape({
    id_cliente: Yup.object().shape({
      fk_id_cliente: Yup.string().required("Campo requerido"),
    }),
    tipo_comprobante: Yup.string().required("Campo requerido").nullable(),
    fecha: Yup.date().required("Campo requerido"),
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

  const eliminarProducto = (index) => {
    if (index >= 0 && index < tableData.length) {
      const nuevaTabla = tableData.filter((_, i) => i !== index);
      setTableData(nuevaTabla);
    } else {
      console.error("Índice inválido al intentar eliminar producto");
    }
  };

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
            <div className="card">
              <div className="card-body">
                <div className="card-header"></div>
                <br />

                <Formik
                  initialValues={{
                    id_cliente: { fk_id_cliente: "" },
                    tipo_comprobante: "",
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
                  
                          swalWithBootstrapButtons
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
                          <div className="row mb-3">
                            <div className="col-md-9">
                              <div className="row">
                                <div className="col-md-12 mb-3">
                                  <div className="form-group mb-2">
                                    <label
                                      className="col-md-12"
                                      htmlFor="items"
                                    >
                                      <span className="small"></span>
                                      <Autocomplete
                                        disablePortal
                                        id="fixed-tags-demo"
                                        options={listar}
                                        getOptionLabel={(option) =>
                                          `${option.id_producto} - ${
                                            option.nombre_producto
                                          } - ${formatearPrecios(
                                            option.precio
                                          )}`
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
                                                // Muestra la alerta de SweetAlert indicando que la cantidad es 0
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
                                </div>
                                <div className="form-group mb-2 d-flex justify-content-end align-items-center">
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

                                <div className="col-md-12">
                                  {tablaVacia && (
                                    <div>&nbsp;Ningún producto agregado</div>
                                  )}
                                  {!tablaVacia && (
                                    <div>
                                      <h4>
                                        Detalles{" "}
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="30"
                                          height="18"
                                          fill="currentColor"
                                          className="bi bi-cart4"
                                          viewBox="0 2 18 14"
                                        >
                                          <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                                        </svg>
                                      </h4>
                                      <table
                                        id="detallesVenta"
                                        className="display  tabble-striped w-100 shadow custom-table"
                                      >
                                        <thead className="info text-left fs-6">
                                          <tr>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th>Subtotal</th>
                                            <th>Opciones</th>
                                          </tr>
                                        </thead>
                                        <tbody className="small text-left fs-6">
                                          {tableData.map((row, index) => (
                                            <tr key={index}>
                                              <td>{row.fk_producto}</td>
                                              <td>
                                                <Field
                                                  type="text"
                                                  name={`productos[${index}].cantidad`}
                                                  className={`form-control ${
                                                    (errors.productos?.[index]
                                                      ?.cantidad &&
                                                      touched.productos?.[index]
                                                        ?.cantidad) ||
                                                    values.productos[index]
                                                      .cantidad === 0
                                                      ? "is-invalid"
                                                      : touched.productos?.[
                                                          index
                                                        ]?.cantidad
                                                      ? "is-valid"
                                                      : ""
                                                  }`}
                                                  style={{ width: "80px" }}
                                                  value={row.cantidad.toString()}
                                                  onChange={(e) => {
                                                    const cantidad = parseInt(
                                                      e.target.value,
                                                      10
                                                    );

                                                    const productoEnStock =
                                                      findProductoEnStock(
                                                        row.fk_producto
                                                      ); // Función para obtener la cantidad disponible en stock del producto

                                                    if (
                                                      cantidad > productoEnStock
                                                    ) {
                                                      Swal.fire({
                                                        icon: "warning",
                                                        title: "Advertencia",
                                                        text: "Cantidad superior al stock",
                                                      });
                                                      return;
                                                    }

                                                    const subtotal = isNaN(
                                                      cantidad
                                                    )
                                                      ? 0
                                                      : cantidad * row.precio;

                                                    setTableData(
                                                      (prevTableData) => [
                                                        ...prevTableData.slice(
                                                          0,
                                                          index
                                                        ),
                                                        {
                                                          ...row,
                                                          cantidad: isNaN(
                                                            cantidad
                                                          )
                                                            ? 0
                                                            : cantidad,
                                                          subtotal: subtotal,
                                                        },
                                                        ...prevTableData.slice(
                                                          index + 1
                                                        ),
                                                      ]
                                                    );
                                                    setFieldValue(
                                                      `productos[${index}].cantidad`,
                                                      isNaN(cantidad)
                                                        ? 0
                                                        : cantidad
                                                    );
                                                  }}
                                                />
                                                <ErrorMessage
                                                  name={`productos[${index}].cantidad`}
                                                  component="div"
                                                  className="error-message"
                                                />
                                              </td>
                                              <td>
                                                {formatearPrecios(row.precio)}
                                              </td>
                                              <td>
                                                {formatearPrecios(row.subtotal)}
                                              </td>
                                              <td>
                                                <Tooltip title="Eliminar" arrow>
                                                  <span>
                                                    <button
                                                      className="btn"
                                                      style={{
                                                        boxShadow: "none",
                                                        background: "none",
                                                        padding: 0,
                                                        marginTop: "-8px",
                                                      }}
                                                      onClick={() =>
                                                        eliminarProducto(index)
                                                      }
                                                    >
                                                      <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="18"
                                                        fill="red"
                                                        className="bi bi-x-circle"
                                                        viewBox="0 0 16 16"
                                                      >
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                                      </svg>
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
                              </div>
                            </div>

                            <div className="col-md-3">
                              <div className="card shadow">
                                <div className="card-body p-2">
                                  <div className="form-group mb-2">
                                    <Autocomplete
                                      disablePortal
                                      id="fixed-tags-demo"
                                      options={Listar}
                                      getOptionLabel={(option) =>
                                        `${option.documento} - ${option.nombre} ${option.apellido}`
                                      }
                                      onChange={(event, newValue) => {
                                        if (newValue) {
                                          setFieldValue(
                                            "id_cliente.fk_id_cliente",
                                            newValue.id_cliente
                                          );
                                        } else {
                                          setFieldValue(
                                            "id_cliente.fk_id_cliente",
                                            ""
                                          );
                                        }
                                        setFieldValue(
                                          "clienteSeleccionado",
                                          newValue
                                        );
                                        handleChange(event);
                                      }}
                                      value={values.clienteSeleccionado || null}
                                      sx={{ width: "100%" }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Cliente"
                                          sx={{ width: "100%" }}
                                          className={`form-control ${
                                            (touched.id_cliente
                                              ?.fk_id_cliente &&
                                              errors.id_cliente
                                                ?.fk_id_cliente) ||
                                            (!values.id_cliente
                                              ?.fk_id_cliente &&
                                              touched.id_cliente?.fk_id_cliente)
                                              ? "is-invalid"
                                              : touched.id_cliente
                                                  ?.fk_id_cliente &&
                                                !errors.id_cliente
                                                  ?.fk_id_cliente
                                              ? "is-valid"
                                              : ""
                                          }`}
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
                                      name="tipo_comprobante"
                                      id="tipo_comprobante"
                                      className={`form-control ${
                                        errors.tipo_comprobante &&
                                        touched.tipo_comprobante
                                          ? "is-invalid"
                                          : touched.tipo_comprobante
                                          ? "is-valid"
                                          : ""
                                      }`}
                                      placeholder="Seleccionar comprobante"
                                      label="Comprobante"
                                      as={TextField}
                                      fullWidth
                                      select
                                      value={values.tipo_comprobante}
                                      onChange={handleChange}
                                    >
                                      <MenuItem value="Ticket">Ticket</MenuItem>
                                      <MenuItem value="Factura">
                                        Factura
                                      </MenuItem>
                                      <MenuItem value="Electrónico">
                                        Electrónico
                                      </MenuItem>
                                    </Field>
                                    <ErrorMessage
                                      name="tipo_comprobante"
                                      component="div"
                                      className="error-message"
                                    />
                                  </div>
                                  <div className="form-group mb-2">
                                    <Field
                                      type="date"
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
                                      className={`form-control ${
                                        errors.total && touched.total
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      as={TextField}
                                      label="Total"
                                      value={formatearValores(total)}
                                      onChange={handleChange}
                                    />
                                    <ErrorMessage
                                      name="total"
                                      component="div"
                                      className="error-message"
                                    />
                                  </div>
                                  <div className="form-group mb-2">
                                    <Field
                                      type="text"
                                      name="efectivo"
                                      id="efectivo"
                                      as={TextField}
                                      label="Efectivo"
                                      placeholder="Efectivo recibido"
                                      onChange={(e) => {
                                        const monto =
                                          parseFloat(e.target.value) || 0;
                                        setMontoEfectivo(monto);

                                        if (tableData.length > 0 && total > 0) {
                                          const devolucion = monto - total;
                                          setMontoDevolucion(devolucion);
                                        } else {
                                          setMontoDevolucion(0);
                                        }
                                      }}
                                    />
                                  </div>
                                  <div className="row mt-2">
                                    <div className="col-12">
                                      <h6 className="text-start fw-bold">
                                        Efectivo &nbsp;$ &nbsp;
                                        <span id="efectivoRecibido">
                                          {formatearValores(montoEfectivo)}
                                        </span>
                                      </h6>
                                    </div>
                                    <div className="col-12">
                                      <h6 className="text-start text-danger fw-bold">
                                        Cambio &nbsp;$ &nbsp;&nbsp;
                                        <span id="devolución">
                                          {formatearValores(montoDevolucion)}
                                        </span>
                                      </h6>
                                    </div>
                                  </div>
                                  <div className="row mt-2">
                                    <div className="col-12">
                                      <div className="text-right">
                                        SUBTOTAL &nbsp;$&nbsp;&nbsp;&nbsp;
                                        <span id="comprobante_subtotal">
                                          {formatearPrecios(subtotalTotal)}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="col-md-7">
                                      <span>IVA (19%)</span>
                                    </div>
                                    <div className="col-md-5 text-right">
                                      <span
                                        className=""
                                        id="comprobante_IVA"
                                      ></span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
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
