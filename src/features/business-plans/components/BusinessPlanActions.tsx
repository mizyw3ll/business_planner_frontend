// src/features/business-plans/components/BusinessPlanActions.tsx
"use client";

import { useState } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    IconButton,
} from "@mui/material";
import { useBusinessPlanDelete } from "../api/useBusinessPlanDelete";
import { Trash2 } from "lucide-react";

type Props = {
    planId: number;
    iconOnly?: boolean;        // Новый пропс
    iconSize?: "small" | "medium";
};

export default function BusinessPlanActions({ 
    planId, 
    iconOnly = false,
    iconSize = "medium"
}: Props) {
    const [open, setOpen] = useState(false);
    const mutation = useBusinessPlanDelete();

    const handleOpen = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleDelete = () => {
        mutation.mutate(planId, {
            onSuccess: () => setOpen(false),
        });
    };

    const button = iconOnly ? (
        <IconButton
            size={iconSize}
            color="error"
            onClick={handleOpen}
            title="Удалить план"
            sx={{
                "&:hover": {
                    bgcolor: "error.main",
                    color: "error.contrastText",
                },
            }}
        >
            <Trash2 size={18} />
        </IconButton>
    ) : (
        <Button
            variant="contained"
            color="error"
            startIcon={<Trash2 size={18} />}
            onClick={handleOpen}
        >
            Удалить
        </Button>
    );

    return (
        <>
            {button}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Удалить бизнес-план?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Это действие нельзя отменить. План будет удалён навсегда.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">
                        Отмена
                    </Button>
                    <Button
                        onClick={handleDelete}
                        color="error"
                        variant="contained"
                        disabled={mutation.isPending}
                        autoFocus
                    >
                        {mutation.isPending ? "Удаляем..." : "Удалить"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}