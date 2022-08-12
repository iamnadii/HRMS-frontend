import React, { Component } from "react";
import "./AdminCompanyTable.css";
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
class AdminCompanyTable extends Component {
  // Initialize state
  state = {
    companyData: [],
    loading: true,
    columnDefs: [
      {
        headerName: "Company Name",
        field: "CompanyName",
        sortable: true,
        width: 150,
      },
      {
        headerName: "Address",
        field: "Address",
        sortable: true,
      },

      {
        headerName: "Postal Code",
        field: "PostalCode",
        sortable: true,

        width: 120,
      },
      {
        headerName: "Website",
        field: "Website",
        sortable: true,
      },
      {
        headerName: "Email",
        field: "Email",
        sortable: true,
        width: 150,
      },
      {
        headerName: "Contact Person",
        field: "ContactPerson",
        sortable: true,

        width: 140,
      },
      {
        headerName: "Contact No",
        field: "ContactNo",
        sortable: true,

        width: 120,
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
      width: 110,
      filter: "agTextColumnFilter",
    },
    getRowHeight: function (params) {
      return 35;
    },
  };
  companyObj = [];
  rowDataT = [];
  // func() to get data through GET method of API
  loadCompanyData = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/company/", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        this.companyObj = response.data;
        console.log("response", response.data);
        this.setState({ companyData: response.data });
        this.setState({ loading: false });

        this.rowDataT = [];

        this.companyObj.map((data) => {
          let temp = {
            data,
            CompanyName: data["CompanyName"],
            Address: data["Address"],
            PostalCode: data["PostalCode"],
            Website: data["Website"],
            Email: data["Email"],
            ContactPerson: data["ContactPerson"],
            ContactNo: data["ContactNo"],
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
  onCompanyDelete = (e) => {
    console.log(e);
    if (window.confirm("Are you sure to delete this record? ") === true) {
      axios
        .delete(process.env.REACT_APP_API_URL + "/api/company/" + e, {
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
    this.loadCompanyData();
  }
  // re-render data
  renderButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => this.onCompanyDelete(params.data.data["_id"])}
      />
    );
  }
  renderEditButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => this.props.onEditCompany(params.data.data)}
      />
    );
  }

  render() {
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Company Details</h2>

        <Button
          variant="primary"
          id="add-button"
          onClick={this.props.onAddCompany}
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
        {/*         
        <div id="inner-table-div">
          <table id="role-table">
            <thead>
              <tr>
                <th width="6.667%">Company Name</th>
                <th width="6.667%">Address</th>
                <th width="6.667%">Country</th>
                <th width="6.667%">State</th>
                <th width="6.667%">City</th>
                <th width="6.667%">Postal Code</th>
                <th width="6.667%">Website</th>
                <th width="6.667%">Email</th>
                <th width="6.667%">ContactPerson</th>
                <th width="6.667%">ContactNo</th>
                <th width="6.667%">FaxNo</th>
                <th width="6.667%">PanNo</th>
                <th width="6.667%">GST No</th>
                <th width="6.667%">CIN No</th>
                <th width="3.33%" />
                <th width="3.33%" />
              </tr>
            </thead>

            {!this.state.loading ? (
              <React.Fragment>
                {this.companyObj.map((data, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>{data["CompanyName"]}</td>
                      <td>{data["Address"]}</td>
                      <td>
                        {
                          data["city"][0]["state"][0]["country"][0][
                            "CountryName"
                          ]
                        }
                      </td>
                      <td>{data["city"][0]["state"][0]["StateName"]}</td>
                      <td>{data["city"][0]["CityName"]}</td>
                      <td>{data["PostalCode"]}</td>
                      <td>{data["Website"]}</td>
                      <td>{data["Email"]}</td>
                      <td>{data["ContactPerson"]}</td>
                      <td>{data["ContactNo"]}</td>
                      <td>{data["FaxNo"]}</td>
                      <td>{data["PanNo"]}</td>
                      <td>{data["GSTNo"]}</td>
                      <td>{data["CINNo"]}</td>
                      <td>
                        <FontAwesomeIcon
                          icon={faEdit}
                          onClick={() => this.props.onEditCompany(data)}
                        />
                      </td>
                      <td>
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => this.onCompanyDelete(data["_id"])}
                        />
                      </td>
                    </tr>
                  </tbody>
                ))}
                {console.log("final", this.companyObj)}
              </React.Fragment>
            ) : (
              <tbody>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td>
                    <div id="loading-bar">
                      <BarLoader
                        css={override}
                        sizeUnit={"px"}
                        size={150}
                        color={"#0098f3"}
                        loading={true}
                      />
                    </div>
                  </td>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />

                  <td />
                  <td />
                </tr>
              </tbody>
            )}
          </table>
        </div> */}
      </div>
    );
  }
}

export default AdminCompanyTable;
