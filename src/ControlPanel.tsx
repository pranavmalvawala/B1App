import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import UserContext from "./UserContext"
import { Authenticated } from "./Authenticated"
import { ApiHelper } from "./components";
import { Logout } from "./Logout";
import { Login } from './Login';

interface Props {
    path?: string;
}

export const ControlPanel = () => {
    var user = React.useContext(UserContext).userName; //to force rerender on login
    if (user === null) return null;

    return (
        <Switch>
            <Route path="/logout"><Logout /></Route>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/" />
        </Switch>
    );
}

const PrivateRoute: React.FC<Props> = ({ path }) => {
    return (
        <Route
            path={path}
            render={({ location }) => {
                return ApiHelper.isAuthenticated ? (<Authenticated location={location.pathname} />) :
                    (<Redirect to={{ pathname: "/login", state: { from: location } }} />);
            }}
        />
    );
};