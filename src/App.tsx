import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { UserProvider } from "./UserContext"
import { ControlPanel } from "./ControlPanel"
import { ConfigHelper, ConfigurationInterface, LoadingPage, Theme } from "./components"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const App: React.FC = () => {
  const [config, setConfig] = React.useState<ConfigurationInterface>({} as ConfigurationInterface);

  const loadConfig = React.useCallback(async () => {
    const keyName = window.location.hostname.split(".")[0];
    console.log(keyName);
    const localThemeConfig = localStorage.getItem(`b1theme_${keyName}`);
    setConfig(JSON.parse(localThemeConfig) || {});

    ConfigHelper.load(keyName).then(data => {
      let d: ConfigurationInterface = data;
      setConfig(d);
    });
  }, []);

  React.useEffect(() => {
    loadConfig();
  }, [loadConfig]);


  const mdTheme = createTheme({
    palette: {
      secondary: {
        main: "#444444"
      }
    },
    components: {
      MuiTextField: { defaultProps: { margin: "normal" } },
      MuiFormControl: { defaultProps: { margin: "normal" } }
    }
  });

  if (config.keyName === undefined) return <LoadingPage config={config} />
  else return (
    <UserProvider>
      <CookiesProvider>
        <ThemeProvider theme={mdTheme}>
          <CssBaseline />
          <Theme />
          <Router>
            <Routes>
              <Route path="/*" element={<ControlPanel />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </CookiesProvider>
    </UserProvider>
  );
}
export default App;
