import React, { Component } from "react";
import "./Education.css";
import axios from "axios";
import EducationTable from "./EducationTable.jsx";
import EducationForm from "./EducationForm.jsx";
import EducationFormEdit from "./EducationFormEdit.jsx";

class Education extends Component {
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
            <EducationFormEdit
              onEducationEditUpdate={this.handleEducationEditUpdate}
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}
            />
          ) : (
            // Calling Component and passing props
            <EducationTable
              onAddEducation={this.handleAddEducation}
              onEditEducation={this.handleEditEducation}
              data={this.props.data}
              back={this.props.back}
            />
          )
        ) : (
          // Calling Component and passing props
          <EducationForm
            onEducationSubmit={this.handleEducationSubmit}
            onFormClose={this.handleFormClose}
            onGenderChange={this.handleAddFormGenderChange}
          />
        )}
      </React.Fragment>
    );
  }
  // Func() to handle input data in role form edit page using axios (CRUD)
  handleEducationSubmit = (event) => {
    event.preventDefault();
    console.log("id", event.target[0].value, event.target[1].value);
    this.setState({ table: true });

    let body = {
      SchoolUniversity: event.target[0].value,
      Degree: event.target[1].value,
      Grade: event.target[2].value,
      PassingOfYear: event.target[3].value,
    };
    // axios lib of react
    axios
      .post(
        process.env.REACT_APP_API_URL +
          "/api/education/" +
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
  handleAddEducation = () => {
    console.log("clicked1");
    this.setState({ table: false });
  };
  handleEditEducation = (e) => {
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
  handleEducationEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    console.log("zero data", newInfo.target[0].value);
    let body = {
      SchoolUniversity: newInfo.target[0].value,
      Degree: newInfo.target[1].value,
      Grade: newInfo.target[2].value,
      PassingOfYear: newInfo.target[3].value,
    };
    console.log("update", body);
    // axios lib of react
    axios
      .put(
        process.env.REACT_APP_API_URL + "/api/education/" + info["_id"],
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

export default Education;
