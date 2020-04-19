import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Header from "../Header";

export default class TaxPaid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itineraryId: "",
      tabA: true,
      tabB: false,
      isActiveA: true,
      isActiveB: false,
      valueA: "",
      valueB: ""
    };

    this.onTabAClick = this.onTabAClick.bind(this);
    this.onTabBClick = this.onTabBClick.bind(this);
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);

    this.setState({ itineraryId: params.get("id") });

    const isCTCTabActive = params.get("from") === "ctc";
    const isTaxSlabTabActive = params.get("from") === "taxslab";

    if (isCTCTabActive) {
      this.setState({ value1: params.get("tax") });
      this.setState({ value2: params.get("taxsavedwopf") });
      this.setState({ value3: params.get("taxsavedwpf") });
      this.setState({ tabA: true });
      this.setState({ tabB: false });
    } else {
      this.setState({ value4: params.get("tax") });
      this.setState({ value5: params.get("taxsavedwopf") });
      this.setState({ value6: params.get("taxsavedwpf") });
      this.setState({ tabA: false });
      this.setState({ tabB: true });
    }

    this.setState({ isActiveA: isCTCTabActive });
    this.setState({ isActiveB: isTaxSlabTabActive });
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
    this.props.history.push(`/selectpolicies?id=${this.state.itineraryId}`);
  }

  handleSubmitB(event) {
    const form = event.currentTarget;
    this.props.history.push(`/selectpolicies?id=${this.state.itineraryId}`);
  }

  render() {
    const {
      tabA,
      tabB,
      validatedA,
      validatedB,
      isActiveA,
      isActiveB
    } = this.state;
    return (
      <div>
        <Header />
        {/* <center>
          <h1>Calculate your tax</h1>
        </center> */}

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
                  <Form onSubmit={e => this.handleSubmitA(e)}>
                    <Form.Group as={Row} controlId="formHorizontalTaxtobepaid ">
                      <Form.Label column sm={4}>
                        Tax to be paid
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          required
                          readOnly
                          type="text"
                          placeholder="Tax to be paid"
                          value={this.state.value1}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontal80C">
                      <Form.Label column sm={4}>
                        Tax saved under 80c without PF
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          type="text"
                          required
                          readOnly
                          placeholder="Tax saved under 80c without PF"
                          value={this.state.value2}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontal80C">
                      <Form.Label column sm={4}>
                        Tax saved under 80c with PF deducted
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          type="text"
                          required
                          readOnly
                          placeholder="Tax saved under 80c with PF deducted"
                          value={this.state.value3}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Col>
                        <Button type="submit">Select Policies</Button>
                      </Col>
                    </Form.Group>
                  </Form>
                </div>
              )}
              {tabB && (
                <div id="a" className="tabcontent">
                  <Form onSubmit={e => this.handleSubmitA(e)}>
                    <Form.Group as={Row} controlId="formHorizontalTaxtobepaid ">
                      <Form.Label column sm={4}>
                        Tax to be paid
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          required
                          readOnly
                          type="text"
                          placeholder="Tax to be paid "
                          value={this.state.value4}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontal80C">
                      <Form.Label column sm={4}>
                        Tax saved under 80c without PF
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          type="text"
                          required
                          readOnly
                          placeholder="Tax saved under 80c without PF"
                          value={this.state.value5}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontal80C">
                      <Form.Label column sm={4}>
                        Tax saved under 80c with PF deducted
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control
                          type="text"
                          required
                          readOnly
                          placeholder="Tax saved under 80c with PF deducted"
                          value={this.state.value6}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Col>
                        <Button type="submit">Select Policies</Button>
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
