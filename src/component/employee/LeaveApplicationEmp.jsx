import React, { Component } from "react";
import "./LeaveApplicationEmp.css";
import axios from "axios";
import LeaveApplicationEmpTable from "./LeaveApplicationEmpTable.jsx";
import LeaveApplicationEmpForm from "./LeaveApplicationEmpForm.jsx";
import LeaveApplicationEmpFormEdit from "./LeaveApplicationEmpFormEdit.jsx";

class LeaveApplicationEmp extends Component {
  // Initialize state
  state = {
    table: true,
    editForm: false,
    editData: {},
  };

  render() {
    return (
      <React.Fragment>
        {this.state.table ? (
          this.state.editForm ? (
            // Calling Component and passing props
            <LeaveApplicationEmpFormEdit
              onLeaveApplicationEmpEditUpdate={
                this.handleLeaveApplicationEmpEditUpdate
              }
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}
            />
          ) : (
            // Calling Component and passing props
            <LeaveApplicationEmpTable
              onAddLeaveApplicationEmp={this.handleAddLeaveApplicationEmp}
              onEditLeaveApplicationEmp={this.handleEditLeaveApplicationEmp}
              data={this.props.data}
            />
          )
        ) : (
          // Calling Component and passing props
          <LeaveApplicationEmpForm
            onLeaveApplicationEmpSubmit={this.handleLeaveApplicationEmpSubmit}
            onFormClose={this.handleFormClose}
            onGenderChange={this.handleAddFormGenderChange}
          />
        )}
      </React.Fragment>
    );
  }
  // Func() to handle input data in role form edit page using axios (CRUD)
  handleLeaveApplicationEmpSubmit = (event) => {
    event.preventDefault();
    console.log("id", event.target[0].value, event.target[1].value);
    this.setState({ table: true });

    let body = {
      Leavetype: event.target[0].value,
      FromDate: event.target[1].value,
      ToDate: event.target[2].value,
      Reasonforleave: event.target[3].value,
      Status: event.target[4].value,
    };
    // axios lib of react
    axios
      .post(
        process.env.REACT_APP_API_URL +
          "/api/leave/emp/" +
          this.props.data["_id"],
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
  };
  // Form Handling functions (also setting state inside it)
  handleAddLeaveApplicationEmp = () => {
    console.log("clicked1");
    this.setState({ table: false });
  };
  handleEditLeaveApplicationEmp = (e) => {
    console.log(e);
    console.log("clicked6");
    this.setState({ editForm: true });
    this.setState({ editData: e });
    this.setState({ editFormGender: e["Gender"] });
  };
  handleFormClose = () => {
    console.log("clicked1");
    this.setState({ table: true });
  };
  handleEditFormClose = () => {
    console.log("clicked5");
    this.setState({ editForm: false });
  };
  // Func() to send data to API using PUT
  handleLeaveApplicationEmpEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    console.log("zero data", newInfo.target[0].value);
    let body = {
      Leavetype: newInfo.target[0].value,
      FromDate: newInfo.target[1].value,
      ToDate: newInfo.target[2].value,
      Reasonforleave: newInfo.target[3].value,
      Status: newInfo.target[4].value,
    };
    console.log("update", body);
    // axios lib of react
    axios
      .put(
        process.env.REACT_APP_API_URL + "/api/leave/emp/" + info["_id"],
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

export default LeaveApplicationEmp;
