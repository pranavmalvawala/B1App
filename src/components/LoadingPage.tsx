import React from "react";
import { ConfigurationInterface, Loading } from ".";
import { AppearanceHelper } from "../appBase/helpers/AppearanceHelper";

interface Props { config: ConfigurationInterface }

export const LoadingPage: React.FC<Props> = (props) => {
  const imgSrc = AppearanceHelper.getLogoLight(props.config?.appearance, "/images/logo.png")
  return (
    <div className="smallCenterBlock" style={{ marginTop: 100 }}>
      <img src={imgSrc} alt="logo" style={{ marginBottom: 50 }} />
      <Loading />
    </div>
  )
}

