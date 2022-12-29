import React from "react";
import { ConfigHelper, UserHelper } from ".";
import { List } from "@mui/material";
import { Permissions } from "./"
import { SiteWrapper, NavItem } from "../appBase/components";
import UserContext from "../UserContext";
import { Themes } from "../appBase/helpers";

interface Props { pageTitle?: string, children: React.ReactNode }

export const Wrapper: React.FC<Props> = props => {
  const context = React.useContext(UserContext);

  const getSelectedTab = () => {
    const path = window.location.pathname;
    let result = "";
    if (path.startsWith("/donate")) result = "donation";
    else if (path.startsWith("/checkin")) result = "checkin";
    else if (path.startsWith("/stream")) result = "stream";
    else if (path.startsWith("/lessons")) result = "lessons";
    else if (path.startsWith("/directory")) result = "directory";
    else if (path.startsWith("/url")) result = "url";
    else if (path.startsWith("/bible")) result = "bible";
    else if (path.startsWith("/pages")) result = "page";
    else if (path.startsWith("/votd")) result = "votd";
    return result;
  }

  const selectedTab = getSelectedTab();
  const tabs = []

  ConfigHelper.current.tabs.forEach(t => {
    switch (t.linkType) {
      case "donation":
        tabs.push(<NavItem key="/donate" url="/donate" label={t.text} icon={t.icon} selected={selectedTab === "donation"} />)
        break;
      case "checkin":
        tabs.push(<NavItem key="/checkin" url="/checkin" label={t.text} icon={t.icon} selected={selectedTab === "checkin"} />)
        break
      case "stream":
        tabs.push(<NavItem key="/stream" url="/stream" label={t.text} icon={t.icon} selected={selectedTab === "stream"} />)
        break
      case "lessons":
        tabs.push(<NavItem key="/lessons" url="/lessons" label={t.text} icon={t.icon} selected={selectedTab === "lessons"} />)
        break
      case "directory":
        tabs.push(<NavItem key="/directory" url="/directory" label={t.text} icon={t.icon} selected={selectedTab === "directory"} />)
        break
      case "url":
        tabs.push(<NavItem key={`/url/${t.id}`} url={`/url/${t.id}`} label={t.text} icon={t.icon} selected={selectedTab === "url" && window.location.href.indexOf(t.id) > -1} />)
        break
      case "bible":
        tabs.push(<NavItem key="/bible" url="/bible" label={t.text} icon={t.icon} selected={selectedTab === "bible"} />)
        break
      case "page":
        tabs.push(<NavItem key={`/pages/${t.churchId}/${t.linkData}`} url={`/pages/${t.churchId}/${t.linkData}`} label={t.text} icon={t.icon} selected={selectedTab === "page"} />)
        break
      case "votd":
        tabs.push(<NavItem key="/votd" url="/votd" label={t.text} icon={t.icon} selected={selectedTab === "votd"} />)
        break
      case "groups":
        tabs.push(<NavItem key="/groups" url="/groups" label={t.text} icon={t.icon} selected={selectedTab === "groups"} />)
        break
      default:
        break
    }
  })

  //tabs.push(<NavItem key="/groups" url="/groups" label="My Groups" icon="groups" selected={selectedTab === "groups"} />)

  if (UserHelper.checkAccess(Permissions.b1Api.settings.edit)) tabs.push(<NavItem key="/admin/settings" url="/admin/settings" label="Settings" icon="settings" />)

  const navContent = <><List component="nav" sx={Themes.NavBarStyle}>{tabs}</List></>

  return <SiteWrapper navContent={navContent} context={context} appName="B1.church">{props.children}</SiteWrapper>
};
