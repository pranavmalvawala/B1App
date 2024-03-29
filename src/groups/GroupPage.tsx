import * as React from "react"
import { Link, useParams } from "react-router-dom";
import { MarkdownPreview } from "../appBase/components";
import { Conversations } from "../appBase/components/notes/Conversations";
import { GroupInterface } from "../appBase/interfaces";
import { Loading } from "../components";
import { ApiHelper, UserHelper } from "../helpers";
import UserContext from "../UserContext";

export function GroupPage() {
  const params = useParams();
  const [group, setGroup] = React.useState<GroupInterface>(null);
  const context = React.useContext(UserContext);

  const loadData = () => {
    ApiHelper.get("/groups/" + params.id, "MembershipApi").then(data => setGroup(data));
  }

  React.useEffect(loadData, []); //eslint-disable-line

  if (!UserHelper.currentUserChurch?.person?.id) return (<><h1>Group</h1><h3 className="text-center w-100">Please <Link to="/login/?returnUrl=/directory">Login</Link> to view your groups.</h3></>)
  else if (!group) return <Loading />
  else return (
    <>
      <h1>{group.name}</h1>
      {group.photoUrl && <img id="tabImage" src={group.photoUrl} alt={group.name} style={{ maxHeight: 300 }} />}
      <MarkdownPreview value={group.about} />
      <Conversations context={context} contentType="group" contentId={group.id} groupId={group.id} />
    </>
  )
}
