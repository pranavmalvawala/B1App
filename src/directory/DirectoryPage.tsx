import React from "react";
import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { UserHelper } from "../helpers";
import { DirectorySearch } from "./components/DirectorySearch";
import { Person } from "./components/Person";

export const DirectoryPage = () => {

  const [personId, setPersonId] = React.useState("");

  const handlePersonSelected = (personId: string) => {
    console.log("PERSON SELECTED: " + personId)
    setPersonId(personId);
  }
  const handleBack = () => { setPersonId(""); }

  const getContent = () => personId ? <Person personId={personId} backHandler={handleBack} selectedHandler={handlePersonSelected} /> : <DirectorySearch selectedHandler={handlePersonSelected} />

  return (
    <Container>
      <Row>
        {
          UserHelper.user?.firstName
            ? (
              <Col lg={9}>
                {getContent()}
              </Col>
            )
            : <h3 className="text-center w-100">Please <Link to="/login/?returnUrl=/directory">Login</Link> to view Directory.</h3>
        }
      </Row>
    </Container>
  );
}
