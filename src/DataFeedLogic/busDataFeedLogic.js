import { TIMES } from "../api/data";

const isToday = (formDate) => {
  const currentDate = new Date().toDateString();
  const selectedDate = formDate.toDateString();
  return [currentDate === selectedDate, selectedDate];
};

export const checkTimeExceeds = (time, selectedDate) => {
  const now = Date.now();
  const getDateAsString = new Date(selectedDate).toDateString();
  const fullTimeString = `${getDateAsString} ${time} GMT+0530 (India Standard Time)`;
  const departureTime = new Date(fullTimeString).getTime();
  // console.log(fullTimeString);
  if (now > departureTime) return false;

  return true;
};

export const feedData = (formDate) => {
  const [today, selectedDate] = isToday(formDate);

  //if (!today) return;

  const timesExceedsArray = TIMES.map((time) =>
    checkTimeExceeds(time, selectedDate)
  );
  return timesExceedsArray;
};
