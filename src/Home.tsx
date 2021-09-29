import React from "react";
import { ConfigHelper } from "./components"
import { Sidebar } from "./components/Sidebar";
// import { Header } from "./components";
import { CheckinPage } from "./checkin/CheckinPage";
import { DirectoryPage } from "./directory/DirectoryPage";
import { Donation } from "./donation/Donation";

export const Home = () => {

  const bibleUrl = "https://biblia.com/api/plugins/embeddedbible?layout=normal&historyButtons=false&resourcePicker=false&shareButton=false&textSizeButton=false&startingReference=Ge1.1&resourceName=nirv";
  const qs = new URLSearchParams(window.location.search);
  const hasTab = qs.has("tab");
  const defaultTab = hasTab ? "/" + qs.get("tab") + "/" : bibleUrl;
  const [iframeSrc, setIframeSrc] = React.useState(defaultTab);

  const handleTabClick = (linkType: string, linkData: string, url: string) => {
    switch (linkType) {
      case "stream": setIframeSrc("https://" + ConfigHelper.current.church.subDomain + ".streaminglive.church/"); break;
      case "bible": setIframeSrc(bibleUrl); break;
      case "page": setIframeSrc("/pages/" + ConfigHelper.current.church.id + "/" + linkData); break;
      case "url": setIframeSrc(url); break;
      case "checkin": setIframeSrc("/checkin/"); break;
      case "directory": setIframeSrc("/directory/"); break;
      case "donation": setIframeSrc("/donation/"); break;
      default: setIframeSrc(bibleUrl); break;
    }
  }

  const getContentComponent = () => {
    let result = (<></>);
    switch (iframeSrc) {
      case "/checkin/":
        result = (<div style={{ flex: 1 }}> <CheckinPage config={ConfigHelper.current} /></div>)
        break;
      case "/directory/":
        result = (<div style={{ flex: 1 }}> <DirectoryPage /></div>)
        break;
      case "/donation/":
        result = (<div style={{ flex: 1 }}> <Donation /></div>)
        break;
      default:
        result = (<iframe title="Content" src={iframeSrc} style={{ flex: 1 }} />);
        break;
    }
    return result;
  }

  return (
    <div id="root">
      <div id="appWrapper" className="container">
        <div id="bodyFlex">
          <div id="sidebarFlex">
            <Sidebar tabClickHandler={handleTabClick} />
          </div>
          <div id="contentFlex">
            {getContentComponent()}
          </div>
        </div>
      </div>
    </div>
  );
}
