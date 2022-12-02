import React from "react";
import { DisplayBox, TabEdit, LinkInterface, ApiHelper, UserHelper } from ".";
import { Icon, Box } from "@mui/material";

interface Props { updatedFunction?: () => void }
export const Tabs: React.FC<Props> = (props) => {
  const [tabs, setTabs] = React.useState<LinkInterface[]>([]);
  const [currentTab, setCurrentTab] = React.useState<LinkInterface>(null);

  const handleUpdated = () => { setCurrentTab(null); loadData(); if (props.updatedFunction !== undefined) props.updatedFunction(); }
  const getEditContent = () => <a href="about:blank" onClick={handleAdd}><Icon>add</Icon></a>
  const loadData = () => { ApiHelper.get("/links?category=tab", "B1Api").then(data => setTabs(data)); }
  const saveChanges = () => { ApiHelper.post("/links", tabs, "B1Api").then(loadData); }

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    let tab: LinkInterface = { churchId: UserHelper.currentUserChurch.church.id, sort: tabs.length, text: "", url: "", icon: "link", linkData: "", linkType: "url", category: "tab" }
    setCurrentTab(tab);
  }

  const makeSortSequential = () => {
    for (let i = 0; i < tabs.length; i++) tabs[i].sort = i + 1;
  }

  const moveUp = (e: React.MouseEvent) => {
    e.preventDefault();
    const idx = parseInt(e.currentTarget.getAttribute("data-idx"));
    makeSortSequential();
    tabs[idx - 1].sort++;
    tabs[idx].sort--;
    saveChanges();
  }

  const moveDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const idx = parseInt(e.currentTarget.getAttribute("data-idx"));
    makeSortSequential();
    tabs[idx].sort++;
    tabs[idx + 1].sort--;
    saveChanges();
  }

  const getRows = () => {
    let idx = 0;
    let rows: JSX.Element[] = [];
    tabs.forEach(tab => {
      const upLink = (idx === 0) ? null : <a href="about:blank" data-idx={idx} onClick={moveUp}><Icon>arrow_upward</Icon></a>
      const downLink = (idx === tabs.length - 1) ? null : <a href="about:blank" data-idx={idx} onClick={moveDown}><Icon>arrow_downward</Icon></a>
      rows.push(
        <tr key={idx}>
          <td><a href={tab.url}>
            <Box sx={{ display: "flex", alignItems: "center" }}><Icon style={{ marginRight: 5 }}>{tab.icon}</Icon> {tab.text}</Box>
          </a></td>
          <td style={{ textAlign: "right" }}>
            {upLink}
            {downLink}
            <a href="about:blank" onClick={(e: React.MouseEvent) => { e.preventDefault(); setCurrentTab(tab); }}><Icon>edit</Icon></a>
          </td>
        </tr>
      );
      idx++;
    })
    return rows;
  }

  React.useEffect(() => { loadData(); }, []);

  if (currentTab !== null) return <TabEdit currentTab={currentTab} updatedFunction={handleUpdated} />;
  else return (
    <DisplayBox headerIcon="folder" headerText="Tabs" editContent={getEditContent()}>
      <table className="table">
        <tbody>
          {getRows()}
        </tbody>
      </table>
    </DisplayBox>

  );

}
