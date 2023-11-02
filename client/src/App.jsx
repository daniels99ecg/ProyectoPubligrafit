
import ShowCliente from './page/Cliente/Cliente'
import CreateCliente from './page/Cliente/ClienteCreate'
import UpdateCliente from './page/Cliente/ClienteUpdate'
import { ClienteContextProvider } from './context/Clientes/ClienteContext'

import { Route, Routes } from 'react-router-dom'
import User from './page/Usuario/usuario'
import UserCreate from './page/Usuario/usuarioCreate'
import UserUpdate from './page/Usuario/usuarioUpdate'

import { UserContextProvider } from './context/Usuario/UserContext'
import Rol from './page/Rol/rol'
import RolCreate from './page/Rol/RolCreate'
import Login from './page/Login/login'
function App() {

  return (
    <>

    <UserContextProvider>
     <Routes>
     <Route path='/' element={<Login/>}/>


      {/* Usuarios */}
      <Route path='/usuario' element={<User/>}/>
      <Route path='/usuario/create' element={<UserCreate/>}/>
      <Route path='/edit/:id_usuario' element={<UserUpdate/>}/>

      {/* Rol */}

      <Route path='/rol' element={<Rol/>}/>
      <Route path='/rol/create' element={<RolCreate/>}/>

      {/* Cliente */}

      <Route path='/cliente' element={<ShowCliente/>}/>
      <Route path='/cliente/create' element={<CreateCliente/>}/> // controller
      <Route path='/edit/:documento' element={<UpdateCliente/>}/> // controller
     </Routes>
     </UserContextProvider>

    </>
  )
}

export default App