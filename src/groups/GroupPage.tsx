import { Grid } from "@mui/material";
import * as React from "react"
import { Link, useParams } from "react-router-dom";
import { MarkdownPreview } from "../appBase/components";
import { Conversations } from "../appBase/components/notes/Conversations";
import { GroupInterface } from "../appBase/interfaces";
import { Loading } from "../components";
import { ApiHelper, UserHelper } from "../helpers";

export function GroupPage() {
  const params = useParams();
  const [group, setGroup] = React.useState<GroupInterface>(null);

  const loadData = () => {
    ApiHelper.get("/groups/" + params.id, "MembershipApi").then(data => setGroup(data));
  }

  const getHeader = () => {
    if (group.photoUrl) return (<Grid container spacing={3}>
      <Grid item md={4} xs={12}>
        <img id="tabImage" src={group.photoUrl} alt={group.name} style={{ maxHeight: 300 }} />
      </Grid>
      <Grid item md={8} xs={12}>
        <MarkdownPreview value={group.about} />
      </Grid>
    </Grid>);
    else return <MarkdownPreview value={group.about} />
  }

  React.useEffect(loadData, []); //eslint-disable-line

  if (!UserHelper.currentUserChurch?.person?.id) return (<><h1>Group</h1><h3 className="text-center w-100">Please <Link to="/login/?returnUrl=/directory">Login</Link> to view your groups.</h3></>)
  else if (!group) return <Loading />
  else return (
    <>
      <h1>{group.name}</h1>
      {getHeader()}
      <Conversations contentType="group" contentId={group.id} groupId={group.id} />
    </>
  )
}
