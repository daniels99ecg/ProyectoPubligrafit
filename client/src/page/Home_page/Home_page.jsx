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

                <div className="card-header">
                  <h1>Litografía Rocco Gráficas</h1>
                </div>
                <br />
                <div>
                  <h3>
                    Una tradición familiar de treinta años le ha dado forma y alma a este proyecto que concibe el papel como lienzo y la tinta como ese trazo fino y delicado que constituye el arte litográfico. Rocco trasciende el rótulo de empresa y se convierte en un equipo sólido, comprometido con la calidad de sus productos y servicios. La atención cuidadosa con cada uno de los clientes, la dotación tecnológica que optimiza los procesos y el manejo riguroso de los tiempos de entrega, le han merecido un amplio reconocimiento comercial en el campo de las artes gráficas impresas y han reafirmado su respeto por este oficio antiguo, necesario y, en cierta medida, mágico.
                  </h3>

                  <h3>Por medio de una asesoría integral que responde a sus necesidades específicas, su proyecto se materializará con excelentes acabados y una atención eficaz.</h3>
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
