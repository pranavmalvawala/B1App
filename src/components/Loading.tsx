import React from "react";
import { ConfigurationInterface } from "./";
import { AppearanceHelper } from "../appBase/helpers/AppearanceHelper";

interface Props { config: ConfigurationInterface }

export const Loading: React.FC<Props> = (props) => {
    const imgSrc = AppearanceHelper.getLogoSquare(props.config?.appearance, "/images/logo-login.png")
    return (
        <div className="smallCenterBlock" style={{ marginTop: 100 }} >
            <img src={imgSrc} alt="logo" className="img-fluid" style={{ marginBottom: 50 }} />
            <div className="text-center">Loading..</div>
        </div>
    )
}




