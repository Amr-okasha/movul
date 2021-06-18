import React from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="color navbar navbar-expand-lg   mb-5 mt-0">
      <div className=" container-md ml-4" style={{ color: "white" }}>
        <h3>Movul</h3>
      </div>
      <div className="container-md ml-4">
        <NavLink to="/movies" style={{ color: "white  " }}>
          Movies
        </NavLink>
      </div>
      {/* <div className="container-md ml-4">
        <NavLink to="/customers">Customers</NavLink>
      </div>
      <div className="container-md ml-4">
        <NavLink to="/rentals"></NavLink>
      </div> */}
      {!user && (
        <>
          <div className="container-md ml-4">
            <NavLink to="/log-in" style={{ color: "white  " }}>
              Log-in
            </NavLink>
          </div>
          <div className="container-md ml-4">
            <NavLink to="/register" style={{ color: "white  " }}>
              Register
            </NavLink>
          </div>
        </>
      )}
      {user && (
        <>
          <div className="container-md ml-4">
            <NavLink to="/profile">{user.name}</NavLink>
          </div>
          <div className="container-md ml-4">
            <NavLink to="/log-out">Log-out</NavLink>
          </div>
        </>
      )}
    </nav>
  );
};

export default NavBar;
