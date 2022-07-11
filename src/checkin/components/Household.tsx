import React from "react";
import { CheckinHelper, EnvironmentHelper, ApiHelper, Loading } from "../../components";
import { GroupInterface, PersonInterface, ServiceTimeInterface, VisitInterface, VisitSessionInterface } from "../../appBase/interfaces";
import { Groups } from "./Groups";
import { ArrayHelper } from "../../appBase/helpers";
import { Button, Grid, Icon, Box } from "@mui/material";

interface Props { completeHandler: () => void }

export const Household: React.FC<Props> = (props) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showGroups, setShowGroups] = React.useState<boolean>(false);
  const [selectedMember, setSelectedMember] = React.useState<PersonInterface>(null);
  const [pendingVisits, setPendingVisits] = React.useState<VisitInterface[]>(null);

  const selectMember = (member: PersonInterface) => {
    if (selectedMember === member) setSelectedMember(null);
    else setSelectedMember(member);
  }

  const getCondensedGroupList = (person: PersonInterface) => {
    if (selectedMember === person) return null;
    else {
      const visit = CheckinHelper.getVisitByPersonId(pendingVisits, person.id || "");
      if (visit?.visitSessions?.length === 0) return (null);
      else {
        const groups: JSX.Element[] = [];
        visit?.visitSessions?.forEach((vs: VisitSessionInterface) => {
          const st: ServiceTimeInterface | null = ArrayHelper.getOne(CheckinHelper.serviceTimes, "id", vs.session?.serviceTimeId || "");
          const group: GroupInterface = ArrayHelper.getOne(st?.groups || [], "id", vs.session?.groupId || "");
          //const group: GroupInterface = ArrayHelper.getOne()
          let name = group.name || "none";
          if (st != null) name = (st.name || "") + " - " + name;
          // if (groups.length > 0) groups.push(<Text key={vs.id?.toString() + "comma"} style={{ color: StyleConstants.grayColor }}>, </Text>);
          groups.push(<span key={vs.id?.toString()}>{name}</span>);
        });
        return (<div className="groups">{groups}</div>);
      }
    }
  }

  const getMembers = () => {
    if (showGroups) return (<Groups selectedHandler={handleGroupSelected} />)
    else if (isLoading) return (<Loading />)
    else {
      let result: JSX.Element[] = [];
      CheckinHelper.householdMembers.forEach(m => {
        result.push(getMember(m));
      });
      result.push(<><br /><Button fullWidth size="large" variant="contained" onClick={handleCheckin}>Checkin</Button></>);
      return (result);
    }
  }

  const getMember = (member: PersonInterface) => {
    const arrow = (member === selectedMember) ? (<Icon>keyboard_arrow_down</Icon>) : (<Icon>keyboard_arrow_right</Icon>);
    const serviceTimeList = (member === selectedMember) ? getMemberServiceTimes() : null;
    return (<>
      <a href="about:blank" className="bigLinkButton checkinPerson" onClick={(e) => { e.preventDefault(); selectMember(member) }}>
        <Grid container spacing={3}>
          <Grid item xs={1}>{arrow}</Grid>
          <Grid item xs={2}>
            <img src={EnvironmentHelper.Common.ContentRoot + member.photo} alt="avatar" />
          </Grid>
          <Grid item xs={9}>
            {member.name.display}
            <div>{CheckinHelper.getDisplayGroup}</div>
          </Grid>
        </Grid>
        {getCondensedGroupList(member)}
      </a>
      {serviceTimeList}
    </>);
  }

  const getMemberServiceTimes = () => {
    const visit = ArrayHelper.getOne(pendingVisits, "personId", selectedMember.id);
    const visitSessions = visit?.visitSessions || [];
    let result: JSX.Element[] = [];
    CheckinHelper.serviceTimes.forEach(st => {

      result.push(getServiceTime(st, visitSessions));
    })
    return result;
  }

  const getServiceTime = (st: ServiceTimeInterface, visitSessions: VisitSessionInterface[]) => {
    console.log(st.id);

    const stSessions = ArrayHelper.getAll(visitSessions, "session.serviceTimeId", st.id);
    console.log(visitSessions);
    console.log(stSessions);
    let selectedGroupName = "NONE";
    if (stSessions.length > 0) {
      const groupId = stSessions[0].session?.groupId || "";
      const group: GroupInterface = ArrayHelper.getOne(st.groups || [], "id", groupId);
      selectedGroupName = group?.name || "Error";
    }

    return (<div className="checkinServiceTime">
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Box sx={{display: "flex", alignItems: "center"}}><Icon sx={{marginRight: "5px"}}>watch_later</Icon>{st.name}</Box>
        </Grid>
        <Grid item xs={8}>
          <a className="bigLinkButton serviceTimeButton" href="about:blank" onClick={(e) => { e.preventDefault(); selectServiceTime(st) }}>{selectedGroupName}</a>
        </Grid>
      </Grid>
    </div>);
  }

  const selectServiceTime = (st: ServiceTimeInterface) => {
    CheckinHelper.selectedServiceTime = st;
    setShowGroups(true);
  }

  const handleGroupSelected = (group: GroupInterface) => {
    const groupId = (group) ? group.id : "";
    const groupName = (group) ? group.name : "None";

    let visit: VisitInterface = CheckinHelper.getVisitByPersonId(CheckinHelper.pendingVisits, selectedMember.id);
    if (visit === null) {
      visit = { personId: selectedMember.id, serviceId: CheckinHelper.selectedServiceTime.serviceId, visitSessions: [] };
      CheckinHelper.pendingVisits.push(visit);
    }
    const vs = visit?.visitSessions || [];
    CheckinHelper.setGroup(vs, CheckinHelper.selectedServiceTime.id, groupId, groupName);
    setPendingVisits(CheckinHelper.pendingVisits);
    setShowGroups(false);
  }

  React.useEffect(() => {
    setPendingVisits(CheckinHelper.pendingVisits);
  }, []);

  const handleCheckin = () => {
    setIsLoading(true);
    const peopleIds: number[] = ArrayHelper.getUniqueValues(CheckinHelper.householdMembers, "id");
    const url = "/visits/checkin?serviceId=" + CheckinHelper.serviceId + "&peopleIds=" + escape(peopleIds.join(","));
    ApiHelper.post(url, CheckinHelper.pendingVisits, "AttendanceApi").then(() => {
      props.completeHandler();
    });
  }

  return (
    <>
      {getMembers()}
    </>
  )
}
