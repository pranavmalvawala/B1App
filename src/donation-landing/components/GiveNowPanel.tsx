import React from "react";
import { Box, Typography } from "@mui/material";
import { NonAuthDonation } from "../../appBase/donationComponents/components";
import { ConfigHelper } from "../../helpers";

export function GiveNowPanel() {
  return (
    <Box sx={{ paddingX: 5, paddingTop: 3 }}>
      <Typography variant="h5" fontWeight="bold">
        My Donation
      </Typography>
      <NonAuthDonation
        churchId={ConfigHelper.churchId}
        mainContainerCssProps={{ sx: { boxShadow: "none", paddingY: 3 } }}
        showHeader={false}
      />
    </Box>
  );
}
