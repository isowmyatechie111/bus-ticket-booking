import React, { useEffect, useState, useSyncExternalStore } from "react";
import Header from "../Navigation/Header";
import { USER } from "../../Redux/constants/actionTypes";
import { Card } from "react-bootstrap";

function ProfileInfo() {
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem(USER)));
  }, []);

  return (
    <>
      <Header />
      <Card>
        <Card.Body className="justify-content-center">
          <Card.Title style={{ marginLeft: "40%" }}>
            <div style={{ padding: "30px" }}>Name: {user.name}</div>
            <div>Email: {user.email}</div>
          </Card.Title>
        </Card.Body>
      </Card>
    </>
  );
}

export default ProfileInfo;
