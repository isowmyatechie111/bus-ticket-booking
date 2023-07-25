import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";

import Header from "../Navigation/Header";

import CreateCard from "../Others/CreateCard";
import { USER } from "../../Redux/constants/actionTypes";
import { getAllConfirmationData } from "../../Redux/actions/bookingAction";

function Bookings() {
  const [user, setUser] = useState("");
  const dispatch = useDispatch();

  const data = useSelector((state) =>
    state.getBookingConfirmationData.filter((item) => item.userid === user.id)
  );
  console.log(data, "awsfdbgfgfds");

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem(USER)));
    dispatch(getAllConfirmationData());
  }, []);

  const loadingStatus = data?.loadingStatus;

  if (loadingStatus === "loading") {
    return (
      <div className="todo-list">
        <div className="loader" />
      </div>
    );
  }
  return (
    <>
      <Header />

      <div className="parent">
        {data.map((item) => (
          <CreateCard info={item} fromBooking={true} />
        ))}
      </div>
    </>
  );
}

export default Bookings;
