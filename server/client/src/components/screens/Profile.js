import React, { useEffect, useState, useContext, useCallback } from "react";
import { UserContext } from "../../App";

const Profile = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setData(result.mypost);
      });
  }, []);

  useEffect(() => {
    if (image) {
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
          fetch("/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
              pic: data.url
            })
          })
            .then(res => res.json())
            .then(result => {
              console.log(result);
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: "UPDATEPIC", payload: result.pic });
              //window.location.reload();
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [image]);

  const updatePhoto = file => {
    setImage(file);
  };

  return (
    <>
      {state ? (
        <div style={{ maxWidth: "70%", margin: "0px auto" }}>
          <div
            style={{
              margin: "18px 0px",
              borderBottom: "1px solid grey"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around"
              }}
            >
              <div>
                <div
                  className="file-field input-field"
                  style={{ margin: "10px" }}
                >
                  <div>
                    <div className="hvrbox">
                      <img
                        className="hvrbox-layer_bottom"
                        style={{
                          width: "160px",
                          height: "160px",
                          borderRadius: "80px"
                        }}
                        src={state ? state.pic : "loading"}
                      />
                      <div className="hvrbox-layer_top">
                        <div className="hvrbox-text">
                          Click to update
                          <input
                            type="file"
                            onChange={e => updatePhoto(e.target.files[0])}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="file-path-wrapper"
                    style={{ visibility: "hidden" }}
                  >
                    {/*Hidden for now*/}
                    <input className="file-path validate" type="text" />
                  </div>
                </div>
              </div>
              <div>
                <h4>{state ? state.name : "loading"}</h4>
                <h5>{state ? state.email : "loading"}</h5>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "108%"
                  }}
                >
                  <h6>{data.length} posts</h6>
                  <h6>{state ? state.followers.length : "0"} followers</h6>
                  <h6>{state ? state.following.length : "0"} following</h6>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="gallery">
            {mypics.map(item => {
              return item.photo != "No photo" ? (
                <img
                  key={item._id}
                  className="item"
                  src={item.photo}
                  alt={item.title}
                  style={{
                    maxWidth: "50%",
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
                  <p
                    style={{
                      fontWeight: "bold"
                    }}
                  >
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div> */}
        </div>
      ) : (
        <h2>Loading....</h2>
      )}
      {console.log(data.length)}

      {data.length == 0 ? (
        <h4 style={{ textAlign: "center" }}>No Posts Posted</h4>
      ) : (
        data.map(item => {
          return (
            <div className="card home-card" key={item._id}>
              {/* <h5
                style={{
                  padding: "24px",
                  paddingBottom: 12,
                  color: "#0078e2",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                {/* <Link
                to={
                  item.postedBy._id !== state._id
                    ? "/profile/" + item.postedBy._id
                    : "/profile"
                }
              > 
                {item.postedBy.name}
                {/* </Link>{" "} 
                {item.postedBy._id == state._id && (
                  <i
                    className="material-icons"
                    style={{
                      float: "right",
                      color: "#000"
                    }}
                    // onClick={() => deletePost(item._id)}
                  >
                    delete
                  </i>
                )}
              </h5> */}

              <div className="card-content" style={{ paddingTop: 12 }}>
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

                {/* {item.comments.map(record => {
                  return (
                    <h6 key={record._id}>
                      <span style={{ fontWeight: 800 }}>
                        {record.postedBy.name}
                      </span>{" "}
                      {console.log(record.postedBy.name)}
                      {record.text}
                    </h6>
                  );
                })} */}
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default Profile;
