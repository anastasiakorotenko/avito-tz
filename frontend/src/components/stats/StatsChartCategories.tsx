import { ICONS } from "@/constants/icons";
import type { StatsCategories, StatsProps } from "@/types/interfaces";
import React, { memo, useMemo } from "react";
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

interface StatsChartCategoriesProps {
  stats: StatsProps | null;
}

const CATEGORIES = {
  Электроника: "electronics",
  Недвижимость: "realestate",
  Транспорт: "transport",
  Работа: "jobs",
  Услуги: "services",
  Животные: "animals",
  Мода: "fashion",
  Детское: "kids",
} as const;

const StatsChartCategories: React.FC<StatsChartCategoriesProps> = ({
  stats,
}) => {
  const data = useMemo(() => {
    if (!stats?.categories) return [];

    const categories = stats.categories;
    const categoryValues = Object.values(categories);
    const maxValue = Math.max(...categoryValues) + 10;

    return Object.entries(CATEGORIES).map(([key]) => ({
      subject: key,
      count: categories[key as keyof StatsCategories],
      fullMark: maxValue,
    }));
  }, [stats]);

  if (!stats) return <div className="text-lg">Нет данных для отображения</div>;

  const totalAds = Object.values(stats.categories).reduce(
    (sum, count) => sum + count,
    0
  );
  if (totalAds === 0) {
    return <div className="text-lg">Нет данных по категориям</div>;
  }

  return (
    <div className="w-full sm:w-1/2 flex flex-col items-center">
      <div className="flex gap-3 items-center">
        <img src={ICONS.catsChart} className="w-6" alt="catsChart" />
        <div className="sm:text-lg font-medium mb-0.5">
          Категории объявлений
        </div>
      </div>

      <div className="w-full h-64 min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, "auto"]} />
            <Radar
              name="Количество объявлений"
              dataKey="count"
              stroke="#1faf67"
              fill="#1faf67"
              fillOpacity={0.6}
            />
            <Legend wrapperStyle={{ paddingTop: 20 }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default memo(StatsChartCategories);
