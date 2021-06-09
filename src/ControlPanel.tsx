import React from "react";
import { Switch, Route } from "react-router-dom";
import UserContext from "./UserContext"
import { Authenticated } from "./Authenticated"
import { Unauthenticated } from "./Unauthenticated"
import { ApiHelper } from "./components";
import { Logout } from "./Logout";
import { Login } from "./Login";

interface Props {
    path?: string;
}

export const ControlPanel = () => {
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
