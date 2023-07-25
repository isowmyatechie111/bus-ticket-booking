import React from "react";
import { Card } from "react-bootstrap";

import { checkTimeExceeds } from "../../DataFeedLogic/busDataFeedLogic";
import "../App.css";

function CreateCard({ info, fromBooking }) {
  console.log(info);
  if (!info) return;

  const {
    id,
    from,
    to,
    departureTime,
    bookedDate,
    date,
    amountPaid,
    busName,
    selectedTickets,
  } = info;
  return (
    <Card
      className="width-class"
      style={{
        background: `${
          !checkTimeExceeds(departureTime, date) && fromBooking
            ? "red"
            : "white"
        }`,
      }}
    >
      <Card.Body>
        <Card.Title>Invoice details</Card.Title>
        <Card.Text>
          <div>Bill No: {id?.slice(-10)}</div>
          <div> Bus name: {busName} Express</div>
          <div>Booking Date: {bookedDate} &nbsp;</div>
          <div>
            From: {from} To: {to}
          </div>
          <div>Departure Date: {date}</div>
          <div>Departure Time: {departureTime}</div>
          <div>Seat No's: {selectedTickets?.join(", ")}</div>
          <div>
            Amount paid:
            {amountPaid}
          </div>
          Journery Status:
          {checkTimeExceeds(departureTime, date) ? "Scheduled" : "Completed"}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CreateCard;
