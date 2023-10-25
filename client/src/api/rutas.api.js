import axios from 'axios'


 export const getListarUsuarios= async ()=>{
  return await axios.get('http://localhost:3001/usuario')
}

 export const crearUsuario= async (task)=>{
   return await axios.post('http://localhost:3001/usuario/create', task)
   
}

export const actualizarUsuario=async (id_usuario)=>{
  return await axios.get(`http://localhost:3001/usuario/${id_usuario}`)
}


export const getListarRoles=async ()=>{
  return await axios.get('http://localhost:3001/rol')
}
