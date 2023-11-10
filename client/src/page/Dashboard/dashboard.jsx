
import Nav from '../../components/nav'
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
function dashboard(){
    return(
        <>
        <Nav/>
        <div className='dashboard-app'>
        <div className='dashboard-content'>
            <div className='container'>
                <div className='card'>
                <div className='card-body'>

                <div className="card-header"><h1>Dashboard</h1></div>
                <div className='row'>
                  <div className='col-md-6'>

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
                    width={500}
                    height={300}
    />
    </div>
    <div className='col-md-6 p-5'>

        <PieChart
  series={[
    {
      data: [
        { id: 0, value: 10, label: 'series A' },
        { id: 1, value: 15, label: 'series B' },
        { id: 2, value: 20, label: 'series C' },
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
        </div>
        </>
    )

}

export default dashboard