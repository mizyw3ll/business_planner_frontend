// src/features/business-plans/components/AddBlockButton.tsx
"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import { Plus } from "lucide-react";
import { useBlockCreate } from "../api/useBlockCreate";

type Props = {
    planId: number;
};

export default function AddBlockButton({ planId }: Props) {
    const [isAdding, setIsAdding] = useState(false);
    const createMutation = useBlockCreate(planId);

    const handleAddBlock = () => {
        const newBlock = {
            title: "Новый блок",
            content: "Содержимое нового блока",
            block_type: "text",
        };

        createMutation.mutate(newBlock, {
            onSuccess: () => {
                setIsAdding(false);
            },
        });
    };

    return (
        <Button
            onClick={handleAddBlock}
            disabled={createMutation.isPending}
            variant="contained"
            startIcon={<Plus size={18} />}
            sx={{ mt: 2 }}
        >
            {createMutation.isPending ? "Добавление..." : "Добавить блок"}
        </Button>
    );
}
