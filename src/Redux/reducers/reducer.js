import { actionTypes } from "../constants/actionTypes";

// const user = [
//   {
//     busId: "",
//     busName: "",
//     formDate: "",
//     departureTime: "",
//     fare: "",
//     bookedTickets: [],
//     calcTicketsAvailable: function () {
//       if (this.totalTickets > this.noOfBookedTickets) return true;
//       return false;
//     },
//     totalTickets: 10,
//     calcNoOfBookedTickets: function () {
//       return this.bookedTickets.length;
//       //  return 6;
//     },
//     calcAvailableTickets: function () {
//       return this.totalTickets - this.noOfBookedSeats;
//     },
//   },
// ];
export const userReducer = (users = [], { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_USERS:
      return payload;

    case actionTypes.ADD_USER:
      return [...users, payload];

    default:
      return users;
  }
};

export const busInfoReducer = (busInfo = [], { type, payload }) => {
  console.log(payload, type);

  switch (type) {
    case actionTypes.UPDATE_BOOKING:
      console.log(busInfo);
      console.log(payload);
      return busInfo;

    case actionTypes.FETCH_BUS_INFO:
      return payload;

    default:
      return busInfo;
  }
};

export const freshDataReducer = (freshData = [], { type, payload }) => {
  console.log(payload);
  switch (type) {
    case actionTypes.LOAD_FRESH_BUS_DATA:
      return payload;

    case actionTypes.CLEAR_DATA:
      return [];

    default:
      return freshData;
  }
};
export const freshDataCopyReducer = (freshData = [], { type, payload }) => {
  switch (type) {
    case actionTypes.LOAD_FRESH_BUS_DATA:
      return payload;

    default:
      return freshData;
  }
};

export const bookingInfoReducer = (bookingInfo = [], { type, payload }) => {
  switch (type) {
    case actionTypes.CONFIRM_BOOKING:
      return [...bookingInfo, { ...payload, loading: "idle" }];

    case actionTypes.LOADING:
      return [...bookingInfo, { ...payload, loading: "loading" }];
    default:
      return bookingInfo;
  }
};

export const fetchConfirmationInfoReducer = (data = [], { type, payload }) => {
  switch (type) {
    case actionTypes.CONFIRMATION_INFO:
      return payload;

    default:
      return data;
  }
};

export const resetFormReducer = (data = false, { type, payload }) => {
  //NEEDS TODO
  if (type === actionTypes.RESET_FORM) {
    return payload;
  }

  return data;
};

export const displayListReducer = (data = false, { type, payload }) => {
  if (type === actionTypes.DISPLAY_LIST) {
    return payload;
  }

  return data;
};
