import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import UserContext from "./UserContext"
import { Authenticated } from "./Authenticated"
import { Unauthenticated } from "./Unauthenticated"
import { ApiHelper } from "./components";
import { Logout } from "./Logout";
import { Login } from "./Login";
import { EnvironmentHelper, UserHelper } from "./helpers"
import ReactGA from "react-ga";
import { PersonHelper } from "./helpers";
import { ChurchInterface } from "./appBase/interfaces";

interface Props { currentChurch: ChurchInterface }

export const ControlPanel = (props: Props) => {
  const location = useLocation();
  if (EnvironmentHelper.GoogleAnalyticsTag !== "") {
    ReactGA.initialize(EnvironmentHelper.GoogleAnalyticsTag);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
  React.useEffect(() => { if (EnvironmentHelper.GoogleAnalyticsTag !== "") ReactGA.pageview(location.pathname + location.search); }, [location]);

  let context = React.useContext(UserContext);
  PersonHelper.person = context.person;

  React.useEffect(() => {
    if (props.currentChurch) {
      if (props?.currentChurch?.id === UserHelper?.currentChurch?.id) {
        const church = {
          ...props.currentChurch,
          ...UserHelper.currentChurch
        }
        UserHelper.currentChurch = church;
        context.setChurch(church);
      } else {
        UserHelper.currentChurch = props.currentChurch;
        context.setChurch(props.currentChurch)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentChurch])

  return (
    <Routes>
      <Route path="/logout" element={<Logout />} />
      <Route path="/login/*" element={<Login />} />
      {getAuth()}
    </Routes>
  );
}

const getAuth = () => {
  if (ApiHelper.isAuthenticated) return <Route path="/*" element={<Authenticated />}></Route>
  else return <Route path="/*" element={<Unauthenticated />}></Route>
}
