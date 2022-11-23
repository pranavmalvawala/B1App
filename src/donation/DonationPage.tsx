import React from "react";
import { ConfigHelper, PersonHelper } from "../helpers";
import { DonationPage as BaseDonationPage } from "../appBase/donationComponents/DonationPage";
import { Link } from "react-router-dom";
import { NonAuthDonation } from "../appBase/donationComponents/components";
import { Grid, Icon, Button, Typography } from "@mui/material";

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
              <NonAuthDonation churchId={ConfigHelper.churchId} />
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography component="h3" sx={{textAlign: "center", fontSize: "28px", fontWeight: 500, lineHeight: 1.2, margin: "0 0 8px 0"}}>Manage Donations</Typography>
              <p style={{marginTop: 0}}>Please login to manage donations</p>
              <Link to="/login/?returnUrl=/donate">
                <Button sx={{fontSize: "16px", textTransform: "capitalize"}} fullWidth variant="contained">Login</Button>
              </Link>
            </Grid>
          </Grid>
        </>)
    }
  </>
)
