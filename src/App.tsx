import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import { UserProvider } from "./UserContext"
import { ControlPanel } from "./ControlPanel"
import { ConfigHelper, ConfigurationInterface, Loading, Theme } from "./components"

const App: React.FC = () => {
  const [config, setConfig] = React.useState<ConfigurationInterface>({} as ConfigurationInterface);

  const loadConfig = React.useCallback(async () => {
    const keyName = window.location.hostname.split(".")[0];
    const localThemeConfig = localStorage.getItem(`b1theme_${keyName}`);
    setConfig(JSON.parse(localThemeConfig) || {});

    ConfigHelper.load(keyName).then(data => {
      var d: ConfigurationInterface = data;
      setConfig(d);
    });
  }, []);

  React.useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  if (config.keyName === undefined) return <Loading config={config} />
  else return (
    <UserProvider>
      <CookiesProvider>
        <Theme />
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
