// src/features/business-plans/components/BusinessPlanCard.tsx
"use client";

import Link from "next/link";
import { Card, Box, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { APP_ROUTES } from "@/src/lib/appRoutes";
import { useBlockList } from "../api/useBlockList";

type Props = {
  plan: {
    id: number;
    title: string;
    description: string | null;
    created_at: string;
  };
};

export default function BusinessPlanCard({ plan }: Props) {
  const { data: blocks } = useBlockList(plan.id);
  const blocksCount = blocks?.length || 0;

  return (
    <Card
      component={Link}
      href={APP_ROUTES.dashboard.plans.detail(plan.id)}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
        "&:hover": {
          "& .card-content": {
            opacity: 0.9,
          },
        },
      }}
    >
      <Box
        className="card-content"
        sx={{
          px: 2.5,
          pt: 2.5,
          pb: 1.5,
          flex: 1,
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight={600}
          gutterBottom
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {plan.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {plan.description || "Нет описания"}
        </Typography>
      </Box>

      <Box
        component="footer"
        onClick={(e) => e.stopPropagation()}
        sx={{
          px: 2.5,
          py: 1.5,
          borderTop: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Создан {formatDistanceToNow(new Date(plan.created_at), { locale: ru, addSuffix: true })}
        </Typography>

        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
          Количество блоков: {blocksCount}
        </Typography>
      </Box>
    </Card>
  );
}