/**
 * File Name: Header/index.js
 * Initializing Page Header Component
 * Author: Subrahmanyam Poluru
 */

const Header = () => {
  let loggedInUser = "Subrahmanyam Poluru";
  return (
    <header className="navbar sticky-top flex-md-nowrap p-2 shadow-lg">
      <a className="col-md-3 col-lg-2 me-0 px-3" title="To Do App" href="/">
        <img
          src="https://www.barracuda.com/assets/images/common/logo_barracuda_primary_strapline_reversed.svg"
          alt="Barracuda logo"
          height="50"
          width=""
        />
      </a>
      <button
        className="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <ul className="nav px-3">
        <li className="nav-item">
          <a
            className="nav-link text-white"
            href="/"
            title="Subrahmanyam Poluru"
          >
            <i className="fas fa-user-circle fa-2x"></i>{" "}
          </a>
        </li>
        <li className="nav-item text-nowrap">
          <a
            className="nav-link text-white mt-1"
            title="Subrahmanyam Poluru"
            href="/"
          >
            {loggedInUser}{" "}
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white mt-2" title="Settings" href="/">
            <i className="fas fa-ellipsis-v fa-lg"></i>
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
