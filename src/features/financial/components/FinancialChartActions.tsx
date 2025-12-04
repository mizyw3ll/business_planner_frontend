// src/features/financial/components/FinancialChartActions.tsx
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
    Box,
} from "@mui/material";
import { useFinancialChartDelete } from "../api/useFinancialChartDelete";
import { Trash2 } from "lucide-react";

type Props = {
    chartId: number;
    /** Принудительно только иконка (например, на мобильных) */
    iconOnly?: boolean;
    /** Опционально: размер для IconButton */
    iconSize?: "small" | "medium" | "large";
    onSuccess?: () => void;
};

export default function FinancialChartActions({
    chartId,
    iconOnly = false,
    iconSize = "medium",
    onSuccess,
}: Props) {
    const [open, setOpen] = useState(false);
    const mutation = useFinancialChartDelete();

    const handleOpen = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        mutation.mutate(chartId, {
            onSuccess: () => {
                onSuccess?.();
                setOpen(false);
            },
        });
    };

    // Основная кнопка — адаптивная
    const buttonElement = iconOnly ? (
        <IconButton
            size={iconSize}
            color="error"
            onClick={handleOpen}
            title="Удалить график"
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
            {buttonElement}

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Удалить финансовый график?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Это действие нельзя отменить. График и все его точки будут удалены навсегда.
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