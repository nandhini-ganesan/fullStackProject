import React from "react";
import Joi from "joi-browser";
import { Redirect } from "react-router";
import Form from "./common/form";
import { loginUser, getCurrentUser } from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().required().label("UserName"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      await loginUser(this.state.data.username, this.state.data.password);
      const { state } = this.props.location;
      console.log(state);
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (getCurrentUser()) return <Redirect to="/"></Redirect>;
    return (
      <div>
        <h1 className="center">Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "text")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
