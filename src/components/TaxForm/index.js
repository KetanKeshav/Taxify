import React, { Component } from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Header from "../Header";
import { calculateAge } from "../../utils";

export default class TaxForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabA: true,
      tabB: false,
      validatedA: false,
      validatedB: false,
      isActiveA: true,
      isActiveB: false,
      formA: {
        basicSalary: "",
        totalHouseRentAllowances: "",
        payingHouseRentAllowances: "",
        conveyanceAllowances: "",
        cityCompensatoryAllowances: "",
        providentFund: "",
        others: "",
        dateOfBirth: ""
      },
      formB: {
        slab: "",
        dateOfBirth: ""
      },
      formHorizontalRadios1: "",
      formHorizontalRadios2: "",
      formHorizontalRadios3: ""
    };

    this.onTabAClick = this.onTabAClick.bind(this);
    this.onTabBClick = this.onTabBClick.bind(this);
  }

  onTabAClick() {
    if (!this.state.isActiveA) {
      this.setState({
        isActiveA: true,
        isActiveB: false,
        tabA: true,
        tabB: false
      });
    }
  }

  onTabBClick() {
    if (!this.state.isActiveB) {
      this.setState({
        isActiveA: false,
        isActiveB: true,
        tabB: true,
        tabA: false
      });
    }
  }

  handleSubmitA(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validatedA: true });
    if (form.checkValidity() === true) {
      event.preventDefault();
      event.stopPropagation();
      const {
        basicSalary,
        totalHouseRentAllowances,
        payingHouseRentAllowances,
        conveyanceAllowances,
        cityCompensatoryAllowances,
        providentFund,
        others,
        dateOfBirth
      } = this.state.formA;
      const data = {
        basicSalary: basicSalary,
        totalHouseRentAllowances: totalHouseRentAllowances,
        payingHouseRentAllowances: payingHouseRentAllowances,
        conveyanceAllowances: conveyanceAllowances,
        cityCompensatoryAllowances: cityCompensatoryAllowances,
        providentFund: providentFund,
        others: others,
        dateOfBirth: dateOfBirth
      };

      axios
        .post(
          `https://a68bcbcd-460c-4e83-8310-0ce4ebf432f4.mock.pstmn.io/taxslab/fromCTC`,
          { data }
        )
        .then(res => {
          this.props.history.push(
            `/taxpaid?id=${res.data.id}&tax=${
              res.data.taxNeedToPay
            }&taxsavedwopf=${res.data.taxSavedUnder80CWithoutPf}&taxsavedwpf=${
              res.data.taxSavedUnder80CAfterPfDeduction
            }&from=ctc`
          );
        });
    }
  }

  handleSubmitB(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validatedB: true });
    if (form.checkValidity() === true) {
      event.preventDefault();
      event.stopPropagation();
      const { dateOfBirth } = this.state.formB;

      let salarySlab = "";
      if (this.state.formHorizontalRadios1) {
        salarySlab = this.state.formHorizontalRadios1;
      }
      if (this.state.formHorizontalRadios2) {
        salarySlab = this.state.formHorizontalRadios2;
      }
      if (this.state.formHorizontalRadios3) {
        salarySlab = this.state.formHorizontalRadios3;
      }

      axios
        .get(
          `https://a68bcbcd-460c-4e83-8310-0ce4ebf432f4.mock.pstmn.io/taxslab/fromBreakUp/${salarySlab}?dob=${dateOfBirth}&age=${calculateAge(
            dateOfBirth
          )}`
        )
        .then(res => {
          this.props.history.push(
            `/taxpaid?id=${res.data.id}&tax=${
              res.data.taxNeedToPay
            }&taxsavedwopf=${res.data.taxSavedUnder80CWithoutPf}&taxsavedwpf=${
              res.data.taxSavedUnder80CAfterPfDeduction
            }&from=taxslab`
          );
        });
    }
  }

  handleChangeFormA = (data, event) => {
    this.setState({
      formA: { ...this.state.formA, [data]: event.target.value }
    });
  };

  handleChangeFormB = (data, event) => {
    this.setState({
      formB: { ...this.state.formB, [data]: event.target.value }
    });
  };

  onRadioButtonChanged = (data, e) => {
    this.setState({
      [data]: e.currentTarget.value
    });
  };

  render() {
    const {
      tabA,
      tabB,
      validatedA,
      validatedB,
      isActiveA,
      isActiveB,
      formA,
      formB
    } = this.state;
    return (
      <div>
        <Header />
        <center>
          <h1>Calculate your tax</h1>
        </center>

        <Container className="taxformContainer">
          <Row>
            <Col className="tabsContainer" md="auto" xs="auto" lg={3}>
              <ul className="tabsList">
                <li
                  className={isActiveA && `active`}
                  onClick={this.onTabAClick}
                >
                  CTC Breakup
                </li>
                <li
                  className={isActiveB && `active`}
                  onClick={this.onTabBClick}
                >
                  Tax Slab
                </li>
              </ul>
            </Col>
            <Col>
              {tabA && (
                <div id="a" className="tabcontent">
                  <Form
                    noValidate
                    validated={validatedA}
                    onSubmit={e => this.handleSubmitA(e)}
                  >
                    <Form.Group as={Row} controlId="formHorizontalBasicSalary">
                      <Form.Label column sm={4}>
                        Basic Salary
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          required
                          type="text"
                          value={formA.basicSalary}
                          placeholder="Basic Salary"
                          onChange={this.handleChangeFormA.bind(
                            this,
                            "basicSalary"
                          )}
                        />
                      </Col>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalHRA">
                      <Form.Label column sm={4}>
                        House Rent Allowance
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          type="text"
                          required
                          value={formA.totalHouseRentAllowances}
                          placeholder="House Rent Allowance"
                          onChange={this.handleChangeFormA.bind(
                            this,
                            "totalHouseRentAllowances"
                          )}
                        />
                      </Col>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalPHRA">
                      <Form.Label column sm={4}>
                        Paying House Rent Allowance
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          type="text"
                          required
                          value={formA.payingHouseRentAllowances}
                          placeholder="Paying House Rent Allowance"
                          onChange={this.handleChangeFormA.bind(
                            this,
                            "payingHouseRentAllowances"
                          )}
                        />
                      </Col>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalCA">
                      <Form.Label column sm={4}>
                        Conveyance Allowance
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          required
                          type="text"
                          value={formA.conveyanceAllowances}
                          placeholder="Conveyance Allowance "
                          onChange={this.handleChangeFormA.bind(
                            this,
                            "conveyanceAllowances"
                          )}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalCCA">
                      <Form.Label column sm={4}>
                        City Compensatory Allowance
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          required
                          type="text"
                          value={formA.cityCompensatoryAllowances}
                          placeholder="City Compensatory Allowance"
                          onChange={this.handleChangeFormA.bind(
                            this,
                            "cityCompensatoryAllowances"
                          )}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalPF">
                      <Form.Label column sm={4}>
                        Provident Funds
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          required
                          type="text"
                          value={formA.providentFund}
                          placeholder="Provident Funds"
                          onChange={this.handleChangeFormA.bind(
                            this,
                            "providentFund"
                          )}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalOthers">
                      <Form.Label column sm={4}>
                        Others
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          required
                          type="text"
                          value={formA.others}
                          placeholder="Others"
                          onChange={this.handleChangeFormA.bind(this, "others")}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalDOB">
                      <Form.Label column sm={4}>
                        Date of birth
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          required
                          type="date"
                          value={formA.dateOfBirth}
                          placeholder="dob"
                          onChange={this.handleChangeFormA.bind(
                            this,
                            "dateOfBirth"
                          )}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Col>
                        <Button type="submit">Calculate</Button>
                      </Col>
                    </Form.Group>
                  </Form>
                </div>
              )}
              {tabB && (
                <div id="b" className="tabcontent">
                  <Form
                    noValidate
                    validated={validatedB}
                    onSubmit={e => this.handleSubmitB(e)}
                  >
                    <fieldset>
                      <Form.Group as={Row}>
                        <Form.Label as="legend" column sm={2}>
                          Salary Range
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Check
                            type="radio"
                            selected={this.state.formHorizontalRadios1}
                            label="0 - 5 Lac"
                            value={"5"}
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                            onChange={this.onRadioButtonChanged.bind(
                              this,
                              "formHorizontalRadios1"
                            )}
                          />
                          <Form.Check
                            type="radio"
                            label="5 - 10 Lacs"
                            value={"10"}
                            selected={this.state.formHorizontalRadios2}
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                            onChange={this.onRadioButtonChanged.bind(
                              this,
                              "formHorizontalRadios2"
                            )}
                          />
                          <Form.Check
                            type="radio"
                            selected={this.state.formHorizontalRadios3}
                            value={"20"}
                            label="10 Lac and above"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                            onChange={this.onRadioButtonChanged.bind(
                              this,
                              "formHorizontalRadios3"
                            )}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} controlId="formHorizontalDOB">
                        <Form.Label column sm={2}>
                          Date of birth
                        </Form.Label>
                        <Col sm={8}>
                          <Form.Control
                            required
                            value={formB.dateOfBirth}
                            type="date"
                            placeholder="dob"
                            onChange={this.handleChangeFormB.bind(
                              this,
                              "dateOfBirth"
                            )}
                          />
                        </Col>
                      </Form.Group>
                    </fieldset>

                    <Form.Group as={Row}>
                      <Col sm={{ span: 10, offset: 2 }}>
                        <Button type="submit">Calculate</Button>
                      </Col>
                    </Form.Group>
                  </Form>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
