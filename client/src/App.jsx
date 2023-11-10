import { Route, Routes } from 'react-router-dom'
import User from './page/Usuario/usuario'
import UserCreate from './page/Usuario/usuarioCreate'
import UserUpdate from './page/Usuario/usuarioUpdate'

import { UserContextProvider } from './context/Usuario/UserContext'
import { RolContextProvider } from './context/Rol/RolContext'
import Rol from './page/Rol/Rol'
import RolCreate from './page/Rol/RolCreate'
import Login from './page/Login/login'
import Dashboard from './page/Dashboard/dashboard'

function App() {

  return (
    <>
    <UserContextProvider>
     <RolContextProvider>
     <Routes>
     <Route path='/' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      {/* Usuarios */}
      
      <Route path='/usuario' element={<User/>}/>
      <Route path='/usuario/create' element={<UserCreate/>}/>
      <Route path='/edit/:id_usuario' element={<UserUpdate/>}/>

      {/* Rol */}

      <Route path='/rol' element={<Rol/>}/>
      <Route path='/rol/create' element={<RolCreate/>}/>

     </Routes>
     </RolContextProvider> 
     </UserContextProvider>
    </>
  )
}

export default App
