import React from "react";
import { useCookies } from "react-cookie";
import { ApiHelper, ConfigHelper, PersonHelper, UserHelper } from "./components";
import { Authenticated } from "./Authenticated";
import UserContext from "./UserContext";
import { LoginPage } from "./appBase/pageComponents/LoginPage";
import { AppearanceHelper } from "./appBase/helpers/AppearanceHelper";
import { EnvironmentHelper } from "./helpers";
import { UserInterface, ChurchInterface } from "./appBase/interfaces";
import ReactGA from "react-ga";

export const Login: React.FC = (props: any) => {
  const [cookies] = useCookies(["jwt"]);

  const successCallback = async () => {
    PersonHelper.person = await ApiHelper.get(`/people/${UserHelper.currentChurch.personId}`, "MembershipApi");
    context.setUserName(UserHelper.currentChurch.id.toString());
  }

  const trackChurchRegister = async (church: ChurchInterface) => {
    if (EnvironmentHelper.GoogleAnalyticsTag !== "") ReactGA.event({ category: "Church", action: "Register" });
  }

  const trackUserRegister = async (user: UserInterface) => {
    if (EnvironmentHelper.GoogleAnalyticsTag !== "") ReactGA.event({ category: "User", action: "Register" });
  }

  const context = React.useContext(UserContext);

  if (context.userName === "" || !ApiHelper.isAuthenticated) {
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
        loginSuccessOverride={successCallback}
        churchRegisteredCallback={trackChurchRegister}
        userRegisteredCallback={trackUserRegister}
        keyName={window.location.hostname.split(".")[0]}
        appName="B1"
        logo={AppearanceHelper.getLogoLight(ConfigHelper.current?.appearance, null)}
        appUrl={window.location.href}
        returnUrl={returnUrl}
      />
    );
  } else {
    return <Authenticated />;
  }
};
