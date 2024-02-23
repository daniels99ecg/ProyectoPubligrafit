import React, { useEffect, useState } from 'react';
import Nav from '../../components/nav';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Typography, Card, CardContent, Tab, Tabs } from '@mui/material';
import { getListarVentasDia, getListarVentasdelDia, getListarVentadelDia, getListarVentadelDiasemana } from '../../api/Rutas.Venta.api';
import { getListarCompraDia, getListarCompradelDia, getListarCompraseman } from '../../api/Compras/rutas.api';

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
        const responseVentasDia = await getListarVentasDia();
        setTotalVentas(responseVentasDia.data);

        const responseVentasDelDia = await getListarVentasdelDia();
        setTotalVentasDia(responseVentasDelDia.data);

        const responseCompras = await getListarCompraDia();
        setTotalCompras(responseCompras.data);

        const responseComprasDelDia = await getListarCompradelDia();
        setTotalComprasDia(responseComprasDelDia.data);

        const responseVentasDelMes = await getListarVentadelDia();
        setTotalVentaDia(responseVentasDelMes.data);

        const responseComprasSemana = await getListarCompraseman();
        setTotalComprasDiasemas(responseComprasSemana.data);

        const responseVentasSemana = await getListarVentadelDiasemana();
        setTotalVentasDiasemas(responseVentasSemana.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  const ventasPercentage = totalVentas / (totalVentas + totalCompras) * 100;
  const comprasPercentage = totalCompras / (totalVentas + totalCompras) * 100;

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
              <Card>
                <CardContent>
        <Typography variant="h6" align="center">
          Total Ventas y Compras
        </Typography>
        <div className='card text-center d-flex align-items-center'>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ marginRight: '20px' }}>
          <span style={{ color: '#02b2af', fontWeight: 'bold' }}>Ventas:</span>
          <span>{ventasPercentage.toFixed(1)}%</span>
        </div>
        <div>
          <span style={{ color: '#2e96ff', fontWeight: 'bold' }}>Compras:</span>
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
                      {tabIndexMonth === 0 ? 'Total Compras por Mes' : 'Total Ventas por Mes'}
                    </Typography>
                    <div className='card text-center d-flex align-items-center'>
                      <BarChart
                        xAxis={[{ scaleType: 'band', data: (tabIndexMonth === 0 ? totalComprasDia : totalVentaDia).map(data => data.mes) }]}
                        series={[
                          {
                            data: (tabIndexMonth === 0 ? totalComprasDia : totalVentaDia).map(data => (tabIndexMonth === 0 ? data.totalComprasMes : data.totalVentasMes)),
                            color: (tabIndexMonth === 0 ? "#2e96ff" : "#02b2af")
                          },
                        ]}
                        margin={{ left: 99 }}
                        width={620}
                        height={341}
                      />
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
                        {tabIndexDay === 0 ? 'Total Compras por Día' : 'Total Ventas por Día'}
                      </Typography>
                      <div className='card text-center d-flex align-items-center'>
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
                          height={200}
                        />
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
