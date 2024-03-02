import axios from 'axios'

export const getListarClientes = async () => {
    return await axios.get('https://danielg99.alwaysdata.net/cliente') // route of server
}

export const postCrearClientes = async (task) => {
    return await axios.post('https://danielg99.alwaysdata.net/cliente/create', task) // route and controller
}

export const showClienteUpdate = async (id_cliente) => {
    return await axios.get(`https://danielg99.alwaysdata.net/cliente/${id_cliente}`)
}

export const putActualizarCliente = async (id_cliente, task) => {
    return await axios.put(`https://danielg99.alwaysdata.net/cliente/update/${id_cliente}`, task)
}

export const deleteCliente = async (id_cliente) => {
    return await axios.delete(`https://danielg99.alwaysdata.net/cliente/delete/${id_cliente}`);
}

export const putDesactivarCliente = async (id_cliente) => {
    return await axios.put(`https://danielg99.alwaysdata.net/cliente/disable/${id_cliente}`);
}

export const putActivarCliente = async (id_cliente) => {
    return await axios.put(`https://danielg99.alwaysdata.net/cliente/activate/${id_cliente}`);
}

export const getClienteExistente = async (documento) => {
    return await axios.get(`https://danielg99.alwaysdata.net/cliente/existente/${documento}`);
}