import { Grid, Typography } from "@mui/material";
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

  const getGroupButton = (group: GroupInterface) => {
    //const el = document.getElementById("tabType");
    //let width = el?.offsetWidth || 400;
    //if (width > 400) width = 400;
    //const height = width / 4;

    return (
      <Grid item md={4} xs={12}>
        <Link to={"/groups/" + group.id}>
          <div style={{ backgroundColor: "#000000", width: "100%", aspectRatio: "2" }}>
            <div style={{ position: "relative" }}>
              <div style={{ textAlign: "center", position: "absolute", zIndex: 9999, width: "100%", aspectRatio: "2", paddingTop: 60 }}>
                <Typography sx={{ fontSize: 34, color: "#FFFFFF" }} style={{ color: "#FFF" }}>{group.name}</Typography>
              </div>
            </div>
            {group.photoUrl && <img id="tabImage" src={group.photoUrl} alt="tab" style={{ cursor: "pointer", opacity: 0.7 }} />}
          </div>
        </Link>
      </Grid>
    )
  }

  const getGroups = () => {
    if (!groups) return <Loading />
    else {
      const result: JSX.Element[] = [];
      groups?.forEach(g => {
        result.push(getGroupButton(g))
        /*
        result.push(<Link to={"/groups/" + g.id}>
          <div style={{ background: "#FFF", border: "1px solid #DDD", paddingTop: 10, paddingBottom: 10, textAlign: "center" }}>
            {g.name}
          </div>
        </Link>);*/
      });
      return result;
    }
  }

  React.useEffect(loadData, []);

  if (!UserHelper.currentUserChurch?.person?.id) return (<><h1>My Groups</h1><h3 className="text-center w-100">Please <Link to="/login/?returnUrl=/directory">Login</Link> to view your groups.</h3></>)
  return (
    <>
      <h1>My Groups</h1>
      <Grid container spacing={3}>
        {getGroups()}

      </Grid>

    </>
  )
}
