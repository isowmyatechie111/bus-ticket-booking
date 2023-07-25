import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { clearData } from "../../Redux/actions/bookingAction";
import CreateCard from "./CreateCard";

const Confirmation = ({ show, setShow, confirmationId }) => {
  const dispatch = useDispatch();

  const info = useSelector(
    (state) => state.bookingInfo.filter((item) => item.id === confirmationId)[0]
  );

  useEffect(() => {
    dispatch(clearData());
  }, []);

  const loadingStatus = info?.loadingStatus;

  if (loadingStatus === "loading") {
    return (
      <div className="todo-list">
        <div className="loader" />
      </div>
    );
  }

  const handleCloseConfirmationWindow = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleCloseConfirmationWindow}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div>Name: {info?.userName}</div>
            <div> Email: {info?.userEmail}</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateCard info={info} />
          <div></div>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <div className="alert alert-info">
              Thank You! Bonvoyage! (Happy Journery) 💥💥💥{" "}
            </div>
          </div>
          <Button variant="success" onClick={handleCloseConfirmationWindow}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Confirmation;
