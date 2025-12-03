// src/features/business-plans/components/BlockCard.tsx
"use client";

import { Paper, Box, Typography, Chip, IconButton } from "@mui/material";
import { Block } from "@/src/features/business-plans/types";
import { Pencil, Trash2, FileText, BarChart, Target } from "lucide-react";
import { useTheme } from "@mui/material/styles";

type Props = {
    block: Block;
    onEdit?: (block: Block) => void;
    onDelete?: (blockId: number) => void;
};

export default function BlockCard({ block, onEdit, onDelete }: Props) {
    const theme = useTheme();

    const getBlockIcon = (type: string) => {
        switch (type) {
            case "text":
                return <FileText size={20} />;
            case "chart":
                return <BarChart size={20} />;
            case "goal":
                return <Target size={20} />;
            default:
                return <FileText size={20} />;
        }
    };

    const getBlockTypeLabel = (type: string) => {
        switch (type) {
            case "text":
                return "Текст";
            case "chart":
                return "График";
            case "goal":
                return "Цель";
            default:
                return "Текст";
        }
    };

    const getBlockTypeColor = (type: string) => {
        switch (type) {
            case "text":
                return theme.palette.primary.main;
            case "chart":
                return theme.palette.info.main;
            case "goal":
                return theme.palette.success.main;
            default:
                return theme.palette.primary.main;
        }
    };

    return (
        <Paper
            elevation={4}
            sx={{
                p: 3,
                borderRadius: "18px",
                transition: "all 0.25s ease",
                cursor: "default",
                borderLeft: `4px solid ${getBlockTypeColor(block.block_type)}`,
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
                },
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}>
                    <Box
                        sx={{
                            color: getBlockTypeColor(block.block_type),
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        {getBlockIcon(block.block_type)}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                        {block.title}
                    </Typography>
                </Box>
                <Chip
                    label={getBlockTypeLabel(block.block_type)}
                    size="small"
                    sx={{
                        bgcolor: getBlockTypeColor(block.block_type),
                        color: "white",
                        fontWeight: 600,
                        ml: 1,
                    }}
                />
            </Box>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    mb: 2,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    lineHeight: 1.6,
                }}
            >
                {block.content}
            </Typography>

            {(onEdit || onDelete) && (
                <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end", pt: 1, borderTop: "1px solid", borderColor: "divider" }}>
                    {onEdit && (
                        <IconButton
                            size="small"
                            onClick={() => onEdit(block)}
                            sx={{
                                color: theme.palette.primary.main,
                                "&:hover": {
                                    bgcolor: theme.palette.primary.main + "15",
                                },
                            }}
                        >
                            <Pencil size={18} />
                        </IconButton>
                    )}
                    {onDelete && (
                        <IconButton
                            size="small"
                            onClick={() => onDelete(block.id)}
                            sx={{
                                color: theme.palette.error.main,
                                "&:hover": {
                                    bgcolor: theme.palette.error.main + "15",
                                },
                            }}
                        >
                            <Trash2 size={18} />
                        </IconButton>
                    )}
                </Box>
            )}
        </Paper>
    );
}
