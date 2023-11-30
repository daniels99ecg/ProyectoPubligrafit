import React from 'react';
import Nav from '../../components/nav';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect } from 'react';

function Dashboard() {
  return (
    <>
      <Nav />
      <div className='dashboard-app'>
        <div className='dashboard-content'>
          <div className='container'>
            <div className='card'>
              <div className='card-body'>
                <div className="card-header">
                  <h1>Dashboard</h1>
                </div>

                <div className='row'>
                  {/* Ventas Card */}
                  <div className='col-md-6'>
                    <div className='card mb-4' style={{ height: '100px' }}>
                      <div className='card-body'>
                        <h4 className='text-center'>
                          $1.000.000
                          <br />
                          ventas
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Compras Card */}
                  <div className='col-md-6'>
                    <div className='card mb-4' style={{ height: '100px' }}>
                      <div className='card-body'>
                        <h4 className='text-center'>
                          $500.000
                          <br /> compras
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bar Chart Card */}
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='card'>
                      <BarChart 
                      
                        xAxis={[
                          {
                            
                            id: 'barCategories',
                            data: ['bar A', 'bar B', 'bar C'],
                            scaleType: 'band',
                          },
                        ]}
                        series={[
                          {
                            data: [2, 5, 3],
                          },
                        ]}
                        width={800}
                        height={300}
                        orientation="horizontal"
                      />
                    </div>
                  </div>
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
