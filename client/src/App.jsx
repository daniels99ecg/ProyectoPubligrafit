import { Route, Routes } from 'react-router-dom'
import ShowCliente from './components/Cliente'
import CreateCliente from './components/ClienteCreate'
import UpdateCliente from './components/ClienteUpdate'

function App() {

  return (
    <>
     <Routes>
      <Route path='/cliente' element={<ShowCliente/>}/>
      <Route path='/cliente/create' element={<CreateCliente/>}/> // controller
      <Route path='/cliente/update' element={<UpdateCliente/>}/> // controller
     </Routes>
    </>
  )
}

export default App