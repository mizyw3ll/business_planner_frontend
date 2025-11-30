// src/features/business-plans/components/AddBlockButton.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
            className="mt-4"
        >
            <Plus className="w-4 h-4 mr-2" />
            {createMutation.isPending ? "Добавление..." : "Добавить блок"}
        </Button>
    );
}
