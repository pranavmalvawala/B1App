import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SettingsPage } from "./admin/settings/SettingsPage";
import { Page } from "./Page";
import { CheckinPage } from "./checkin/CheckinPage";
import { ConfigHelper } from "./components";
import { DonationPage } from "./donation/DonationPage";
import { DirectoryPage } from "./directory/DirectoryPage"
import { StreamPage } from "./stream/StreamPage"
import { UrlPage } from "./url/UrlPage"
import { BiblePage } from "./bible/BiblePage"
import { FormPage } from "./form/FormPage";
import { LessonsPage } from "./lessons/LessonsPage";
import { VotdPage } from "./votd/VotdPage";
import { Box } from "@mui/material";
import { Wrapper } from "./components/Wrapper";

export const Authenticated = () => {
  const firstTabRoute = ConfigHelper.getFirstRoute()

  return (
    <Box sx={{ display: "flex", backgroundColor: "#EEE" }}>
      <Wrapper>
        <Routes>
          <Route path="/login" element={<Navigate to={firstTabRoute} />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="/pages/:churchId/:id" element={<Page />} />
          <Route path="/checkin" element={<CheckinPage />} />
          <Route path="/donate" element={<DonationPage />} />
          <Route path="/stream" element={<StreamPage />} />
          <Route path="/lessons" element={<LessonsPage />} />
          <Route path="/directory" element={<DirectoryPage />} />
          <Route path="/bible" element={<BiblePage />} />
          <Route path="/votd" element={<VotdPage />} />
          <Route path="/url/:id" element={<UrlPage />} />
          <Route path="/forms/:id" element={<FormPage />} />
          <Route path="/" element={<Navigate to={firstTabRoute} />} />
        </Routes>
      </Wrapper>
    </Box>
  );
}

