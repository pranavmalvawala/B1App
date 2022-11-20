import React from "react";
import { useCookies } from "react-cookie";
import { ApiHelper, ConfigHelper } from "./components";
import { Authenticated } from "./Authenticated";
import UserContext from "./UserContext";
import { LoginPage } from "./appBase/pageComponents/LoginPage";
import { AppearanceHelper } from "./appBase/helpers/AppearanceHelper";
import { EnvironmentHelper } from "./helpers";
import { UserInterface, ChurchInterface } from "./appBase/interfaces";
import ReactGA from "react-ga";

interface Props {
  showLogo?: boolean;
}

export const Login: React.FC<Props> = ({ showLogo }) => {
  const [cookies] = useCookies(["jwt"]);

  const trackChurchRegister = async (church: ChurchInterface) => {
    if (EnvironmentHelper.GoogleAnalyticsTag !== "") ReactGA.event({ category: "Church", action: "Register" });
  }

  const trackUserRegister = async (user: UserInterface) => {
    if (EnvironmentHelper.GoogleAnalyticsTag !== "") ReactGA.event({ category: "User", action: "Register" });
  }

  const context = React.useContext(UserContext);

  if (context.user === null || !ApiHelper.isAuthenticated) {
    let search = new URLSearchParams(window.location.search);
    let jwt = search.get("jwt") || cookies.jwt;
    let auth = search.get("auth");
    let returnUrl = search.get("returnUrl") || "";
    if (!jwt) jwt = "";
    if (!auth) auth = "";

    return (
      <LoginPage
        auth={auth}
        context={context}
        jwt={jwt}
        churchRegisteredCallback={trackChurchRegister}
        userRegisteredCallback={trackUserRegister}
        keyName={window.location.hostname.split(".")[0]}
        appName="B1"
        logo={AppearanceHelper.getLogoLight(ConfigHelper.current?.appearance, null)}
        appUrl={window.location.href}
        returnUrl={returnUrl}
        showLogo={showLogo}
      />
    );
  } else {
    return <Authenticated />;
  }
};
