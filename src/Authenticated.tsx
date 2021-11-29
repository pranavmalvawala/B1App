import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { SettingsPage } from "./admin/settings/SettingsPage";
import { Page } from "./Page";
import { CheckinPage } from "./checkin/CheckinPage";
import UserContext from "./UserContext";
import { Header, ConfigHelper } from "./components";
import { DonationPage } from "./donation/DonationPage";
import { DirectoryPage } from "./directory/DirectoryPage"
import { StreamPage } from "./stream/StreamPage"
import { UrlPage } from "./url/UrlPage"
import { BiblePage } from "./bible/BiblePage"
import { FormPage } from "./form/FormPage";
import { LessonsPage } from "./lessons/LessonsPage";

interface Props {
  location: any;
}

export const Authenticated: React.FC<Props> = (props) => {
  let user = React.useContext(UserContext)?.userName; //to force rerender on login
  const firstTabRoute = ConfigHelper.getFirstRoute()

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
        <Route path="/lessons" component={LessonsPage} />
        <Route path="/directory" component={DirectoryPage} />
        <Route path="/bible" component={BiblePage} />
        <Route path="/url/:id" component={UrlPage} />
        <Route path="/forms/:id" component={FormPage}></Route>
        <Route path="/"><Redirect to={firstTabRoute} /></Route>
      </Switch>
    </>
  );
}

