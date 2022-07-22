import React, { useCallback, useState } from "react";
import { InputBox, LinkInterface, ApiHelper, UniqueIdHelper, ConfigHelper, ImageEditor } from "."
import { PageInterface, UserHelper, EnvironmentHelper } from ".";
import { FormControl, InputLabel, Select, SelectChangeEvent, TextField, MenuItem, Stack, Icon, Button, Dialog, Typography } from "@mui/material";
import SearchIcons from "./../../../appBase/components/material/iconpicker/IconPicker";
import { ImageLibrary } from "./ImageLibrary";

interface Props { currentTab: LinkInterface, updatedFunction?: () => void }

export const TabEdit: React.FC<Props> = (props) => {
  const [currentTab, setCurrentTab] = React.useState<LinkInterface>(null);
  const [pages, setPages] = React.useState<PageInterface[]>(null);
  const checkDelete = () => { if (!UniqueIdHelper.isMissing(currentTab?.id)) return handleDelete; else return null; }
  const handleCancel = () => { props.updatedFunction(); }
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [showLibrary, setShowLibrary] = useState<boolean>(false);

  const onSelect = useCallback((iconName: string) => {
    let t = { ...currentTab };
    t.icon = iconName;
    setCurrentTab(t);
    closeModal();
  }, [currentTab]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const loadPages = () => {
    ApiHelper.get("/pages/", "B1Api").then((data: PageInterface[]) => {
      setPages(data)

      if (!currentTab?.linkData) {
        const linkData = data[data.length - 1]?.id || ""
        setCurrentTab({ ...currentTab, linkData: linkData })
      }
    })
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you wish to delete this tab?")) {
      ApiHelper.delete("/links/" + currentTab.id, "B1Api").then(() => { setCurrentTab(null); props.updatedFunction(); });
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const val = e.target.value;
    let t = { ...currentTab };
    switch (e.target.name) {
      case "text": t.text = val; break;
      case "type": t.linkType = val; break;
      case "page": t.linkData = val; break;
      case "url": t.url = val; break;
    }
    setCurrentTab(t);
  }

  const handleSave = () => {
    //if (currentTab.linkType === "page") currentTab.url = "/data/" + UserHelper.currentSettings.keyName + "/page" + currentTab.linkData + ".html";
    //else
    if (currentTab.linkType !== "url") currentTab.url = "";
    if (currentTab.linkType === "page") {
      const rnd = Math.floor(Math.random() * 999999);
      currentTab.url = EnvironmentHelper.Common.ContentRoot + "/" + UserHelper.currentChurch.id + "/pages/" + currentTab.linkData + ".html?rnd=" + rnd.toString();
    }
    ApiHelper.post("/links", [currentTab], "B1Api").then(props.updatedFunction);
  }

  const getUrl = () => {
    if (currentTab?.linkType === "url") {
      return (
        <TextField fullWidth label="Url" name="url" type="text" value={currentTab?.url || ""} onChange={handleChange} />
      );
    } else return null;
  }

  const getPage = () => {
    if (currentTab?.linkType === "page") {
      let options: JSX.Element[] = [];
      if (pages === null) loadPages();
      else {
        options = [];
        pages.forEach(page => options.push(<MenuItem value={page.id} key={page.id}>{page.name}</MenuItem>));
      }
      return (
        <FormControl fullWidth>
          <InputLabel id="page">Page</InputLabel>
          <Select labelId="page" label="Page" name="page" value={currentTab?.linkData || ""} onChange={handleChange}>
            {options}
          </Select>
        </FormControl>
      );
    } else return null;
  }

  const isDisabled = (tabName: string) => {
    if (ConfigHelper.current.tabs.some(t => t.linkType === tabName)) {
      return true
    }
    return false
  }

  const handleOnUpdate = (dataUrl: string) => {
    const updatedTab = { ...currentTab };
    updatedTab.photo = dataUrl;

    setCurrentTab(updatedTab);
    setShowLibrary(false);
  }

  React.useEffect(() => { setCurrentTab(props.currentTab); }, [props.currentTab]);

  const imageUrl = currentTab?.photo || "/images/dashboard/storm.png";

  const getPreview = () => {
    const el = document.getElementById("tabType");
    let width = el?.offsetWidth || 400;
    if (width > 400) width = 400;
    const height = width / 4;

    return (<div style={{ backgroundColor: "#000000", width: width, height: height, marginBottom: 10 }}>
      <div style={{ textAlign: "center", position: "absolute", zIndex: 9999, width: width, height: height, paddingTop: (height - 38) / 2 }}>
        <Typography sx={{ fontSize: 34, color: "#FFFFFF" }} style={{ color: "#FFF" }}>{currentTab?.text}</Typography>
      </div>
      <img id="tabImage" src={imageUrl} alt="tab" style={{ cursor: "pointer", opacity: 0.7 }} />
    </div>)
  }

  if (!currentTab) return <></>
  else return (
    <>
      <InputBox headerIcon="folder" headerText="Edit Tab" saveFunction={handleSave} cancelFunction={handleCancel} deleteFunction={checkDelete()}>
        <Stack direction="row" pt={2}>
          <TextField fullWidth margin="none" label="Text" name="text" type="text" value={currentTab?.text || ""} onChange={handleChange} InputProps={{
            endAdornment: <div className="input-group-append">
              <Button variant="contained" endIcon={<Icon>arrow_drop_down</Icon>} onClick={openModal}><Icon>{currentTab?.icon}</Icon></Button>
            </div>
          }} />
          <input type="hidden" asp-for="TabId" />
        </Stack>
        <FormControl fullWidth>
          <InputLabel id="type">Type</InputLabel>
          <Select labelId="type" label="Type" id="tabType" name="type" value={currentTab?.linkType || ""} onChange={handleChange}>
            <MenuItem value="bible" disabled={isDisabled("bible")}>Bible</MenuItem>
            <MenuItem value="checkin" disabled={isDisabled("checkin")}>Checkin</MenuItem>
            <MenuItem value="donation" disabled={isDisabled("donation")}>Donation</MenuItem>
            <MenuItem value="directory" disabled={isDisabled("directory")}>Member Directory</MenuItem>
            <MenuItem value="stream" disabled={isDisabled("stream")}>Live Stream</MenuItem>
            <MenuItem value="lessons" disabled={isDisabled("lessons")}>Lessons.church</MenuItem>
            <MenuItem value="votd" disabled={isDisabled("votd")}>Verse of the Day</MenuItem>
            <MenuItem value="url">External Url</MenuItem>
            <MenuItem value="page">Page</MenuItem>
          </Select>
        </FormControl>
        {getUrl()}
        {getPage()}
        <Typography sx={{ marginTop: 2, marginBottom: 1 }}>Tab Preview:</Typography>
        <div>
          {getPreview()}
          <Button onClick={() => { setShowLibrary(true) }}>Change Image</Button>
        </div>
        <Dialog open={isModalOpen}>
          <SearchIcons onSelect={onSelect} />
        </Dialog>
      </InputBox>
      {showLibrary && (<ImageLibrary onUpdate={handleOnUpdate} onCancel={() => setShowLibrary(false)} imageUrl={imageUrl} />)}

    </>
  );
}
