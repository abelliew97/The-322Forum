import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    //callback to run code after url is set
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          title,
          body,
          pic: url
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            M.toast({ html: data.error });
          } else {
            //Success
            M.toast({ html: "Created post successfully!" });
            window.location.reload();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [url]);

  const postDetails = () => {
    if (image != "") {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "usmforum");
      data.append("cloud_name", "dfoc7c90v");

      fetch("https://api.cloudinary.com/v1_1/dfoc7c90v/image/upload", {
        method: "post",
        body: data
      })
        .then(res => res.json())
        .then(data => {
          console.log(url);
          setUrl(data.url);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      setUrl("No photo");
    }
  };

  return (
    <div
      className="card input-filed"
      style={{
        margin: "30px auto",
        width: "700px",
        maxWidth: "80%",
        padding: "20px",
        textAlign: "center"
      }}
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Body"
        value={body}
        onChange={e => setBody(e.target.value)}
      />

      <div className="file-field input-field">
        <div className="btn" style={{ backgroundColor: "#0078e2" }}>
          <span>Attachment</span>
          <input type="file" onChange={e => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>

      <button
        className="btn"
        style={{ backgroundColor: "#32cd32" }}
        onClick={() => postDetails()}
      >
        Post
      </button>
    </div>
  );
};

export default CreatePost;
