import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import auth from "./services/authService"
import Movies from './component/movies';
import MovieForm from './component/movieForm';
import NavBar from './component/navBar';
import Customers from './component/customers';
import Rentals from './component/rentals';
import Register from './component/Rigester';
import LogIn from './component/logIn';
import LogOut from './component/LogOut';
import NotFound from './component/common/notFound';
import "react-toastify/dist/ReactToastify.css"
import './App.css';

import ProtectedRoutes from './component/ProtectedRoutes';



class App extends React.Component {
  state = {}
  componentDidMount() {
    const user = auth.getCurrentUser()
    this.setState({
      user
    })
  }
  render() {

    return (
      <>
        <ToastContainer />
        <NavBar className="mt-0 " user={this.state.user} />
        <div className="container">
          <Switch>
            {/* <Route path="/movies/:id" render={props => !this.state.user ? <Redirect to="/" /> : <MovieForm {...props} />} /> */}
            <ProtectedRoutes path="/movies/:id" component={MovieForm} />
            <Route path="/log-in" component={LogIn} />
            <Route path="/register" component={Register} />
            <Route path="/movies" render={(props) => <Movies {...props} user={this.state.user} />} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/log-out" component={LogOut} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="not-found" />

          </Switch>
        </div>
      </>
    );
  }
}

export default App;
