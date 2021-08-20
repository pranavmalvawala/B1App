import React from "react";
import { PersonHelper } from "../helpers";
import { DonationPage } from "../appBase/donationComponents/DonationPage";

export const DonationPages = () => {

  return (
    <div style={{ height: "100vh", overflowY: "scroll", backgroundColor: "#F9F9F9", padding: 20 }}>
      { PersonHelper.person?.id ? <DonationPage personId={PersonHelper.person.id} /> : <h3>Please login to make a donation.</h3> }
    </div>);
}
