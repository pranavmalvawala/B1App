import React from "react";
import { ApiHelper, DisplayBox, PersonHelper } from "../../components";
import { PersonInterface } from "../../appBase/interfaces"
import { Household } from "./Household";
import { Grid } from "@mui/material";

interface Props { backHandler: () => void, personId: string, selectedHandler: (personId: string) => void }

export const Person: React.FC<Props> = (props) => {
  const [person, setPerson] = React.useState<PersonInterface>(null);

  const getContactMethods = () => {
    let contactMethods = [];
    if (person) {
      const ci = person.contactInfo;
      if (ci.mobilePhone) contactMethods.push(<div className="contactMethod"><i className="fas fa-phone"></i> {ci.mobilePhone} <label>Mobile</label></div>);
      if (ci.homePhone) contactMethods.push(<div className="contactMethod"><i className="fas fa-phone"></i> {ci.homePhone} <label>Home</label></div>);
      if (ci.workPhone) contactMethods.push(<div className="contactMethod"><i className="fas fa-phone"></i> {ci.workPhone} <label>Work</label></div>);
      if (ci.email) contactMethods.push(<div className="contactMethod"><i className="far fa-envelope"></i> {ci.email}</div>);
      if (ci.address1) {
        let lines = []
        lines.push(<div><i className="fas fa-map-marker-alt"></i> {ci.address1}</div>);
        if (ci.address2) lines.push(<div>{ci.address2}</div>);
        if (ci.city) lines.push(<div>{ci.city}, {ci.state} {ci.zip}</div>);
        contactMethods.push(<div className="contactMethod">{lines}</div>);
      }
    }
    return contactMethods;
  }

  const loadData = () => { ApiHelper.get("/people/" + props.personId, "MembershipApi").then(data => setPerson(data)); }

  React.useEffect(loadData, [props.personId]);

  return (
    <>
      <DisplayBox id="peopleBox" headerIcon="fas fa-user" headerText="Contact Information">
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <img src={PersonHelper.getPhotoUrl(person)} alt="avatar" className="img-fluid" />
          </Grid>
          <Grid item xs={8}>
            <h2>{person?.name.display}</h2>
            {getContactMethods()}
          </Grid>
        </Grid>
      </DisplayBox>
      <Household person={person} selectedHandler={props.selectedHandler} />
    </>
  )
}
