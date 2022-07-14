import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { UserProvider } from "./UserContext"
import { ControlPanel } from "./ControlPanel"
import { ConfigHelper, ConfigurationInterface, LoadingPage, Theme } from "./components"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Themes, UserHelper } from "./appBase/helpers";

const App: React.FC = () => {
  const [config, setConfig] = React.useState<ConfigurationInterface>({} as ConfigurationInterface);

  const loadConfig = React.useCallback(async () => {
    const keyName = window.location.hostname.split(".")[0];
    const localThemeConfig = localStorage.getItem(`b1theme_${keyName}`);
    setConfig(JSON.parse(localThemeConfig) || {});

    ConfigHelper.load(keyName).then(data => {
      let d: ConfigurationInterface = data;
      setConfig(d);
    });
  }, []);

  React.useEffect(() => { loadConfig(); }, [loadConfig]);

  if (config.keyName === undefined) return <LoadingPage config={config} />
  else return (
    <UserProvider>
      <CookiesProvider>
        <ThemeProvider theme={Themes.BaseTheme}>
          <CssBaseline />
          <Theme />
          <Router>
            <Routes>
              <Route path="/*" element={<ControlPanel currentChurch={config.church || UserHelper.currentChurch} />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </CookiesProvider>
    </UserProvider>
  );
}
export default App;
