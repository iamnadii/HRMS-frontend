import React, { Component } from "react";
import "./DashboardEmployee.css";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from "react-router";
import { Redirect } from "react-router-dom";
import NavBar from "../NavBar.jsx";
import PersonalInfo from "./PersonalInfo.jsx";
import Education from "./Education.jsx";
import FamilyInfo from "./FamilyInfo.jsx";
import WorkExperience from "./WorkExperience.jsx";
import LeaveApplicationEmp from "./LeaveApplicationEmp.jsx";
import NotFound404 from "../NotFound404.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUser,
  faFileAlt,
  faUniversity,
  faBriefcase,
  faMale,
} from "@fortawesome/free-solid-svg-icons";

class DashboardHR extends Component {
  state = {
    redirect: true,
    checked: true,
  };
  // Func to handle either diplay sidebar or not
  handleChange = (checked) => {
    console.log("switch");
    if (this.state.checked == true) {
      document.getElementById("sidebar").setAttribute("class", "display-none");
    } else {
      document.getElementById("sidebar").setAttribute("class", "display-block");
    }
    this.setState({ checked });
  };

  render() {
    return (
      <Router>
        <div id="outer-main-div">
          <div id="outer-nav">
            <NavBar
              loginInfo={this.props.data}
              checked={this.state.checked}
              handleChange={this.handleChange}
              onLogout={this.props.onLogout}
            />
          </div>

          <div id="main-non-nav">
            <div id="sidebar">
              <div id="sidebar-top-content" />
              <div id="main-title" className="main-title-employee">
                <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
                Employee
              </div>
              <ul className="navbar-ul">
                <li>
                  <Link
                    to={
                      "/employee/" + this.props.data["_id"] + "/personal-info"
                    }
                    className="menu"
                  >
                    <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
                    &nbsp;Personal Information
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/employee/" + this.props.data["_id"] + "/education"}
                    className="menu"
                  >
                    <FontAwesomeIcon
                      icon={faUniversity}
                      className="sidebar-icon"
                    />
                    Education
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/employee/" + this.props.data["_id"] + "/family-info"}
                    className="menu"
                  >
                    <FontAwesomeIcon icon={faMale} className="sidebar-icon" />
                    &nbsp;&nbsp;&nbsp;Dependents
                  </Link>
                </li>
                <li>
                  <Link
                    to={
                      "/employee/" + this.props.data["_id"] + "/work-experience"
                    }
                    className="menu"
                  >
                    <FontAwesomeIcon
                      icon={faBriefcase}
                      className="sidebar-icon"
                    />
                    WorkExperience
                  </Link>
                </li>
                <li>
                  <Link
                    to={
                      "/employee/" +
                      this.props.data["_id"] +
                      "/leave-application-emp"
                    }
                    className="menu"
                  >
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      className="sidebar-icon"
                    />
                    &nbsp;Leave Application
                  </Link>
                </li>
              </ul>
            </div>
            <div id="main-area">
              <div id="sidebar-top-content" />
              {/* Switch pages according to path */}
              <Switch>
                <Route
                  exact
                  path="/employee/:id/personal-info"
                  render={(props) => (
                    <PersonalInfo data={this.props.data} back={false} />
                  )}
                />
                <Route
                  exact
                  path="/employee/:id/education"
                  render={(props) => (
                    <Education data={this.props.data} back={false} />
                  )}
                />
                <Route
                  exact
                  path="/employee/:id/family-info"
                  render={(props) => (
                    <FamilyInfo data={this.props.data} back={false} />
                  )}
                />
                <Route
                  exact
                  path="/employee/:id/work-experience"
                  render={(props) => (
                    <WorkExperience data={this.props.data} back={false} />
                  )}
                />
                <Route
                  exact
                  path="/employee/:id/leave-application-emp"
                  render={(props) => (
                    <LeaveApplicationEmp data={this.props.data} />
                  )}
                />
                <Route render={() => <NotFound404 />} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default DashboardHR;
