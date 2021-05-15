import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom"
import Movies from './component/movies';
import NavBar from './component/navBar';
import Customers from './component/customers';
import Rentals from './component/rentals';
import NotFound from './component/common/notFound';
import MovieForm from './component/movieForm';
import LogIn from './component/logIn';
import './App.css';
import Register from './component/Rigester';




function App() {
  return (
    <>
      <NavBar className="mt-0" />
      <div className="container">
        <Switch>
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/log-in" component={LogIn} />
          <Route path="/register" component={Register} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="not-found" />

        </Switch>
      </div>
    </>
  );
}

export default App;
