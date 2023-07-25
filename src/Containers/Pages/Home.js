import React, { useEffect, useState } from "react";
import { Col, Row, Container, Card } from "react-bootstrap";

import { USER } from "../../Redux/constants/actionTypes";
// import { useSelector } from "react-redux";

import Header from "../Navigation/Header";
import BusList from "../Others/BusList";
import BusForm from "../Forms/BusForm";

function Home() {
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem(USER)));
  }, []);

  return (
    <div bg="dark">
      <Header />

      <div>
        <Container>
          <Row className=" d-flex justify-content-center align-items-center">
            <Col md={8} lg={6} xs={12}>
              <div className="border border-2 border-primary"></div>
              <Card className="shadow px-4">
                <Card.Body>
                  <div className="mb-3 mt-md-4">
                    <div className="mb-3">
                      <BusForm />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <BusList />
      </div>
    </div>
  );
}

export default Home;
