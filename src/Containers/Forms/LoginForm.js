import React, { useEffect, useState } from "react";

import { Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useValidateFormForRegUsers } from "../../Hooks/usevalidateForm";

import { USER } from "../../Redux/constants/actionTypes";

function LoginForm() {
  const initialValues = {
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const errors = useValidateFormForRegUsers(formValues);
  const users = useSelector((state) => state.users);
  const navigate = useNavigate("/home");

  useEffect(() => {
    validateAndCheck();
  }, [formValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    validateAndCheck();
    if (Object.keys(errors).length !== 0) return;
    getUserInfo(formValues);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((formValues) => {
      return { ...formValues, [name]: value };
    });
    validateAndCheck();
  };

  const validateAndCheck = () => {
    setFormErrors(errors);
  };

  const getUserInfo = (formValues) => {
    const user = users.find(
      (user) => user.email === formValues.email.toLowerCase()
    );
    if (!user) {
      return setFormErrors({ email: "Email id doesn't exist!" });
    }
    if (user && user.password !== formValues.password)
      return setFormErrors({ password: "Incorrect password!" });
    const { id, email, name } = user;

    localStorage.setItem(USER, JSON.stringify({ id, email, name }));
    navigate("/home");
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="text-center">Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
        />
      </Form.Group>
      {formErrors.email && <Alert variant="danger">{formErrors.email}</Alert>}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
      </Form.Group>
      {formErrors.password && (
        <Alert variant="danger">{formErrors.password}</Alert>
      )}

      <div className="d-grid">
        <Button variant="primary" type="submit">
          Login
        </Button>
      </div>
    </Form>
  );
}

export default LoginForm;
