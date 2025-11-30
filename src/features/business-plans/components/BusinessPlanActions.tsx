// src/features/business-plans/components/DeletePlanButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useBusinessPlanDelete } from "../api/useBusinessPlanDelete";
import { Trash2 } from "lucide-react";

type Props = {
    planId: number;
};

export default function DeletePlanButton({ planId }: Props) {
    const mutation = useBusinessPlanDelete();

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="sm" variant="destructive">
                    <Trash2 className="w-4 h-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Удалить бизнес-план?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Это действие нельзя отменить. План будет удалён навсегда.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => mutation.mutate(planId)}
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? "Удаляем..." : "Удалить"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}