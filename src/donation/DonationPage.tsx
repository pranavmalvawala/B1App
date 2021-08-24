import React from "react";
import { PersonHelper } from "../helpers";
import { DonationPage } from "../appBase/donationComponents/DonationPage";

export const DonationPages = () => (
  <div style={{ height: "100vh", backgroundColor: "#F9F9F9", overflowY: "scroll" }}>
    { PersonHelper.person?.id ? <DonationPage personId={PersonHelper.person.id} /> : <h3>Please login to make a donation.</h3> }
  </div>)
