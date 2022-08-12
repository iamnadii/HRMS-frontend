import React, { Component } from "react";
import "./LeaveApplicationHRTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Form, Button, Col, Row } from "react-bootstrap";

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

class LeaveApplicationHRTable extends Component {
  // Initialize state
  state = {
    leaveApplicationHRData: [],
    loading: true,
    searchData: "",

    columnDefs: [
      {
        headerName: "Emloyee Code",
        field: "EmployeeCode",
        sortable: true,
      },
      {
        headerName: "Name",
        field: "Name",
        sortable: true,
      },
      {
        headerName: "Leave type",
        field: "Leavetype",
        sortable: true,
      },
      {
        headerName: "From Date",
        field: "FromDate",
        sortable: true,
        filter: true,
        type: ["dateColumn"],
        filter: "agDateColumnFilter",
      },
      {
        headerName: "To Date",
        field: "ToDate",
        sortable: true,
        filter: true,
        type: ["dateColumn"],
        filter: "agDateColumnFilter",
      },
      {
        headerName: "Reasonforleave",
        field: "Reasonforleave",
        sortable: true,
      },
      {
        headerName: "Status",
        field: "Status",
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
      width: 170,
      filter: "agTextColumnFilter",
    },
    getRowHeight: function (params) {
      return 35;
    },
  };
  leaveApplicationHRObj = [];
  rowDataT = [];
  // func() to get data through GET method of API
  loadLeaveApplicationHRData = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/leave/hr", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      // if response true then re-render the rest of data
      .then((response) => {
        console.log("response", response.data);
        this.leaveApplicationHRObj = response.data;
        this.setState({ leaveApplicationHRData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];

        this.leaveApplicationHRObj.map((data) => {
          let temp = {
            data,
            EmployeeCode: data["employee"][0]["EmployeeCode"],
            Name:
              data["employee"][0]["FirstName"] +
              " " +
              data["employee"][0]["LastName"],
            Leavetype: data["Leavetype"],
            FromDate: data["FromDate"].slice(0, 10),
            ToDate: data["ToDate"].slice(0, 10),
            Reasonforleave: data["Reasonforleave"],
            Status: this.status(data["Status"]),
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
  onLeaveApplicationHRDelete = (e1, e2) => {
    console.log(e1, e2);
    if (window.confirm("Are you sure to delete this record? ") == true) {
      axios
        .delete(
          process.env.REACT_APP_API_URL + "/api/leave/hr/" + e1 + "/" + e2,
          {
            headers: {
              authorization: localStorage.getItem("token") || "",
            },
          }
        )
        // if response true then re-render the rest of data
        .then((res) => {
          this.componentDidMount();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // func() for just calling another func()
  componentDidMount() {
    this.loadLeaveApplicationHRData();
  }
  // re-render data
  renderButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() =>
          this.onLeaveApplicationHRDelete(
            params.data.data["employee"][0]["_id"],
            params.data.data["_id"]
          )
        }
      />
    );
  }
  renderEditButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => this.props.onEditLeaveApplicationHR(params.data.data)}
      />
    );
  }

  status = (s) => {
    if (s == 1) {
      return "Pending";
    }
    if (s == 2) {
      return "Approved";
    }
    if (s == 3) {
      return "Rejected";
    }
  };

  render() {
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Employee Leave Application Details</h2>

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

export default LeaveApplicationHRTable;
