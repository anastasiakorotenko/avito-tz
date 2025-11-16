export interface CardItemProps {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  categoryId: number;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
  images: [string];
  seller: null | {
    id: number;
    name: string;
    rating: string;
    totalAds: number;
    registeredAt: string;
  };
  characteristics: {
    Состояние: string;
    Гарантия: string;
    Производитель: string;
    Модель: string;
    Цвет: string;
  };
  moderationHistory: [
    {
      id: number;
      moderatorId: number;
      moderatorName: string;
      action: string;
      reason: string | null;
      comment?: string;
      timestamp: string;
    }
  ];
}

export interface FetchParams {
  page?: number;
  status?: string[];
  categoryId?: number | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
}

export interface FetchItemsResponse {
  ads: CardItemProps[];
  pagination: PaginationProps;
}

export interface ButtonProps {
  className?: string;
  value: string;
  imageUrl?: string;
  classNameImage?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface CardListProps {
  items: [];
  loading: boolean;
  error: Error | null;
}

export interface CardFiltersProps {
  status: string[];
  categoryId: number | null;
  priceRange?: [number | null, number | null];
  search: string;
  searchPrice: [string, string];
  setCategory: (category: number | null) => void;
  setSearchPrice: (range: [string, string]) => void;
  setSearch: (query: string) => void;
  resetFilters: () => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SortProps {
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  sortOrder: string;
  setSortOrder: (sortOrder: string) => void;
}

export type StatsPeriod = "today" | "week" | "month";

export interface StatsProps {
  summary: StatsSummary;
  activity: StatsActivityItem[];
  decisions: StatsDecisions;
  categories: StatsCategories;
}

export interface StatsSummary {
  totalReviewed: number;
  totalReviewedToday: number;
  totalReviewedThisWeek: number;
  totalReviewedThisMonth: number;
  approvedPercentage: number;
  rejectedPercentage: number;
  requestChangesPercentage: number;
  averageReviewTime: number;
}

export interface StatsActivityItem {
  date: string;
  approved: number;
  rejected: number;
  requestChanges: number;
}

export interface StatsDecisions {
  approved: number;
  rejected: number;
  requestChanges: number;
}

export interface StatsCategories {
  Недвижимость: number;
  Животные: number;
  Мода: number;
  Детское: number;
  Транспорт: number;
  Услуги: number;
  Работа: number;
  Электроника: number;
}
