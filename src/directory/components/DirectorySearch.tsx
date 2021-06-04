import React from "react";
import { ApiHelper, DisplayBox } from "../../components";
import { Row, Col, InputGroup, FormControl, Button } from "react-bootstrap"
import { PeopleSearchResults } from "./PeopleSearchResults"

interface Props { selectedHandler: (personId: string) => void }

export const DirectorySearch: React.FC<Props> = (props) => {

    const [searchText, setSearchText] = React.useState("");
    const [searchResults, setSearchResults] = React.useState(null);

    const handleSubmit = (e: React.MouseEvent) => {
        if (e !== null) e.preventDefault();
        let term = escape(searchText.trim());
        ApiHelper.get("/people/search?term=" + term, "MembershipApi").then(data => setSearchResults(data));
    }

    const loadData = () => {
        ApiHelper.get("/people/recent", "MembershipApi").then(data => { setSearchResults(data) });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.currentTarget.value);

    const handleKeyDown = (e: React.KeyboardEvent<any>) => { if (e.key === "Enter") { e.preventDefault(); handleSubmit(null); } }

    React.useEffect(loadData, []);

    return (
        <>
            <h1><i className="fas fa-user"></i> People</h1>
            <Row>
                <Col>
                    <DisplayBox id="peopleBox" headerIcon="fas fa-user" headerText="Search" >
                        <InputGroup>
                            <FormControl id="searchText" data-cy="search-input" name="searchText" type="text" placeholder="Name" value={searchText} onChange={handleChange} onKeyDown={handleKeyDown} />
                            <InputGroup.Append><Button id="searchButton" data-cy="search-button" variant="primary" onClick={handleSubmit}>Search</Button></InputGroup.Append>
                        </InputGroup>
                        <br />
                        <PeopleSearchResults people={searchResults} selectedHandler={props.selectedHandler} />
                    </DisplayBox>
                </Col>
            </Row>
        </>
    )
}