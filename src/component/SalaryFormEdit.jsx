import React, { Component } from "react";
// import "./SalaryFormEdit.css";
import axios from "axios";
import { Form, Button, Col, Row } from "react-bootstrap";

class SalaryFormEdit extends Component {
  // Initialize State
  state = {
    salaryData: [],

    BasicSalaryData: this.props.editData["salary"][0]["BasicSalary"],
    BankNameData: this.props.editData["salary"][0]["BankName"],
    AccountNoData: this.props.editData["salary"][0]["AccountNo"],
    ReAccountNoData: this.props.editData["salary"][0]["AccountNo"],
    AccountHolderNameData:
      this.props.editData["salary"][0]["AccountHolderName"],

    TaxDeductionData: this.props.editData["salary"][0]["TaxDeduction"],
  };
  // func() for onchange
  onBasicSalaryDataChange(e) {
    this.setState({ BasicSalaryData: e.target.value });
  }
  onBankNameDataChange(e) {
    this.setState({ BankNameData: e.target.value });
  }
  onAccountNoDataChange(e) {
    this.setState({ AccountNoData: e.target.value });
  }
  onReAccountNoDataChange(e) {
    this.setState({ ReAccountNoData: e.target.value });
  }
  onAccountHolderNameDataChange(e) {
    this.setState({ AccountHolderNameData: e.target.value });
  }

  onTaxDeductionDataChange(e) {
    this.setState({ TaxDeductionData: e.target.value });
  }
  // func() for getting data through API
  loadSalaryInfo = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/salary", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        this.setState({ salaryData: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // func() for just calling another func()
  componentWillMount() {
    this.loadSalaryInfo();
  }
  render() {
    return (
      <React.Fragment>
        <h2 id="role-form-title">Edit Salary Details</h2>
        <div id="role-form-outer-div">
          {/* Using Bootstrap component */}
          <Form
            id="form"
            onSubmit={(e) =>
              this.props.onSalaryEditUpdate(this.props.editData, e)
            }
          >
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Select Salary
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" required>
                  {this.state.salaryData.map((data, index) => (
                    <option
                      key={index}
                      value={data["_id"]}
                      selected={this.props.editData["_id"] == data["_id"]}
                      disabled
                    >
                      {data["FirstName"] +
                        " " +
                        data["MiddleName"] +
                        " " +
                        data["LastName"]}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Basic Salary
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="number"
                  placeholder="Basic Salary"
                  required
                  value={this.state.BasicSalaryData}
                  onChange={(value) => this.onBasicSalaryDataChange(value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Bank Name
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Bank Name"
                  required
                  value={this.state.BankNameData}
                  onChange={(value) => this.onBankNameDataChange(value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Account No
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Account No"
                  required
                  value={this.state.AccountNoData}
                  onChange={(value) => this.onAccountNoDataChange(value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Re-Enter Account No
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Re-Enter Account No"
                  required
                  value={this.state.ReAccountNoData}
                  onChange={(value) => this.onReAccountNoDataChange(value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Account Holder Name
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Account Holder Name"
                  required
                  value={this.state.AccountHolderNameData}
                  onChange={(value) =>
                    this.onAccountHolderNameDataChange(value)
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Tax Deduction
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="number"
                  placeholder="Basic Salary"
                  required
                  value={this.state.TaxDeductionData}
                  onChange={(value) => this.onTaxDeductionDataChange(value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} id="form-submit-button">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Submit</Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} id="form-cancel-button">
              <Col sm={{ span: 10, offset: 2 }} id="form-cancel-button-inner">
                <Button type="reset" onClick={this.props.onFormEditClose}>
                  cancel
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      </React.Fragment>
    );
  }
}

export default SalaryFormEdit;
