import React from "react";
import { ApiHelper, Tabs, PageList, PageEdit, PageInterface, UserHelper, ConfigHelper } from "./components"
import UserContext from "../../UserContext"
import { Grid, Icon } from "@mui/material";

export const SettingsPage = () => {
  const context = React.useContext(UserContext);
  const [pages, setPages] = React.useState<PageInterface[]>([]);
  const [currentPage, setCurrentPage] = React.useState<PageInterface>(null);

  const loadData = () => { ApiHelper.get("/pages", "B1Api").then(data => setPages(data)); }
  const loadPage = (id: string) => { ApiHelper.get("/pages/" + id + "?include=content", "B1Api").then(data => setCurrentPage(data)); }
  const handleUpdate = () => {

    const keyName = window.location.hostname.split(".")[0];
    ConfigHelper.load(keyName).then(() => {
      setCurrentPage(null);
      loadData();
      context.setUser({ ...context.user }); // hacky stuff to create navbar re-render.
    })
  }
  const handleAdd = () => { setCurrentPage({ churchId: UserHelper.currentChurch.id, lastModified: new Date(), name: "" }) }
  const handleEdit = (page: PageInterface) => { loadPage(page.id); }

  React.useEffect(() => { loadData(); }, []);

  const getEdit = () => {
    if (currentPage !== null) return <PageEdit page={currentPage} updatedFunction={handleUpdate} />;
  }

  return (<>
    <h1><Icon>settings</Icon> Settings</h1>
    <Grid container spacing={3}>
      <Grid item md={8} xs={12}>
        <PageList pages={pages} addFunction={handleAdd} editFunction={handleEdit} />
      </Grid>
      <Grid item md={4} xs={12}>
        <Tabs updatedFunction={handleUpdate} />
        {getEdit()}
      </Grid>
    </Grid>
  </>);
}
