import '../../css/style.css'
import Nav from '../../components/nav'
import { Formik, Form, FieldArray, Field } from 'formik';
import { useEffect, useState } from 'react'
import { useCompra } from "../../context/Compras/ComprasContext";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useInsumo } from '../../context/Insumos/InsumoContext';

import { useProveedor } from '../../context/Proveedor/ProveedorContext';

function UserCreate(){
    const {validacionCreacionCompras} = useCompra()
    const{listar,ShowInsumos,filtrarDesactivados, eliminarInsumos,activarInsumo,desactivarInsumo,searchTerm,setSearchTerm}=useInsumo()
    const {listarP,showProveedor}=useProveedor()

    useEffect(() => {
   
      ShowInsumos();
      showProveedor();
    }, [searchTerm]);



    
    return(
        <>
        <Nav />
        <div className='dashboard-app'>
          <div className='dashboard-content'>
            <div className='container'>
              <div className='card'>
                <div className='card-body'>
                  <div className='card-header'>
                    <h1>Registrar Compras</h1>
                  </div>
                  <br />
  
                  <Formik
                    initialValues={{
                      fk_proveedor: '',
                      fecha: '',
                      total: '',
                      insumos: [
                        {
                          fk_insumo: '',
                          cantidad: '',
                          precio: '',
                          iva: '',
                          subtotal: '',
                        },
                      ],
                    }}
                    onSubmit={(values) => {
                      console.log(values);
                      validacionCreacionCompras(values);
                    }}
                  >
                    {({ handleChange, handleSubmit, values }) => (
                      <Form onSubmit={handleSubmit} className='row g-3' id='pruebas'>
                        {/* Campos para la compra */}
                        <div className='col-md-6'>
                          <label htmlFor='proveedor'>Proveedor</label>
                          {/* <input
                            type='text'
                            name='fk_proveedor'
                            className='form-control'
                            onChange={handleChange}
                            value={values.fk_proveedor}
                          /> */}
<Autocomplete 
  disablePortal
  id="fixed-tags-demo"
  options={listarP.filter((proveedor) => proveedor.estado)}  // Filtrar roles con estado true
  getOptionLabel={(option) => option.nombre_rol}
  onChange={(event, newValue) => {
    handleChange({ target: { name: 'fk_proveedor', value: newValue ? newValue.id_proveedor : '' } });
  }}
  value={listarP.find((proveedor) => proveedor.proveedor === values.fk_proveedor) || null}
  sx={{ width: '100%' }}
  renderInput={(params) => <TextField {...params} label="Rol" sx={{ width: '100%' }}/>}
/>

                        </div>
                        <div className='col-md-6'>
                          <label htmlFor='fecha'>Fecha</label>
                          <input
                            type='date'
                            name='fecha'
                            className='form-control'
                            onChange={handleChange}
                            value={values.fecha}
                          />
                        </div>
                        <div className='col'>
                          <label htmlFor='total'>Total</label>
                          <input
                            type='text'
                            name='total'
                            className='form-control'
                            onChange={handleChange}
                            value={values.total}
                          />
                        </div>
  
                        {/* Campos para los insumos */}
                        
                        <FieldArray
  name='insumos'
  render={(arrayHelpers) => (
    <div>
      {values.insumos.map((insumo, index) => (
        <div key={index} className='row g-3'>
          <div className='col'>
              <Autocomplete
    options={listar}
    getOptionLabel={(option) => option.nombre}
    value={listar.find((item) => item.id_insumo === insumo.fk_insumo) || null}
    onChange={(e, newValue) => {
      arrayHelpers.replace(index, {
        ...insumo,
        fk_insumo: newValue ? newValue.id_insumo : '',
      });
    }}
    renderInput={(params) => (
      <TextField {...params} label='Insumo' />
    )}
  />

          </div>


          <div className='col'>
            <Field
              type='text'
              name={`insumos.${index}.cantidad`}
              className='form-control'
              onChange={handleChange}
              label='Cantidad'
              as={TextField}
              value={insumo.cantidad}
            />
          </div>

          <div className='col'>
            <Field
              type='text'
              name={`insumos.${index}.precio`}
              className='form-control'
              onChange={handleChange}
              label='Precio'
              as={TextField}
              value={insumo.precio}
            />
          </div>

          <div className='col'>
            <Field
              type='text'
              name={`insumos.${index}.iva`}
              className='form-control'
              onChange={handleChange}
              label='Iva'
              as={TextField}
              value={insumo.iva}
            />
          </div>

          <div className='col'>
            <Field
              type='text'
              name={`insumos.${index}.subtotal`}
              className='form-control'
              onChange={handleChange}
              label='SubTotal'
              as={TextField}
              value={insumo.subtotal}
            />
          </div>

          <div className='col-auto'>
            <button
            className='boton-plus'  
              type='button'
              onClick={() => arrayHelpers.remove(index)}
            >
           <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
  <path fill="#e53935" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
  <rect x="14" y="21" width="20" height="6" fill="#fff"></rect>
</svg>

            </button>
          </div>
        </div>
      ))}
      <div className='plus'>
        <button
          className='boton-plus'
          type='button'
          onClick={() =>
            arrayHelpers.push({
              fk_insumo: '',
              cantidad: '',
              precio: '',
              iva: '',
              subtotal: '',
            })
          }
        >
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
<path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#fff" d="M21,14h6v20h-6V14z"></path><path fill="#fff" d="M14,21h20v6H14V21z"></path>
</svg>
        </button>
      </div>
    </div>
  )}
/>
  
                        {/* Botones de submit y cancelar */}
                        <div className='col-auto'>
                          <button className='btn btn-primary' type='submit'>
                            Registrar
                          </button>
                        </div>
                        <div className='col-auto'>
                          <a href='/usuario' className='btn btn-danger'>
                            Cancelar
                          </a>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default UserCreate