import React, { useEffect, useState, useContext, useCallback } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const [userProfile, setProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  const [showfollow, setShowFollow] = useState(
    state ? !state.following.includes(userid) : true
  );
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(result => {
        setProfile(result);
      });
  }, []);

  const followUser = () => {
    console.log(userid);
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        followId: userid,
        followName: userProfile.user.name
      })
    })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers }
        });
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers }
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile(prevState => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id]
            }
          };
        });
        setShowFollow(false);
      });

    localStorage.setItem(
      "followingNames",
      localStorage.getItem("followingNames") + userProfile.user.name
    );
  };

  const unfollowUser = () => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        unfollowId: userid,
        unfollowName: userProfile.user.name
      })
    })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers }
        });
        localStorage.setItem("user", JSON.stringify(data));

        setProfile(prevState => {
          const newFollower = prevState.user.followers.filter(
            item => item != data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower
            }
          };
        });
        setShowFollow(true);
      });

    //Set local storage
    localStorage.setItem(
      "followingNames",
      localStorage
        .getItem("followingNames")
        .replace([userProfile.user.name + ","], "")
    );

    //***********************MAY NEED TO REMOVE ID FROM USER OBJECT TOO IF NEEDED */
    console.log(
      localStorage
        .getItem("followingNames")
        .replace([userProfile.user.name + ","], "")
    );
  };

  return (
    <>
      {userProfile ? (
        <div style={{ maxWidth: "80%", margin: "0px auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "18px 0px",
              borderBottom: "1px solid grey"
            }}
          >
            <div>
              <img
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "75px"
                }}
                src={userProfile.user.pic}
              />
            </div>
            <div>
              <h4>{userProfile.user.name}</h4>
              <h4>{userProfile.user.email}</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "106%"
                }}
              >
                <h6>{userProfile.posts.length} posts</h6>
                <h6>{userProfile.user.followers.length} followers</h6>
                <h6>{userProfile.user.following.length} following</h6>
              </div>
              {showfollow ? (
                <button
                  style={{
                    margin: "10px"
                  }}
                  className="btn waves-effect waves-light #64b5f6 blue darken-1"
                  onClick={() => followUser()}
                >
                  Follow
                </button>
              ) : (
                <button
                  style={{
                    margin: "10px"
                  }}
                  className="btn waves-effect waves-light #64b5f6 blue darken-1"
                  onClick={() => unfollowUser()}
                >
                  UnFollow
                </button>
              )}
            </div>
          </div>

          {/* <div className="gallery">
            {userProfile.posts.map(item => {
              return item.photo != "No photo" ? (
                <img
                  key={item._id}
                  className="item"
                  src={item.photo}
                  alt={item.title}
                  style={{
                    width: "300px",
                    margin: "10px 10px 10px 10px"
                  }}
                />
              ) : (
                <div
                  style={{
                    maxWidth: "50%",
                    margin: "10px 10px 10px 10px",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <p>{item.title}</p>
                </div>
              );
            })}
          </div> */}
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
      {userProfile ? (
        userProfile.posts.map(item => {
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
                {item.postedBy.name}

                {item.postedBy._id == state._id && (
                  <i
                    className="material-icons"
                    style={{
                      float: "right"
                    }}
                    // onClick={() => deletePost(item._id)}
                  >
                    delete
                  </i>
                )}
              </h5>

              <div className="card-content" style={{ paddingTop: 0 }}>
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
                      // onClick={() => {
                      //   unlikePost(item._id);
                      // }}
                      style={{
                        color: "#0078e2"
                      }}
                    >
                      thumb_up
                    </i>
                  ) : (
                    <i
                      className="material-icons"
                      // onClick={() => {
                      //   likePost(item._id);
                      // }}
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
                      <span style={{ fontWeight: "800" }}>
                        {record.postedBy.name}
                      </span>{" "}
                      {console.log(record.postedBy.name)}
                      {record.text}
                    </h6>
                  );
                })}
              </div>
            </div>
          );
        })
      ) : (
        <h4 style={{ textAlign: "center" }}>No Posts Posted</h4>
      )}
    </>
  );
};

export default UserProfile;
