import "./App.css";
import NavBar from "./components/Navbar";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./components/screens/Home";
import Signin from "./components/screens/Signin";
import Profile from "./components/screens/Profile";
import Signup from "./components/screens/Signup";
import UserProfile from "./components/screens/UserProfile";
import CreatePost from "./components/screens/CreatePost";
import FollowingPost from "./components/screens/FollowingPost";
import ReadPost from "./components/screens/ReadPost";
import CreateAdmin from "./components/screens/CreateAdmin";
import React, { useEffect, createContext, useReducer, useContext } from "react";
import { reducer, initialState } from "./reducers/userReducer";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      //Signed in
      dispatch({ type: "USER", payload: user });
    } else {
      //Not signed in
      history.push("/signin");
    }
  }, []);

  return (
    <Switch style={{ marginTop: "70px", paddingTop: "70px" }}>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/read-post">
        <ReadPost />
      </Route>

      <Route path="/create-admin">
        <CreateAdmin />
      </Route>

      <Route path="/signin">
        <Signin />
      </Route>

      <Route path="/signup">
        <Signup />
      </Route>

      <Route path="/profile/:userid">
        <UserProfile />
      </Route>

      <Route exact path="/profile">
        <Profile />
      </Route>

      <Route path="/create">
        <CreatePost />
      </Route>

      <Route path="/followingPost">
        <FollowingPost />
      </Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <div style={{ paddingTop: "68px", height: "100%" }}>
          <Routing />
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
