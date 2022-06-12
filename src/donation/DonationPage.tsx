import React from "react";
import { ConfigHelper, PersonHelper } from "../helpers";
import { DonationPage as BaseDonationPage } from "../appBase/donationComponents/DonationPage";
import { Link } from "react-router-dom";
import { OneTimeDonation } from "../appBase/donationComponents/components";
import { Grid, Icon } from "@mui/material";

export const DonationPage = () => (
  <>
    <h1><Icon>volunteer_activism</Icon>Give</h1>
    {
      PersonHelper.person?.id
        ? (
          <BaseDonationPage personId={PersonHelper.person.id} appName="B1App" />
        )
        : (<>
          <Grid container spacing={3}>
            <Grid item md={8} xs={12}>
              <h3>Make a One Time Donation</h3>
              <OneTimeDonation churchId={ConfigHelper.churchId} />
            </Grid>
            <Grid item md={4} xs={12}>
              <h3 className="text-center">Manage Donations</h3>
              <p>Please login to make a recurring donation or manage donations</p>
              <Link to="/login/?returnUrl=/donate" className="btn btn-block btn-info">Login</Link>
            </Grid>
          </Grid>
        </>)
    }
  </>
)
