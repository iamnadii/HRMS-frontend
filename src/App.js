import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import jwt from "jsonwebtoken";

import Login from "./component/Login.jsx";
import DashboardAdmin from "./component/admin/DashboardAdmin.jsx";
import DashboardHR from "./component/hr/DashboardHR.jsx";
import DashboardEmployee from "./component/employee/DashboardEmployee.jsx";
import { Switch } from "react-router";

import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import history from "./history.js";

class App extends Component {
  // Initialize state with particular values
  state = {
    data: {},
    loading: false,
    pass: true,
    isLogin: false,
    firstTimeAlert: true,
  };
  componentDidMount() {
    // Updating the state against input data
    this.setState({
      data: {
        _id: localStorage.getItem("_id") || "",
        Account: localStorage.getItem("Account") || "",
        Name: localStorage.getItem("Name") || "",
      },
      isLogin: localStorage.getItem("isLogin") == "true",
    });
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/login"
            render={(props) =>
              // Comparing Acc no with data in state and then redirect it according to roles.
              this.state.data["Account"] == 1 ? (
                <Redirect to="/admin" />
              ) : this.state.data["Account"] == 2 ? (
                <Redirect to="/hr" />
              ) : this.state.data["Account"] == 3 ? (
                <Redirect to="/employee" />
              ) : (
                <Login
                  onSubmit={this.handleSubmit}
                  loading={this.state.loading}
                  pass={this.state.pass}
                />
              )
            }
          />
          <Route
            path="/admin"
            render={(props) =>
              // Comparing the condition and then redirect accordingly
              this.state.data["Account"] == 1 ? (
                <DashboardAdmin
                  data={this.state.data}
                  onLogout={this.handleLogout}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/hr"
            render={(props) =>
              // Comparing the condition and then redirect accordingly
              this.state.data["Account"] == 2 ? (
                <DashboardHR
                  data={this.state.data}
                  onLogout={this.handleLogout}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/employee"
            render={(props) =>
              // Comparing the condition and then redirect accordingly
              this.state.data["Account"] == 3 ? (
                <DashboardEmployee
                  data={this.state.data}
                  onLogout={this.handleLogout}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />

          <Redirect to="/login" />
        </Switch>
      </Router>
    );
  }
  // Func for handling submit
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ pass: true });
    this.setState({ loading: true });
    // Passing parameters to login func()
    this.login(event.target[0].value, event.target[1].value);
    event.target.reset();
  };
  // Func for handling logout
  handleLogout = (event) => {
    console.log("logout");
    localStorage.clear();
    this.componentDidMount();
  };
  // Func to send input value to DB
  login = (id, pass) => {
    let bodyLogin = {
      email: id,
      password: pass,
    };
    // Using axios library for API CRUD
    axios
      .post(process.env.REACT_APP_API_URL + "/api/login", bodyLogin)
      .then((res) => {
        console.log(jwt.decode(res.data));
        var decodedData = jwt.decode(res.data);
        localStorage.setItem("token", res.data);
        // Check res and pass values
        if (
          (res == undefined ||
            res == null ||
            decodedData.Account == undefined ||
            decodedData.Account == null) &&
          !(
            decodedData.Account == 1 ||
            decodedData.Account == 2 ||
            decodedData.Account == 3
          )
        ) {
          this.setState({ pass: false });
          this.setState({ loading: false });
        } else {
          if (decodedData.Account == 1) {
            this.setState({ pass: true });

            this.setState({ loading: false });

            this.setState({ isLogin: true });
            localStorage.setItem("isLogin", true);

            localStorage.setItem("Account", 1);
            localStorage.setItem("_id", decodedData["_id"]);
            localStorage.setItem(
              "Name",
              decodedData["FirstName"] + " " + decodedData["LastName"]
            );
            this.componentDidMount();
            history.push("#/admin/role");
          }
          if (decodedData.Account == 2) {
            this.setState({ pass: true });
            this.setState({ loading: false });
            this.setState({ isLogin: true });
            localStorage.setItem("isLogin", true);

            localStorage.setItem("Account", 2);
            localStorage.setItem("_id", decodedData["_id"]);
            localStorage.setItem(
              "Name",
              decodedData["FirstName"] + " " + decodedData["LastName"]
            );
            this.componentDidMount();

            history.push("#/hr/employee");
          }
          if (decodedData.Account == 3) {
            this.setState({ pass: true });
            this.setState({ loading: false });
            this.setState({ isLogin: true });
            localStorage.setItem("isLogin", true);

            localStorage.setItem("Account", 3);
            localStorage.setItem("_id", decodedData["_id"]);
            localStorage.setItem(
              "Name",
              decodedData["FirstName"] + " " + decodedData["LastName"]
            );
            this.componentDidMount();

            history.push("#/employee/" + decodedData._id + "/personal-info");
          }
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ pass: false });
        this.setState({ loading: false });
      });
  };
}

export default App;
