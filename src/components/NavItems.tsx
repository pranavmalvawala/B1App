import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { UserHelper, Permissions, ConfigHelper } from "."

interface Props {
  prefix?: string
}

interface Tab {
  key: string;
  url: string;
  icon: string;
  label: string;
  outsideLink?: boolean;
}

export function NavItems({ prefix }: Props) {
  const location = useLocation()

  const getSelected = (): string => {
    let url = location.pathname;
    let result = "Bible";
    if (url.indexOf("/bible") > -1) result = "Bible";
    if (url.indexOf("/admin/settings") > -1) result ="Settings"

    return result;
  };

  const getClass = (sectionName: string): string => {
    if (sectionName === getSelected()) return prefix === "main" ? "nav-link active" : "active";
    else return prefix === "main" ? "nav-link" : "";
  };

  const getTab = ({ key, url, icon, label, outsideLink = false }: Tab) => (
    <li key={key} className="nav-item" data-toggle={prefix === "main" ? null : "collapse"} data-target={prefix === "main" ? null : "#userMenu"} id={(prefix || "") + key + "Tab"}>
      {outsideLink ? (
        <a className={getClass(key)} href={url} target="_blank" rel="noopener noreferrer">
          <i className={icon}></i> {label}
        </a>
      ) : (
        <Link className={getClass(key)} to={url}>
          <i className={icon}></i> {label}
        </Link>
      )}
    </li>
  )

  const getTabs = () => {
    let tabs: any = []

    tabs.push(getTab({ key: "Bible", url: "/bible", icon: "fas fa-bible", label: "Bible" }))
    if (UserHelper.checkAccess(Permissions.b1Api.settings.edit)) tabs.push(getTab({ key: "Settings", url: "/admin/settings", icon: "fas fa-cog", label: "Settings" }));
    console.log(ConfigHelper.current.tabs)
    ConfigHelper.current.tabs.forEach(t => {
      tabs.push(getTab({ key: t.text, url: t.url, icon: t.icon, label: t.text}))
    })

    return tabs
  }

  return <>{getTabs()}</>
}
