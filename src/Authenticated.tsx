import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { SettingsPage } from "./admin/settings/SettingsPage";
import { Home } from "./Home";
import { Header } from "./components";
import UserContext from "./UserContext";

interface Props {
    location: any;
}

export const Authenticated: React.FC<Props> = (props) => {
    var user = React.useContext(UserContext)?.userName; //to force rerender on login
    if (user || true) return (
        <>
            <Header></Header>
            <div className="container">
                <Switch>
                    <Route path="/login"><Redirect to={props.location} /></Route>
                    <Route path="/"><Home /></Route>
                    <Route path="/admin/settings"><SettingsPage /></Route>
                </Switch>

            </div>
        </>
    );
}

