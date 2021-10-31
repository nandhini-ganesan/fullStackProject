import React, { Component } from "react";
import NavBar from "./component/navbar";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Customers from "./component/customers";
import Rentals from "./component/rentals";
import Movies from "./component/movies";
import NotFound from "./component/notFound";
import MovieForm from "./component/movieForm";
import LoginForm from "./component/loginForm";
import RegisterForm from "./component/registerForm";
import Logout from "./component/logout";
import { getCurrentUser } from "./services/authService";
import "./App.css";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }
  render() {
    return (
      <div>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <div className="content">
          <Switch>
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route
              path="/movies/:id"
              render={(props) => {
                console.log(props.location.pathname);
                console.log(this.state.user);
                if (!this.state.user)
                  return (
                    <Redirect
                      to={{
                        pathname: "/login",
                        state: { from: props.location.pathname },
                      }}
                    />
                  );
                return <MovieForm {...props} />;
              }}
            />
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={this.state.user} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" to="/movies" />
            <Redirect to="not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
