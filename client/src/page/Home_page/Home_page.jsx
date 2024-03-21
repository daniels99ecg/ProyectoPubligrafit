import Nav from '../../components/nav'


function Home_page() {

  return (
    <>
      <Nav />

      <div className='dashboard-app' >

        <div className='dashboard-content'>
          <div className='container'>
            <div className='card'>

              <div className='card-body'>

          
                <br />
                <div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img src="../img/roco.png" style={{width:650}}/>
                </div>
                <br />
                  <h3>
                    Una tradición familiar de treinta años le ha dado forma y alma a este proyecto que concibe el papel como lienzo y la tinta como ese trazo fino y delicado que constituye el arte litográfico. Rocco trasciende el rótulo de empresa y se convierte en un equipo sólido, comprometido con la calidad de sus productos y servicios.
                  </h3>
            
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}





export default Home_page
