import React from "react";
import { UserHelper } from "."
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Permissions } from "../helpers"

interface Props { prefix?: String }

export const NavItems: React.FC<Props> = (props) => {

    const location = useLocation()

    const getSelected = (): string => {
        var url = location.pathname;
        var result = "people";
        if (url.indexOf("/admin/settings") > -1) result = "settings";
        return result;
    }

    const getClass = (sectionName: string): string => {
        if (sectionName === getSelected()) return "nav-link active";
        else return "nav-link";
    }

    const getTab = (key: string, url: string, icon: string, label: string) => {
        return (<li key={key} className="nav-item" id={(props.prefix || "") + key + "Tab"}><Link className={getClass(key)} to={url}><i className={icon}></i> {label}</Link></li>);
    }

    const getTabs = () => {
        var tabs = [];
        if (UserHelper.checkAccess(Permissions.b1Api.settings.edit)) tabs.push(getTab("settings", "/admin/settings", "fas fa-video", "Settings"));
        return tabs;
    }

    return (<>{getTabs()}</>);
}
