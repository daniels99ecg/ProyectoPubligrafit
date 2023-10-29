
import { Route, Routes } from 'react-router-dom'
import User from './page/Usuario/usuario'
import UserCreate from './page/Usuario/usuarioCreate'
import { UserContextProvider } from './context/Usuario/UserContext'
import Rol from './page/Rol/rol'
function App() {

  return (
    <>
    <UserContextProvider>
     <Routes>
      {/* Usuarios */}
      <Route path='/usuario' element={<User/>}/>
      <Route path='/usuario/create' element={<UserCreate/>}/>
      <Route path='/edit/:id_usuario' element={<UserCreate/>}/>

      {/* Rol */}

      <Route path='/rol' element={<Rol/>}/>
     </Routes>
     </UserContextProvider>
    </>
  )
}

export default App
