import React, { Component } from "react";
import "./AdminProjectBidTable.css";
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

class AdminProjectBidTable extends Component {
  // Initialize state
  state = {
    projectBidData: [],
    loading: true,

    columnDefs: [
      {
        headerName: "Project Title",
        field: "ProjectTitle",
        sortable: true,
      },
      {
        headerName: "Portal",
        field: "PortalName",
        sortable: true,
      },
      {
        headerName: "Project URL",
        field: "ProjectURL",
        sortable: true,
      },
      {
        headerName: "Estimated Time",
        field: "EstimatedTime",
        sortable: true,
      },
      {
        headerName: "Estimated Cost",
        field: "EstimatedCost",
        sortable: true,
        type: "numberColumn",
        filter: "agNumberColumnFilter",
      },
      {
        headerName: "Remark",
        field: "Remark",
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
      width: 200,
      filter: "agTextColumnFilter",
    },
    getRowHeight: function (params) {
      return 35;
    },
  };
  projectBidObj = [];
  rowDataT = [];
  // func() to get data through GET method of API
  loadProjectBidData = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/admin/project", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      // if response true then re-render the rest of data
      .then((response) => {
        console.log("response", response.data);
        this.projectBidObj = response.data;
        this.setState({ projectBidData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];

        this.projectBidObj.map((data) => {
          let temp = {
            data,
            ProjectTitle: data["ProjectTitle"],
            PortalName: data["portals"][0]["PortalName"],
            ProjectURL: data["ProjectURL"],
            EstimatedTime: data["EstimatedTime"],
            EstimatedCost: data["EstimatedCost"],
            Remark: data["Remark"],
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
  onProjectBidDelete = (e) => {
    console.log(e);
    if (window.confirm("Are you sure to delete this record? ") == true) {
      axios
        .delete(process.env.REACT_APP_API_URL + "/api/admin/project/" + e, {
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
  // func() for just calling another func()
  componentDidMount() {
    this.loadProjectBidData();
  }
  // re-render data
  renderButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => this.onProjectBidDelete(params.data.data["_id"])}
      />
    );
  }
  renderEditButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => this.props.onEditProjectBid(params.data.data)}
      />
    );
  }

  render() {
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Bidding Details</h2>
        <Button
          variant="primary"
          id="add-button"
          onClick={this.props.onAddProjectBid}
        >
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
          Add
        </Button>

        <div id="clear-both" />

        {!this.state.loading ? (
          <div
            id="table-div"
            className="ag-theme-balham"
            //   style={
            //     {
            //     height: "500px",
            //     width: "100%"
            //   }
            // }
          >
            <AgGridReact
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              columnTypes={this.state.columnTypes}
              rowData={this.state.rowData}
              // floatingFilter={true}
              // onGridReady={this.onGridReady}
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

export default AdminProjectBidTable;
