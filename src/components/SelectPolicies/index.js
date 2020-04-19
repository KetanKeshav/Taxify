import React, { Component, Link } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Header from "../Header";
import { capitalize, formatDecimal } from "../../utils";

export default class SelectPolicies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itineraryId: "",
      policies: []
    };
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    this.setState({ itineraryId: params.get("id") });

    axios
      .get(
        `https://demo2675507.mockable.io/policyInfo/f3645fbb-1416-4416-8af7-20d4b1311de6%3FsumAssured=500000`
      )
      .then(res => {
        const { policies } = res.data;
        this.setState({ policies });
      });
  }
  openPolicy = () => {
    this.props.history.push(`/policydetails?id=${this.state.itineraryId}`);
  };
  render() {
    const { policies } = this.state;
    return (
      <div>
        <Header />
        <Container className="selectPoliciesContainer">
          {policies &&
            policies.map(policy => {
              return (
                <Card className="policyCard">
                  <Card.Header as="h5">
                    <Row>
                      <Col className="fs-20 fw-800">
                        {capitalize(policy.policyName)}
                      </Col>
                      <Col xs="4" md="2" lg="2">
                        <Badge variant="secondary" className="fs-13">
                          {policy.policyCode}
                        </Badge>
                      </Col>
                    </Row>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col>
                        <Card.Text className="fs-18">
                          <div>
                            <span className="fw-600 fs-15">Profit:</span>
                            {"  "}
                            <span className="fs-15">
                              {formatDecimal(policy.marginOfProfit)}
                            </span>
                          </div>
                          <div>
                            <span className="fw-600 fs-15">
                              Amount Invested:
                            </span>
                            {"  "}
                            <span className="fs-15">
                              {policy.amountInvested}
                            </span>
                          </div>
                          <div>
                            <span className="fw-600 fs-15">
                              Maturity Amount:
                            </span>
                            {"  "}
                            <span className="fs-15">
                              {policy.maturityAmount}
                            </span>
                          </div>
                          <div>
                            <span className="fw-600 fs-15">Maturity Term:</span>
                            {"  "}
                            <span className="fs-15">25 years</span>
                          </div>
                        </Card.Text>
                      </Col>
                      <Col lg={4}>
                        <center className="m-10">
                          <button className="button">
                            <font color="white">
                              <span onClick={this.openPolicy}>Know More</span>
                            </font>
                          </button>
                        </center>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              );
            })}
        </Container>
      </div>
    );
  }
}
