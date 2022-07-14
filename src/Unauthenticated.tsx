import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./Login"
import { Page } from "./Page"
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
import { Wrapper } from "./components/Wrapper";
import { Box } from "@mui/material";
export const Unauthenticated = () => {
  let firstTabRoute = ConfigHelper.getFirstRoute()
  if (firstTabRoute === "/") firstTabRoute = "/bible";

  return (
    <Box sx={{ display: "flex", backgroundColor: "#EEE" }}>
      <Wrapper>
        <Routes>
          <Route path="/login" element={<Login />} />
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
  )
}
