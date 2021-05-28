import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import { UserProvider } from "./UserContext"
import { ControlPanel } from "./ControlPanel"


const App: React.FC = () => {
  return (
    <UserProvider>
      <CookiesProvider>
        <Router>
          <Switch>
            <Route path="/"><ControlPanel /></Route>
          </Switch>
        </Router>
      </CookiesProvider>
    </UserProvider>
  );
}
export default App;
