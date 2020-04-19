import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Header from "../Header";
import Button from "react-bootstrap/Button";

export default class PolicyDetails extends Component {
  startBookFlow = () => {
    const params = new URLSearchParams(this.props.location.search);
    this.props.history.push(`/bookpolicy?id=${params.get("id")}`);
  };
  render() {
    return (
      <>
        <Header />
        <Container>
          <Button onClick={this.startBookFlow}>Book An Appointment</Button>
        </Container>
      </>
    );
  }
}
