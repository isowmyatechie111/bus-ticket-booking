import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { fetchUsers } from "../Redux/actions/bookingAction";
import { useDispatch } from "react-redux";

import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/LogIn";
import Home from "./Pages/Home";
import Bookings from "./Pages/Bookings";
import ProfileInfo from "./Pages/ProfileInfo";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <>
      <Routes>
        <Route path="/signin" exact={true} element={<SignUp />} />
        <Route path="/" exact={true} element={<Login />} />
        <Route
          path="/home"
          exact={true}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          exact={true}
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profileInfo"
          exact={true}
          element={
            <ProtectedRoute>
              <ProfileInfo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
