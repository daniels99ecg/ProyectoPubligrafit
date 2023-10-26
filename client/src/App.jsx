
import { Route, Routes } from 'react-router-dom'
import User from './page/usuario'
import UserCreate from './page/usuarioCreate'


function App() {

  return (
    <>
     <Routes>
      <Route path='/usuario' element={<User/>}/>
      <Route path='/usuario/create' element={<UserCreate/>}/>
      <Route path='/edit/:id_usuario' element={<UserCreate/>}/>
     </Routes>
    </>
  )
}

export default App
