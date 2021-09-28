import React from "react";
import { Switch, Route } from "react-router-dom";
import { Login } from "./Login"
import { Home } from "./Home";
import { Page } from "./Page"
import { CheckinPage } from "./checkin/CheckinPage";
import { Header } from "./components";
import { Donation } from "./donation/Donation";

export const Unauthenticated = () => (
  <>
    <Header />
    <div id="navSpacer"></div>
    <Switch>
      <Route path="/login" component={Login}></Route>
      <Route path="/pages/:churchId/:id" component={Page}></Route>
      <Route path="/checkin/" component={CheckinPage}></Route>
      <Route path="/donate" component={Donation}></Route>
      <Route path="/"><Home /></Route>
    </Switch>
  </>
)
