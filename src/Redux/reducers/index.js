import { combineReducers } from "redux";

import {
  bookingInfoReducer,
  busInfoReducer,
  displayListReducer,
  fetchConfirmationInfoReducer,
  freshDataCopyReducer,
  freshDataReducer,
  resetFormReducer,
  userReducer,
} from "./reducer";

export const reducers = combineReducers({
  users: userReducer,
  freshData: freshDataReducer,
  freshDataCopy: freshDataCopyReducer,
  busInfo: busInfoReducer,
  bookingInfo: bookingInfoReducer,
  getBookingConfirmationData: fetchConfirmationInfoReducer,
  resetForm: resetFormReducer,
  displayList: displayListReducer,
});

export default reducers;
