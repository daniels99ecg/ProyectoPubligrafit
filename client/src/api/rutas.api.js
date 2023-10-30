import axios from 'axios'


 export const getListarUsuarios= async ()=>{
  return await axios.get('http://localhost:3001/usuario')
}

 export const crearUsuario= async (task)=>{
   return await axios.post('http://localhost:3001/usuario/create', task)
   
}

export const cargaractualizarUsuario=async (id_usuario)=>{
  return await axios.get(`http://localhost:3001/usuario/${id_usuario}`)
}

export const actualizarUsuario=async (id_usuario, task)=>{
  return await axios.put(`http://localhost:3001/usuario/update/${id_usuario}`, task)
}

export const cambiarEstadoUsuario=async (id_usuario)=>{
  return await axios.put(`http://localhost:3001/usuario/cambiar/${id_usuario}`)
}


export const getListarRoles=async ()=>{
  return await axios.get('http://localhost:3001/rol')
}




