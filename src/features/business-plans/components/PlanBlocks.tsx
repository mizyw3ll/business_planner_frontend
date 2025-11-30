// src/features/business-plans/components/PlanBlocks.tsx

"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
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
import { cn } from "@/src/lib/utils"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical, Pencil, Trash2, Save, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useBlockUpdate } from "@/src/features/business-plans/api/useBlockUpdate"
import { useBlockDelete } from "@/src/features/business-plans/api/useBlockDelete"
import { useBlockReorder } from "@/src/features/business-plans/api/useBlockReorder"

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

function SortableBlock({ block, planId }: { block: Block; planId: number }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(block.title);
  const [type, setType] = useState(block.block_type);
  const [content, setContent] = useState(block.content);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const updateMutation = useBlockUpdate(planId, block.id);
  const deleteMutation = useBlockDelete(planId);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Синхронизируем состояние с актуальными данными блока
  useEffect(() => {
    setTitle(block.title);
    setType(block.block_type);
    setContent(block.content);
  }, [block.title, block.block_type, block.content]);

  const handleSave = () => {
    updateMutation.mutate(
      { title, content, block_type: type, },
      {
        onSuccess: () => {
          setIsEditing(false);
          // Данные уже обновлены через оптимистичное обновление
        }
      }
    );
  };

  const handleCancel = () => {
    setTitle(block.title); // Возвращаем оригинальные значения
    setType(block?.block_type);
    setContent(block.content);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm("Удалить блок?")) {
      deleteMutation.mutate(block.id);
    }
  };

  const blockTypes = [
    { value: "text", label: "Текст" },
    { value: "heading", label: "Заголовок" },
    { value: "subheading", label: "Подзаголовок" },
    { value: "financial", label: "Финансовый" },
    { value: "list", label: "Список" },
    { value: "image", label: "Изображение" },
    { value: "chart", label: "График" },
    { value: "divider", label: "Разделитель" },
    { value: "quote", label: "Цитата" },
    { value: "code", label: "Код" },
    { value: "financial_chart", label: "Финансовый график" },
  ] as const;

  // if (isEditing) {
  //   return (
  //     <Card ref={setNodeRef} style={style} className="border-2 border-blue-500">
  //       <CardHeader>
  //         <Input 
  //           value={title} 
  //           onChange={(e) => setTitle(e.target.value)} 
  //         />
  //       </CardHeader>
  //       <CardContent>
  //         <Textarea 
  //           value={content} 
  //           onChange={(e) => setContent(e.target.value)} 
  //           rows={6} 
  //         />
  //         <div className="flex gap-2 mt-4">
  //           <Button 
  //             size="sm" 
  //             onClick={handleSave} 
  //             disabled={updateMutation.isPending}
  //           >
  //             <Save className="w-4 h-4 mr-1" /> 
  //             {updateMutation.isPending ? "Сохранение..." : "Сохранить"}
  //           </Button>
  //           <Button 
  //             size="sm" 
  //             variant="outline" 
  //             onClick={handleCancel}
  //             disabled={updateMutation.isPending}
  //           >
  //             <X className="w-4 h-4" /> Отмена
  //           </Button>
  //         </div>
  //       </CardContent>
  //     </Card>
  //   );
  // }

  if (isEditing) {
    return (
      <Card ref={setNodeRef} style={style} className="border-2 border-blue-500">
        <CardHeader>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Заголовок блока"
          />

          {/* УМНОЕ ПОЛЕ С ФИЛЬТРАЦИЕЙ */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between mt-2 text-left font-normal"
              >
                <span className="truncate">
                  {type
                    ? blockTypes.find((t) => t.value === type)?.label || type
                    : "Выберите тип блока..."}
                </span>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command shouldFilter={false}> {/* ← ВАЖНО! Отключаем встроенный фильтр */}
                <CommandInput
                  placeholder="Поиск типа блока..."
                  value={search}
                  onValueChange={setSearch} // ← добавляем своё состояние
                />
                <CommandList>
                  <CommandEmpty>Ничего не найдено</CommandEmpty>
                  <CommandGroup>
                    {blockTypes
                      .filter((blockType) =>
                        blockType.label.toLowerCase().includes(search.toLowerCase()) ||
                        blockType.value.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((blockType) => (
                        <CommandItem
                          key={blockType.value}
                          value={blockType.value}
                          onSelect={(currentValue) => {
                            setType(currentValue);
                            setOpen(false);
                            setSearch(""); // ← очищаем поиск
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              type === blockType.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {blockType.label}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </CardHeader>

        <CardContent>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            placeholder="Содержимое блока..."
          />
          <div className="flex gap-2 mt-4">
            <Button
              size="sm"
              onClick={handleSave}
              disabled={updateMutation.isPending}
            >
              <Save className="w-4 h-4 mr-1" />
              {updateMutation.isPending ? "Сохранение..." : "Сохранить"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
              disabled={updateMutation.isPending}
            >
              <X className="w-4 h-4" /> Отмена
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card ref={setNodeRef} style={style} className={isDragging ? "shadow-lg" : ""}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing"
          >
            <GripVertical className="w-5 h-5 text-gray-400" />
          </button>
          <div>
            <CardTitle>{block.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{block.block_type}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsEditing(true)}
            disabled={updateMutation.isPending}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none whitespace-pre-wrap">{block.content}</div>
      </CardContent>
    </Card>
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
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Временно добавьте в компонент
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((i) => i.id === active.id);
        const newIndex = prev.findIndex((i) => i.id === over.id);
        const newOrder = arrayMove(prev, oldIndex, newIndex);

        console.log('Sending new order:', newOrder.map((b) => b.id));

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
        <div className="space-y-4">
          {items.map((block) => (
            <SortableBlock
              key={block.id}
              block={block}
              planId={planId}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}