import * as React from "react"
import { NavLink, Link } from "react-router-dom"
import { UserHelper, Permissions, ConfigHelper } from "."
import { useQuery } from "../hooks/useQuery"

interface Props {
  prefix?: string
}

interface Tab {
  key: string;
  url: string;
  icon: string;
  label: string;
}

export function NavItems({ prefix }: Props) {
  const query = useQuery()

  const getClass = (url: string): string => {
    if (url === query.get("link")) return prefix === "main" ? "nav-link active" : "active";
    else return prefix === "main" ? "nav-link" : "";
  };

  const getTab = ({ key, url, icon, label }: Tab) => (
    <li key={key} className="nav-item" data-toggle={prefix === "main" ? null : "collapse"} data-target={prefix === "main" ? null : "#userMenu"} id={(prefix || "") + key + "Tab"}>
      <NavLink className="nav-link" to={url}>
        <i className={icon}></i> {label}
      </NavLink>
    </li>
  )

  const getUrlTabs = ({ key, url, icon, label }: Tab) => (
    <li key={key} className="nav-item" data-toggle={prefix === "main" ? null : "collapse"} data-target={prefix === "main" ? null : "#userMenu"} id={(prefix || "") + key + "Tab"}>
      <Link className={getClass(url.replace("/url?link=", ""))} to={url}>
        <i className={icon}></i> {label}
      </Link>
    </li>
  )

  const getTabs = () => {
    let tabs: any = []

    if (UserHelper.checkAccess(Permissions.b1Api.settings.edit)) tabs.push(getTab({ key: "Settings", url: "/admin/settings", icon: "fas fa-cog", label: "Settings" }));
    console.log(ConfigHelper.current.tabs)
    ConfigHelper.current.tabs.forEach(t => {
      switch (t.linkType) {
        case "donation":
          tabs.push(getTab({ key: t.text, url: "/donate", icon: t.icon, label: t.text }))
          break;
        case "checkin":
          tabs.push(getTab({ key: t.text, url: "/checkin", icon: t.icon, label: t.text }))
          break
        case "stream":
          tabs.push(getTab({ key: t.text, url: "/stream", icon: t.icon, label: t.text }))
          break
        case "directory":
          tabs.push(getTab({ key: t.text, url: "/directory", icon: t.icon, label: t.text }))
          break
        case "url":
          tabs.push(getUrlTabs({ key: t.text, url: `/url?link=${t.url}`, icon: t.icon, label: t.text }))
          break
        default:
          tabs.push(getTab({ key: t.text, url: t.url, icon: t.icon, label: t.text}))
          break
      }
    })

    return tabs
  }

  return <>{getTabs()}</>
}
