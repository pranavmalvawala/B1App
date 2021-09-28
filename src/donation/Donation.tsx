import React from "react";
import { PersonHelper } from "../helpers";
import { DonationPage } from "../appBase/donationComponents/DonationPage";
import { Link } from "react-router-dom";

const returnUrl = window.location.pathname === "/donate" ? "/donate" : "?tab=donation";

export const Donation = () => (
  <div style={{ height: "100vh", backgroundColor: "#F9F9F9", overflowY: "scroll", paddingTop: "30px", paddingLeft: "50px", paddingRight: "50px"}}>
    { PersonHelper.person?.id ? <DonationPage personId={PersonHelper.person.id} /> : <h3 className="text-center">Please <Link to={"/login/?returnUrl=" + returnUrl}>Login</Link> to make a donation.</h3> }
  </div>)
