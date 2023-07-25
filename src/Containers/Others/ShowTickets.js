import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Alert, Button, Modal } from "react-bootstrap";

import { bookingInfoData, totalTicketsArr } from "../../api/data";
import {
  addBusInfo,
  confirmBooking,
  fetchBusInfo,
  updateBusInfo,
} from "../../Redux/actions/bookingAction";
import { USER } from "../../Redux/constants/actionTypes";

function ShowTickets({ display, setDisplay, busId, showConfirmationModal }) {
  const user = JSON.parse(localStorage.getItem(USER));
  const dispatch = useDispatch();

  const [modalData, setModalData] = useState([]);
  const [error, setError] = useState("");
  const [selectedTickets, setSelectedTickets] = useState([]);
  // const [showWindow, setShowWindow] = useState(false); //as props needs //TODO
  // const [confirmationId, setConfirmationId] = useState("");

  const busInfo = useSelector((state) => state.busInfo);
  const busData = useSelector((state) => state.freshData); //for loading data

  useEffect(() => {
    dispatch(fetchBusInfo());
    getModalData(busId);
    console.log(display);
  }, [busId]);

  useEffect(() => {
    getModalData(busId);
  });

  const handleClose = () => {
    console.log(busInfo.length);
    clearData();
    dispatch(fetchBusInfo());
    setDisplay(false);
    //dispatch(clearData());
  };

  const clearData = () => {
    setError("");
    setSelectedTickets([]);
  };

  const handleConfirm = (data) => {
    if (selectedTickets?.length === 0) {
      setError("Kindly select atleast one ticket!");
      return;
    }

    constructDataObj(data, selectedTickets);

    constructBusInfo(data, selectedTickets);
  };

  const getModalData = (busId) => {
    // dispatch(fetchBusInfo());

    const dt = busInfo.filter((data) => data.busId === busId)[0];
    // alert(dt?.selectedTickets?.join(","));
    if (dt) return setModalData(dt);

    const dts = busData.filter((data) => data.busId === busId)[0];
    if (dts) return setModalData(dts);
  };

  const constructBusInfo = (data, selectedTickets) => {
    dispatch(fetchBusInfo());
    const items = busInfo.filter((item) => item.id === data.id);

    const tickets = items[0]
      ? [...items[0].bookedTickets, ...selectedTickets]
      : [...selectedTickets];

    let output = {
      availableTickets: data.totalTickets - tickets.length,
      isSeatsAvailable: data.totalTickets - tickets.length ? true : false,

      bookedTickets: [...tickets],
    };
    console.log(output);

    if (items.length > 0) dispatch(updateBusInfo({ ...data, ...output }));
    else dispatch(addBusInfo({ ...data, ...output }));
  };

  const constructDataObj = async (data, selectedTickets) => {
    const bookingInfo = bookingInfoData(user, data, selectedTickets);

    //setConfirmationId(bookingInfo.id);

    //setShowWindow(true);
    handleClose();

    dispatch(confirmBooking(bookingInfo));

    showConfirmationModal(bookingInfo.id);
  };

  //TODO :codeclean
  const handleTicketBooking = (e, ticketId) => {
    console.log(ticketId, selectedTickets);

    if (selectedTickets.length >= 10) {
      setError("You couldn't select more than 10 tickets at a time!");
      setSelectedTickets((selectedTickets) => {
        return selectedTickets.includes(ticketId)
          ? selectedTickets.filter((id) => id !== ticketId)
          : selectedTickets;
      });
      e.target.classList.remove("colorselection--green");
      selectedTickets.includes(ticketId) && setError("");
      return;
    }
    setError("");
    setSelectedTickets((selectedTickets) => {
      return selectedTickets.includes(ticketId)
        ? selectedTickets.filter((id) => id !== ticketId)
        : [...selectedTickets, ticketId];
    });
    e.target.classList.toggle("colorselection--green");
    selectedTickets < 10 && setError("");
    console.log(selectedTickets);
  };

  const disableSquare = (val) => {
    return modalData?.bookedTickets?.filter((item) => item === val)[0];
  };

  return (
    <Modal show={display} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <div>Bus Name :{modalData.busName} Travels</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div>
            From : {modalData.from} To : {modalData.to}{" "}
            <span style={{ float: "right" }}>
              Departure Time :{modalData.departureTime}
            </span>
            <div>
              {/* available Tickets:{modalData.calcAvailableTickets()} */}
              <span>Price: {modalData.fare * selectedTickets.length}</span>
              <span style={{ float: "right" }}>
                Selected Tickets: {selectedTickets.length}
              </span>
            </div>
            <div>Seat No's: {selectedTickets.join(",")}</div>
          </div>
          <div className="flex-box mt-20 color-next">
            {totalTicketsArr.map((val, i) => (
              <div
                key={val}
                id={val}
                className={disableSquare(val) ? "disabled-square" : ""}
                onClick={(e) => handleTicketBooking(e, val)}
              ></div>
            ))}
          </div>
          <div className="mt-20">
            {error && <Alert variant="danger">{error}</Alert>}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => handleConfirm(modalData)}>
          Confirm Booking
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ShowTickets;
