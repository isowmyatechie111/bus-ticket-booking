import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import BusTable from "./BusTable";

function BusList() {
  return (
    <Container className="pad-20">
      <Row className=" d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <BusTable />
        </Col>
      </Row>
    </Container>
  );
}

export default BusList;
