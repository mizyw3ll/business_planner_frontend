// src/features/business-plans/components/PlanBlocks.tsx
"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  Paper,
  Box,
  Typography,
  IconButton,
  TextField,
  MenuItem,
  Button,
  Autocomplete,
} from "@mui/material";
import { GripVertical, Pencil, Trash2, Save, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useBlockUpdate } from "@/src/features/business-plans/api/useBlockUpdate";
import { useBlockDelete } from "@/src/features/business-plans/api/useBlockDelete";
import { useBlockReorder } from "@/src/features/business-plans/api/useBlockReorder";
import { useTheme } from "@mui/material/styles";

type Block = {
  id: number;
  title: string;
  content: string;
  block_type: string;
  block_order: number;
};

type Props = {
  blocks: Block[];
  planId: number;
};

const blockTypes = [
  { value: "text", label: "Текст" },
  { value: "heading", label: "Заголовок" },
  { value: "subheading", label: "Подзаголовок" },
  { value: "financial", label: "Финансовый" },
] as const;

function SortableBlock({ block, planId }: { block: Block; planId: number }) {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(block.title);
  const [type, setType] = useState(block.block_type);
  const [content, setContent] = useState(block.content);

  const updateMutation = useBlockUpdate(planId, block.id);
  const deleteMutation = useBlockDelete(planId);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? "none" : transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  // Синхронизируем состояние с актуальными данными блока
  useEffect(() => {
    setTitle(block.title);
    setType(block.block_type);
    setContent(block.content);
  }, [block.title, block.block_type, block.content]);

  const handleSave = () => {
    updateMutation.mutate(
      { title, content, block_type: type },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  const handleCancel = () => {
    setTitle(block.title);
    setType(block.block_type);
    setContent(block.content);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm("Удалить блок?")) {
      deleteMutation.mutate(block.id);
    }
  };

  const currentBlockType = blockTypes.find((t) => t.value === type);

  if (isEditing) {
    return (
      <Paper
        ref={setNodeRef}
        style={style}
        elevation={4}
        sx={{
          p: 3,
          borderRadius: "18px",
          border: `2px solid ${theme.palette.primary.main}`,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Заголовок блока"
            fullWidth
          />

          <Autocomplete
            value={currentBlockType || null}
            onChange={(_, newValue) => {
              if (newValue) {
                setType(newValue.value);
              }
            }}
            options={blockTypes}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} label="Тип блока" placeholder="Выберите тип блока..." />
            )}
            fullWidth
          />

          <TextField
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            placeholder="Содержимое блока..."
            multiline
            fullWidth
          />

          <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
            <Button
              size="small"
              variant="outlined"
              onClick={handleCancel}
              disabled={updateMutation.isPending}
              startIcon={<X size={18} />}
            >
              Отмена
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={handleSave}
              disabled={updateMutation.isPending}
              startIcon={<Save size={18} />}
            >
              {updateMutation.isPending ? "Сохранение..." : "Сохранить"}
            </Button>
          </Box>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      elevation={isDragging ? 8 : 4}
      sx={{
        p: 3,
        borderRadius: "18px",
        transition: isDragging ? "none" : "all 0.25s ease",
        borderLeft: `4px solid ${theme.palette.primary.main}`,
        ...(isDragging
          ? {
            boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
          }
          : {
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            },
          }),
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}>
          <Box
            {...attributes}
            {...listeners}
            sx={{
              cursor: isDragging ? "grabbing" : "grab",
              display: "flex",
              alignItems: "center",
              color: "text.secondary",
              p: 0.5,
              "&:hover": {
                color: "text.primary",
              },
              "&:active": {
                cursor: "grabbing",
              },
              touchAction: "none",
            }}
          >
            <GripVertical size={20} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {block.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {currentBlockType?.label || block.block_type}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <IconButton
            size="small"
            onClick={() => setIsEditing(true)}
            disabled={updateMutation.isPending}
            sx={{
              color: theme.palette.primary.main,
              "&:hover": {
                bgcolor: theme.palette.primary.main + "15",
              },
            }}
          >
            <Pencil size={18} />
          </IconButton>
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
        </Box>
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {block.content}
      </Typography>
    </Paper>
  );
}

export default function PlanBlocks({ blocks, planId }: Props) {
  const [items, setItems] = useState<Block[]>(blocks);
  const reorderMutation = useBlockReorder(planId);

  // Синхронизируем локальное состояние с пропсами
  useEffect(() => {
    setItems(blocks);
  }, [blocks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((i) => i.id === active.id);
        const newIndex = prev.findIndex((i) => i.id === over.id);
        const newOrder = arrayMove(prev, oldIndex, newIndex);

        reorderMutation.mutate(newOrder.map((b) => b.id));
        return newOrder;
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((b) => b.id)}
        strategy={verticalListSortingStrategy}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {items.map((block) => (
            <SortableBlock key={block.id} block={block} planId={planId} />
          ))}
        </Box>
      </SortableContext>
    </DndContext>
  );
}
