import React from "react";
import { ApiHelper, Tabs, PageList, PageEdit, PageInterface, UserHelper, ConfigHelper } from "./components"
import { Row, Col } from "react-bootstrap"
import UserContext from "../../UserContext"

export const SettingsPage = () => {
  const context = React.useContext(UserContext);
  const [pages, setPages] = React.useState<PageInterface[]>([]);
  const [currentPage, setCurrentPage] = React.useState<PageInterface>(null);

  const loadData = () => { ApiHelper.get("/pages", "B1Api").then(data => setPages(data)); }
  const loadPage = (id: string) => { ApiHelper.get("/pages/" + id + "?include=content", "B1Api").then(data => setCurrentPage(data)); }
  const handleUpdate = () => {

    const keyName = window.location.hostname.split(".")[0];
    ConfigHelper.load(keyName).then(() =>{
      setCurrentPage(null);
      loadData();
      context.setUserName((new Date()).getTime().toString()); // hacky stuff to create navbar re-render. A better approach would be to make ConfigHelper a context instead of class.
    })
  }
  const handleAdd = () => { setCurrentPage({ churchId: UserHelper.currentChurch.id, lastModified: new Date(), name: "" }) }
  const handleEdit = (page: PageInterface) => { loadPage(page.id); }

  React.useEffect(() => { loadData(); }, []);

  const getEdit = () => {
    if (currentPage !== null) return <PageEdit page={currentPage} updatedFunction={handleUpdate} />;
  }

  return (
    <div className="container">
      <Row>
        <Col md={8}>
          <PageList pages={pages} addFunction={handleAdd} editFunction={handleEdit} />
        </Col>
        <Col md={4}>
          <Tabs updatedFunction={handleUpdate} />
          {getEdit()}
        </Col>
      </Row>
    </div>
  );
}
