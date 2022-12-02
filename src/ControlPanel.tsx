import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import UserContext from "./UserContext"
import { Authenticated } from "./Authenticated"
import { Unauthenticated } from "./Unauthenticated"
import { ApiHelper } from "./components";
import { Logout } from "./Logout";
import { Login } from "./Login";
import { DonationLanding } from "./donation-landing/DonationLanding";
import { EnvironmentHelper, UserHelper } from "./helpers"
import ReactGA from "react-ga";
import { PersonHelper } from "./helpers";
import { LoginUserChurchInterface } from "./appBase/interfaces";

interface Props { currentUserChurch: LoginUserChurchInterface }

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
    if (props.currentUserChurch) {
      if (props?.currentUserChurch?.church?.id === UserHelper?.currentUserChurch?.church?.id) {
        const church = {
          ...props.currentUserChurch,
          ...UserHelper.currentUserChurch
        }
        UserHelper.currentUserChurch = church;
        context.setUserChurch(church);
      } else {
        UserHelper.currentUserChurch = props.currentUserChurch;
        context.setUserChurch(props.currentUserChurch)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentUserChurch])

  return (
    <Routes>
      <Route path="/logout" element={<Logout />} />
      <Route path="/login/*" element={<Login />} />
      <Route path="/donation-landing" element={<DonationLanding />} />
      {getAuth()}
    </Routes>
  );
}

const getAuth = () => {
  if (ApiHelper.isAuthenticated) return <Route path="/*" element={<Authenticated />}></Route>
  else return <Route path="/*" element={<Unauthenticated />}></Route>
}
