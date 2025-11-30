// src/features/business-plans/types/index.ts

export type PlanBlock = {
    id: number;
    title: string;
    content: string;
    block_type: string;
    block_order: number;
};

export type BusinessPlanDetail = {
    id: number;
    title: string;
    description: string | null;
    blocks: PlanBlock[];
};

export type BusinessPlan = {
    id: number;
    title: string;
    description: string | null;
    created_at: string;
    updated_at: string;
};

export type CreateBusinessPlanData = {
    title: string;
    description?: string;
    blocks: Array<{
        title: string;
        content: string;
        block_type: string;
        block_order: number;
    }>;
};

export type UpdateBusinessPlanData = {
    title?: string;
    description?: string | null;
    blocks?: Array<{
        id?: number;
        title: string;
        content: string;
        block_type: string;
        block_order: number;
    }>;
};

export type AddBlockData = {
    title: string;
    content: string;
    block_type: string;
    block_order?: number;
};

export type UpdateBlockData = {
    title?: string;
    content?: string;
    block_type?: string;
};

export type Block = {
    id: number;
    title: string;
    content: string;
    block_type: string;
    block_order: number;
};
