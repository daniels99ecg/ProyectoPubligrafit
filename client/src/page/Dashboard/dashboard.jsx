import React from 'react';
import Nav from '../../components/nav';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';
import { getListarVentasDia,getListarVentasdelDia } from '../../api/Rutas.Venta.api';
import { getListarCompraDia,getListarCompradelDia } from '../../api/Compras/rutas.api';
import Typography from '@mui/material/Typography';

function Dashboard() {
  const [totalVentas, setTotalVentas] = useState(0);
  const [totalCompras, setTotalCompras] = useState(0);
  const [totalVentasDia, setTotalVentasDia] = useState(0);
  const [totalComprasDia, setTotalComprasDia] = useState(0);

  useEffect(() => {
    const fetchVentasPorFechas = async () => {
      try {
        const response = await getListarVentasDia();
        setTotalVentas(response.data);
      } catch (error) {
        console.error('Error al obtener datos de ventas:', error);
      }
    };
    const fetchVentasPorFechasDia = async () => {
      try {
        const response = await getListarVentasdelDia();
        setTotalVentasDia(response.data);
      } catch (error) {
        console.error('Error al obtener datos de ventas:', error);
      }
    };
    const fetchComprasPorFechas = async () => {
      try {
        const response = await getListarCompraDia();
        setTotalCompras(response.data);
       
      } catch (error) {
        console.error('Error al obtener datos de ventas:', error);
      }
    };

    const fetchComprasPorFechasDia = async () => {
      try {
        const response = await getListarCompradelDia();
        setTotalComprasDia(response.data);
      } catch (error) {
        console.error('Error al obtener datos de ventas:', error);
      }
    };

    fetchVentasPorFechas();
    fetchComprasPorFechas();
    fetchVentasPorFechasDia()
    fetchComprasPorFechasDia()
  }, []);
  
  return (
    <>
      <Nav />
      <div className='dashboard-app'>
        <div className='dashboard-content'>
          <div className='container'>
            <div className='row'>
              {/* Ventas Card */}
              <div className='col-md-6'>
                <div className='card mb-4'>
                  <div className='card-body'>
                    <h4 className='text-center'>
                      {totalVentas.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                      <br />
                      Ventas
                    </h4>
                  </div>
                </div>
              </div>

              {/* Compras Card */}
              <div className='col-md-6'>
                <div className='card mb-4'>
                  <div className='card-body'>
                    <h4 className='text-center'>
                      {totalCompras.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                      <br />
                      Compras
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-6'>
                <div className='card text-center d-flex align-items-center'>
                  <Typography>Total Ventas y Compras</Typography>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: totalVentas, label: 'Ventas' },
                          { id: 1, value: totalCompras, label: 'Compras' },
                        ],
                      },
                    ]}
                    width={400}
                    height={200}
                  />
                </div>
              </div>

              <div className='col-md-6'>
                <div className='card text-center d-flex align-items-center'>
                  <Typography>Total Ventas y Compras por dia</Typography>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: totalVentasDia, label: 'Ventas' },
                          { id: 1, value: totalComprasDia, label: 'Compras' },
                        ],
                      },
                    ]}
                    width={400}
                    height={200}
                  />
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
