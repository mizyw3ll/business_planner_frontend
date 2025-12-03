// src/app/auth/register/page.tsx
"use client";

import React from "react";
import AuthForm from "@/src/features/auth/components/AuthForm";
import { Paper, Box, Typography, useTheme } from "@mui/material";

export default function RegisterPage(): React.JSX.Element {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, var(--background) 0%, var(--background) 50%, rgba(var(--muted-rgb), 0.1) 100%)",
        p: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          maxWidth: 500,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            textAlign: "center",
            mb: 3,
            color: theme.palette.primary.main,
          }}
        >
          Создать аккаунт
        </Typography>
        <AuthForm initialMode="register" />
      </Paper>
    </Box>
  );
}
