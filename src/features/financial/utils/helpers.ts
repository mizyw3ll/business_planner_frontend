// src/features/financial/utils/helpers.ts

import { format } from "date-fns";
import { ru } from "date-fns/locale";

/**
 * Форматирует дату в читаемый формат
 */
export const formatDate = (dateString: string): string => {
    try {
        return format(new Date(dateString), "dd.MM.yyyy", { locale: ru });
    } catch {
        return dateString;
    }
};

/**
 * Форматирует сумму с учетом валюты
 */
export const formatAmount = (amount: string, currencyCode?: string): string => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return amount;

    const formatted = new Intl.NumberFormat("ru-RU", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(numAmount);

    return currencyCode ? `${formatted} ${currencyCode}` : formatted;
};

/**
 * Форматирует тип операции
 */
export const formatPointType = (type: "income" | "expense"): string => {
    return type === "income" ? "Доход" : "Расход";
};

/**
 * Возвращает цвет для типа операции
 */
export const getPointTypeColor = (type: "income" | "expense"): string => {
    return type === "income" ? "text-green-600" : "text-red-600";
};

/**
 * Конвертирует дату в формат для input[type="date"]
 */
export const formatDateForInput = (dateString: string): string => {
    try {
        return new Date(dateString).toISOString().split('T')[0];
    } catch {
        return "";
    }
};


/**
 * Валидация формы финансового графика
 */
export const validateChartForm = (data: {
    title: string;
    description?: string;
    currency_id: number | string;
}): { isValid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};

    if (!data.title?.trim()) {
        errors.title = "Название графика обязательно";
    } else if (data.title.trim().length < 2) {
        errors.title = "Название должно содержать минимум 2 символа";
    } else if (data.title.trim().length > 100) {
        errors.title = "Название не должно превышать 100 символов";
    }

    if (!data.currency_id || data.currency_id === "") {
        errors.currency_id = "Выберите валюту";
    } else {
        const currencyId = Number(data.currency_id);
        if (isNaN(currencyId) || currencyId <= 0) {
            errors.currency_id = "Некорректный ID валюты";
        }
    }

    if (data.description && data.description.length > 1000) {
        errors.description = "Описание не должно превышать 1000 символов";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

/**
 * Валидация формы точки графика
 */
export const validateChartPointForm = (data: {
    date: string;
    type: "income" | "expense";
    amount: string;
    description?: string;
}): { isValid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};

    if (!data.date) {
        errors.date = "Дата обязательна";
    } else {
        const date = new Date(data.date);
        if (isNaN(date.getTime())) {
            errors.date = "Некорректная дата";
        } else if (date > new Date()) {
            errors.date = "Дата не может быть в будущем";
        }
    }

    if (!data.amount?.trim()) {
        errors.amount = "Сумма обязательна";
    } else {
        const amount = parseFloat(data.amount);
        if (isNaN(amount) || amount <= 0) {
            errors.amount = "Сумма должна быть положительным числом";
        } else if (amount > 999999999.99) {
            errors.amount = "Сумма слишком большая";
        }
    }

    if (!data.type || !["income", "expense"].includes(data.type)) {
        errors.type = "Выберите тип операции";
    }

    if (data.description && data.description.length > 1000) {
        errors.description = "Описание не должно превышать 1000 символов";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};
