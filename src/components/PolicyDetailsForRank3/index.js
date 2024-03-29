import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Header from "../Header";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import { calculateAge } from "../../utils";
import axios from "axios";
import ProgressBar from 'react-bootstrap/ProgressBar'



export default class PolicyDetailsForRank3 extends Component {
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

    // this.onTabAClick = this.onTabAClick.bind(this);
    // this.onTabBClick = this.onTabBClick.bind(this);
  }
  
  startBookFlow = () => {
    const params = new URLSearchParams(this.props.location.search);
    this.props.history.push(`/bookpolicy?id=${params.get("id")}`);
  };
  render() {
    const params = new URLSearchParams(this.props.location.search);
    console.log(params.get(""))
    return (
      <>
        <Header />
        <Container className="selectPoliciesContainer">
        <ProgressBar now={100} />
        <br/>
        <br/>
          <h1>Select policies from the list below for users in Rank 3 Category</h1>
          <Card className="policyCard">
                  <Card.Header as="h5">
                    <Row>
                      <Col className="fs-20 fw-800">
                        Policy Name : HDFC Bank FD
                      </Col>
                      <Col xs="4" md="2" lg="2">
                        <Badge variant="secondary" className="fs-13">
                          001
                        </Badge>
                      </Col>
                    </Row>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col>
                        <Card.Text className="fs-18">
                          <div>
                            <span className="fw-600 fs-15">Price:</span>
                            {"   "}
                            <span className="fs-15">
                            Up to 150000
                            </span>
                          </div>
                          <div>
                            <span className="fw-600 fs-15">
                            Returns:
                            </span>
                            {"   "}
                            <span className="fs-15">
                            5.60%
                            </span>
                          </div>
                          <div>
                            <span className="fw-600 fs-15">Period:</span>
                            {"   "}
                            <span className="fs-15">3 Years - 5 Years</span>
                          </div>
                        </Card.Text>
                      </Col>
                      <Col lg={4}>
                      <a href="https://www.hdfcbank.com/personal/save/deposits/fixed-deposit" target="blank"><center className="m-10">
                          <button className="button">
                            <font color="white">
                              <span>Know More</span>
                            </font>
                          </button>
                        </center></a>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
                <Card className="policyCard">
                  <Card.Header as="h5">
                    <Row>
                      <Col className="fs-20 fw-800">
                        Policy Name : SBI Bank FD
                      </Col>
                      <Col xs="4" md="2" lg="2">
                        <Badge variant="secondary" className="fs-13">
                          002
                        </Badge>
                      </Col>
                    </Row>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col>
                        <Card.Text className="fs-18">
                          <div>
                            <span className="fw-600 fs-15">Price:</span>
                            {"   "}
                            <span className="fs-15">
                            Up to 120000
                            </span>
                          </div>
                          <div>
                            <span className="fw-600 fs-15">
                            Returns:
                            </span>
                            {"   "}
                            <span className="fs-15">
                            5.45%
                            </span>
                          </div>
                          <div>
                            <span className="fw-600 fs-15">Period:</span>
                            {"   "}
                            <span className="fs-15">3 Years - 5 Years</span>
                          </div>
                        </Card.Text>
                      </Col>
                      <Col lg={4}>
                      <a href="https://www.hdfcbank.com/personal/save/deposits/fixed-deposit" target="blank"><center className="m-10">
                          <button className="button">
                            <font color="white">
                              <span>Know More</span>
                            </font>
                          </button>
                        </center></a>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
          <Button onClick={this.startBookFlow}>Book An Appointment</Button>
        </Container>
      </>
    );
  }
}
