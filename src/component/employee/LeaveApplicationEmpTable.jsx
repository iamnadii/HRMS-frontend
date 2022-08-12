import React, { Component } from "react";
import "./LeaveApplicationEmpTable.css";
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

class LeaveApplicationEmpTable extends Component {
  // Initialize state
  state = {
    leaveApplicationEmpData: [],
    loading: true,

    columnDefs: [
      {
        headerName: "Leave type",
        field: "Leavetype",
        sortable: true,
      },

      {
        headerName: "FromDate",
        field: "FromDate",
        sortable: true,
        type: ["dateColumn"],
        filter: "agDateColumnFilter",
      },
      {
        headerName: "ToDate",
        field: "ToDate",
        sortable: true,
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
      width: 235,
      filter: "agTextColumnFilter",
    },
    getRowHeight: function (params) {
      return 35;
    },
  };
  leaveApplicationEmpObj = [];
  rowDataT = [];
  // func() to get data through GET method of API
  loadLeaveApplicationEmpData = () => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/api/leave/emp/" +
          this.props.data["_id"],
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        }
      )
      // if response true then re-render the rest of data
      .then((response) => {
        this.leaveApplicationEmpObj = response.data;
        console.log("response", response.data);
        this.setState({ leaveApplicationEmpData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];

        this.leaveApplicationEmpObj.leaveApplication.map((data) => {
          let temp = {
            data,
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
  onLeaveApplicationEmpDelete = (e1, e2) => {
    console.log(e1, e2);
    if (window.confirm("Are you sure to delete this record? ") === true) {
      axios
        .delete(
          process.env.REACT_APP_API_URL + "/api/leave/emp/" + e1 + "/" + e2,
          {
            headers: {
              authorization: localStorage.getItem("token") || "",
            },
          }
        )
        // if response true then re-render the rest of data
        .then((res) => {
          console.log(res);
          this.componentDidMount();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // func() for just calling another func()
  componentDidMount() {
    this.loadLeaveApplicationEmpData();
  }
  // re-render data
  renderButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() =>
          this.onLeaveApplicationEmpDelete(
            this.props.data["_id"],
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
        onClick={() => this.onEdit(params.data.data)}
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
  onEdit = (data) => {
    if (data["Status"] == 1) {
      this.props.onEditLeaveApplicationEmp(data);
    } else {
      window.alert(
        "You can not edit application after it approved or rejected"
      );
    }
  };

  render() {
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Leave Application</h2>

        <Button
          variant="primary"
          id="add-button"
          onClick={this.props.onAddLeaveApplicationEmp}
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

export default LeaveApplicationEmpTable;
