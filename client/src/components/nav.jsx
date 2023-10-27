import '../css/style.css'



function Nav(){
 
    return(
        <>
    
          <aside className="sidebar" id="header">

<div className="sidebar-start">

<div className="sidebar-start">
        <div className="sidebar-head">
            <a href="/dashboard" className="logo-wrapper" title="Home">
                <span className="sr-only">Home</span>
      <img srcSet="/img/PubliGrafit2.png" className='logonav'/>  <div className="logo-text">
                    <span className="logo-title ml-2">PubliGrafit</span>
                  
                </div>

            </a>
            <button className="sidebar-toggle transparent-btn" title="Menu" type="button">
                <span className="sr-only">Toggle menu</span>
                <span className="icon menu-toggle" aria-hidden="true"></span>
            </button>
        </div>
        <div className="sidebar-body">
            <ul className="sidebar-body-menu">
                <li>
                <a href="/dashboard">
                <span><svg xmlns="http://www.w3.org/2000/svg" width="40" height="20" fill="currentColor" className="bi bi-laptop" viewBox="0 0 16 16">
                <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5h11zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5z"/>
              </svg></span>Dashboard</a>
              
                </li>
                <li>
                    <a className="" href="/usuario">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="22" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                  </svg>Usuarios</a>
                   
              </li>
              
                <li>
                    <a className="show-cat" href="/rol">
                    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="25" fill="currentColor" className="bi bi-person-fill-gear" viewBox="0 0 16 16" >
                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Zm9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"/>
                  </svg>Roles</a>
                   
              </li>
            
                <li>
                    <a className="show-cat" href="/insumos">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="20" fill="currentColor" className="bi bi-box-seam-fill" viewBox="0 0 16 16" >
                        <path fillRule="evenodd" d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.01-.003.268-.108a.75.75 0 0 1 .558 0l.269.108.01.003 6.97 2.789ZM10.404 2 4.25 4.461 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339L8 5.961 5.596 5l6.154-2.461L10.404 2Z"/>
                      </svg>Insumos
                      
                    </a>
                   
                </li>
                <li>
                    <a className="show-cat" href="/ficha_tecnica">
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="20" fill="currentColor" className="bi bi-clipboard2-fill" viewBox="0 0 16 16" >
                    <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z"/>
                    <path d="M3.5 1h.585A1.498 1.498 0 0 0 4 1.5V2a1.5 1.5 0 0 0 1.5 1.5h5A1.5 1.5 0 0 0 12 2v-.5c0-.175-.03-.344-.085-.5h.585A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1Z"/>
                  </svg>Ficha Técnica
                       
                    </a>
                    
              </li>
                <li>
                    <a className="show-cat" href="/producto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="20" fill="currentColor" className="bi bi-box2-fill" viewBox="0 0 16 16" >
                    <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4h-8.5ZM15 4.667V5H1v-.333L1.5 4h6V1h1v3h6l.5.667Z"/>
                </svg> Productos
                     
                  </a>
                  
              </li>
                    <a className="show-cat-btn" href="/compras">
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="22" fill="currentColor" className="bi bi-cart-check-fill" viewBox="0 0 16 16" >
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z"/>
                  </svg> Compras
                     
                  </a>
                
           
                  <a className="show-cat" href="/ventas">
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="20" fill="currentColor" className="bi bi-bag-check-fill" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zm-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
</svg>Ventas
                    
                </a>
               
            
                  <a className="show-cat" href="/clientes">
                  <svg xmlns="http://www.w3.org/2000/svg" width="42" height="25" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
</svg> Clientes</a>

                    <span className="msg-counter">7</span>
                
            </ul>
            <span className="system-menu__title">system</span>
            <ul className="sidebar-body-menu">                
                
            <a className="show-cat-btn" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="20" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
  <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
</svg>Configuración</a>
              <span className="category__btn transparent-btn" title="Open list">
                  <span className="sr-only">Open list</span>
                  <span className="icon arrow-down" aria-hidden="true"></span>
              </span>
            </ul>
        </div>
    </div>
    <div className="sidebar-footer">
        <a href="##" className="sidebar-user">
            <span className="sidebar-user-img">
                <picture><source srcSet="../img/avatar/avatar-illustrated-01.webp" type="image/webp"/><img srcSet="../img/avatar/avatar-illustrated-01.png" alt="User name"/></picture>
            </span>
            <div className="sidebar-user-info">
                <span className="sidebar-user__title">Nafisa Sh.</span>
                <span className="sidebar-user__subtitle">Support manager</span>
            </div>
        </a>
    </div>
</div>
</aside>
        </>
    )
 }

 export default Nav