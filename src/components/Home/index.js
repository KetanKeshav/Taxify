import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Header from "../Header";

import unititled from "../../images/Untitled.png";
import idea from "../../images/idea.png";
import laptop from "../../images/laptop.png";
import meeting11 from "../../images/meeting11.png";
import shield from "../../images/shield.png";
import hour from "../../images/24-hours.png";

class Home extends Component {
  render() {
    return (
      <div>
        <Header />

        <Container>
          <Row className="homeFeatContentContainer">
            <Col>
              <div className="homeFeatBlock">
                <div>
                  <img src={unititled} height={150} width={110} />
                  <b>
                    <p>Worried about paying tax?</p>
                  </b>
                </div>
              </div>
            </Col>
            <Col>
              <div className="homeFeatBlock">
                <div>
                  <img src={idea} height={150} width={150} />
                  <b>
                    <p>
                      Fret no more! You have stopped at the right place! We
                      provide you the right solution to save tax
                    </p>
                  </b>
                </div>
              </div>
            </Col>

            <Col>
              <div className="homeFeatBlock">
                <div>
                  <img src={laptop} height={150} width={150} />
                  <b>
                    <p>Choose a policy of your choice!</p>
                  </b>
                </div>
              </div>
            </Col>
            <Col>
              <div className="homeFeatBlock">
                <div>
                  <img src={meeting11} height={150} width={150} />
                  <b>
                    <p>
                      Meet our agents at your doorstep, at your preferred
                      timing. Buy a policy and Save tax
                    </p>
                  </b>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        <center className="m-10">
          <Link to="/taxform" />
          <button className="button">
            <Link to="/taxform">
              <font color="white">
                <span>Start Tax Saving</span>
              </font>
            </Link>
          </button>
        </center>

        {/* <center>
          <b>
            <h1>COMAPANY NAME ADVANTAGES</h1>
          </b>
        </center> */}

        <Container>
          <Row className="m-20">
            <Col className="text-center">
              <center>
                <img src={shield} width={50} height={50} />
              </center>
              <b>Your data is safe &amp; private</b>
              <p>
                Data security is our top priority as a tax company.128 Bit Bank
                Grade SSL. ISO 27001 Data Centers.
              </p>
            </Col>
            <Col className="text-center">
              <center>
                <img src={hour} width={50} height={50} />
              </center>
              <b>Expert Assistance. Anytime.</b>
              <p>
                Best Part? Sure yes! We are always active , we'd be glad to hear
                from you, Over 1000 CAs to help you. World-class support for
                resolution of your questions.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
