// src/lib/apiRoutes.ts
const API_V1 = "/api/v1" as const;

export const API_ROUTES = {
  // === АВТОРИЗАЦИЯ ===
  auth: {
    login: `${API_V1}/auth/login` as const,
    me: `${API_V1}/users/me` as const,
    register: `${API_V1}/auth/register` as const,
  },

  // === БИЗНЕС-ПЛАНЫ ===
  businessPlans: {
    // список планов
    list: `${API_V1}/business/plans` as const,
    // план по id
    byId: (id: number | string) => `${API_V1}/business/plans/${id}` as const,
    // создание плана
    create: `${API_V1}/business/plans` as const,
    // обновление плана
    update: (id: number | string) => `${API_V1}/business/plans/${id}` as const,
    // удаление плана
    delete: (id: number | string) => `${API_V1}/business/plans/${id}` as const,

    blocks: {
      // список блоков плана
      list: (planId: number | string) =>
        `${API_V1}/business/plans/${planId}/blocks` as const,
      // создание блока
      create: (planId: number | string) =>
        `${API_V1}/business/plans/${planId}/blocks` as const,
      // блок по id
      byId: (planId: number | string, blockId: number | string) =>
        `${API_V1}/business/plans/${planId}/blocks/${blockId}` as const,
      // обновление блока
      update: (planId: number | string, blockId: number | string) =>
        `${API_V1}/business/plans/${planId}/blocks/${blockId}` as const,
      // удаление блока
      delete: (planId: number | string, blockId: number | string) =>
        `${API_V1}/business/plans/${planId}/blocks/${blockId}` as const,
      // переупорядочить блоки
      reorder: (planId: number | string) =>
        `${API_V1}/business/plans/${planId}/blocks/reorder` as const,
    },
  },

  // === ФИНАНСОВЫЕ ГРАФИКИ ===
  financial: {
    // список графиков
    charts: {
      list: `${API_V1}/financial/charts` as const,
      byId: (id: number | string) => `${API_V1}/financial/charts/${id}` as const,
      create: `${API_V1}/financial/charts` as const,
      update: (id: number | string) => `${API_V1}/financial/charts/${id}` as const,
      delete: (id: number | string) => `${API_V1}/financial/charts/${id}` as const,
      points: {
        list: (chartId: number | string) => `${API_V1}/financial/charts/${chartId}/points` as const,
        byId: (chartId: number | string, pointId: number | string) => 
          `${API_V1}/financial/charts/${chartId}/points/${pointId}` as const,
        create: (chartId: number | string) => 
          `${API_V1}/financial/charts/${chartId}/points` as const,
        update: (chartId: number | string, pointId: number | string) => 
          `${API_V1}/financial/charts/${chartId}/points/${pointId}` as const,
        delete: (chartId: number | string, pointId: number | string) => 
          `${API_V1}/financial/charts/${chartId}/points/${pointId}` as const,
        reorder: (chartId: number | string) => 
          `${API_V1}/financial/charts/${chartId}/points/reorder` as const,
      },
    },
  },
} as const;

// Для автокомплита в IDE и типобезопасности
export type ApiRoutes = typeof API_ROUTES;