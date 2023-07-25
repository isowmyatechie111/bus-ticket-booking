import axios from "../../api/server";
import { actionTypes } from "../constants/actionTypes";

export const fetchUsers = () => async (dispatch, getState) => {
  const res = await axios.get("/users");

  dispatch({
    type: actionTypes.FETCH_USERS,
    payload: res.data,
  });
};

export const addUser = (user) => async (dispatch, getState) => {
  const res = await axios.post("/users", user);
  dispatch({
    type: actionTypes.ADD_USER,
    payload: res.data,
  });
};

export const loadData = (payload) => {
  return {
    type: "LOAD_FRESH_BUS_DATA",
    payload,
  };
};

export const confirmBooking = (data) => {
  return async (dispatch) => {
    dispatch(confirmationLoading(data));
    const res = await axios.post(`/bookingInfo/`, data);
    dispatch({
      type: actionTypes.CONFIRM_BOOKING,
      payload: res.data,
    });
  };
};

export const addBusInfo = (busInfo) => {
  console.log(busInfo);
  return async (dispatch) => {
    const res = await axios.post("/busInfo", busInfo);
    console.log(res.data);
    dispatch({
      type: actionTypes.CONFIRM_BOOKING,
      payload: res.data,
    });
  };
};
export const updateBusInfo = (busInfo) => {
  console.log(busInfo);
  return async (dispatch) => {
    const res = await axios.put(`/busInfo/${busInfo.busId}`, busInfo);
    console.log(res.data);
    dispatch({
      type: actionTypes.UPDATE_BOOKING,
      payload: res.data,
    });
  };
};

export const fetchBusInfo = () => {
  return async (dispatch) => {
    const res = await axios.get("/busInfo");

    dispatch({
      type: actionTypes.FETCH_BUS_INFO,
      payload: res.data,
    });
  };
};

export const getAllConfirmationData = () => {
  return async (dispatch) => {
    const res = await axios.get(`/bookingInfo/`);
    dispatch({
      type: actionTypes.CONFIRMATION_INFO,
      payload: res.data,
    });
  };
};

export const confirmationLoading = () => {
  return {
    type: actionTypes.LOADING,
  };
};

export const clearData = () => {
  //CHECK
  return {
    type: actionTypes.CLEAR_DATA,
  };
};

export const resetForm = (payload) => {
  //CHECK
  return {
    type: actionTypes.RESET_FORM,
    payload,
  };
};

export const displayList = (payload) => {
  return {
    type: actionTypes.DISPLAY_LIST,
    payload,
  };
};
