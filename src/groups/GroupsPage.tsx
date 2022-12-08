import * as React from "react"
import { Link } from "react-router-dom";
import { GroupInterface } from "../appBase/interfaces";
import { Loading } from "../components";
import { ApiHelper, UserHelper } from "../helpers";

export function GroupsPage() {
  const [groups, setGroups] = React.useState<GroupInterface[]>(null);

  const loadData = () => {
    ApiHelper.get("/groups/my", "MembershipApi").then(data => setGroups(data));
  }

  const getGroups = () => {
    if (!groups) return <Loading />
    else {
      const result: JSX.Element[] = [];
      groups?.forEach(g => {
        result.push(<Link to={"/groups/" + g.id}>
          <div style={{ background: "#FFF", border: "1px solid #DDD", paddingTop: 10, paddingBottom: 10, textAlign: "center" }}>
            {g.name}
          </div>
        </Link>);
      });
      return result;
    }
  }

  React.useEffect(loadData, []);

  if (!UserHelper.currentUserChurch?.person?.id) return (<><h1>My Groups</h1><h3 className="text-center w-100">Please <Link to="/login/?returnUrl=/directory">Login</Link> to view your groups.</h3></>)
  return (
    <>
      <h1>My Groups</h1>
      {getGroups()}
    </>
  )
}
