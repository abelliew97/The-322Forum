import React, { useContext, useRef, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";

const NavBar = () => {
  const searchModal = useRef(null);
  const [search, setSearch] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const [userDetailPerm, setUserDetailPerm] = useState(false);
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);

  const renderList = () => {
    if (state) {
      //Signed in
      return [
        // <li key="1">
        //   {/* <div style={{
        //     minWidth:"200px",
        //     height:"50px",
        //     border:"1px solid gray",
        //     borderRadius:"20px",
        //     //marginTop:"6px",
        //     justifyContent:"center",
        //     backgroundColor:"white",
        //     margin:"6px 20px 0px 0px"
        //   }}> */}
        //   {/* Inner content of search bar */}
        //   <a class="waves-effect waves-light btn">
        //     {/* <div
        //       style={{
        //         margin: "-7px 10px 5px 15px",
        //         display: "grid",
        //         maxWidth: "500px",
        //         width: "30%"
        //       }}
        //     > */}
        //     <i
        //       data-target="modal1"
        //       style={{
        //         display: "grid",
        //         width: "100%"
        //       }}
        //     >
        //       <i
        //         data-target="modal1"
        //         class="material-icons left modal-trigger"
        //         style={{ color: "black", gridColumn: "1" }}
        //       >
        //         search
        //       </i>

        //       <p
        //         data-target="modal1"
        //         style={{
        //           gridColumn: "2",
        //           color: "gray",
        //           float: "left",
        //           verticalAlign: "middle",
        //           margin: "0",
        //           padding: "0",
        //           fontSize: "15px",
        //           fontStyle: "normal"
        //         }}
        //       >
        //         {localStorage.getItem("searchItem")}
        //       </p>
        //     </i>
        //     {/* </div> */}
        //   </a>
        //   {/* </div> */}
        // {/* </div> */}
        // </li>
        // <li key="1">
        //   <i
        //     data-target="modal1"
        //     className="large material-icons modal-trigger"
        //     style={{ color: "black" }}
        //   >
        //     search
        //   </i>

        // </li>
        <a data-target="modal1" class="modal-trigger">
          <i
            style={{ marginRight: 5 }}
            data-target="modal1"
            class="material-icons left modal-trigger"
          >
            search
          </i>
          Search
        </a>
      ];
    } else {
      //Not signed in, prompt signin/up
      return [
        <li key="6">
          <Link to="/read-post">Posts</Link>
        </li>,
        <li key="7">
          <Link to="/signin">Sign in</Link>
        </li>,
        <li key="8">
          <Link to="/signup">Sign up</Link>
        </li>
      ];
    }
  };

  const fetchUsers = query => {
    setSearch(query);
    fetch("/search-users", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query
      })
    })
      .then(res => res.json())
      .then(results => {
        setUserDetails(results.user);
        setUserDetailPerm(true);
      });
  };

  const closeModalSteps = () => {
    setUserDetails([]);
    setUserDetailPerm(false);
    setSearch("");
  };

  return (
    <nav
      style={{
        position: "fixed",
        zIndex: "100",
        // backgroundColor: "#64b5f6",
        backgroundColor: "#fff",
        top: "0"
      }}
    >
      <div className="nav-wrapper">
        <Link
          to={state ? "/" : "/signin"}
          className="brand-logo left"
          style={{
            display: "block",
            margin: "auto 20px",
            fontFamily: "'Libre Baskerville', serif"
          }}
        >
          <img
            src="/images/USMForum.png"
            style={{ height: "50px", marginTop: 5, marginLeft: 50 }}
          />
        </Link>

        <ul
          id="nav-mobile"
          className="right"
          style={{
            alignItems: "center"
          }}
        >
          {renderList()}
        </ul>
      </div>

      <div
        id="modal1"
        className="modal"
        ref={searchModal}
        style={{ color: "black" }}
      >
        <div className="modal-content">
          <input
            type="text"
            placeholder="search users"
            value={search}
            onChange={e => {
              fetchUsers(e.target.value);
              localStorage.setItem("searchItem", e.target.value);
            }}
          />
          <ul
            className="collection"
            style={{
              marginTop: "-6px",
              marginRight: 20
            }}
          >
            {userDetails &&
              userDetails.map(item => {
                return (
                  <Link
                    className="modal-close"
                    to={
                      item._id !== state._id
                        ? "/profile/" + item._id
                        : "/profile"
                    }
                    onClick={() => {
                      M.Modal.getInstance(searchModal.current).close();
                      setSearch("");
                      setUserDetails([]);
                    }}
                  >
                    <p
                      style={{
                        background: "#FAFAFA"
                      }}
                      className="collection-item"
                    >
                      {item.name}
                    </p>
                  </Link>
                );
              })}
          </ul>
        </div>
        <div className="modal-footer">
          <button
            className="modal-close waves-effect waves-green btn-flat"
            onClick={() => closeModalSteps()}
          >
            close
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
