import { Route, Routes } from 'react-router-dom'
import ShowProductos from './componentes/Productos'
import ShowFichasTecnicas from './componentes/Fichas_Tecnicas'
import ShowInsumos from './componentes/Insumos'

function App() {

  return (
    <>
     <Routes>
      <Route path='/producto' element={<ShowProductos/>}/>
      <Route path='/fichaTecnica' element={<ShowFichasTecnicas/>}/>
      <Route path='/insumo' element={<ShowInsumos/>}/>

     </Routes>
    </>
  )
}

export default App