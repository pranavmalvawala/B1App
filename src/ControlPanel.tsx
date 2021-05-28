import React from "react";
import UserContext from "./UserContext"
import { Authenticated } from "./Authenticated"
import { Unauthenticated } from "./Unauthenticated"
import { ApiHelper } from "./components";
import { Switch, Route, useLocation } from "react-router-dom";
import { Logout } from "./Logout";

export const ControlPanel = () => {
    const location = useLocation();
    var user = React.useContext(UserContext).userName; //to force rerender on login
    if (user === null) return null;


    const getHandler = () => { return (!ApiHelper.isAuthenticated) ? <Unauthenticated /> : <Authenticated location={location.pathname}></Authenticated>; }
    return (
        <Switch>
            <Route path="/logout"><Logout /></Route>
            <Route path="/">{getHandler()}</Route>
        </Switch>
    );
}
