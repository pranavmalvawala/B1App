import React, { useState } from "react";
import { ImageEditor, DisplayBox } from "."
import { UserHelper, EnvironmentHelper } from ".";
import { Button } from "@mui/material";

interface Props {
  onUpdate: (dataUrl?: string) => void;
  onCancel: () => void;
  imageUrl: string;
}

export const ImageLibrary: React.FC<Props> = (props) => {
  const [showImageEditor, setShowImageEditor] = useState<boolean>(false);
  const images = ["baptize", "baptize2", "bible", "bible2", "bible3", "checkin", "comfort", "directory", "hands", "hands2", "lessons", "storm", "url", "votd", "worship", "worship2"];

  const getImages = () => {
    const result: JSX.Element[] = [];
    images.forEach(img => {
      console.log(EnvironmentHelper.Common.B1Root)
      const fullPath = EnvironmentHelper.Common.B1Root.replace("{key}", UserHelper.currentChurch.subDomain) + "/images/dashboard/" + img + ".png";
      result.push(<a href="about:blank" onClick={(e) => { e.preventDefault(); props.onUpdate(fullPath) }}>
        <img src={fullPath} alt="library" />
      </a>);
    })
    return result;
  }

  if (showImageEditor) return (<ImageEditor aspectRatio={4} photoUrl={props.imageUrl} onUpdate={props.onUpdate} onCancel={() => setShowImageEditor(false)} />)
  else return (
    <>
      <DisplayBox id="cropperBox" headerIcon="" headerText="Select Image">
        <div><Button variant="outlined" onClick={() => { setShowImageEditor(true) }}>Upload Your Own Image</Button></div>
        <br />
        <b>Select from Library</b>
        <div style={{ height: 200, overflowY: "scroll" }}>
          {getImages()}
        </div>
      </DisplayBox>
    </>
  );
}
