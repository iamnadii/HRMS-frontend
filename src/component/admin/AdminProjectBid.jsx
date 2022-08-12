import React, { Component } from "react";
import "./AdminProjectBid.css";
import axios from "axios";
import AdminProjectBidTable from "./AdminProjectBidTable.jsx";
import AdminProjectBidForm from "./AdminProjectBidForm.jsx";
import AdminProjectBidFormEdit from "./AdminProjectBidFormEdit.jsx";

class AdminProjectBid extends Component {
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
            <AdminProjectBidFormEdit
              onProjectBidEditUpdate={this.handleProjectBidEditUpdate}
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}
            />
          ) : (
            // Calling Component and passing props
            <AdminProjectBidTable
              onAddProjectBid={this.handleAddProjectBid}
              onEditProjectBid={this.handleEditProjectBid}
            />
          )
        ) : (
          // Calling Component and passing props
          <AdminProjectBidForm
            onProjectBidSubmit={this.handleProjectBidSubmit}
            onFormClose={this.handleFormClose}
          />
        )}
      </React.Fragment>
    );
  }
  // Func() to handle input data in role form edit page using axios (CRUD)
  handleProjectBidSubmit = (event) => {
    event.preventDefault();
    console.log("id", event.target[0].value, event.target[1].value);
    this.setState({ table: true });

    let body = {
      ProjectTitle: event.target[0].value,
      ProjectURL: event.target[1].value,
      ProjectDesc: event.target[2].value,
      Portal_ID: event.target[3].value,
      EstimatedTime: event.target[4].value,
      EstimatedCost: event.target[5].value,
      ResourceID: event.target[6].value,
      Status: event.target[7].value,
      Remark: event.target[8].value,
    };
    // axios lib of react
    axios
      .post(process.env.REACT_APP_API_URL + "/api/admin/project/", body, {
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
  handleAddProjectBid = () => {
    console.log("clicked1");
    this.setState({ table: false });
  };
  handleEditProjectBid = (e) => {
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
  handleProjectBidEditUpdate = (info, editInfo) => {
    let body = {
      ProjectTitle: editInfo.target[0].value,
      ProjectURL: editInfo.target[1].value,
      ProjectDesc: editInfo.target[2].value,
      Portal_ID: editInfo.target[3].value,
      EstimatedTime: editInfo.target[4].value,
      EstimatedCost: editInfo.target[5].value,
      ResourceID: editInfo.target[6].value,
      Status: editInfo.target[7].value,
      Remark: editInfo.target[8].value,
    };
    console.log("update", body);
    // axios lib of react
    axios
      .put(
        process.env.REACT_APP_API_URL + "/api/admin/project/" + info["_id"],
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

export default AdminProjectBid;
