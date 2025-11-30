// src/features/business-plans/components/BlockActions.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useBlockDelete } from "../api/useBlockDelete";

type Props = {
    blockId: number;
    planId: number;
    onEdit?: () => void;
};

export default function BlockActions({ blockId, planId, onEdit }: Props) {
    const deleteMutation = useBlockDelete(planId);

    const handleDelete = () => {
        if (window.confirm("Вы уверены, что хотите удалить этот блок?")) {
            deleteMutation.mutate(blockId);
        }
    };

    return (
        <div className="flex gap-2">
            {onEdit && (
                <Button variant="outline" size="sm" onClick={onEdit}>
                    <Pencil className="w-4 h-4" />
                </Button>
            )}
            <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
            >
                <Trash2 className="w-4 h-4" />
            </Button>
        </div>
    );
}
