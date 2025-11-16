import { ICONS } from "./icons";

export const ROUTES = {
  LIST: "/list",
  STATS: "/stats",
  CARD_DETAILS: (id: string) => `/item/${id}`,
};

export const CATEGORIES = [
  { id: 0, label: "Электроника" },
  { id: 1, label: "Недвижимость" },
  { id: 2, label: "Транспорт" },
  { id: 3, label: "Работа" },
  { id: 4, label: "Услуги" },
  { id: 5, label: "Животные" },
  { id: 6, label: "Мода" },
  { id: 7, label: "Детское" },
];

export const STATUSES = ["approved", "pending", "rejected", "draft"];

export const STATUS_LABELS: Record<(typeof STATUSES)[number], string> = {
  approved: "Одобрено",
  pending: "На модерации",
  rejected: "Отклонено",
  draft: "Требует доработки",
  requestChanges: "Требует доработки",
};

export const STATUS_ICONS: Record<(typeof STATUSES)[number], string> = {
  approved: ICONS.approved,
  pending: ICONS.requestChanges,
  rejected: ICONS.reject,
  draft: ICONS.draft,
  requestChanges: ICONS.draft,
};

export const SORT_TABS = [
  { id: "createdAt", label: "Дата" },
  { id: "price", label: "Цена" },
  { id: "priority", label: "Приоритет" },
];

export const STATS_TABS = [
  { id: "today", label: "Сегодня" },
  { id: "week", label: "7 дней" },
  { id: "month", label: "30 дней" },
];

export const REASONS = [
  "Запрещённый товар",
  "Неверная категория",
  "Некорректное описание",
  "Проблемы с фото",
  "Подозрение на мошенничество",
  "Другое",
];
