import React, { useState } from "react";
import { Box, Card, Tabs, Tab, Typography, Link } from "@mui/material";
import { AppearanceHelper, ConfigHelper } from "../helpers";
import { TabPanel, TabContext } from "@mui/lab";
import { GiveNowPanel } from "./components/GiveNowPanel";

export function DonationLanding() {
  const [value, setValue] = useState("0");
  const logoSrc = AppearanceHelper.getLogoLight(ConfigHelper.current.appearance, "/images/logo.png");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9"
      }}
    >
      <Box sx={{ maxWidth: "930px", margin: "auto", paddingY: "72px" }}>
        <Card>
          <Box sx={{ paddingTop: 8, paddingX: 10, paddingBottom: 3 }}>
            <img src={logoSrc} alt="logo" />
          </Box>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                <Tab label="Give Now" sx={{ textTransform: "unset" }} aria-controls="give-now" value="0" />
              </Tabs>
            </Box>
            <TabPanel value="0">
              <GiveNowPanel />
            </TabPanel>
          </TabContext>
          <Typography textAlign="center" marginTop={4} marginBottom={6}>
            <Link href="/login">
              Already got an account? or create one.
            </Link>
          </Typography>
          <Typography textAlign="center" marginY={6}>
            Online giving powered by{" "}
            <Link href="https://livecs.org" target="_blank">
              Live Church Solutions
            </Link>
          </Typography>
        </Card>
      </Box>
    </Box>
  );
}
