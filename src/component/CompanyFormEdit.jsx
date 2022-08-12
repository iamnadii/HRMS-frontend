import React, { Component } from "react";
import "./CompanyFormEdit.css";
import axios from "axios";
import { Form, Button, Col, Row } from "react-bootstrap";

class CompanyFormEdit extends Component {
  // Initialize State
  state = {
    status: "",

    CompanyNameData: this.props.editData["CompanyName"],
    AddressData: this.props.editData["Address"],
    PostalCodeData: this.props.editData["PostalCode"],
    WebsiteData: this.props.editData["Website"],
    EmailData: this.props.editData["Email"],
    ContactPersonData: this.props.editData["ContactPerson"],
    ContactNoData: this.props.editData["ContactNo"],
  };
  // func() for onchange
  onCompanyNameDataChange(e) {
    this.setState({ CompanyNameData: e.target.value });
  }
  onAddressDataChange(e) {
    this.setState({ AddressData: e.target.value });
  }
  onPostalCodeDataChange(e) {
    this.setState({ PostalCodeData: e.target.value });
  }
  onWebsiteDataChange(e) {
    this.setState({ WebsiteData: e.target.value });
  }
  onEmailDataChange(e) {
    this.setState({ EmailData: e.target.value });
  }
  onContactPersonDataChange(e) {
    this.setState({ ContactPersonData: e.target.value });
  }
  onContactNoDataChange(e) {
    this.setState({ ContactNoData: e.target.value });
  }

  render() {
    return (
      <React.Fragment>
        <h2 id="role-form-title">Edit Project Bid Details</h2>
        <div id="role-form-outer-div">
          {/* Using Bootstrap component */}
          <Form
            id="form"
            onSubmit={(e) =>
              this.props.onCompanyEditUpdate(this.props.editData, e)
            }
          >
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Company Name
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Company Name"
                  name="CompanyName"
                  value={this.state.CompanyNameData}
                  onChange={(value) => this.onCompanyNameDataChange(value)}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Address
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  as="textarea"
                  rows="3"
                  plassholder="address"
                  required
                  value={this.state.AddressData}
                  onChange={(value) => this.onAddressDataChange(value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                PostalCode
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="number"
                  placeholder="PostalCode"
                  required
                  value={this.state.PostalCodeData}
                  onChange={(value) => this.onPostalCodeDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Website
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Website"
                  required
                  value={this.state.WebsiteData}
                  onChange={(value) => this.onWebsiteDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Email
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  required
                  value={this.state.EmailData}
                  onChange={(value) => this.onEmailDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Contact Person
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Contact Person"
                  required
                  value={this.state.ContactPersonData}
                  onChange={(value) => this.onContactPersonDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Contact No
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Contact No"
                  required
                  value={this.state.ContactNoData}
                  onChange={(value) => this.onContactNoDataChange(value)}
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

export default CompanyFormEdit;
