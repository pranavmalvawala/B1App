import React from "react";
import { ConfigHelper, UserHelper } from ".";
import { List } from "@mui/material";
import { Permissions } from "./"
import { SiteWrapper, NavItem } from "../appBase/components";
import UserContext from "../UserContext";

interface Props { pageTitle?: string, children: React.ReactNode }

export const Wrapper: React.FC<Props> = props => {
  const context = React.useContext(UserContext);

  const tabs = []
  ConfigHelper.current.tabs.forEach(t => {
    switch (t.linkType) {
      case "donation":
        tabs.push(<NavItem url="/donate" label={t.text} icon={t.icon} />)
        break;
      case "checkin":
        tabs.push(<NavItem url="/checkin" label={t.text} icon={t.icon} />)
        break
      case "stream":
        tabs.push(<NavItem url="/stream" label={t.text} icon={t.icon} />)
        break
      case "lessons":
        tabs.push(<NavItem url="/lessons" label={t.text} icon={t.icon} />)
        break
      case "directory":
        tabs.push(<NavItem url="/directory" label={t.text} icon={t.icon} />)
        break
      case "url":
        tabs.push(<NavItem url={`/url/${t.id}`} label={t.text} icon={t.icon} />)
        break
      case "bible":
        tabs.push(<NavItem url="/bible" label={t.text} icon={t.icon} />)
        break
      case "page":
        tabs.push(<NavItem url={`/pages/${t.churchId}/${t.linkData}`} label={t.text} icon={t.icon} />)
        break
      case "votd":
        tabs.push(<NavItem url="/votd" label={t.text} icon={t.icon} />)
        break
      default:
        break
    }
  })

  if (UserHelper.checkAccess(Permissions.b1Api.settings.edit)) tabs.push(<NavItem url="/admin/settings" label="Settings" icon="settings" />)

  const navContent = <><List component="nav">{tabs}</List></>

  return <SiteWrapper navContent={navContent} context={context}>{props.children}</SiteWrapper>
};
