import { Route, Routes } from 'react-router-dom'
import ShowCliente from './page/Cliente/Cliente'
import CreateCliente from './page/Cliente/ClienteCreate'
import UpdateCliente from './page/Cliente/ClienteUpdate'
import { ClienteContextProvider } from './context/Clientes/ClienteContext'

function App() {

  return (
    <>
    <ClienteContextProvider>
     <Routes>
      <Route path='/cliente' element={<ShowCliente/>}/>
      <Route path='/cliente/create' element={<CreateCliente/>}/> // controller
      <Route path='/edit/:documento' element={<UpdateCliente/>}/> // controller
     </Routes>
     </ClienteContextProvider>
    </>
  )
}

export default App