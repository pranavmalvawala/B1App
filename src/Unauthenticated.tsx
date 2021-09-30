import React from "react";
import { Switch, Route } from "react-router-dom";
import { Login } from "./Login"
import { Home } from "./Home";
import { Page } from "./Page"
import { CheckinPage } from "./checkin/CheckinPage";
import { Header } from "./components";
import { DonationPage } from "./donation/DonationPage";
import { DirectoryPage } from "./directory/DirectoryPage"
import { StreamPage } from "./stream/StreamPage"

export const Unauthenticated = () => (
  <>
    <Header />
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/pages/:churchId/:id" component={Page} />
      <Route path="/checkin" component={CheckinPage} />
      <Route path="/donate" component={DonationPage} />
      <Route path="/stream" component={StreamPage} />
      <Route path="/directory" component={DirectoryPage} />
      <Route path="/"><Home /></Route>
    </Switch>
  </>
)
