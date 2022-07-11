import React from "react";
import { DisplayBox, PageInterface } from ".";
import { Icon } from "@mui/material";

interface Props { pages: PageInterface[], addFunction?: () => void, editFunction?: (page: PageInterface) => void }

export const PageList: React.FC<Props> = (props) => {
  const getEditContent = () => <a href="about:blank" onClick={handleAdd}><Icon>add</Icon></a>
  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    props.addFunction();
  }

  const getRows = () => {
    if (props.pages.length === 0) return (<tr><td>Pages are small pieces of information that you can include add as a tab in the B1 app.  Click the plus icon to add a page.</td></tr>);
    else {
      let rows: JSX.Element[] = [];
      props.pages.forEach(page => {
        rows.push(
          <tr>
            <td>{page.name}</td>
            <td style={{textAlign: "right"}}>
              <a href="about:blank" onClick={(e: React.MouseEvent) => { e.preventDefault(); props.editFunction(page); }}><Icon>edit</Icon></a>
            </td>
          </tr>
        );
      });
      return rows;
    }

  }

  return (
    <DisplayBox headerIcon="code" headerText="Pages" editContent={getEditContent()}>
      <table className="table">
        {getRows()}
      </table>
    </DisplayBox>
  );
}
