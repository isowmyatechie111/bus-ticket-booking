import { v4 as uuid } from "uuid";

export const busData = (name, date, time, fromTo, formDate, { from, to }) => {
  const data = {
    id: `${name}-${date}-${time}-${fromTo}`,
    busId: `${name}-${date}-${time}-${fromTo}`,
    busName: name,
    formDate,
    from,
    to,
    departureTime: time,
    fare: 750,
    bookedTickets: [],
    totalTickets: 10,

    isTicketsAvailable: function () {
      if (this.totalTickets > this.calcNoOfBookedTickets()) return true;
      return false;
    },

    calcNoOfBookedTickets: function () {
      //return this.bookedTickets.length;
      return 4;
    },
    calcAvailableTickets: function () {
      //console.log(this.totalTickets, this.calcNoOfBookedTickets());
      return this.totalTickets - this.calcNoOfBookedTickets();
    },
  };

  return data;
};

export const cities = ["Chennai", "Karaikal", "Tindivanam"];

export const TIMES = ["18:30:00", "21:30:00", "21:11:00"];

const TOTAL_TICKETS = 10;

export let totalTicketsArr = [];

for (let i = 1; i <= TOTAL_TICKETS; i++) {
  totalTicketsArr.push(i);
}

//export const user = JSON.parse(localStorage.getItem(USER));

export const bookingInfoData = (user, data, selectedTickets) => {
  const { busId, from, to, departureTime, fare, formDate, busName, loading } =
    data;
  return {
    id: uuid(),
    userid: user.id,
    userName: user.name,
    userEmail: user.email,
    busId,
    busName,
    bookedDate: new Date().toDateString(),
    from,
    to,
    departureTime,
    selectedTickets,
    amountPaid: fare * selectedTickets.length,
    date: new Date(formDate).toDateString(),
  };
};
