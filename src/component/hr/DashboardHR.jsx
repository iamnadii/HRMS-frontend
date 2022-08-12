import React, { Component } from "react";
import "./DashboardHR.css";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from "react-router";
import { Redirect } from "react-router-dom";
import Role from "../Role.jsx";
import NavBar from "../NavBar.jsx";
import Position from "../Position.jsx";
import Department from "../Department.jsx";
import Company from "../Company.jsx";
import Employee from "../Employee.jsx";
import Salary from "../Salary.jsx";
import LeaveApplicationHR from "./LeaveApplicationHR.jsx";
import NotFound404 from "../NotFound404.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faChair,
  faBuilding,
  faUser,
  faDollarSign,
  faUserTie,
  faRupeeSign,
  faIndianRupeeSign,
  faFileAlt,
  faCity,
  faGlobeAmericas,
  faPlaceOfWorship,
  faArchway,
} from "@fortawesome/free-solid-svg-icons";

// Functions to call any component
function RoleHRF() {
  return <Role />;
}

function PositionF() {
  return <Position />;
}
function DepartmentF() {
  return <Department />;
}
function CompanyF() {
  return <Company />;
}
function EmployeeF() {
  return <Employee />;
}
function SalaryF() {
  return <Salary />;
}
function LeaveApplicationHRF() {
  return <LeaveApplicationHR />;
}

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
              <div id="main-title">
                <FontAwesomeIcon icon={faUserTie} className="sidebar-icon" />
                HR
              </div>
              <ul className="navbar-ul">
                <li className="list">
                  <Link to="/hr/employee">
                    <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
                    &nbsp;&nbsp;&nbsp;User
                  </Link>
                </li>
                <li>
                  <Link to="/hr/salary">
                    <FontAwesomeIcon
                      icon={faDollarSign}
                      className="sidebar-icon"
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;Salary
                  </Link>
                </li>
                {/* <li>
                  <Link to="/hr/leave-application-hr">
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      className="sidebar-icon"
                    />
                    &nbsp;&nbsp;&nbsp;Leave Application
                  </Link>
                </li> */}
                <li>
                  <Link to="/hr/company">
                    <FontAwesomeIcon icon={faCity} className="sidebar-icon" />
                    &nbsp;Company
                  </Link>
                </li>
                <li>
                  <Link to="/hr/role">
                    <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
                    &nbsp;Role
                  </Link>
                </li>
                <li>
                  <Link to="/hr/position">
                    <FontAwesomeIcon icon={faChair} className="sidebar-icon" />
                    &nbsp;&nbsp;&nbsp;Position
                  </Link>
                </li>
                <li>
                  <Link to="/hr/department">
                    <FontAwesomeIcon
                      icon={faBuilding}
                      className="sidebar-icon"
                    />
                    &nbsp;&nbsp;Department
                  </Link>
                </li>
                <li>
                  <Link to="/hr/leave-application-hr">
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      className="sidebar-icon"
                    />
                    &nbsp;&nbsp;&nbsp;Leave Application
                  </Link>
                </li>
              </ul>
            </div>
            <div id="main-area">
              <div id="sidebar-top-content" />
              {/* Switch pages according to path */}
              <Switch>
                <Route path="/hr/employee" component={EmployeeF} />
                <Route path="/hr/salary" exact component={SalaryF} />
                <Route path="/hr/company" exact component={CompanyF} />
                <Route path="/hr/role" component={RoleHRF} />
                <Route path="/hr/position" exact component={PositionF} />
                <Route path="/hr/department" exact component={DepartmentF} />
                <Route
                  path="/hr/leave-application-hr"
                  exact
                  component={LeaveApplicationHRF}
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
