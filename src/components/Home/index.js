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
import national1 from "../../images/national1.jpg";
import national2 from "../../images/national2.jpg";
import national3 from "../../images/national3.jpg";
import global1 from "../../images/global1.jpg";
import global2 from "../../images/global2.jpg";
import global3 from "../../images/global3.jpg";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabA: true,
      tabB: false,
      isActiveA: true,
      isActiveB: false,
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

  render() {
    const {
      tabA,
      tabB,
      isActiveA,
      isActiveB,
    } = this.state;
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

        <br/>
        <br/>
        <br/>

        <center>
          <b>
            <h1>NEWS SECTION</h1>
          </b>
        </center>

        <br/>
        <br/>

        <Row>
          <Col className="tabsContainerForHome" md="auto" xs="auto" lg={3}>
            <ul className="tabsList">
              <li
                className={isActiveA && `active`}
                onClick={this.onTabAClick}
              >
                Global
              </li>
              <li
                className={isActiveB && `active`}
                onClick={this.onTabBClick}
              >
                National
              </li>
            </ul>
          </Col>
          <Col>
            {tabA && (
              <Row className="homeFeatContentContainer">
                <Col>
                  <div className="homeFeatBlock">
                    <div>
                      <a href="https://economictimes.indiatimes.com/markets/stocks/news/us-stocks-open-lower-on-inflation-rate-hike-angst/articleshow/92109598.cms">
                        <img src={global1} height={150} width={110} />
                        <b>
                          <p>US stocks open lower on inflation, rate hike angst</p>
                        </b>
                      </a>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="homeFeatBlock">
                    <div>
                      <a href="https://economictimes.indiatimes.com/markets/stocks/news/wall-street-stock-trading-rules-set-for-overhaul/articleshow/92088770.cms">
                        <img src={global2} height={150} width={150} />
                        <b>
                          <p>US SEC chief unveils plan to overhaul Wall Street stock trading</p>
                        </b>
                      </a>   
                    </div>
                  </div>
                </Col>
    
                <Col>
                  <div className="homeFeatBlock">
                    <div>
                      <a href="https://economictimes.indiatimes.com/news/economy/indicators/services-activity-at-11-year-high-despite-high-inflation/articleshow/91993167.cms">
                        <img src={global3} height={150} width={150} />
                        <b>
                          <p>Services activity at 11-year high despite high inflation</p>
                        </b>
                      </a>       
                    </div>
                  </div>
                </Col>
              </Row>
            )}
            {tabB && (
              <Row className="homeFeatContentContainer">
                <Col>
                  <div className="homeFeatBlock">
                    <div>
                      <a href="https://economictimes.indiatimes.com/markets/stocks/news/indias-share-in-global-market-cap-at-a-decade-high-of-3-1/articleshow/92036117.cms">
                        <img src={national1} height={150} width={110} />
                        <b>
                          <p>India’s share in global market cap at a decade high of 3.1 per cent</p>
                        </b>
                      </a>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="homeFeatBlock">
                    <div>
                      <a href="https://economictimes.indiatimes.com/news/india/nse-governance-lapses-case-sat-gives-more-time-to-chitra-ramkrishna-to-deposit-rs-2-crore/articleshow/91961257.cms">
                        <img src={national2} height={150} width={150} />
                        <b>
                          <p>NSE governance lapses case: SAT gives more time to Chitra Ramkrishna to deposit Rs 2 crore</p>
                        </b>
                      </a>
                    </div>
                  </div>
                </Col>
    
                <Col>
                  <div className="homeFeatBlock">
                    <div>
                      <a href="https://economictimes.indiatimes.com/mf/mf-news/sebi-carries-out-search-and-seizure-operations-to-probe-axis-mf-front-running-case/articleshow/91843182.cms">
                        <img src={national3} height={150} width={150} />
                        <b>
                          <p>Sebi carries out search and seizure operations to probe Axis MF front-running case</p>
                        </b>
                      </a>   
                    </div>
                  </div>
                </Col>
              </Row>
            )}
          </Col>
        </Row>

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
