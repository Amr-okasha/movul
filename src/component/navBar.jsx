import React from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className=" navbar navbar-expand-lg navbar-light bg-light mb-5 mt-0">
      <div className="container-md ml-4">
        <h3>Vidly</h3>
      </div>
      <div className="container-md ml-4">
        <NavLink to="/movies">Movies</NavLink>
      </div>
      <div className="container-md ml-4">
        <NavLink to="/customers">Customers</NavLink>
      </div>
      <div className="container-md ml-4">
        <NavLink to="/rentals">Rentals</NavLink>
      </div>
      {!user && (
        <>
          <div className="container-md ml-4">
            <NavLink to="/log-in">Log-in</NavLink>
          </div>
          <div className="container-md ml-4">
            <NavLink to="/register">Register</NavLink>
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
