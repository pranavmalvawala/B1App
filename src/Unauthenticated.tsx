import React from "react";
import { Switch, Route } from "react-router-dom";
import { Login } from "./Login"
import { Home } from "./Home";
import { Page } from "./Page"
import { CheckinPage } from "./checkin/CheckinPage";

export const Unauthenticated = () => (
  <>
    <Switch>
      <Route path="/login" component={Login}></Route>
      <Route path="/pages/:churchId/:id" component={Page}></Route>
      <Route path="/checkin/" component={CheckinPage}></Route>
      <Route path="/"><Home /></Route>
    </Switch>
  </>
)
