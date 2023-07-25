import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";

import { Button, Form, Alert } from "react-bootstrap";
import { TIMES, busData, cities } from "../../api/data";
import { feedData } from "../../DataFeedLogic/busDataFeedLogic";
import {
  displayList,
  fetchBusInfo,
  loadData,
  resetForm,
} from "../../Redux/actions/bookingAction";

function BusForm() {
  const initialValues = {
    from: "",
    to: "",
    selectedDate: new Date(),
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();

  const resetFormValue = useSelector((state) => state.resetForm);

  useEffect(() => {
    if (isSubmit) validateAndCheck();
  }, [formValues]);

  useEffect(() => {
    if (resetFormValue) clearForm();
  }, [resetFormValue]);

  useEffect(() => {
    dispatch(fetchBusInfo());
  }, []);

  const clearForm = () => {
    setFormValues(initialValues);
  };

  const handleSubmit = (e) => {
    setIsSubmit(true);
    dispatch(displayList(true));
    e.preventDefault();

    const errors = validateAndCheck();

    if (Object.keys(errors).length !== 0) {
      dispatch(displayList(false));

      return;
    }

    getBusList(formValues);
  };

  const handleChange = (e) => {
    dispatch(resetForm(false));
    dispatch(displayList(false));

    const { name, value } = e.target;

    setFormValues((formValues) => {
      return { ...formValues, [name]: value };
    });
  };

  const handleDate = (date) => {
    setFormValues((formValues) => {
      return { ...formValues, selectedDate: date };
    });
  };

  const validateAndCheck = () => {
    const errors = validateCity(formValues);
    setFormErrors(errors);
    return errors;
  };

  const validateCity = (formValues) => {
    const errors = {};
    if (!formValues.from) errors.from = "From place shouldn't be empty!";
    if (!formValues.to) errors.to = "To place shouldn't be empty!";
    if (formValues.from && formValues.from === formValues.to && formValues.to)
      errors.from = "You selected From and To as same city. Please check!";
    return errors;
  };
  const getBusList = (formValues) => {
    const toBeFeed = feedData(formValues.selectedDate);
    const NAMES = ["SPK", "SBL", "SSS"];

    dispatch(fetchBusInfo());
    const busDataList = toBeFeed
      .map((val, i) => {
        const name = NAMES[i];
        const time = TIMES[i];
        const givenDate = new Date(formValues.selectedDate).getDate();
        const fromTo = `${formValues.from.slice(0, 3)}-${formValues.to.slice(
          0,
          3
        )}`;
        if (!val) return false;
        return busData(
          name,
          givenDate,
          time,
          fromTo,
          formValues.selectedDate,
          formValues
        );
      })
      .filter((val) => {
        if (val) return val;
      });
    console.log(busDataList);

    dispatch(loadData(busDataList));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12">
          <Form.Group controlId="dob">
            <Form.Label className="mr-3">Select Date</Form.Label>

            <DatePicker
              name="selectedDate"
              showIcon
              selected={formValues.selectedDate}
              minDate={new Date()}
              maxDate={addDays(new Date(), 4)}
              onChange={(e) => handleDate(e)}
            />
          </Form.Group>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-6 ">
          <Form.Select
            aria-label="Default select example"
            onChange={handleChange}
            name="from"
            value={formValues.from}
          >
            <option defaultValue={formValues.from} value="">
              From
            </option>
            {cities.map((city, i) => (
              <option value={city} key={i}>
                {city}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="col-md-6 ">
          <Form.Select
            aria-label="Default select example"
            onChange={handleChange}
            name="to"
            value={formValues.to}
          >
            <option value="">To</option>
            {cities.map((city, i) => (
              <option value={city} key={"a" + i}>
                {city}
              </option>
            ))}
          </Form.Select>
        </div>
      </div>
      <br />
      {formErrors.from && <Alert variant="danger">{formErrors.from}</Alert>}

      {formErrors.to && <Alert variant="danger">{formErrors.to}</Alert>}
      <br />
      <div className="d-grid">
        <Button variant="info" type="submit">
          Click here to search 🚌 🚌 🚌
        </Button>
      </div>
    </Form>
  );
}

export default BusForm;
