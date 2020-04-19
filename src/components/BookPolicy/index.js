import React, { Fragment } from "react";
import axios from "axios";

import {
  Container,
  Row,
  Col,
  Divider,
  Badge,
  Button,
  Label,
  Field,
  Select,
  Checkbox,
  Banner,
  Collapse,
  Fade
} from "@cleartrip/bento";
import ButtonStrap from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import ItineraryHeader from "../../lib/ItineraryHeader";
import ItineraryBody from "../../lib/ItineraryBody";
import ItineraryCollapsed from "../../lib/ItineraryCollapsed";

import Header from "../Header";

import Check from "./icons/check.svg";
import Chev from "./icons/chev.svg";

import { isValidEmail, isValidPhoneNumber, isValidUserName } from "../../utils";

class BookPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: "inactive",
      contact: "inactive",
      payment: "active",
      isEmailVerified: false,
      verificationCode: "",
      canSubmit: false,
      codeForVerification: "",
      email: "",
      phone: "",
      username: "",
      address: "",
      dom: "",
      tom: "",
      validations: {
        email: true,
        phone: true,
        username: true,
        codeForVerification: true,
        address: true,
        dom: true,
        tom: true
      },
      orderId: ""
    };
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);

    axios
      .get(
        `https://a68bcbcd-460c-4e83-8310-0ce4ebf432f4.mock.pstmn.io/getDetails/${params.get(
          "id"
        )}`
      )
      .then(res => {
        this.setState({ reviewData: res.data });
      });
  }

  meetAgent = () => {
    const data = {
      id: this.state.orderId,
      address: this.state.address,
      dateOfMeeting: this.state.dom,
      timeOfMeeting: this.state.tom
    };
    axios
      .post(
        `https://a68bcbcd-460c-4e83-8310-0ce4ebf432f4.mock.pstmn.io/order/meeting`,
        data
      )
      .then(res => {
        this.props.history.push(`/confirmation?orderid=${this.state.orderId}`);
      });
  };

  validateEmail = () => {
    const validations = { ...this.state.validations };
    validations.email = isValidEmail(this.state.email);
    return validations.email;
  };
  validatePhone = () => {
    const validations = { ...this.state.validations };
    validations.phone = isValidPhoneNumber(this.state.phone);
    return validations.phone;
  };

  validateUserName = () => {
    const validations = { ...this.state.validations };
    validations.username = isValidUserName(this.state.username);
    return validations.username;
  };

  validateAddress = () => {
    const validations = { ...this.state.validations };
    validations.address = isValidUserName(this.state.address);
    return validations.address;
  };

  validateDom = () => {
    const validations = { ...this.state.validations };
    validations.dom = isValidUserName(this.state.dom);
    return validations.dom;
  };

  validateTom = () => {
    const validations = { ...this.state.validations };
    validations.tom = isValidUserName(this.state.tom);
    return validations.tom;
  };

  validateFields = e => {
    const { validations } = this.state;
    const keyName = e.target.getAttribute("name");
    if (keyName === "email") {
      validations.email = this.validateEmail();
    } else if (keyName === "phone") {
      validations.phone = this.validatePhone();
    } else if (keyName === "username") {
      validations.username = this.validateUserName();
    } else if (keyName === "address") {
      validations.address = this.validateAddress();
    } else if (keyName === "dom") {
      validations.dom = this.validateDom();
    } else if (keyName === "tom") {
      validations.tom = this.validateTom();
    } else {
      validations.codeForVerification = this.state.codeForVerification
        ? true
        : false;
    }
    this.setState({
      validations
    });
  };

  onChange = e => {
    this.setState({
      [e.target.getAttribute("name")]: e.target.value
    });
  };

  verifyEmail = () => {
    const { email, phone, username, reviewData } = this.state;
    const isValidEmail = this.validateEmail(false);
    const isValidPhone = this.validatePhone(false);
    const isValidUserName = this.validateUserName(false);
    if (isValidEmail && isValidPhone && isValidUserName) {
      console.log("valid, go ahead");
      const data = {
        id: reviewData.id,
        userName: username,
        emailId: email, //"vishnu.vijay@cleartrip.com",
        phoneNumber: phone
      };
      axios
        .post(
          `https://a68bcbcd-460c-4e83-8310-0ce4ebf432f4.mock.pstmn.io/communicationInformation`,
          { data }
        )
        .then(res => {
          this.setState({
            orderId: res.data.id,
            isEmailVerified: res.data.emailVerified === "verified",
            verificationCode: true
          });
        });
    } else {
      this.setState({
        validations: {
          email: isValidEmail,
          phone: isValidPhone,
          username: isValidUserName
        }
      });
    }
  };

  verifyEmailAfterCode = () => {
    const { codeForVerification } = this.state;

    if (!codeForVerification) {
      this.setState({
        validations: {
          codeForVerification: false,
          email: true,
          phone: true,
          username: true
        }
      });
    } else {
      console.log("api call");
      this.setState({
        validations: {
          codeForVerification: true,
          email: true,
          phone: true,
          username: true
        }
      });
      axios
        .get(
          `https://a68bcbcd-460c-4e83-8310-0ce4ebf432f4.mock.pstmn.io/verify/${
            this.state.orderId
          }/${this.state.codeForVerification}`
        )
        .then(res => {
          this.setState({
            orderId: res.data.id,
            isEmailVerified: res.data.emailVerified === "verified",
            verificationCode: false
          });
        });
    }
  };

  expandCollapse = view => {
    let order = ["review", "contact", "payment"];

    order = order.filter(o => {
      return o !== view;
    });

    this.setState({ [view]: "active" });

    for (let i = 0; i < order.length; i++) {
      this.setState({ [order[i]]: "collapsed" });
    }
  };

  render() {
    const { reviewData, isEmailVerified, verificationCode } = this.state;
    return (
      <div className="bg-grey">
        {/* Page Header */}
        <Header />

        <Container>
          {/* Page Title */}
          <Row className="my-40">
            <Col>
              <h1 className="fs-heading-3 c-black fw-700 mb-16">
                Complete your booking
              </h1>
              <p className="fs-heading c-grey-60 m-0">In 3 simple steps</p>
            </Col>
          </Row>

          {/* Itinerary */}
          <Row className="my-40">
            <Col>
              {/* Review Itinerary */}
              <If condition={this.state.review === "collapsed"}>
                <Fade
                  initialPose="in"
                  pose={this.state.review === "collapsed" ? "in" : "out"}
                >
                  <ItineraryCollapsed>
                    <Row>
                      <Col span={6} style={{ marginLeft: "-8px" }}>
                        <div
                          className="flex flex-middle pl-32"
                          style={{ height: "84px" }}
                        >
                          <img src={Check} alt="Application details" />
                          <p className="fs-body-2 c-grey-40 ml-24">
                            Application details
                          </p>
                        </div>
                      </Col>
                      <Col span={7}>
                        <div
                          className="flex flex-column flex-center"
                          style={{ height: "84px" }}
                        >
                          <p className="fs-body-2 fw-600 mb-4">Money back</p>
                          <p className="fs-caption-2 c-grey-40">
                            {reviewData && reviewData.policyCode}
                          </p>
                        </div>
                      </Col>

                      <Col span={5}>
                        <div
                          className="flex flex-middle"
                          style={{ height: "84px" }}
                        >
                          <p className="fs-body-2 fw-600 lh-0">
                            Rs {reviewData && reviewData.amountInvested}
                          </p>
                        </div>
                      </Col>
                      <Col span={2}>
                        <div
                          onClick={this.expandCollapse.bind(this, "review")}
                          className="flex flex-middle flex-right pr-32"
                          style={{ height: "84px" }}
                        >
                          <img src={Chev} alt="Application details" />
                        </div>
                      </Col>
                    </Row>
                  </ItineraryCollapsed>
                </Fade>
              </If>

              <If condition={this.state.review === "active"}>
                <ItineraryHeader step={1} active>
                  Review your policy details
                </ItineraryHeader>
              </If>

              <Collapse
                pose={this.state.review === "collapsed" ? "collapsed" : "open"}
              >
                <ItineraryBody>
                  <Row>
                    <Col span={6}>
                      <div
                        className="flex flex-center flex-middle bg-grey-05"
                        style={{
                          width: "200px",
                          height: "160px"
                        }}
                      />
                    </Col>
                    <Col span={18}>
                      <p className="fs-body-3 fw-600 mb-16">Money back</p>

                      <p className="fs-body-2 mb-12 ">
                        {reviewData && reviewData.policyCode}
                      </p>

                      <Divider className="my-20" />

                      <p className="fs-body mb-4">
                        {reviewData && reviewData.analysis}
                      </p>

                      <Divider className="my-20" />

                      <p className="mb-16 fs-body fw-600">
                        Total amount invested
                      </p>
                      <p className="fs-body mb-4">
                        {reviewData && reviewData.amountInvested}
                      </p>

                      <p className="mb-16 fs-body fw-600">Total Premium Paid</p>
                      <p className="fs-body mb-4">
                        {reviewData && reviewData.totalPremiumPaid}
                      </p>

                      <p className="mb-16 fs-body fw-600">
                        Total maturity amount invested
                      </p>
                      <p className="fs-body mb-4">
                        {reviewData && reviewData.totalMaturityAmount}
                      </p>

                      <p className="fs-caption-2 c-grey-40 mb-20">
                        Inclusive of all taxes
                      </p>

                      {/* <p className="fs-caption-2 c-grey-40 mb-20 lh-body">
                      Note: - The Visa Fee is non-refundable in case the visa application is not approved by the UAE Immigration authority Plus a refundable deposit might be applicable (Subject to specific nationals)
                    </p> */}

                      <Button
                        type="primary"
                        className="mt-24 pb-30"
                        onClick={() =>
                          this.setState({
                            review: "collapsed",
                            contact: "active"
                          })
                        }
                      >
                        Continue booking
                      </Button>
                    </Col>
                  </Row>
                </ItineraryBody>
              </Collapse>

              <If condition={this.state.contact === "collapsed"}>
                <ItineraryCollapsed>
                  <Row>
                    <Col span={6} style={{ marginLeft: "-8px" }}>
                      <div
                        className="flex flex-middle pl-32"
                        style={{ height: "84px" }}
                      >
                        <img src={Check} alt="Application details" />
                        <p className="fs-body-2 c-grey-40 ml-24">
                          Email Address
                        </p>
                      </div>
                    </Col>
                    <Col span={16}>
                      <div
                        className="flex flex-column flex-center"
                        style={{ height: "84px" }}
                      >
                        <p className="fs-body-2 fw-600 mb-4">
                          {this.state.email}
                        </p>
                        <p className="fs-caption-2 c-grey-40">
                          Updates will be sent to this Email address
                        </p>
                      </div>
                    </Col>
                    <Col span={2}>
                      <div
                        onClick={this.expandCollapse.bind(this, "contact")}
                        className="flex flex-middle flex-right pr-32"
                        style={{ height: "84px" }}
                      >
                        <img src={Chev} alt="Contact details" />
                      </div>
                    </Col>
                  </Row>
                </ItineraryCollapsed>
              </If>

              <If condition={this.state.contact === "inactive"}>
                <ItineraryHeader step={2}>
                  Add your email address
                </ItineraryHeader>
              </If>

              <If condition={this.state.contact === "active"}>
                <ItineraryHeader step={2} active>
                  Add your email address
                </ItineraryHeader>
              </If>

              <Collapse
                pose={
                  this.state.contact === "collapsed" ||
                  this.state.contact === "inactive"
                    ? "collapsed"
                    : "open"
                }
              >
                <ItineraryBody>
                  <Row className="mb-32">
                    <Col span={24} className="mb-10">
                      <Banner label="Note:">
                        <p>Updates will be sent to this email address</p>
                      </Banner>
                    </Col>

                    <Col span={24}>
                      <Alert show={isEmailVerified} variant="success">
                        <span>Your Email is verified now.</span>
                      </Alert>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={6} />
                    <Col span={10}>
                      {/* User Name */}
                      <div className="mb-28">
                        <Label className="mb-8" for="username">
                          User Name
                        </Label>
                        <Field
                          name="username"
                          id="username"
                          placeholder="Enter your full name"
                          value={this.state.username}
                          onChange={this.onChange}
                          onBlur={this.validateFields}
                        />
                        {!this.state.validations.username && (
                          <Banner
                            className="pa nml-20 nmb-20 c-red bg-transparent"
                            label=""
                          >
                            <p style={{ display: "inline" }}>
                              Please enter a user name
                            </p>
                          </Banner>
                        )}
                      </div>

                      {/* Email address */}
                      <div className="mb-28">
                        <Label className="mb-8" for="email">
                          Email address
                        </Label>
                        <Field
                          name="email"
                          id="email"
                          value={this.state.email}
                          onChange={this.onChange}
                          onBlur={this.validateFields}
                          placeholder="Enter your email address"
                        />
                        {!this.state.validations.email && (
                          <Banner
                            className="pa nml-20 nmb-20 c-red bg-transparent"
                            label=""
                          >
                            <p style={{ display: "inline" }}>
                              Please enter a valid email address
                            </p>
                          </Banner>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div className="mb-28">
                        <Label className="mb-8" for="phone">
                          Phone number
                        </Label>
                        <Row>
                          <Col span={7}>
                            <Field value="+91 (IN)" disabled />
                          </Col>
                          <Col span={12}>
                            <Field
                              name="phone"
                              id="phone"
                              value={this.state.phone}
                              onChange={this.onChange}
                              onBlur={this.validateFields}
                            />
                            {!this.state.validations.phone && (
                              <Banner
                                className="pa nml-20 nmb-20 c-red bg-transparent"
                                label=""
                              >
                                <p style={{ display: "inline" }}>
                                  Please enter a valid phone number
                                </p>
                              </Banner>
                            )}
                          </Col>
                          {!isEmailVerified && !verificationCode && (
                            <Col span={10}>
                              <ButtonStrap
                                type="primary"
                                className="mt-24"
                                onClick={this.verifyEmail}
                              >
                                Verify Email
                              </ButtonStrap>
                            </Col>
                          )}

                          {!isEmailVerified && verificationCode && (
                            <Col>
                              <Label
                                className="mt-12 c-green"
                                for="codeForVerification"
                              >
                                Enter Verification Code (Check your email)
                              </Label>

                              <Field
                                name="codeForVerification"
                                id="codeForVerification"
                                placeholder="Enter your verification code"
                                value={this.state.codeForVerification}
                                onChange={this.onChange}
                                onBlur={this.validateFields}
                              />
                              <ButtonStrap
                                type="primary"
                                className="mt-24"
                                onClick={this.verifyEmailAfterCode}
                              >
                                Validate
                              </ButtonStrap>
                              {!this.state.validations.codeForVerification && (
                                <Banner
                                  className="pa nml-20 nmb-20 c-red bg-transparent"
                                  label=""
                                >
                                  <p style={{ display: "inline" }}>
                                    Please enter the code
                                  </p>
                                </Banner>
                              )}
                            </Col>
                          )}
                        </Row>
                      </div>

                      {isEmailVerified && (
                        <Button
                          type="primary"
                          className="mt-24 pb-30"
                          onClick={() =>
                            this.setState({
                              review: "collapsed",
                              contact: "collapsed",
                              payment: "active"
                            })
                          }
                        >
                          Continue booking
                        </Button>
                      )}
                    </Col>
                  </Row>
                </ItineraryBody>
              </Collapse>

              <If condition={this.state.payment !== "active"}>
                <ItineraryHeader step={4} className="mb-16">
                  Pay to complete your booking
                </ItineraryHeader>
              </If>

              <If condition={this.state.payment === "active"}>
                <ItineraryHeader step={4} active>
                  Pay to complete your booking
                </ItineraryHeader>
              </If>

              <Collapse
                pose={this.state.payment === "active" ? "open" : "collapsed"}
              >
                <ItineraryBody>
                  <Row className="center">
                    <Col span={12}>
                      <Alert variant="success">
                        <Alert.Heading>Book youself an agent</Alert.Heading>
                        <p>
                          Book an agent, and he/she will come to you doorstep
                          with all the details and document.
                        </p>
                      </Alert>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={6} />
                    <Col span={12}>
                      {/* Address */}
                      <div className="mb-28">
                        <Label className="mb-8" for="address">
                          Address
                        </Label>
                        <Field
                          name="address"
                          id="address"
                          placeholder="Enter your full address"
                          value={this.state.address}
                          onChange={this.onChange}
                          onBlur={this.validateFields}
                        />
                        {!this.state.validations.address && (
                          <Banner
                            className="pa nml-20 nmb-20 c-red bg-transparent"
                            label=""
                          >
                            <p style={{ display: "inline" }}>
                              Please enter address
                            </p>
                          </Banner>
                        )}
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={6} />
                    <Col span={12}>
                      {/* Date of meeting */}
                      <div className="mb-28">
                        <Label className="mb-8" for="dom">
                          Date of meeting
                        </Label>
                        <Field
                          name="dom"
                          id="dom"
                          type="date"
                          placeholder="Enter your Date of meeting"
                          value={this.state.dom}
                          onChange={this.onChange}
                          onBlur={this.validateFields}
                        />
                        {!this.state.validations.dom && (
                          <Banner
                            className="pa nml-20 nmb-20 c-red bg-transparent"
                            label=""
                          >
                            <p style={{ display: "inline" }}>
                              Please enter your date of meeting
                            </p>
                          </Banner>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={6} />
                    <Col span={12}>
                      {/* Time of meeting */}
                      <div className="mb-28">
                        <Label className="mb-8" for="dom">
                          Time of meeting
                        </Label>
                        <Field
                          name="tom"
                          id="tom"
                          type="time"
                          placeholder="Enter your time of meeting"
                          value={this.state.tom}
                          onChange={this.onChange}
                          onBlur={this.validateFields}
                        />
                        {!this.state.validations.tom && (
                          <Banner
                            className="pa nml-20 nmb-20 c-red bg-transparent"
                            label=""
                          >
                            <p style={{ display: "inline" }}>
                              Please enter your time of meeting
                            </p>
                          </Banner>
                        )}
                      </div>
                    </Col>
                  </Row>

                  <Row className="center">
                    <Col span={12}>
                      <Button
                        type="primary"
                        className="mt-24 pb-30"
                        onClick={this.meetAgent}
                      >
                        Continue booking
                      </Button>
                    </Col>
                  </Row>
                </ItineraryBody>
              </Collapse>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default BookPolicy;
