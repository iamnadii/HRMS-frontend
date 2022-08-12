import React, { Component } from "react";
import "./EmployeeTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faEdit,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
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

class AdminEmployeeTable extends Component {
  // Initialize state
  state = {
    employeeData: [],
    loading: true,

    columnDefs: [
      {
        headerName: "Employee Code",
        field: "EmployeeCode",
        sortable: true,
        width: 140,
      },
      {
        headerName: "Email",
        field: "Email",
        sortable: true,
        width: 170,
      },
      {
        headerName: "Account Access",
        field: "Account",
        sortable: true,
        width: 150,
      },
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
        width: 110,
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
        headerName: "ContactNo",
        field: "ContactNo",
        sortable: true,
        width: 117,
      },
      {
        headerName: "Role",
        field: "RoleName",
        sortable: true,
        width: 70,
      },
      {
        headerName: "Position Name",
        field: "PositionName",
        sortable: true,
        width: 140,
      },
      {
        headerName: "Department Name",
        field: "DepartmentName",
        sortable: true,
        width: 160,
      },

      {
        headerName: "Date Of Joining",
        field: "DateOfJoining",
        sortable: true,
        width: 140,
      },
      {
        headerName: "",
        field: "info",
        filter: false,
        width: 30,
        cellRendererFramework: this.renderInfoButton.bind(this),
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
      width: 100,
      filter: "agTextColumnFilter",
    },
    getRowHeight: function (params) {
      return 35;
    },
  };
  employeeObj = [];
  rowDataT = [];
  // func() to get data through GET method of API
  loadEmployeeData = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/employee", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        this.employeeObj = response.data;
        console.log("response", response.data);
        this.setState({ employeeData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];
        this.employeeObj.map((data) => {
          let temp = {
            data,
            Email: data["Email"],
            Password: data["Password"],
            Account:
              data["Account"] == 1
                ? "Admin"
                : data["Account"] == 2
                ? "HR"
                : data["Account"] == 3
                ? "Employee"
                : "",
            RoleName: data["role"][0]["RoleName"],
            FirstName: data["FirstName"],
            MiddleName: data["MiddleName"],
            LastName: data["LastName"],
            DOB: data["DOB"].slice(0, 10),
            ContactNo: data["ContactNo"],
            EmployeeCode: data["EmployeeCode"],
            DepartmentName: data["department"][0]["DepartmentName"],
            PositionName: data["position"][0]["PositionName"],
            DateOfJoining: data["DateOfJoining"].slice(0, 10),
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
  onEmployeeDelete = (e) => {
    console.log(e);
    if (window.confirm("Are you sure to delete this record? ") == true) {
      axios
        .delete(process.env.REACT_APP_API_URL + "/api/employee/" + e, {
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
  // func() calling another func()
  componentDidMount() {
    this.loadEmployeeData();
  }
  handleClick = (e) => {
    console.log(e);
  };
  // re-render data
  renderInfoButton(params) {
    console.log(params);
    return (
      <div>
        <FontAwesomeIcon
          icon={faInfoCircle}
          onClick={() => this.props.onEmpInfo(params.data.data)}
        />
      </div>
    );
  }
  // re-render data
  renderButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => this.onEmployeeDelete(params.data.data["_id"])}
      />
    );
  }
  // re-render data
  renderEditButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => this.props.onEditEmployee(params.data.data)}
      />
    );
  }

  searchChange = (e) => {
    console.log(e.target.value);
    this.setState({ searchData: e.target.value });
  };
  render() {
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Employee Details</h2>

        <Button
          variant="primary"
          id="add-button"
          onClick={this.props.onAddEmployee}
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

export default AdminEmployeeTable;
