import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Login } from "./Login"
import { Page } from "./Page"
import { CheckinPage } from "./checkin/CheckinPage";
import { Header, ConfigHelper } from "./components";
import { DonationPage } from "./donation/DonationPage";
import { DirectoryPage } from "./directory/DirectoryPage"
import { StreamPage } from "./stream/StreamPage"
import { UrlPage } from "./url/UrlPage"
import { BiblePage } from "./bible/BiblePage"
import { FormPage } from "./form/FormPage";
import { LessonsPage } from "./lessons/LessonsPage";
export const Unauthenticated = () => {
  const firstTabRoute = ConfigHelper.getFirstRoute()

  return (
    <>
      <Header />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/pages/:churchId/:id" component={Page} />
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
  )
}
