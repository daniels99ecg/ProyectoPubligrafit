import React from 'react';
import Nav from '../../components/nav';

function Profile() {


  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <>
      <Nav />

      <div className="dashboard-app">
        <div className="dashboard-content">
          <div className="container">
            <div className="card">
              <div className="card-body">
                <div className="card-header">
                  <h1>Perfil</h1>
                </div>
                <br />

                <div>
                  <label>Nombre:</label>
                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    value={user ? user.nombre : 'No disponible'}
                    readOnly
                  />
                </div>

                <div>
                  <label>Email:</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    value={user ? user.email : 'No disponible'}
                    readOnly
                  />
                </div>
                <div>
                  <label>Rol:</label>
                  <input
                    type="text"
                    name="rol"
                    className="form-control"
                    value={user ? user.rol : 'No disponible'}
                    readOnly
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

export default Profile;
