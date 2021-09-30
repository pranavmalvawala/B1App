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

const LINK_TYPE: { [key: string]: string } = {
  donation: "/donate",
  stream: "/stream",
  checkin: "/checkin",
  directory: "/directory"
}

export function NavItems({ prefix }: Props) {
  const location = useLocation()

  const getSelected = (): string => {
    let url = location.pathname;
    let result = ""
    if (url.indexOf("/admin/settings") > -1) result = "Settings"
    for (let i in LINK_TYPE) {
      if (url.indexOf(LINK_TYPE[i]) > -1) result = ConfigHelper.current.tabs.filter(t => t.linkType === i)[0]?.text
    }

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

    if (UserHelper.checkAccess(Permissions.b1Api.settings.edit)) tabs.push(getTab({ key: "Settings", url: "/admin/settings", icon: "fas fa-cog", label: "Settings" }));
    console.log(ConfigHelper.current.tabs)
    ConfigHelper.current.tabs.forEach(t => {
      tabs.push(getTab({
        key: t.text,
        url: LINK_TYPE[t.linkType] || t.url,
        icon: t.icon,
        label: t.text
      }))

      // switch (t.linkType) {
      //   case "donation":
      //     tabs.push(getTab({ key: t.text, url: "/donate", icon: t.icon, label: t.text }))
      //     break;
      //   case "checkin":
      //     tabs.push(getTab({ key: t.text, url: "/checkin", icon: t.icon, label: t.text }))
      //     break
      //   case "stream":
      //     tabs.push(getTab({ key: t.text, url: "/stream", icon: t.icon, label: t.text }))
      //     break
      //   case "directory":
      //     tabs.push(getTab({ key: t.text, url: "/directory", icon: t.icon, label: t.text }))
      //     break
      //   default:
      //     tabs.push(getTab({ key: t.text, url: t.url, icon: t.icon, label: t.text}))
      //     break
      // }
    })

    return tabs
  }

  return <>{getTabs()}</>
}
