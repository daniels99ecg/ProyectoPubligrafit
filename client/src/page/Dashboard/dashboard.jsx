import React, { useEffect, useState } from 'react';
import Nav from '../../components/nav';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Typography, Card, CardContent, Tab, Tabs } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart'; // Importa LineChart

import { getListarVentasDia, getListarVentasdelDia, getListarVentadelDia, getListarVentadelDiasemana } from '../../api/Rutas.Venta.api';
import { getListarCompraDia, getListarCompradelDia, getListarCompraseman } from '../../api/Compras/rutas.api';
import {getListarOrdendelDia, getListarOrdenDia, getListarOrdenMes,getListarOrdendelDiasemana} from '../../api/Ficha/Rutas.ficha'
import { MdAttachMoney } from "react-icons/md";
function Dashboard() {
  const [totalVentas, setTotalVentas] = useState(0);
  const [totalCompras, setTotalCompras] = useState(0);
  const [totalVentasDia, setTotalVentasDia] = useState(0);
  const [totalComprasDia, setTotalComprasDia] = useState([{
    mes:"",
    totalComprasMes:""
  }]);
  const [totalVentaDia, setTotalVentaDia] = useState([{
    mes:"",
    totalVentasMes:""
  }]);
  const [totalComprasDiasemana, setTotalComprasDiasemas] = useState([{
    diaSemana:"",
    totalComprasDia:""
  }]);
  const [totalVentasDiasemana, setTotalVentasDiasemas] = useState([{
    diaSemana:"",
    totalVentasDia:""
  }]);
  const [tabIndexDay, setTabIndexDay] = useState(0); // Estado para pestañas de días
  const [tabIndexMonth, setTabIndexMonth] = useState(0); // Estado para pestañas de meses

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseVentasDia = await getListarOrdendelDia();
        setTotalVentas(responseVentasDia.data);

        const responseVentasDelDia = await getListarOrdenDia();
        setTotalVentasDia(responseVentasDelDia.data);

        const responseCompras = await getListarCompraDia();
        setTotalCompras(responseCompras.data);

        const responseComprasDelDia = await getListarCompradelDia();
        setTotalComprasDia(responseComprasDelDia.data);

        const responseVentasDelMes = await getListarOrdenMes();
        setTotalVentaDia(responseVentasDelMes.data);

        const responseComprasSemana = await getListarCompraseman();
        setTotalComprasDiasemas(responseComprasSemana.data);

        const responseVentasSemana = await getListarOrdendelDiasemana();
        setTotalVentasDiasemas(responseVentasSemana.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  const ventasPercentage = totalVentas / (totalVentas + totalCompras) * 100;
  const comprasPercentage = totalCompras / (totalVentas + totalCompras) * 100;

  const formattedTotalCompras = totalCompras !== null ? totalCompras.toLocaleString() : 0;

  const formattedTotalVentas = totalVentas !== null ? totalVentas.toLocaleString() : 0;


  const handleChangeTabDay = (event, newValue) => {
    setTabIndexDay(newValue);
  };

  const handleChangeTabMonth = (event, newValue) => {
    setTabIndexMonth(newValue);
  };

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
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="40" fill="currentColor" className="bi bi-bag-check-fill" viewBox="0 0 16 16" >
  <path fillRule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zm-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"></path>
</svg>
                    <MdAttachMoney 
                          size={30}
                          color="green"
                          /> 
                      {formattedTotalVentas.toLocaleString('es-CO')}
                      <br />
                   <strong>Ventas</strong>   
                    </h4>
                  </div>
                </div>
              </div>

              {/* Compras Card */}
              <div className='col-md-6'>
                <div className='card mb-4'>
                  <div className='card-body'>
                 
                    <h4 className='text-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="40" fill="currentColor" className="bi bi-cart-check-fill" viewBox="0 0 16 16" style={{marginLeft: -50}}>
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z"></path>
                  </svg>
                    <MdAttachMoney 
                          size={30}
                          color="green"
                          /> 
                      {formattedTotalCompras.toLocaleString('es-CO')} 
                      <br />
                      <strong>Compras</strong>
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-6'>
              <Card>
                <CardContent>
        <Typography variant="h6" align="center">
        <br />
        <strong> Total Ventas y Compras </strong>
        </Typography>
        <br />
        <div className='card text-center d-flex align-items-center'>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ marginRight: '20px' }}>
          <span style={{ color: '#02b2af', fontWeight: 'bold' }}>Ventas: </span>
          <span>{ventasPercentage.toFixed(1) || 0}%</span>
        </div>
        <div>
          <span style={{ color: '#2e96ff', fontWeight: 'bold' }}>Compras: </span>
          <span>{comprasPercentage.toFixed(1)}%</span>
        </div>
      </div>
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.label}`,
                padAngle: 0.01,
                data: [
                  { id: 0, value: totalVentas, label: `${ventasPercentage.toFixed(1)}%`},
                  { id: 1, value: totalCompras, label: `${comprasPercentage.toFixed(1)}%`},
                ],
              },
            ]}
            width={400}
            height={350}
          />
          
        </div>
      </CardContent>
           </Card>    
</div>
              <div className='col-md-6'>
                <Card>
                  <CardContent>
                    <Tabs value={tabIndexMonth} onChange={handleChangeTabMonth} centered>
                      <Tab label="Compras" />
                      <Tab label="Ventas" />
                    </Tabs>
                    <Typography variant="h6" align="center">
                      <br />
                      <strong>{tabIndexMonth === 0 ? 'Total Compras por Mes' : 'Total Ventas por Mes'}</strong>
                      
                    </Typography>
                    <br />
                    <div className="card text-center">
      {/* Contenedor fluido para la gráfica */}
      <div className="d-flex justify-content-center">
        {/* Estilo inline para el contenedor de la gráfica, permitiendo un ancho máximo */}
        <div style={{ width: '100%', maxWidth: '620px', padding: '0 10px' }}>
        <div className=' d-flex align-items-center'>

                      <BarChart
                        xAxis={[{ scaleType: 'band', data: (tabIndexMonth === 0 ? totalComprasDia : totalVentaDia).map(data => data.mes) }]}
                        series={[
                          {
                            data: (tabIndexMonth === 0 ? totalComprasDia : totalVentaDia).map(data => (tabIndexMonth === 0 ? data.totalComprasMes : data.totalVentasMes)),
                            color: (tabIndexMonth === 0 ? "#2e96ff" : "#02b2af")
                          },
                        ]}
                        margin={{ left: 80 }}
                        width={620}
                        height={341}
                      />
                    </div>
                    </div>
                    </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              

              <div className='col-md-6'>
                <br />
                  <Card>
                    <CardContent>
                      <Tabs value={tabIndexDay} onChange={handleChangeTabDay} centered>
                        <Tab label="Compras" />
                        <Tab label="Ventas" />
                      </Tabs>
                      <Typography variant="h6" align="center">
                      <br />
                        <strong>{tabIndexDay === 0 ? 'Total Compras por Día' : 'Total Ventas por Día'}</strong>
                        
                      </Typography>
                      <br />
                      <div className="card text-center">
      {/* Contenedor fluido para la gráfica */}
      <div className="d-flex justify-content-center">
        {/* Estilo inline para el contenedor de la gráfica, permitiendo un ancho máximo */}
        <div style={{ width: '100%', maxWidth: '620px', padding: '0 10px' }}>
        <div className=' d-flex align-items-center'>
                        <BarChart
                          xAxis={[{ scaleType: 'band', data: (tabIndexDay === 0 ? totalComprasDiasemana : totalVentasDiasemana).map(data => data.diaSemana) }]}
                          series={[
                            {
                              data: (tabIndexDay === 0 ? totalComprasDiasemana : totalVentasDiasemana).map(data => (tabIndexDay === 0 ? data.totalComprasDia : data.totalVentasDia)),
                              color: (tabIndexDay === 0 ? "#2e96ff" : "#02b2af")
                            },
                          ]}
                          margin={{ left: 90 }}
                          width={600}
                          height={292}
                        />
                      </div>
                      </div>
                      </div>
                      </div>
                    </CardContent>
                  </Card>
              
              </div>


              <div className='col-md-6'>
                <br />
  <Card>
    <CardContent>
      <Typography variant="h6" align="center">
        <br />
        <strong>Total Ventas y Compras por Mes</strong>
      </Typography>
      <br />
      <div className="card text-center">
      {/* Contenedor fluido para la gráfica */}
      <div className="d-flex justify-content-center">
        {/* Estilo inline para el contenedor de la gráfica, permitiendo un ancho máximo */}
        <div style={{ width: '100%', maxWidth: '620px', padding: '0 10px' }}>
        <div className=' d-flex align-items-center'>      <LineChart
  xAxis={[{ scaleType: 'band', data: totalComprasDia.map(data => data.mes) }]}
  series={[
    {
      data: (totalComprasDia).map(data => ( data.totalComprasMes )),
      color: "#2e96ff",
      label: "Compras"
    },
    {
      data: (totalVentaDia).map(data => ( data.totalVentasMes )),
      color: "#02b2af",
      label: "Ventas"
    }
    
  ]}
  margin={{ left: 99 }}
  width={620}
  height={341}
/>


      </div>
      </div>
      </div>
      </div>
    </CardContent>
  </Card>
</div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
