import React from "react";

import { Col, Row, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import SignupForm from "../Forms/SignupForm";

function SignUp() {
  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-2 border-primary"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    Logo
                  </h2>
                  <div className="mb-3">
                    <SignupForm />
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account?? {""}
                        <Link to="/">Sign In</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignUp;
