import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import UserContext from "./UserContext"
import { Authenticated } from "./Authenticated"
import { Unauthenticated } from "./Unauthenticated"
import { ApiHelper } from "./components";
import { Logout } from "./Logout";
import { Login } from "./Login";
import { EnvironmentHelper } from "./helpers"
import ReactGA from "react-ga";

interface Props {
  path?: string;
}

export const ControlPanel = () => {
  const location = useLocation();
  if (EnvironmentHelper.GoogleAnalyticsTag !== "") {
    ReactGA.initialize(EnvironmentHelper.GoogleAnalyticsTag);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
  React.useEffect(() => { if (EnvironmentHelper.GoogleAnalyticsTag !== "") ReactGA.pageview(location.pathname + location.search); }, [location]);

  let user = React.useContext(UserContext).userName; //to force rerender on login
  if (user === null) return null;

  return (
    <Switch>
      <Route path="/logout"><Logout /></Route>
      <Route path="/login" component={Login} />
      <PrivateRoute path="/" />
    </Switch>
  );
}

const PrivateRoute: React.FC<Props> = ({ path }) => (
  <Route
    path={path}
    render={({ location }) => ApiHelper.isAuthenticated ? (<Authenticated location={location.pathname} />) : (<Unauthenticated />)}
  />
);
