import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import auth from "../services/authService";

const ProtectedRoutes = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        console.log(props);
        return !auth.getCurrentUser() ? (
          <Redirect
            to={{
              pathname: "/log-in",
              state: { from: props.location },
            }}
          />
        ) : Component ? (
          <Component {...props} />
        ) : (
          render(props)
        );
      }}
    />
  );
};

export default ProtectedRoutes;
