import React, { Component } from "react";
import "./Company.css";
import axios from "axios";
import CompanyTable from "./CompanyTable.jsx";
import CompanyForm from "./CompanyForm.jsx";
import CompanyFormEdit from "./CompanyFormEdit.jsx";

class Company extends Component {
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
            <CompanyFormEdit
              onCompanyEditUpdate={this.handleCompanyEditUpdate}
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}
            />
          ) : (
            // Calling Component and passing props
            <CompanyTable
              onAddCompany={this.handleAddCompany}
              onEditCompany={this.handleEditCompany}
            />
          )
        ) : (
          // Calling Component and passing props
          <CompanyForm
            onCompanySubmit={this.handleCompanySubmit}
            onFormClose={this.handleFormClose}
          />
        )}
      </React.Fragment>
    );
  }
  // Func() to handle input data in role form edit page using axios (CRUD)
  handleCompanySubmit = (event) => {
    event.preventDefault();
    console.log("id", event.target[0].value, event.target[1].value);
    this.setState({ table: true });

    let body = {
      CompanyName: event.target[0].value,
      Address: event.target[1].value,
      PostalCode: event.target[2].value,
      Website: event.target[3].value,
      Email: event.target[4].value,
      ContactPerson: event.target[5].value,
      ContactNo: event.target[6].value,
    };
    console.log(body);
    // axios lib of react
    axios
      .post(process.env.REACT_APP_API_URL + "/api/company/", body, {
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
  handleAddCompany = () => {
    console.log("clicked1");
    this.setState({ table: false });
  };
  handleEditCompany = (e) => {
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
  handleCompanyEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    let body = {
      CompanyName: newInfo.target[0].value,
      Address: newInfo.target[1].value,
      PostalCode: newInfo.target[2].value,
      Website: newInfo.target[3].value,
      Email: newInfo.target[4].value,
      ContactPerson: newInfo.target[5].value,
      ContactNo: newInfo.target[6].value,
    };
    // axios lib of react
    axios
      .put(
        process.env.REACT_APP_API_URL + "/api/company/" + info["_id"],
        body,
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        console.log("res", res);
        this.setState({ table: false });
        this.setState({ table: true });
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({ editForm: false });
  };
}

export default Company;
