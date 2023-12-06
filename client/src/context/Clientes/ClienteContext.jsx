import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getListarClientes, showClienteUpdate, postCrearClientes, putActualizarCliente, putDesactivarCliente, putActivarCliente, deleteCliente,
} from "../../api/Rutas.Cliente.api";
import Swal from "sweetalert2";
export const ClienteContext = createContext();

export const useCliente = () => {
  const context = useContext(ClienteContext);
  if (!context) {
    throw new error("useCliente debe estar en provider");
  }
  return context;
};

export const ClienteContextProvider = ({ children }) => {
  const [Listar, setListar] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  async function showClientes() {
    const response = await getListarClientes();

    const filterList = response.data.filter(
      (item) =>
        item.documento.toString().includes(searchTerm) ||
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.telefono.toString().includes(searchTerm) ||
        item.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setListar(filterList);
  }
  const desactivarCliente = async (id_cliente) => {
    try {
      const response = await putDesactivarCliente(id_cliente);
      if (response.status === 200) {
        const updatedList = Listar.map((item) => {
          if (item.id_cliente === id_cliente) {
            return { ...item, estado: false };
          }
          return item;
        });
        setListar(updatedList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const activarCliente = async (id_cliente) => {
    try {
      const response = await putActivarCliente(id_cliente);
      if (response.status === 200) {
        const updatedList = Listar.map((item) => {
          if (item.id_cliente === id_cliente) {
            return { ...item, estado: true };
          }
          return item;
        });
        setListar(updatedList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filtrarDesactivados = Listar.sort((a, b) => {
    if (a.estado === b.estado) {
      return 0;
    }
    return a.estado ? -1 : 1;
  });

  function primeraMayuscula(input) {
    return input
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  function letraRepetida(cadena) {
    const lowerCadena = cadena.toLowerCase();
    for (let i = 0; i < cadena.length - 2; i++) {
      if (
        lowerCadena[i] === lowerCadena[i + 1] &&
        lowerCadena[i] === lowerCadena[i + 2] &&
        /[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/.test(lowerCadena[i])
      ) {
        return true;
      }
    }
    return false;
  }

  const validacionCliente = async (values) => {
    try {
      let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
      let regex3 =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zAZ0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

      values.nombre = primeraMayuscula(values.nombre);
      values.apellido = primeraMayuscula(values.apellido);
      values.direccion = primeraMayuscula(values.direccion);
      values.email = values.email.toLowerCase();

      if (
        values.documento === "" ||
        values.nombre === "" ||
        values.apellido === "" ||
        values.telefono === "" ||
        values.direccion === "" ||
        values.email === ""
      ) {
        Swal.fire({
          icon: "error",
          title: "Campos vacíos",
          text: "Debe completar todos los campos",
        });
      } else if (
        values.documento === "0" ||
        /^0+$/.test(values.documento) ||
        values.documento.length < 8 ||
        values.documento.length > 11 ||
        values.documento.charAt(0) === "0" ||
        !/^\d+$/.test(values.documento)
      ) {
        Swal.fire({
          icon: "error",
          title: "Documento inválido",
          text:
            values.documento === "0"
              ? "El campo no debe ser 0"
              : /^0+$/.test(values.documento)
              ? "El campo no debe consistir en 0 repetitivo"
              : values.documento.length < 8 || values.documento.length > 11
              ? "El campo debe contener entre 8 y 11 caracteres"
              : values.documento.charAt(0) === "0"
              ? "El campo no debe comenzar en 0"
              : !/^\d+$/.test(values.documento)
              ? "El campo debe contener caracteres numéricos"
              : "Documento inválido",
        });
      } else if (
        !regex.test(values.nombre) ||
        letraRepetida(values.nombre) ||
        values.nombre.length < 2 ||
        values.nombre.length > 40
      ) {
        Swal.fire({
          icon: "error",
          title: "Nombre inválido",
          text: !regex.test(values.nombre)
            ? "El campo solo debe incluir letras"
            : letraRepetida(values.nombre)
            ? "El campo no debe consistir en una sola letra repetitiva"
            : values.nombre.length < 2 || values.nombre.length > 40
            ? "El campo debe contener entre 2 y 40 caracteres"
            : "Nombre inválido",
        });
      } else if (
        !regex.test(values.apellido) ||
        letraRepetida(values.apellido) ||
        values.apellido.length < 2 ||
        values.apellido.length > 40
      ) {
        Swal.fire({
          icon: "error",
          title: "Apellido inválido",
          text: !regex.test(values.apellido)
            ? "El campo solo debe incluir letras"
            : letraRepetida(values.apellido)
            ? "El campo no debe consistir en una sola letra repetitiva"
            : values.apellido.length < 2 || values.apellido.length > 40
            ? "El campo debe contener entre 2 y 40 caracteres"
            : "Apellido inválido",
        });
      } else if (
        values.telefono === "0" ||
        /^0+$/.test(values.telefono) ||
        values.telefono.length < 10 ||
        values.telefono.length > 10 ||
        values.telefono.charAt(0) === "0" ||
        !/^\d+$/.test(values.telefono)
      ) {
        Swal.fire({
          icon: "error",
          title: "Teléfono inválido",
          text:
            values.telefono === "0"
              ? "El campo no debe ser 0"
              : /^0+$/.test(values.telefono)
              ? "El campo no debe consistir en 0 repetitivo"
              : values.telefono.length < 10 || values.telefono.length > 10
              ? "El campo debe contener entre 10 y 11 caracteres"
              : values.telefono.charAt(0) === "0"
              ? "El campo no debe comenzar en 0"
              : !/^\d+$/.test(values.telefono)
              ? "El campo debe contener caracteres numéricos"
              : "Documento inválido",
        });
      } else if (
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s#]+$/.test(values.direccion) ||
        /^#+$/.test(values.direccion) ||
        values.direccion.length < 7 ||
        values.direccion.length > 40 ||
        values.direccion === "0" ||
        /^0+$/.test(values.direccion) ||
        values.direccion.charAt(0) === "0"
      ) {
        Swal.fire({
          icon: "error",
          title: "Dirección inválida",
          text: /^#+$/.test(values.direccion)
            ? 'El campo no debe ser "#" or "##"'
            : values.direccion.length < 7 || values.direccion.length > 40
            ? "El campo debe contener entre 7 y 40 caracteres"
            : values.direccion === "0"
            ? 'El campo no debe ser "0"'
            : /^0+$/.test(values.documento)
            ? "El campo no debe consistir en 0 repetitivo"
            : values.documento.charAt(0) === "0"
            ? "El campo no debe comenzar en 0"
            : "Dirección inválida",
        });
      } else if (!regex3.test(values.email)) {
        Swal.fire({
          icon: "error",
          title: "Correo electrónico inválido",
          text: "Ingrese un correo válido",
        });
      } else {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success me-3",
            cancelButton: "btn btn-danger",
          },
          buttonsStyling: false,
        });

        swalWithBootstrapButtons
          .fire({
            title: "Confirmar el registro?",
            text: "Tu registro será guardado",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            buttons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              postCrearClientes(values)
                .then((response) => {
                  if (response.status === 400 && response.data.error) {
                    Swal.fire({
                      icon: "error",
                      title: "Cliente ya registrado",
                      text: response.data.error,
                    });
                  } else {
                    swalWithBootstrapButtons
                      .fire(
                        "Registro exitoso!",
                        "Tu archivo ha sido registrado",
                        "success"
                      )
                      .then(() => {
                        navigate("/cliente");
                        resetForm();
                      });
                  }
                })
                .catch((error) => {
                  console.error(error);
                  Swal.fire({
                    icon: "error",
                    title: "Error en la solicitud",
                    text: "Documento existente en la base de datos",
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  function primeraMayusculaAct(input) {
    return input
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  function letraRepetidaAct(cadena) {
    const lowerCadena = cadena.toLowerCase();
    for (let i = 0; i < cadena.length - 2; i++) {
      if (
        lowerCadena[i] === lowerCadena[i + 1] &&
        lowerCadena[i] === lowerCadena[i + 2] &&
        /[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/.test(lowerCadena[i])
      ) {
        return true; 
      }
    }
    return false;
  }

  const [listarActualizar, setListarActualizar] = useState({
    tipo_documento: "",
    documento: "",
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    email: "",
  });

  const validacionActualizar = async (values, id_cliente) => {
    try {
      let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
      let regex3 =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zAZ0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

      values.nombre = primeraMayusculaAct(values.nombre);
      values.apellido = primeraMayusculaAct(values.apellido);
      values.direccion = primeraMayusculaAct(values.direccion);
      values.email = values.email.toLowerCase();

      if (
        values.documento === "" ||
        values.nombre === "" ||
        values.apellido === "" ||
        values.telefono === "" ||
        values.direccion === "" ||
        values.email === ""
      ) {
        Swal.fire({
          icon: "error",
          title: "Campos vacíos",
          text: "Debe completar todos los campos",
        });
      } else if (
        values.documento === "0" ||
        /^0+$/.test(values.documento) ||
        values.documento.length < 8 ||
        values.documento.length > 11 ||
        values.documento.charAt(0) === "0" ||
        !/^\d+$/.test(values.documento)
      ) {
        Swal.fire({
          icon: "error",
          title: "Documento inválido",
          text:
            values.documento === "0"
              ? "El campo no debe ser 0"
              : /^0+$/.test(values.documento)
              ? "El campo no debe consistir en 0 repetitivo"
              : values.documento.length < 8 || values.documento.length > 11
              ? "El campo debe contener entre 8 y 11 caracteres"
              : values.documento.charAt(0) === "0"
              ? "El campo no debe comenzar en 0"
              : !/^\d+$/.test(values.documento)
              ? "El campo debe contener caracteres numéricos"
              : "Documento inválido",
        });
      } else if (
        !regex.test(values.nombre) ||
        letraRepetidaAct(values.nombre) ||
        values.nombre.length < 2 ||
        values.nombre.length > 40
      ) {
        Swal.fire({
          icon: "error",
          title: "Nombre inválido",
          text: !regex.test(values.nombre)
            ? "El campo solo debe incluir letras"
            : letraRepetida(values.nombre)
            ? "El campo no debe consistir en una sola letra repetitiva"
            : values.nombre.length < 2 || values.nombre.length > 40
            ? "El campo debe contener entre 2 y 40 caracteres"
            : "Nombre inválido",
        });
      } else if (
        !regex.test(values.apellido) ||
        letraRepetidaAct(values.apellido) ||
        values.apellido.length < 2 ||
        values.apellido.length > 40
      ) {
        Swal.fire({
          icon: "error",
          title: "Apellido inválido",
          text: !regex.test(values.apellido)
            ? "El campo solo debe incluir letras"
            : letraRepetidaAct(values.apellido)
            ? "El campo no debe consistir en una sola letra repetitiva"
            : values.apellido.length < 2 || values.apellido.length > 40
            ? "El campo debe contener entre 2 y 40 caracteres"
            : "Apellido inválido",
        });
      } else if (
        values.telefono === "0" ||
        /^0+$/.test(values.telefono) ||
        values.telefono.length < 10 ||
        values.telefono.length > 10 ||
        values.telefono.charAt(0) === "0" ||
        !/^\d+$/.test(values.telefono)
      ) {
        Swal.fire({
          icon: "error",
          title: "Teléfono inválido",
          text:
            values.telefono === "0"
              ? "El campo no debe ser 0"
              : /^0+$/.test(values.telefono)
              ? "El campo no debe consistir en 0 repetitivo"
              : values.telefono.length < 10 || values.telefono.length > 10
              ? "El campo debe contener entre 10 y 11 caracteres"
              : values.telefono.charAt(0) === "0"
              ? "El campo no debe comenzar en 0"
              : !/^\d+$/.test(values.telefono)
              ? "El campo debe contener caracteres numéricos"
              : "Documento inválido",
        });
      } else if (
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s#]+$/.test(values.direccion) ||
        /^#+$/.test(values.direccion) ||
        values.direccion.length < 7 ||
        values.direccion.length > 40 ||
        values.direccion === "0" ||
        /^0+$/.test(values.direccion) ||
        values.direccion.charAt(0) === "0"
      ) {
        Swal.fire({
          icon: "error",
          title: "Dirección inválida",
          text: /^#+$/.test(values.direccion)
            ? 'El campo no debe ser "#" o "##"'
            : values.direccion.length < 7 || values.direccion.length > 40
            ? "El campo debe contener entre 7 y 40 caracteres"
            : values.direccion === "0"
            ? 'El campo no debe ser "0"'
            : /^0+$/.test(values.documento)
            ? "El campo no debe consistir en 0 repetitivo"
            : values.documento.charAt(0) === "0"
            ? "El campo no debe comenzar en 0"
            : "Dirección inválida",
        });
      } else if (!regex3.test(values.email)) {
        Swal.fire({
          icon: "error",
          title: "Correo electrónico inválido",
          text: "Ingrese un correo válido",
        });
      } else {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success me-3",
            cancelButton: "btn btn-danger",
          },
          buttonsStyling: false,
        });
        swalWithBootstrapButtons
          .fire({
            title: "Confirmar actualización?",
            text: "Tu registro será actualizado",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            Buttons: true,
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              try {
                await putActualizarCliente(id_cliente, values);
                navigate("/cliente");
                Swal.fire({
                  icon: "success",
                  title: "Actualización exitosa",
                  text: "Su archivo ha sido actualizado.",
                });
              } catch (error) {
                console.log(error);
              }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              swalWithBootstrapButtons.fire(
                "Actualización cancelada",
                "Su archivo está seguro",
                "error"
              );
            }
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function clienteActualizar(id_cliente) {
    try {
      const clienteUpdate = await showClienteUpdate(id_cliente);
      const response = clienteUpdate.data;

      setListarActualizar({
        tipo_documento: response.tipo_documento,
        documento: response.documento,
        nombre: response.nombre,
        apellido: response.apellido,
        telefono: response.telefono,
        direccion: response.direccion,
        email: response.email,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const destroyCliente = async (id_cliente) => {
    try {
      Swal.fire({
        title: "Eliminar registro?",
        text: "No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await deleteCliente(id_cliente);
          if (response.status === 200) {
            Swal.fire(
              "Eliminado!",
              "El registro ha sido eliminado.",
              "success"
            );
            showClientes();
          } else {
            Swal.fire({
              icon: "error",
              title: "Error al eliminar el registro",
              text: "No se pudo eliminar el registro",
            });
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ClienteContext.Provider
      value={{
        Listar,
        setListar,
        listarActualizar,
        showClientes,
        searchTerm,
        setSearchTerm,
        activarCliente,
        desactivarCliente,
        filtrarDesactivados,
        primeraMayuscula,
        letraRepetida,
        validacionCliente,
        validacionActualizar,
        clienteActualizar,
        destroyCliente,
      }}
    >
      {children}
    </ClienteContext.Provider>
  );
};
