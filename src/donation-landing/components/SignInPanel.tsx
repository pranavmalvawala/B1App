import React from "react";
import { Box } from "@mui/material";
import { Login } from "../../Login";

export function SignInPanel() {
  return (
    <Box marginTop={6} marginBottom={4}>
      <Login showLogo={false} redirectAfterLogin={false} loginContainerCssProps={{ sx: { boxShadow: "none" } }} />
    </Box>
  );
}
