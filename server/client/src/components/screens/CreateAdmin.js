import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Left from "../screenComponents/left.js";
import Right from "../screenComponents/right.js";
import M from "materialize-css";

const CreateAdmin = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [_type, setType] = useState("admin");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);

  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]);

  const uploadPic = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "usmforum");
    data.append("clooud_name", "dfoc7c90v");
    fetch("https://api.cloudinary.com/v1_1/dfoc7c90v/image/upload", {
      method: "post",
      body: data
    })
      .then(res => res.json())
      .then(data => {
        setUrl(data.url);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const uploadFields = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "invalid email", classes: "#c62828 red darken-3" });
      return;
    }
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        password,
        email,
        pic: url,
        _type
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-3" });
        } else {
          M.toast({ html: data.message, classes: "#43a047 green darken-1" });
          window.reload();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const PostData = () => {
    if (image) {
      uploadPic();
    } else {
      uploadFields();
    }
  };

  return (
    <div style={{ height: "100%" }} className="grid-container">
      <Left />
      <div
        className="home"
        style={{
          flexGrow: "1",
          width: "70%"
        }}
      >
        <div className="parentCard" style={{ height: "100%" }}>
          <div className="card auth-card input-field">
            <img src="/images/USMForum.png" style={{ height: "150px" }} />

            {/* 
                <h2 style={{
                    fontFamily:"'Libre Baskerville', serif"
                }}>USMForum</h2>
                */}

            <input
              type="text"
              placeholder="username"
              value={name}
              onChange={e => setName(e.target.value)}
            ></input>

            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <div className="file-field input-field">
              <div className="btn #64b5f6 blue darken-1">
                <span>Upload pic</span>
                <input
                  type="file"
                  onChange={e => setImage(e.target.files[0])}
                />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            </div>

            <button
              className="btn "
              style={{ backgroundColor: "#32cd32" }}
              onClick={() => PostData()}
            >
              Sign up Admin
            </button>
          </div>
        </div>
      </div>
      <Right />
    </div>
  );
};

export default CreateAdmin;
