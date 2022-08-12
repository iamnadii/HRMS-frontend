import React, { Component } from "react";
import "./Login.css";
import Logo from "../img/logo.png";
import { css } from "@emotion/core";
import { ScaleLoader } from "react-spinners";

// Class Base Component
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Login extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div id="main-outer-div">
            <div id="logo-div">
              <img id="logo-img" src={Logo} alt="" />
            </div>
            <div id="title-div">
              <h4 className="title">Sign in</h4>
            </div>

            <div id="outer-login-form-div">
              {/* Form to take action upon input */}
              <form action="" method="" onSubmit={this.props.onSubmit}>
                <input
                  className="login-form-input"
                  type="text"
                  placeholder="Email"
                  required="required"
                  name="Username"
                />

                <input
                  className="login-form-input"
                  type="password"
                  placeholder="Password"
                  required="required"
                />

                <input
                  className="login-form-input"
                  type="submit"
                  value="Sign in"
                  id="submitBtn"
                />

                {!this.props.pass ? (
                  <p className="alert">Invalid UserName or Password</p>
                ) : (
                  ""
                )}
              </form>
            </div>

            <div className="loading">
              <ScaleLoader
                css={override}
                sizeUnit={"px"}
                size={150}
                color={"#0098f3"}
                loading={this.props.loading}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
