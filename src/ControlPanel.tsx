import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import UserContext from "./UserContext"
import { Authenticated } from "./Authenticated"
import { Unauthenticated } from "./Unauthenticated"
import { ApiHelper } from "./components";
import { Logout } from "./Logout";
import { Login } from "./Login";
import { EnvironmentHelper } from "./helpers"
import ReactGA from "react-ga";

export const ControlPanel = () => {
  const location = useLocation();
  if (EnvironmentHelper.GoogleAnalyticsTag !== "") {
    ReactGA.initialize(EnvironmentHelper.GoogleAnalyticsTag);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
  React.useEffect(() => { if (EnvironmentHelper.GoogleAnalyticsTag !== "") ReactGA.pageview(location.pathname + location.search); }, [location]);

  let user = React.useContext(UserContext).user; //to force rerender on login
  if (user === null) console.log("User is null");

  return (
    <Routes>
      <Route path="/logout" element={<Logout />} />
      <Route path="/login" element={<Login />} />
      {getAuth()}
    </Routes>
  );
}

const getAuth = () => {
  if (ApiHelper.isAuthenticated) return <Route path="/*" element={<Authenticated />}></Route>
  else return <Route path="/*" element={<Unauthenticated />}></Route>
}
