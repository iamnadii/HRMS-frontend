import React, { Component } from "react";
import "./NavBar.css";
import { Navbar, Nav } from "react-bootstrap";
import Logo from "../img/logo.png";
import Switch from "react-switch";

class NavBar extends Component {
  render() {
    return (
      <div>
        {/* Using Bootstrap Component */}
        <Navbar
          bg="light"
          expand="lg"
          className="nav-bar"
          fixed="top"
          id="main-nav"
        >
          <Navbar.Brand id="logo-anchor">
            <img id="nav-bar-logo" src={Logo} alt="" />

            <span id="toggle-switch">
              <Switch
                checked={this.props.checked}
                onChange={this.props.handleChange}
                onColor="#0098f3"
                onHandleColor="#ffffff"
                handleDiameter={10}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={17}
                width={35}
                className="react-switch"
                id="material-switch"
              />
            </span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="logout-navbar-nav">
            <Nav className="ml-auto">
              <a onClick={this.props.onClick} className="navbar-right-content">
                {this.props.loginInfo["Name"]}
              </a>
              <a
                onClick={this.props.onLogout}
                style={{ cursor: "pointer" }}
                className="navbar-right-content"
              >
                Log Out
              </a>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
