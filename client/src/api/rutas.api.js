import axios from 'axios'


 export const getListarUsuarios= async ()=>{
  return await axios.get('http://localhost:3001/usuario')
}

 export const crearUsuario= async (task)=>{
   return await axios.post('http://localhost:3001/usuario/create', task)
   
}
