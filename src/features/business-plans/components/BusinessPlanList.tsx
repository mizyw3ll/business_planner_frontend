// src/features/business-plans/components/BusinessPlanList.tsx
"use client";

import { useBusinessPlanList } from "../api/useBusinessPlanList";
import BusinessPlanCard from "./BusinessPlanCard";
import { Box, Typography, Button, Skeleton } from "@mui/material";

type Props = {
  onOpenCreate?: () => void;
};

export default function BusinessPlanList({ onOpenCreate }: Props) {
  const { data: plans, isLoading } = useBusinessPlanList();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
          gap: 3,
        }}
      >
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
        ))}
      </Box>
    );
  }

  if (!plans || plans.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 6,
          mt: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          У вас пока нет бизнес-планов
        </Typography>
        <Button
          variant="contained"
          onClick={() => onOpenCreate?.()}
        >
          Создать первый план
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
        gap: 3,
      }}
    >
      {plans.map((plan) => (
        <BusinessPlanCard key={plan.id} plan={plan} />
      ))}
    </Box>
  );
}
