import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import { USER } from "../../Redux/constants/actionTypes";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem(USER))
  );

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
