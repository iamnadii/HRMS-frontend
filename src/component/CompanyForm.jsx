import React, { Component } from "react";
import "./CompanyForm.css";
import axios from "axios";

import { Form, Button, Col, Row } from "react-bootstrap";

class CompanyForm extends Component {
  state = {
    countryData: [],
    stateData: [],
    cityData: [],
    filteredCountryData: [],
    filteredStateData: [],
    filteredCityData: [],
  };
  render() {
    return (
      <div>
        <h2 id="role-form-title">Add Company Details</h2>
        <div id="role-form-outer-div">
          {/* Using Bootstrap component */}
          <Form id="form" onSubmit={this.props.onCompanySubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Company Name
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Company Name"
                  name="CompanyName"
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
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                PostalCode
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="number" placeholder="PostalCode" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Website
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="Text" placeholder="Website" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Email
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="email" placeholder="Email" required />
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
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Contact No
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="Text" placeholder="Contact No" required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} id="form-submit-button">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Submit</Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} id="form-cancel-button">
              <Col sm={{ span: 10, offset: 2 }} id="form-cancel-button-inner">
                <Button type="reset" onClick={this.props.onFormClose}>
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

export default CompanyForm;
