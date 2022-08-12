import React, { Component } from "react";
import "./PersonalInfoTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

// Class base component
const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

class PersonalInfoTable extends Component {
  // Initialize state
  state = {
    personalInfoData: [],
    loading: true,

    columnDefs: [
      {
        headerName: "First Name",
        field: "FirstName",
        sortable: true,

        width: 110,
      },
      {
        headerName: "Middle Name",
        field: "MiddleName",
        sortable: true,

        width: 130,
      },
      {
        headerName: "Last Name",
        field: "LastName",
        sortable: true,
      },
      {
        headerName: "Gender",
        field: "Gender",
        sortable: true,
        width: 90,
      },
      {
        headerName: "Contact No",
        field: "ContactNo",
        sortable: true,
      },
      {
        headerName: "Email",
        field: "Email",
        sortable: true,
      },
      {
        headerName: "CNIC",
        field: "CNIC",
        sortable: true,
      },

      {
        headerName: "DOB",
        field: "DOB",
        sortable: true,
        filter: true,
        type: ["dateColumn"],
        filter: "agDateColumnFilter",
      },
      {
        headerName: "Hobbies",
        field: "Hobbies",
        sortable: true,
      },
      {
        headerName: "Present Address",
        field: "PresentAddress",
        sortable: true,

        width: 150,
      },
      {
        headerName: "",
        field: "edit",
        filter: false,
        width: 30,

        cellRendererFramework: this.renderEditButton.bind(this),
      },
    ],
    rowData: [],
    defaultColDef: {
      resizable: true,
      width: 120,
      filter: "agTextColumnFilter",
    },
    getRowHeight: function (params) {
      return 35;
    },
  };
  personalInfoObj = [];
  rowDataT = [];
  // func() to get data through GET method of API
  loadPersonalInfoData = () => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/api/employee/personal-info/" +
          this.props.data["_id"],
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        }
      )
      .then((response) => {
        this.personalInfoObj = response.data;
        console.log("response", response.data);
        this.setState({ personalInfoData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];
        console.log("personalInfoObj", this.personalInfoObj);
        // this.personalInfoObj.map(data => {
        let data = this.personalInfoObj;
        let temp = {
          data,
          FirstName: data["FirstName"] || "Not Avaiable",
          MiddleName: data["MiddleName"] || "Not Avaiable",
          LastName: data["LastName"] || "Not Avaiable",
          Gender: data["Gender"] || "Not Avaiable",
          ContactNo: data["ContactNo"] || "Not Avaiable",
          Email: data["Email"] || "Not Avaiable",
          CNIC: data["PANcardNo"] || "Not Avaiable",
          DOB: data["DOB"].slice(0, 10) || "Not Avaiable",
          Hobbies: data["Hobbies"] || "Not Avaiable",
          PresentAddress: data["PresentAddress"] || "Not Avaiable",
        };

        this.rowDataT.push(temp);
        // });
        this.setState({ rowData: this.rowDataT });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // func() using API Delete method to delete data
  onPersonalInfoDelete = (e) => {
    console.log(e);
    if (window.confirm("Are you sure to delete this record? ") == true) {
      axios
        .delete(process.env.REACT_APP_API_URL + "/api/personalInfo/" + e, {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        })
        // if response true then re-render the rest of data
        .then((res) => {
          this.componentDidMount();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  componentDidMount() {
    this.loadPersonalInfoData();
  }
  // re-render data
  renderEditButton(params) {
    console.log(params);
    if (this.props.back) {
      return <React.Fragment />;
    }
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => this.props.onEditPersonalInfo(params.data.data)}
      />
    );
  }

  render() {
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">
          Employee Personal Details{" "}
          {this.props.back
            ? "of " +
              this.props.data["FirstName"] +
              " " +
              this.props.data["LastName"]
            : ""}
        </h2>
        {this.props.back ? (
          <Link to="/hr/employee">
            <Button variant="primary" id="add-button">
              Back
            </Button>
          </Link>
        ) : (
          <React.Fragment />
        )}

        <div id="clear-both" />

        {!this.state.loading ? (
          <div id="table-div" className="ag-theme-balham">
            <AgGridReact
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              columnTypes={this.state.columnTypes}
              rowData={this.state.rowData}
              pagination={true}
              paginationPageSize={10}
              getRowHeight={this.state.getRowHeight}
            />
          </div>
        ) : (
          <div id="loading-bar">
            <RingLoader
              css={override}
              sizeUnit={"px"}
              size={50}
              color={"#0098f3"}
              loading={true}
            />
          </div>
        )}
      </div>
    );
  }
}

export default PersonalInfoTable;
