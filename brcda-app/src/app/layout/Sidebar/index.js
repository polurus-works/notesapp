/**
 * File Name: Sidebar/index.js
 * Initializing Sidebar Component - Updating links to other routing pages
 * Author: Subrahmanyam Poluru
 */

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-white sidebar collapse"
    >
      <div className="position-sticky pt-5">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink
              to="/"
              exact={true}
              className="nav-link"
              activeClassName="current"
            >
              <i className="far fa-sticky-note"></i> Notes
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/calendar"
              className="nav-link"
              activeClassName="current"
            >
              <i className="far fa-calendar-alt"></i>
              Calendar View{" "}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/dashboard"
              className="nav-link"
              activeClassName="current"
            >
              <i className="far fa-file"></i>
              Notes Pro View
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
