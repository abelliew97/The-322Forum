import React, { useState, useEffect, useContext } from "react";
import M from "materialize-css";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";

const Left = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();

  return (
    <div
      className="left-bar"
      style={{
        flexGrow: "1",
        borderRight: "1px solid gray",
        padding: "10px",
        minWidth: "15%",
        display: "inline-list-item",
        alignItems: "start",
        verticalAlign: "center"
      }}
    >
      <img
        src={
          localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user")).pic
            : ""
        }
        style={{
          height: "100px",
          width: "100px",
          borderRadius: "50px",
          margin: "0 auto",
          display: "block"
        }}
      />

      <h6
        style={{
          width: "100%",
          margin: "20px auto",
          textAlign: "center",
          verticalAlign: "middle",
          fontWeight: "bold"
        }}
      >
        {localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).name
          : ""}
      </h6>

      {/*Profile button */}
      <Link
        to="/profile"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <i
          className="material-icons"
          style={{
            margin: "10px 20px"
          }}
        >
          perm_identity
        </i>
        <p>Profile</p>
      </Link>

      {/*Logout button */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center"
        }}
        onClick={() => {
          localStorage.clear();
          dispatch({ type: "CLEAR" });
          history.push("/signin");
          M.toast({ html: "Signed out." });
        }}
      >
        <i
          className="material-icons"
          style={{
            margin: "10px 20px"
          }}
        >
          exit_to_app
        </i>
        <p style={{ cursor: "pointer" }}>Logout</p>
      </div>
    </div>
  );
};

export default Left;
