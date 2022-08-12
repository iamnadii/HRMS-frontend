import React, { Component } from "react";
import "./LeaveApplicationHR.css";
import axios from "axios";
import LeaveApplicationHRTable from "./LeaveApplicationHRTable.jsx";
import LeaveApplicationHRFormEdit from "./LeaveApplicationHRFormEdit.jsx";

class LeaveApplicationHR extends Component {
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
            <LeaveApplicationHRFormEdit
              onLeaveApplicationHREditUpdate={
                this.handleLeaveApplicationHREditUpdate
              }
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}
            />
          ) : (
            // Calling Component and passing props
            <LeaveApplicationHRTable
              onAddLeaveApplicationHR={this.handleAddLeaveApplicationHR}
              onEditLeaveApplicationHR={this.handleEditLeaveApplicationHR}
              data={this.props.data}
            />
          )
        ) : (
          <div></div>
        )}
      </React.Fragment>
    );
  }
  // Func() to handle input data in role form edit page using axios (CRUD)
  handleLeaveApplicationHRSubmit = (event) => {
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
          "/api/leave/hr/" +
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
  handleAddLeaveApplicationHR = () => {
    console.log("clicked1");
    this.setState({ table: false });
  };
  handleEditLeaveApplicationHR = (e) => {
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
  handleLeaveApplicationHREditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    console.log("zero data", newInfo.target[0].value);
    let body = {
      Status: newInfo.target[4].value,
    };
    console.log("update", body);
    // axios lib of react
    axios
      .put(
        process.env.REACT_APP_API_URL + "/api/leave/hr/" + info["_id"],
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

export default LeaveApplicationHR;
