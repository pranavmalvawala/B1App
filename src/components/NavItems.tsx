import * as React from "react"
import { NavLink } from "react-router-dom"
import { UserHelper, Permissions, ConfigHelper } from "."

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
  const getTab = ({ key, url, icon, label }: Tab) => (
    <li key={key} className="nav-item" data-toggle={prefix === "main" ? null : "collapse"} data-target={prefix === "main" ? null : "#userMenu"} id={(prefix || "") + key + "Tab"}>
      <NavLink className="nav-link" to={url}>
        <i className={icon}></i> {label}
      </NavLink>
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
          tabs.push(getTab({ key: t.text, url: `/url/${t.id}`, icon: t.icon, label: t.text }))
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
