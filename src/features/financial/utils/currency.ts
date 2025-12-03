// src/features/financial/utils/currency.ts

/**
 * Получает символ валюты по коду
 */
export function getCurrencySymbol(code: string): string {
    const currencyMap: Record<string, string> = {
        RUB: "₽",
        USD: "$",
        EUR: "€",
        GBP: "£",
        CNY: "¥",
        JPY: "¥",
    };

    return currencyMap[code.toUpperCase()] || code.toUpperCase();
}

/**
 * Форматирует сумму с валютой
 */
export function formatCurrency(amount: number | string, currencyCode: string): string {
    const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
    if (isNaN(numAmount)) return String(amount);

    const formatted = new Intl.NumberFormat("ru-RU", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(numAmount);

    const symbol = getCurrencySymbol(currencyCode);
    return `${formatted} ${symbol}`;
}

