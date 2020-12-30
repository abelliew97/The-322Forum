import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";

const NavBar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const renderList = () => {
    if (state) {
      //Signed in
      return [
        <li>
          <Link to="/profile">Profile</Link>
        </li>,
        <li>
          <Link to="/create">Post</Link>
        </li>,
        <li>
          <Link to="/followingPost">Following</Link>
        </li>,
        <li>
          <button
            className="btn waves-effect waves-light #64b5f6 blue lighten-2"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/signin");
              M.toast({ html: "Signed out." });
            }}
          >
            Logout
          </button>
        </li>
      ];
    } else {
      //Not signed in, prompt signin/up
      return [
        <li>
          <Link to="/signin">Sign in</Link>
        </li>,
        <li>
          <Link to="/signup">Sign up</Link>
        </li>
      ];
    }
  };

  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to={state ? "/" : "/signin"} className="brand-logo left">
          USMForum
        </Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
