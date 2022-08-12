import React, { Component } from "react";

import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

class LeaveApplicationEmpForm extends Component {
  // Initialize State
  state = {
    FromDateData: this.props.editData["FromDate"].slice(0, 10),
    ToDateData: this.props.editData["ToDate"].slice(0, 10),
    ReasonforleaveData: this.props.editData["Reasonforleave"],
  };
  //  on Change func()
  onFromDateDataChange(e) {
    this.setState({ FromDateData: e.target.value });
  }
  onToDateDataChange(e) {
    this.setState({ ToDateData: e.target.value });
  }
  onReasonforleaveDataChange(e) {
    this.setState({ ReasonforleaveData: e.target.value });
  }

  componentWillMount() {}

  render() {
    return (
      <div>
        <h2 id="role-form-title">Edit LeaveApplicationEmp Details</h2>

        <div id="role-form-outer-div">
          {/* Using Bootstrap component */}
          <Form
            id="form"
            onSubmit={(e) =>
              this.props.onLeaveApplicationEmpEditUpdate(this.props.editData, e)
            }
          >
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Leave Type
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" required>
                  <option value="" disabled selected>
                    Select your option
                  </option>
                  <option
                    value="Sick Leave"
                    selected={this.props.editData["Leavetype"] == "Sick Leave"}
                  >
                    Sick Leave
                  </option>
                  <option
                    value="Casual Leave"
                    selected={
                      this.props.editData["Leavetype"] == "Casual Leave"
                    }
                  >
                    Casual Leave
                  </option>
                  <option
                    value="Privilege Leave"
                    selected={
                      this.props.editData["Leavetype"] == "Privilege Leave"
                    }
                  >
                    Privilege Leave
                  </option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                FromDate
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="date"
                  required
                  value={this.state.FromDateData}
                  onChange={(value) => this.onFromDateDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                ToDate
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="date"
                  required
                  value={this.state.ToDateData}
                  onChange={(value) => this.onToDateDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Reason for leave
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Reason for leave"
                  required
                  value={this.state.ReasonforleaveData}
                  onChange={(value) => this.onReasonforleaveDataChange(value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Leave Status
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" required>
                  <option value="1" selected disabled>
                    Pending
                  </option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} id="form-submit-button">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Update</Button>
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
      </div>
    );
  }
}

export default LeaveApplicationEmpForm;
