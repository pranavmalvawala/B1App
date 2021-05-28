import React from "react";
import { ApiHelper, Tabs, PageList, PageEdit, PageInterface, UserHelper } from "./components"
import { Row, Col } from "react-bootstrap"

export const SettingsPage = () => {

    const [pages, setPages] = React.useState<PageInterface[]>([]);
    const [currentPage, setCurrentPage] = React.useState<PageInterface>(null);

    const loadData = () => { ApiHelper.get("/pages", "B1Api").then(data => setPages(data)); }
    const loadPage = (id: string) => { ApiHelper.get("/pages/" + id + "?include=content", "B1Api").then(data => setCurrentPage(data)); }
    const handleUpdate = () => { setCurrentPage(null); loadData(); }
    const handleAdd = () => { setCurrentPage({ churchId: UserHelper.currentChurch.id, lastModified: new Date(), name: "" }) }
    const handleEdit = (page: PageInterface) => { loadPage(page.id); }

    React.useEffect(() => { loadData(); }, []);

    const getEdit = () => {
        if (currentPage !== null) return <PageEdit page={currentPage} updatedFunction={handleUpdate} />;
    }


    return (
        <>
            <Row>
                <Col md={8}>
                    <PageList pages={pages} addFunction={handleAdd} editFunction={handleEdit} />
                </Col>
                <Col md={4}>
                    <Tabs />
                    {getEdit()}
                </Col>
            </Row>
        </>
    );
}