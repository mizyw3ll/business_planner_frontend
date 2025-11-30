// src/features/business-plans/api/useBlockUpdate.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/src/lib/axios";
import { API_ROUTES } from "@/src/lib/apiRoutes";
import { UpdateBlockData, Block } from "@/src/features/business-plans/types";

export const useBlockUpdate = (planId: number, blockId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: UpdateBlockData) => {
            const res = await api.patch(
                API_ROUTES.businessPlans.blocks.update(planId, blockId),
                data
            );
            return res.data;
        },
        onMutate: async (updatedData) => {
            await queryClient.cancelQueries({ queryKey: ["business-plan", planId] });

            const previousPlan = queryClient.getQueryData(["business-plan", planId]);

            queryClient.setQueryData(["business-plan", planId], (old: any) => ({
                ...old,
                blocks: old.blocks.map((block: Block) =>
                    block.id === blockId
                        ? { ...block, ...updatedData }
                        : block
                ),
            }));

            return { previousPlan };
        },
        onError: (err, newBlock, context) => {
            queryClient.setQueryData(["business-plan", planId], context?.previousPlan);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["business-plan", planId] });
        },
    });
};
