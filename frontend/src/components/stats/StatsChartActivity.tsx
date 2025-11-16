import { STATS_TABS } from "@/constants/config";
import { ICONS } from "@/constants/icons";
import type { StatsPeriod, StatsProps } from "@/types/interfaces";
import React, { memo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface StatsChartActivityProps {
  stats: StatsProps | null;
  period: StatsPeriod;
}

const StatsChartActivity: React.FC<StatsChartActivityProps> = ({
  stats,
  period,
}) => {
  if (!stats) return <div className="text-lg">Нет данных для отображения</div>;

  return (
    <div className="w-full min-w-0 flex flex-col gap-2 border border-amber-950 p-4 rounded-2xl dark:bg-gray-100/60 dark:border-black">
      <div className="flex gap-3 items-center">
        <img src={ICONS.table} className="w-6" alt="table" />
        <div className="sm:text-lg font-medium mb-0.5">
        График активности (
        {STATS_TABS.find((t) => t.id === period)?.label.toLowerCase()})
      </div>
      </div>

      <div className="w-full h-64 min-w-0 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats.activity}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar
              dataKey="approved"
              name="Одобрено"
              stackId="a"
              fill="#1faf67"
            />
            <Bar
              dataKey="rejected"
              name="Отклонено"
              stackId="a"
              fill="#ce442c"
            />
            <Bar
              dataKey="requestChanges"
              name="Требует доработки"
              stackId="a"
              fill="#ceb62c"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default memo(StatsChartActivity);
