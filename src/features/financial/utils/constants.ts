// src/features/financial/utils/constants.ts

/**
 * Типы операций для точек графика
 */
export const POINT_TYPES = {
    INCOME: "income" as const,
    EXPENSE: "expense" as const,
} as const;

/**
 * Опции для селекта типов операций
 */
export const POINT_TYPE_OPTIONS = [
    { value: POINT_TYPES.INCOME, label: "Доход" },
    { value: POINT_TYPES.EXPENSE, label: "Расход" },
] as const;

/**
 * Максимальные значения для валидации
 */
export const LIMITS = {
    CHART_TITLE_MAX_LENGTH: 100,
    CHART_DESCRIPTION_MAX_LENGTH: 1000,
    POINT_DESCRIPTION_MAX_LENGTH: 500,
    MAX_AMOUNT: 999999999.99,
} as const;

/**
 * Сообщения по умолчанию
 */
export const MESSAGES = {
    LOADING: "Загрузка...",
    ERROR: "Произошла ошибка",
    NO_DATA: "Нет данных",
    SAVE_SUCCESS: "Сохранено успешно",
    CREATE_SUCCESS: "Создано успешно",
    DELETE_SUCCESS: "Удалено успешно",
} as const;
