import axios from 'axios'

export const getListarClientes = async () => {
    return await axios.get('https://danielg99.alwaysdata.net/cliente') // route of server
}

export const postCrearClientes = async (task) => {
    return await axios.post('https://danielg99.alwaysdata.net/cliente/create', task) // route and controller
}

export const showClienteUpdate = async (documento) => {
    return await axios.get(`https://danielg99.alwaysdata.net/cliente/${documento}`)
}

export const putActualizarCliente = async (documento, task) => {
    return await axios.put(`https://danielg99.alwaysdata.net/cliente/update/${documento}`, task)
}

export const deleteCliente = async (documento) => {
    return await axios.delete(`https://danielg99.alwaysdata.net/cliente/delete/${documento}`);
}

export const putDesactivarCliente = async (documento) => {
    return await axios.put(`https://danielg99.alwaysdata.net/cliente/disable/${documento}`);
}

export const putActivarCliente = async (documento) => {
    return await axios.put(`https://danielg99.alwaysdata.net/cliente/activate/${documento}`);
}