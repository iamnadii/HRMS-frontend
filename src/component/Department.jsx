import React, { Component } from "react";
import "./Department.css";
import axios from "axios";
import DepartmentTable from "./DepartmentTable.jsx";
import DepartmentForm from "./DepartmentForm.jsx";
import DepartmentFormEdit from "./DepartmentFormEdit.jsx";

class Department extends Component {
  // Initialize state
  state = {
    table: true,
    editForm: false,
    editData: {},
  };

  render() {
    return (
      //  <Router>
      <React.Fragment>
        {this.state.table ? (
          this.state.editForm ? (
            // Calling Component and passing props
            <DepartmentFormEdit
              onDepartmentEditUpdate={this.handleDepartmentEditUpdate}
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}
            />
          ) : (
            // Calling Component and passing props
            <DepartmentTable
              onAddDepartment={this.handleAddDepartment}
              onEditDepartment={this.handleEditDepartment}
            />
          )
        ) : (
          // Calling Component and passing props
          <DepartmentForm
            onDepartmentSubmit={this.handleDepartmentSubmit}
            onFormClose={this.handleFormClose}
          />
        )}
      </React.Fragment>
    );
  }
  // Func() to handle input data in role form edit page using axios (CRUD)
  handleDepartmentSubmit = (event) => {
    event.preventDefault();
    console.log("id", event.target[0].value, event.target[1].value);
    this.setState({ table: true });

    let body = {
      CompanyID: event.target[0].value,
      DepartmentName: event.target[1].value,
    };
    // axios lib of react
    axios
      .post(process.env.REACT_APP_API_URL + "/api/department", body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        this.setState({ table: false });
        this.setState({ table: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Form Handling functions (also setting state inside it)
  handleAddDepartment = () => {
    console.log("clicked1");
    this.setState({ table: false });
  };
  handleEditDepartment = (e) => {
    console.log(e);
    console.log("clicked6");
    this.setState({ editForm: true });
    this.setState({ editData: e });
  };
  handleFormClose = () => {
    console.log("clicked1");
    this.setState({ table: true });
  };
  handleEditFormClose = () => {
    console.log("clicked5");
    this.setState({ editForm: false });
  };
  handleFormClose = () => {
    console.log("clicked1");
    this.setState({ table: true });
  };
  // Func() to send data to API using PUT
  handleDepartmentEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    let body = {
      CompanyID: newInfo.target[0].value,
      DepartmentName: newInfo.target[1].value,
    };
    console.log("update", body);
    // axios lib of react
    axios
      .put(
        process.env.REACT_APP_API_URL + "/api/department/" + info["_id"],
        body,
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        this.setState({ table: false });
        this.setState({ table: true });
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({ editForm: false });
  };
}

export default Department;
