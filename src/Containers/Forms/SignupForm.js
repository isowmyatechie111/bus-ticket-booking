import React, { useEffect, useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";

import { useValidateForm } from "../../Hooks/usevalidateForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, fetchUsers } from "../../Redux/actions/bookingAction";
import { v4 as uuid } from "uuid";

function SignupForm() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const errors = useValidateForm(formValues);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [users]);

  useEffect(() => {
    validateAndCheck();
  }, [formValues]);

  const userObj = (formValues) => {
    const { confirmPassword, email, ...otherFormValues } = formValues;
    return {
      id: uuid(),
      email: email.toLowerCase(),
      ...otherFormValues,
    };
  };

  const validateUser = (newUser) => {
    const userExist = users.filter((user) => {
      return user.email.includes(newUser.email.toLowerCase());
    });
    return userExist;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateAndCheck();

    if (Object.keys(errors).length !== 0) return;

    const newUser = userObj(formValues);
    const ifExist = validateUser(newUser);

    if (ifExist.length !== 0)
      return setFormErrors({ email: "Email id already exists!" });

    dispatch(addUser(newUser));
    return navigate("/");
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

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="Name">
        <Form.Label className="text-center">Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
        />
      </Form.Group>
      {formErrors.name && <Alert variant="danger">{formErrors.name}</Alert>}

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
      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          placeholder="Password"
          onChange={handleChange}
        />
      </Form.Group>
      {formErrors.confirmPassword && (
        <Alert variant="danger">{formErrors.confirmPassword}</Alert>
      )}
      <div className="d-grid">
        <Button variant="primary" type="submit">
          Create Account
        </Button>
      </div>
    </Form>
  );
}

export default SignupForm;
