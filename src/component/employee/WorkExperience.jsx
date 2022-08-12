import React, { Component } from "react";
import "./WorkExperience.css";
import axios from "axios";
import WorkExperienceTable from "./WorkExperienceTable.jsx";
import WorkExperienceForm from "./WorkExperienceForm.jsx";
import WorkExperienceFormEdit from "./WorkExperienceFormEdit.jsx";

class WorkExperience extends Component {
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
            <WorkExperienceFormEdit
              onWorkExperienceEditUpdate={this.handleWorkExperienceEditUpdate}
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}
            />
          ) : (
            // Calling Component and passing props
            <WorkExperienceTable
              onAddWorkExperience={this.handleAddWorkExperience}
              onEditWorkExperience={this.handleEditWorkExperience}
              data={this.props.data}
              back={this.props.back}
            />
          )
        ) : (
          // Calling Component and passing props
          <WorkExperienceForm
            onWorkExperienceSubmit={this.handleWorkExperienceSubmit}
            onFormClose={this.handleFormClose}
            onGenderChange={this.handleAddFormGenderChange}
          />
        )}
      </React.Fragment>
    );
  }
  // Func() to handle input data in role form edit page using axios (CRUD)
  handleWorkExperienceSubmit = (event) => {
    event.preventDefault();
    console.log("id", event.target[0].value, event.target[1].value);
    this.setState({ table: true });

    let body = {
      CompanyName: event.target[0].value,
      Designation: event.target[1].value,
      FromDate: event.target[2].value,
      ToDate: event.target[3].value,
    };
    // axios lib of react
    axios
      .post(
        process.env.REACT_APP_API_URL +
          "/api/experience/" +
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
  handleAddWorkExperience = () => {
    console.log("clicked1");
    this.setState({ table: false });
  };
  handleEditWorkExperience = (e) => {
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
  handleWorkExperienceEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    console.log("zero data", newInfo.target[0].value);
    let body = {
      CompanyName: newInfo.target[0].value,
      Designation: newInfo.target[1].value,
      FromDate: newInfo.target[2].value,
      ToDate: newInfo.target[3].value,
    };
    console.log("update", body);
    // axios lib of react
    axios
      .put(
        process.env.REACT_APP_API_URL + "/api/experience/" + info["_id"],
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

export default WorkExperience;
