// src/features/business-plans/components/BlockActions.tsx
"use client";

import { IconButton, Tooltip, Box } from "@mui/material";
import { Pencil, Trash2 } from "lucide-react";
import { useBlockDelete } from "../api/useBlockDelete";
import { useTheme } from "@mui/material/styles";

type Props = {
    blockId: number;
    planId: number;
    onEdit?: () => void;
};

export default function BlockActions({ blockId, planId, onEdit }: Props) {
    const theme = useTheme();
    const deleteMutation = useBlockDelete(planId);

    const handleDelete = () => {
        if (window.confirm("Вы уверены, что хотите удалить этот блок?")) {
            deleteMutation.mutate(blockId);
        }
    };

    return (
        <Box sx={{ display: "flex", gap: 0.5 }}>
            {onEdit && (
                <Tooltip title="Редактировать">
                    <IconButton
                        size="small"
                        onClick={onEdit}
                        sx={{
                            color: theme.palette.primary.main,
                            "&:hover": {
                                bgcolor: theme.palette.primary.main + "15",
                            },
                        }}
                    >
                        <Pencil size={18} />
                    </IconButton>
                </Tooltip>
            )}
            <Tooltip title="Удалить">
                <IconButton
                    size="small"
                    onClick={handleDelete}
                    disabled={deleteMutation.isPending}
                    sx={{
                        color: theme.palette.error.main,
                        "&:hover": {
                            bgcolor: theme.palette.error.main + "15",
                        },
                    }}
                >
                    <Trash2 size={18} />
                </IconButton>
            </Tooltip>
        </Box>
    );
}
