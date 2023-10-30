
import { Route, Routes } from 'react-router-dom'
import User from './page/Usuario/usuario'
import UserCreate from './page/Usuario/usuarioCreate'
import UserUpdate from './page/Usuario/usuarioUpdate'

import { UserContextProvider } from './context/Usuario/UserContext'
import Rol from './page/Rol/rol'
import RolCreate from './page/Rol/RolCreate'

function App() {

  return (
    <>
    <UserContextProvider>
     <Routes>
      {/* Usuarios */}
      <Route path='/usuario' element={<User/>}/>
      <Route path='/usuario/create' element={<UserCreate/>}/>
      <Route path='/edit/:id_usuario' element={<UserUpdate/>}/>

      {/* Rol */}

      <Route path='/rol' element={<Rol/>}/>
      <Route path='/rol/create' element={<RolCreate/>}/>

     </Routes>
     </UserContextProvider>
    </>
  )
}

export default App
