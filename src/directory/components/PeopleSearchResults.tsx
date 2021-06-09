import React from "react";
import { PersonHelper } from "../../components";
import { PersonInterface } from "../../appBase/interfaces"
import { Table } from "react-bootstrap";

interface Props {
    people: PersonInterface[],
    selectedHandler: (personId: string) => void
}

export const PeopleSearchResults: React.FC<Props> = (props) => {

  const getRows = () => {
    let result = [];
    for (let i = 0; i < props.people.length; i++) {
      const p = props.people[i];
      result.push(<tr key={p.id}>
        <td><img src={PersonHelper.getPhotoUrl(p)} alt="avatar" /></td>
        <td><a href="about:blank" onClick={(e) => { e.preventDefault(); props.selectedHandler(p.id) }}>{p.name.display}</a></td>
      </tr>);
    }
    return result;
  }

  if (props.people === undefined || props.people === null) return (<div className="alert alert-info">Use the search box above to search for a member or add a new one.</div>)
  else if (props.people.length === 0) return (<>
    <p>No results found.</p>
  </>);
  else {
    let result
            = <>
              <Table id="peopleTable">
                <thead><tr><th></th><th>Name</th></tr></thead>
                <tbody>{getRows()}</tbody>
              </Table>
            </>;
    return result;
  }
}
