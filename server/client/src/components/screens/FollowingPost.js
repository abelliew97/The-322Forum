import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import Left from "../screenComponents/left.js";
import Right from "../screenComponents/right.js";
import M from "materialize-css";

const FollowingPost = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("/followingpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setData(result.posts);
      });
  }, []);

  const likePost = id => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id
      })
    })
      .then(res => res.json())
      .then(result => {
        //   console.log(result)
        const newData = data.map(item => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const unlikePost = id => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id
      })
    })
      .then(res => res.json())
      .then(result => {
        //   console.log(result)
        const newData = data.map(item => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId,
        text
      })
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        const newData = data.map(item => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deletePost = postid => {
    fetch(`/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        const newData = data.filter(item => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };
  return (
    <div className="grid-container">
      <Left />

      <div
        className="home"
        style={{
          flexGrow: "1",
          width: "70%"
        }}
      >
        <h4 className="home-card">All followed posts</h4>
        {data.map(item => {
          return (
            <div className="card home-card" key={item._id}>
              {console.log(data)}
              <h5
                style={{
                  padding: "24px"
                }}
              >
                <Link
                  to={
                    item.postedBy._id !== state._id
                      ? "/profile/" + item.postedBy._id
                      : "/profile"
                  }
                >
                  {item.postedBy.name}
                </Link>{" "}
                {item.postedBy._id == state._id && (
                  <i
                    className="material-icons"
                    style={{
                      float: "right"
                    }}
                    onClick={() => deletePost(item._id)}
                  >
                    delete
                  </i>
                )}
              </h5>

              <div className="card-image">
                {item.photo != "" && item.photo != "No photo" ? (
                  <img src={item.photo} />
                ) : (
                  <div style={{ marginTop: -20 }} />
                )}
              </div>

              <div className="card-content">
                {/* 
              <i className="material-icons" style={{ color: "#64b5f6" }}>
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

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px"
                  }}
                >
                  {" "}
                  {/* Likes displayer */}
                  {item.likes.includes(state._id) ? (
                    <i
                      className="material-icons"
                      onClick={() => {
                        unlikePost(item._id);
                      }}
                      style={{
                        color: "#64b5f6"
                      }}
                    >
                      thumb_up
                    </i>
                  ) : (
                    <i
                      className="material-icons"
                      onClick={() => {
                        likePost(item._id);
                      }}
                    >
                      thumb_up
                    </i>
                  )}
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
                      <span style={{ fontWeight: 500 }}>
                        {record.postedBy.name}
                      </span>{" "}
                      {console.log(record.postedBy)}
                      {record.text}
                    </h6>
                  );
                })}
                <form
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
                </form>
              </div>
            </div>
          );
        })}
      </div>

      <Right />
    </div>
  );
};

export default FollowingPost;
