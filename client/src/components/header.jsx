import '../css/style.css'


function Header(){
    return(
        <>
<nav className="main-nav--bg">



<div className="container main-nav">
    <div className="main-nav-start">
      
    </div>
    <div className="main-nav-end">
      <button className="sidebar-toggle transparent-btn" title="Menu" type="button">
        <span className="sr-only">Toggle menu</span>
        <span className="icon menu-toggle--gray" aria-hidden="true"></span>
      </button>
      <div className="lang-switcher-wrapper">
        <button className="lang-switcher transparent-btn" type="button">
          
          <i data-feather="chevron-down" aria-hidden="true"></i>
        </button>



        <ul className="lang-menu dropdown">
          <li><a href="##">English</a></li>
          <li><a href="##">French</a></li>
          <li><a href="##">Uzbek</a></li>
        </ul>
      </div>
      <button className="theme-switcher gray-circle-btn" type="button" title="Switch theme">
        <span className="sr-only">Switch theme</span>
        <i className="sun-icon" data-feather="sun" aria-hidden="true"></i>
        <i className="moon-icon" data-feather="moon" aria-hidden="true"></i>
      </button>
      <div className="notification-wrapper">
        <button className="gray-circle-btn dropdown-btn" title="To messages" type="button">
          <span className="sr-only">To messages</span>
          <span className="icon notification active" aria-hidden="true"></span>
        </button>
        <ul className="users-item-dropdown notification-dropdown dropdown">
          <li>
            <a href="##">
              <div className="notification-dropdown-icon info">
                <i data-feather="check"></i>
              </div>
              <div className="notification-dropdown-text">
                <span className="notification-dropdown__title">System just updated</span>
                <span className="notification-dropdown__subtitle">The system has been successfully upgraded. Read more
                  here.</span>
              </div>
            </a>
          </li>
          <li>
            <a href="##">
              <div className="notification-dropdown-icon danger">
                <i data-feather="info" aria-hidden="true"></i>
              </div>
              <div className="notification-dropdown-text">
                <span className="notification-dropdown__title">The cache is full!</span>
                <span className="notification-dropdown__subtitle">Unnecessary caches take up a lot of memory space and
                  interfere ...</span>
              </div>
            </a>
          </li>
          <li>
            <a href="##">
              <div className="notification-dropdown-icon info">
                <i data-feather="check" aria-hidden="true"></i>
              </div>
              <div className="notification-dropdown-text">
                <span className="notification-dropdown__title">New Subscriber here!</span>
                <span className="notification-dropdown__subtitle">A new subscriber has subscribed.</span>
              </div>
            </a>
          </li>
          <li>
            <a className="link-to-page" href="##">Go to Notifications page</a>
          </li>
        </ul>
      </div>

      <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a className="dropdown-item" href="#">Action</a></li>
    <li><a className="dropdown-item" href="#">Another action</a></li>
    <li><a className="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div>

      <div className="nav-user-wrapper">
        <button href="##" className="nav-user-btn dropdown-btn" title="My profile" type="button">
          <span className="sr-only">My profile</span>
          <span className="nav-user-img">
            <picture><source srcSet="../img/avatar/avatar-illustrated-02.webp" type="image/webp"/><img srcSet="../img/avatar/avatar-illustrated-02.png" alt="User name"/></picture>
          </span>
        </button>
        <ul className="users-item-dropdown nav-user-dropdown dropdown">

          <li><a href="##">
         <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fillRule="currentColor" className="bi bi-person-gear" viewBox="0 0 16 16">
  <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"/>
</svg>
          <span>Administrador</span>
        </a></li>
      


          <li><a href="##">
              <i data-feather="user" aria-hidden="true"></i>
              <span>Profile</span>
            </a></li>
          <li><a href="##">
              <i data-feather="settings" aria-hidden="true"></i>
              <span>Account settings</span>
            </a></li>
          <li><a className="danger" href="/logout">
              <i data-feather="log-out" aria-hidden="true"></i>
              <span>Log out</span>
            </a></li>
        </ul>
      </div>
    </div>
  </div>



  </nav>
        </>
    )
 }

 export default Header