import React, { Component, Fragment } from "react";
import { Container, Row, Col, Divider } from "@cleartrip/bento";
import Header from "../Header";

export default class Confirmation extends Component {
  componentDidMount() {
    // const params = new URLSearchParams(this.props.location.search);
    // axios
    //   .get(
    //     `https://a68bcbcd-460c-4e83-8310-0ce4ebf432f4.mock.pstmn.io/getDetails/${params.get(
    //       "id"
    //     )}`
    //   )
    //   .then(res => {
    //     this.setState({ reviewData: res.data });
    //   });
  }
  render() {
    return (
      <Fragment>
        {/* Page Header */}
        <Header />
        <Container>
          {/* Page Title */}
          <Row className="my-40">
            <Col>
              <h1 className="fs-heading-3 c-black fw-700 mb-12">
                Your booking is done
              </h1>
              <p className="fs-heading c-grey-60 m-0">
                Your Order ID is . All updates regarding the application will be
                sent to eesh.tyagi@gmail.com
              </p>
            </Col>
          </Row>

          {/* Main */}
          <div className="row my-40">
            <div className="col-16">
              <div className="bg-white p-32 mb-16">
                <p className="fs-heading c-black fw-700 mb-32">
                  Booking summary
                </p>

                {/* <If condition={!isLoading}>
                  <VisaSummary orderInfo={orderInfo} pageType="confirmation" />
                </If> */}

                <Divider className="my-32" />

                {/*  */}
                <p className="fs-body-2 c-grey-40">
                  <span className="c-black">Meeting Address:</span> kormanagala
                  near forum mall
                </p>
                <p className="fs-body-2 c-grey-40">
                  <span className="c-black">Agent Name:</span>vishnu
                </p>
                <p className="fs-body-2 c-grey-40">
                  <span className="c-black">Agent Email:</span>
                  vishnuvijay1905@gmail.com
                </p>
                <p className="fs-body-2 c-grey-40">
                  <span className="c-black">Agent Phone Number:</span>
                  +91-9008755515
                </p>
              </div>

              <div className="bg-white p-32 mb-32">
                <p className="fs-heading c-black fw-700 mb-32">
                  What you need to do next
                </p>

                <p className="fs-body-3 mb-40">
                  Upload your documents for the visa application. We need
                  scanned copies of your passport and passport size photograph.
                  Documents of parents/ legal guardians are required in the vent
                  of visa applications for minors.
                </p>
                {/* <p className="fs-body-2 c-grey-40 mb-40">
                  NOTE: You can upload the documents later, we will remind you
                  over mail
                </p> */}
              </div>
            </div>

            <div className="col-8">
              {/* Payment reciept */}
              <div className="bg-white p-32 mb-32">
                <p className="fs-heading c-black fw-700 mb-32">
                  Payment receipt
                </p>

                {/* <Mastercard /> */}

                <p className="fs-body-2 c-grey-40 mb-8 mt-16">Total charged</p>
                <p className="fs-body-3">
                  {/* AED {!isLoading && Number(orderInfo.paymentDetails.netPrice)} */}
                </p>

                <Divider className="my-20" />

                <p className="fs-body-2 c-grey-40 mb-16">Rate breakup</p>

                <div className="flex flex-middle flex-between mb-12">
                  <p className="fs-body-2 c-grey-40">Base price</p>
                  <p className="fs-body-2 c-grey-40">
                    {/* AED {!isLoading && orderInfo.visaOrder.price} */}
                  </p>
                </div>

                <div className="flex flex-middle flex-between mb-12">
                  <p className="fs-body-2 c-grey-40">Tax</p>
                  <p className="fs-body-2 c-grey-40">Inclusive</p>
                </div>

                <div className="flex flex-middle flex-between mb-12">
                  <p className="fs-body-2 c-grey-40">Discount</p>
                  <p className="fs-body-2  c-green">
                    {/* - AED {!isLoading && orderInfo.paymentDetails.discount} */}
                  </p>
                </div>

                <div className="flex flex-middle flex-between">
                  <p className="fs-body-2 c-grey-80 fw-500">Total</p>
                  <p className="fs-body-2 c-grey-80 fw-500">
                    AED{" "}
                    {/* {!isLoading && Number(orderInfo.paymentDetails.netPrice)} */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Fragment>
    );
  }
}
