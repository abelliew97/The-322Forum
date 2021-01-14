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
        alignItems: "center",
        verticalAlign: "center",
        display: "flex",
        flexDirection: "column"
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
      <span
        style={{
          backgroundColor: "#0078e2",
          color: "#fff",
          padding: "3px 10px",
          borderRadius: 20,
          marginBottom: 30
        }}
      >
        {localStorage.getItem("type") ? localStorage.getItem("type") : ""}
      </span>
      {/*Profile button */}
      <Link
        to="/profile"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "flex-start"
        }}
      >
        <i
          className="material-icons"
          style={{
            margin: "12px 10px"
          }}
        >
          perm_identity
        </i>
        <p>Profile</p>
      </Link>

      {/*Create Admin button */}
      {localStorage.getItem("type") == "moderator" && (
        <Link
          to="/create-admin"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-start"
          }}
        >
          <i
            className="material-icons"
            style={{
              margin: "12px 10px"
            }}
          >
            add
          </i>
          <p>Create Admins</p>
        </Link>
      )}

      {/*Logout button */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "flex-start"
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
            margin: "12px 10px"
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
