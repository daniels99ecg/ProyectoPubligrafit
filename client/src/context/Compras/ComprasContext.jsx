import {createContext, useContext, useState} from 'react'
import { getListarCompras, postCrearCompras } from "../../api/Compras/rutas.api";

export const CompraContext=createContext()
export const useCompra=()=>{
    const context=useContext(CompraContext)
    if (!context){
        throw new Error('useCompra debe de estar en el provider')
    }
    return context
}
export const CompraContextProvider=({children})=>{

    const [listar,setListar] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
   

    async function cargarCompras(){
        const response=await getListarCompras() 

        const filterList = response.data.filter((item) => 
            item.id_compra.toString().includes(searchTerm) ||
            item.proveedore.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.cantidad.toString().includes(searchTerm) ||
            item.total.toString().includes(searchTerm) ||
            item.fecha.toString().includes(searchTerm)
        );
        setListar(filterList)
    }

const validacionCreacionCompras = async(values)=>{
    try {
        await postCrearCompras(values)
    } catch (error) {
        console.log(error)
    }
}

const filtrarDesactivados = listar.sort((a, b) => {
    if (a.estado === b.estado) {
      return 0;
    }
    return a.estado ? -1 : 1;
  });


return(
    <CompraContext.Provider value={{listar,searchTerm,cargarCompras,setSearchTerm,filtrarDesactivados, validacionCreacionCompras}}> 
        {children}
    </CompraContext.Provider>
)

}