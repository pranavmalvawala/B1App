import React from "react";
import { Switch, Route } from "react-router-dom";
import { Login } from "./Login"
import { Home } from "./Home";
import { Page } from "./Page"
export const Unauthenticated = () => {
    return (
        <>
            <Switch>
                <Route path="/login" component={Login} ></Route>
                <Route path="/pages/:churchId/:id" component={Page} ></Route>
                <Route path="/"><Home /></Route>
            </Switch>
        </>
    )
}
