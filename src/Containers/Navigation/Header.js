import React, { useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { USER } from "../../Redux/constants/actionTypes";

function Header() {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem(USER))
  );
  const location = useLocation();
  const navigate = useNavigate();

  const activeKey = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem(USER);
    return navigate("/");
  };
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          {/* <Navbar.Brand>Bus Booking App</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav activeKey={activeKey} className="me-auto">
              <Nav.Link as={Link} eventKey="/home" to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={Link} eventKey="/profileInfo" to="/profileInfo">
                Profile Information
              </Nav.Link>
              <Nav.Link as={Link} eventKey="/bookings" to="/bookings">
                Bookings
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Brand className="justify-content-end">
            Welcome, {user.name}
            {""}
          </Navbar.Brand>
          <Navbar.Brand className="justify-content-end">
            <Button variant="info" onClick={handleLogout}>
              Logout
            </Button>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
