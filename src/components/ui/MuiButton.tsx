// src/components/ui/MuiButton.tsx
"use client";

import * as React from "react";
import { Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/material";
import Link from "next/link";

type ButtonVariant = "default" | "outline" | "destructive" | "ghost" | "secondary" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";

interface ButtonProps extends Omit<MuiButtonProps, "variant" | "size" | "color"> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    asChild?: boolean;
}

/**
 * Унифицированная кнопка на базе MUI Button
 * Поддерживает API shadcn/ui Button для совместимости
 * 
 * Использование:
 * ```tsx
 * // Обычная кнопка
 * <Button variant="outline" size="sm">Нажми меня</Button>
 * 
 * // Кнопка как ссылка (asChild)
 * <Button variant="outline" size="sm" asChild>
 *   <Link href="/dashboard">Dashboard</Link>
 * </Button>
 * 
 * // Кнопка с component prop MUI
 * <Button component={Link} href="/dashboard">Dashboard</Button>
 * ```
 */
export function Button({
    variant = "default",
    size = "default",
    asChild = false,
    children,
    className,
    ...props
}: ButtonProps) {
    // Маппинг вариантов shadcn/ui на MUI
    const muiVariant: MuiButtonProps["variant"] =
        variant === "outline" ? "outlined" :
            variant === "ghost" || variant === "link" ? "text" :
                "contained";

    // Маппинг размеров
    const muiSize: MuiButtonProps["size"] =
        size === "sm" ? "small" :
            size === "lg" ? "large" :
                "medium";

    // Маппинг цветов
    const muiColor: MuiButtonProps["color"] =
        variant === "destructive" ? "error" :
            variant === "secondary" ? "secondary" :
                "primary";

    // Обработка asChild для совместимости с shadcn/ui
    if (asChild && React.isValidElement(children)) {
        const child = React.Children.only(children) as React.ReactElement<any>;

        // Если дочерний элемент - Link, используем component prop MUI
        const isLink = child.type === Link ||
            (typeof child.type === "object" &&
                child.type !== null &&
                "displayName" in child.type &&
                (child.type as { displayName?: string }).displayName === "Link");

        if (isLink && child.props.href) {
            return (
                <MuiButton
                    component={Link}
                    href={child.props.href}
                    variant={muiVariant}
                    size={muiSize}
                    color={muiColor}
                    className={className}
                    {...props}
                >
                    {child.props.children || children}
                </MuiButton>
            );
        }

        // Для других элементов клонируем с пропсами MUI Button
        return (
            <MuiButton
                variant={muiVariant}
                size={muiSize}
                color={muiColor}
                className={className}
                component="span"
                sx={{ display: "inline-flex" }}
                {...props}
            >
                {React.cloneElement(child, {
                    ...child.props,
                    ...props,
                })}
            </MuiButton>
        );
    }

    return (
        <MuiButton
            variant={muiVariant}
            size={muiSize}
            color={muiColor}
            className={className}
            {...props}
        >
            {children}
        </MuiButton>
    );
}

