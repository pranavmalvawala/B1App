import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { SettingsPage } from "./admin/settings/SettingsPage";
import { Home } from "./Home";
import { Page } from "./Page";
import { CheckinPage } from "./checkin/CheckinPage";
import UserContext from "./UserContext";
import { Header } from "./components";
import { DonationPage } from "./donation/DonationPage";
import { DirectoryPage } from "./directory/DirectoryPage"
import { StreamPage } from "./stream/StreamPage"

interface Props {
    location: any;
}

export const Authenticated: React.FC<Props> = (props) => {
  let user = React.useContext(UserContext)?.userName; //to force rerender on login
  if (user || true) return (
    <>
      <Header />
      <Switch>
        <Route path="/login"><Redirect to={props.location} /></Route>
        <Route path="/admin/settings"><SettingsPage /></Route>
        <Route path="/pages/:churchId/:id" component={Page}></Route>
        <Route path="/checkin" component={CheckinPage} />
        <Route path="/donate" component={DonationPage} />
        <Route path="/stream" component={StreamPage} />
        <Route path="/directory" component={DirectoryPage} />
        <Route path="/"><Home /></Route>
      </Switch>
    </>
  );
}

