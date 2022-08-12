import React, { Component } from "react";
import "./DepartmentTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";

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

class DepartmentTable extends Component {
  // Initialize state
  state = {
    departmentData: [],
    loading: true,

    columnDefs: [
      {
        headerName: "Company",
        field: "CompanyName",
        sortable: true,
      },

      {
        headerName: "Department",
        field: "DepartmentName",
        sortable: true,
      },

      {
        headerName: "",
        field: "edit",
        filter: false,
        width: 30,
        cellRendererFramework: this.renderEditButton.bind(this),
      },
      {
        headerName: "",
        field: "delete",
        filter: false,
        width: 30,
        cellRendererFramework: this.renderButton.bind(this),
      },
    ],
    rowData: [],
    defaultColDef: {
      resizable: true,
      width: 590,
      filter: "agTextColumnFilter",
    },
    getRowHeight: function (params) {
      return 35;
    },
  };
  departmentObj = [];
  rowDataT = [];
  // func() to get data through GET method of API
  loadDepartmentData = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/department", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        this.departmentObj = response.data;
        console.log("response", response.data);
        this.setState({ departmentData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];

        this.departmentObj.map((data) => {
          let temp = {
            data,
            CompanyName: data["company"][0]["CompanyName"],
            DepartmentName: data["DepartmentName"],
          };

          this.rowDataT.push(temp);
        });
        this.setState({ rowData: this.rowDataT });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // func() using API Delete method to delete data
  onDepartmentDelete = (e) => {
    console.log(e);
    if (window.confirm("Are you sure to delete this record ? ") == true) {
      axios
        .delete(process.env.REACT_APP_API_URL + "/api/department/" + e, {
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
          console.log(err.response);
          if (err.response.status == 403) {
            window.alert(err.response.data);
          }
        });
    }
  };
  // func() for just calling another func()
  componentDidMount() {
    this.loadDepartmentData();
  }

  // re-render data
  renderButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => this.onDepartmentDelete(params.data.data["_id"])}
      />
    );
  }
  renderEditButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => this.props.onEditDepartment(params.data.data)}
      />
    );
  }

  render() {
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Department Details</h2>
        <Button
          variant="primary"
          id="add-button"
          onClick={this.props.onAddDepartment}
        >
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
          Add
        </Button>

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

export default DepartmentTable;
