import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { Link, useHistory } from "react-router-dom";
import CreatePost from "./CreatePost";
import Left from "../screenComponents/left.js";
import Right from "../screenComponents/right.js";
import M from "materialize-css";

const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [isLoaded, setLoad] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setData(result.posts);
        setLoad(true);
        
        localStorage.setItem("filter", "all");
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
        const newData = data.map(item => {
          console.log(item);
          if (item._id == result._id) {
            console.log(result);
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
    <>
      {isLoaded?(
        <div className="grid-container">
        <Left />
  
        <div
          className="home"
          style={{
            flexGrow: "1",
            width: "70%"
          }}>
          {localStorage.getItem("type") == "admin" ||
          localStorage.getItem("type") == "moderator" ? (
            <CreatePost />
          ) : (
            <div />
          )}
  
          <h4 className="home-card">All posts</h4>
  
          {data.map(item => {
            return (
              <div className="card home-card" key={item._id}>
                <h5
                  style={{
                    padding: "24px",
                    paddingBottom: 12,
                    color: "#0078e2",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  <Link
                    style={{ color: "#0078e2", fontWeight: "600" }}
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
                        float: "right",
                        color: "#000"
                      }}
                      onClick={() => deletePost(item._id)}
                    >
                      delete
                    </i>
                  )}
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
                    {item.likes.includes(state._id) ? (
                      <i
                        className="material-icons"
                        onClick={() => {
                          unlikePost(item._id);
                        }}
                        style={{
                          color: "#0078e2"
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
                        <span style={{ fontWeight: 800 }}>
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
      ):(
        <div class="preloader-wrapper big active" style={{
          width:"100%",
          height:"100%",
          alignItems:"center",
          display: "flex",
              justifyContent: "space-around",
              margin: "18px 0px",
        }}>
        <div class="spinner-layer spinner-blue-only" style={{
          width:"10%",
          height:"10%",
          alignSelf:"center"
        }}>
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
      /* Loading screen above*/
      )}
      </>
  );
};

export default Home;
