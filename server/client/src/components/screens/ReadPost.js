import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { Link, useHistory } from "react-router-dom";
import CreatePost from "./CreatePost";

const ReadPost = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch(
      "/readallpost"
      //, {
      //   headers: {
      //     Authorization: "Bearer " + localStorage.getItem("jwt")
      //   }
      //}
    )
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setData(result.posts);
      });
  }, []);

  return (
    <div className="grid-container">
      <div
        className="home"
        style={{
          flexGrow: "1",
          width: "70%"
        }}
      >
        {localStorage.getItem("type") == "admin" ? <CreatePost /> : <div />}

        <h4 className="home-card">All posts</h4>

        {data.map(item => {
          return (
            <div className="card home-card" key={item._id}>
              <h5
                style={{
                  padding: "24px",
                  paddingBottom: 12,
                  color: "#0078e2",
                  fontWeight: "600"
                }}
              >
                {/* <Link
                  style={{ color: "#0078e2", fontWeight: "600" }}
                  to={
                    item.postedBy._id !== state._id
                      ? "/profile/" + item.postedBy._id
                      : "/profile"
                  }
                > */}
                {item.postedBy.name}
                {/* </Link>{" "} */}
                {/* {item.postedBy._id == state._id && (
                  <i
                    className="material-icons"
                    style={{
                      float: "right",
                      color: "#000"
                    }}
                    onClick={() => deletePost(item._id)}
                  >
                    delete
                  </i>
                )} */}
              </h5>

              <div className="card-content" style={{ paddingTop: 0 }}>
                {/* 
              <i className="material-icons" style={{ color: "#0078e2" }}>
                favorite
              </i>
              */}
                <h6
                  style={{
                    fontWeight: "bold"
                  }}
                >
                  {item.title}
                </h6>
                <p>{item.body}</p>
                <div className="card-image">
                  {item.photo != "" && item.photo != "No photo" ? (
                    <img src={item.photo} />
                  ) : (
                    <div style={{ marginTop: 0 }} />
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px"
                  }}
                >
                  {" "}
                  {/* Likes displayer */}
                  <i
                    className="material-icons"
                    //   onClick={() => {
                    //     likePost(item._id);
                    //   }}
                  >
                    thumb_up
                  </i>
                  <h6
                    style={{
                      margin: "0px 0px 0px 15px"
                    }}
                  >
                    {item.likes.length} likes
                  </h6>
                </div>

                {item.comments.map(record => {
                  return (
                    <h6 key={record._id}>
                      <span style={{ fontWeight: 800 }}>
                        {record.postedBy.name}
                      </span>{" "}
                      {console.log(record.postedBy)}
                      {record.text}
                    </h6>
                  );
                })}
                {/* <form
                  id="comment"
                  onSubmit={e => {
                    e.preventDefault();
                    makeComment(e.target[0].value, item._id);
                    e.target[0].value = "";
                    M.toast({ html: "Comment posted" });
                  }}
                >
                  <input
                    id="comment_input"
                    type="text"
                    placeholder="Add a comment"
                  />
                </form> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReadPost;
