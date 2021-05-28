import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserProvider } from "./UserContext"
import { ControlPanel } from "./ControlPanel"


const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route path="/"><ControlPanel /></Route>
        </Switch>
      </Router>
    </UserProvider>
  );
}
export default App;

