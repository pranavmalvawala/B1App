import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Icon, Box, Avatar, Typography, Button, Link, PaperProps } from "@mui/material";
import { ApiHelper, ConfigHelper } from "./components";
import { Authenticated } from "./Authenticated";
import UserContext from "./UserContext";
import { LoginPage } from "./appBase/pageComponents/LoginPage";
import { AppearanceHelper } from "./appBase/helpers/AppearanceHelper";
import { EnvironmentHelper, UserHelper, PersonHelper } from "./helpers";
import { UserInterface, ChurchInterface } from "./appBase/interfaces";
import ReactGA from "react-ga";

interface Props {
  showLogo?: boolean;
  redirectAfterLogin?: boolean;
  loginContainerCssProps?: PaperProps
}

export const Login: React.FC<Props> = ({ showLogo, redirectAfterLogin = true, loginContainerCssProps }) => {
  const [cookies] = useCookies(["jwt"]);

  const trackChurchRegister = async (church: ChurchInterface) => {
    if (EnvironmentHelper.GoogleAnalyticsTag !== "") ReactGA.event({ category: "Church", action: "Register" });
  };

  const trackUserRegister = async (user: UserInterface) => {
    if (EnvironmentHelper.GoogleAnalyticsTag !== "") ReactGA.event({ category: "User", action: "Register" });
  };

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
        loginContainerCssProps={loginContainerCssProps}
      />
    );
  } else {
    return redirectAfterLogin ? <Authenticated /> : <User username={`${UserHelper.user?.firstName} ${UserHelper.user?.lastName}`} image={PersonHelper.getPhotoUrl(context?.person)} />;
  }
};

interface UserProps {
  username: string;
  image?: string;
}

function User({ username, image }: UserProps) {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar sx={{ width: 44, height: 44, marginRight: 2 }}>
          {image ? <img src={image} alt="user" style={{ maxHeight: 44 }} /> : <Icon>person</Icon>}
        </Avatar>
        <Typography color="inherit" noWrap>
          {username}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Button
          variant="text"
          onClick={() => navigate({
            pathname: "/logout"
          })}
        >
          LOGOUT
        </Button>
      </Box>
      <Link href="/" sx={{ marginLeft: 2, display: "flex", alignItems: "center", marginTop: 8 }}>
        Go to Home page <Icon sx={{ marginLeft: 0.5 }}>arrow_forward</Icon>
      </Link>
    </Box>
  );
}
