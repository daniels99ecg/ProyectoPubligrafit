import { Route, Routes } from 'react-router-dom'
import ShowCliente from './page/Cliente/Cliente'
import { ClienteContextProvider } from './context/Clientes/ClienteContext'
import { VentaContextProvider } from './context/Ventas/VentaContext'
import ShowVenta from './page/Venta/Venta'
import ShowProducto from './page/Producto/Productos'
import CreateProductos from './page/Producto/CreateProductos'
import UpdateProducto from './page/Producto/UpdateProducto'
import { ProductoContextProvider } from './context/Productos/ProductoContext'

function App() {

  return (
    <>
    <ClienteContextProvider>
    <VentaContextProvider>
    <ProductoContextProvider>
     <Routes>
      <Route path='/cliente' element={<ShowCliente/>}/>
      <Route path='/venta' element={<ShowVenta/>}/>
      <Route path='/producto' element={<ShowProducto/>}/>
      <Route path='/producto/create' element={<CreateProductos/>}/>
      <Route path='/editP/:id_producto' element={<UpdateProducto/>}/>
     </Routes>
     </ProductoContextProvider>
     </VentaContextProvider>
     </ClienteContextProvider>
    </>
  )
}
export default App