import axios from 'axios'

export const getListarClientes = async () => {
    return await axios.get('http://localhost:3001/cliente') // route of server
}

export const postCrearClientes = async (task) => {
    return await axios.post('http://localhost:3001/cliente/create', task) // route and controller
}

export const putActualizarCliente = async () => {
    return await axios.put('http://localhost/cliente/update', )
}