import React, { Component } from "react";
import "./DashboardAdmin.css";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from "react-router";
import { Redirect } from "react-router-dom";

import Role from "../Role.jsx";
import NavBar from "../NavBar.jsx";
import RoleForm from "../RoleForm.jsx";
import Position from "../Position.jsx";
import Department from "../Department.jsx";
import AdminPortal from "./AdminPortal.jsx";
import AdminProjectBid from "./AdminProjectBid.jsx";
import NotFound404 from "../NotFound404.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsersCog,
  faUsers,
  faChair,
  faBuilding,
  faDollarSign,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";

// Functions to call any component
function RoleAdminF() {
  return <Role />;
}
function RoleFormF() {
  return <RoleForm />;
}

function PositionF() {
  return <Position />;
}
function DepartmentF() {
  return <Department />;
}
function AdminPortalF() {
  return <AdminPortal />;
}
function AdminProjectBidF() {
  return <AdminProjectBid />;
}

class DashboardAdmin extends Component {
  state = {
    redirect: true,
    checked: true,
  };
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
                <FontAwesomeIcon icon={faUsersCog} className="sidebar-icon" />
                Admin
              </div>
              <ul className="navbar-ul">
                <li>
                  <Link to="/admin/role">
                    <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
                    Role
                  </Link>
                </li>
                <li>
                  <Link to="/admin/position">
                    <FontAwesomeIcon icon={faChair} className="sidebar-icon" />
                    &nbsp;&nbsp;Position
                  </Link>
                </li>
                <li>
                  <Link to="/admin/department">
                    <FontAwesomeIcon
                      icon={faBuilding}
                      className="sidebar-icon"
                    />
                    &nbsp;&nbsp;Department
                  </Link>
                </li>
                <li>
                  <Link to="/admin/project-bid">
                    <FontAwesomeIcon
                      icon={faDollarSign}
                      className="sidebar-icon"
                    />
                    &nbsp;&nbsp;&nbsp;Project Bidding
                  </Link>
                </li>
                <li>
                  <Link to="/admin/portal-master">
                    <FontAwesomeIcon icon={faTasks} className="sidebar-icon" />
                    &nbsp;Portal Master
                  </Link>
                </li>
              </ul>
            </div>
            <div id="main-area">
              <div id="sidebar-top-content" />
              {/* Switch pages according to path */}
              <Switch>
                <Route exact path="/admin/role" component={RoleAdminF} />
                <Route path="/admin/position" exact component={PositionF} />
                <Route path="/admin/department" exact component={DepartmentF} />
                <Route
                  path="/admin/portal-master"
                  exact
                  component={AdminPortalF}
                />
                <Route
                  path="/admin/project-bid"
                  exact
                  component={AdminProjectBidF}
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

export default DashboardAdmin;
