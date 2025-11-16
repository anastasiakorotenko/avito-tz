import { ICONS } from "@/constants/icons";
import type { StatsProps } from "@/types/interfaces";
import React, { memo } from "react";

interface StatsMetricsProps {
  stats: StatsProps | null;
}

const StatsMetrics: React.FC<StatsMetricsProps> = ({ stats }) => {
  if (!stats) return <div className="text-lg">Нет данных для отображения</div>;

  const min = stats.summary.averageReviewTime / 60;

  return (
    <div className="w-full min-w-0 flex">
      {stats && (
        <div className="flex w-full gap-3 flex-col">
          <div className="flex justify-between gap-3 w-full">
            <div className="w-1/2 border border-amber-950 flex flex-col p-4 rounded-xl bg-white dark:bg-gray-100/60">
              <div className="flex gap-3 items-center">
                <img src={ICONS.check} className="w-6" alt="table" />
                <div className="sm:text-lg font-medium mb-0.5">Проверено</div>
              </div>
              <div className="md:text-2xl text-lg font-bold">
                {stats.summary.totalReviewed}
              </div>
            </div>

            <div className="w-1/2 border border-amber-950 flex flex-col p-4 rounded-xl bg-white dark:bg-gray-100/60">
              <div className="flex gap-3 items-center">
                <img src={ICONS.approved} className="w-6" alt="table" />
                <div className="sm:text-lg font-medium mb-0.5">Одобрено</div>
              </div>
              <div className="md:text-2xl text-lg font-bold">
                {Math.floor(stats.decisions.approved)}%
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-3 w-full">
            <div className="w-1/2 border border-amber-950 flex flex-col p-4 rounded-xl bg-white dark:bg-gray-100/60">
              <div className="flex gap-3 items-center">
                <img src={ICONS.reject} className="w-6" alt="table" />
                <div className="sm:text-lg font-medium mb-0.5">Отклонено</div>
              </div>
              <div className="md:text-2xl text-lg font-bold">
                {Math.floor(stats.decisions.rejected)}%
              </div>
            </div>

            <div className="w-1/2 border border-amber-950 flex flex-col p-4 rounded-xl bg-white dark:bg-gray-100/60">
              <div className="flex gap-3 items-center">
                <img src={ICONS.history} className="w-6" alt="table" />
                <div className="sm:text-lg font-medium mb-0.5">Ср. время</div>
              </div>
              <div className="md:text-2xl text-lg font-bold">
                {min < 60
                  ? min.toFixed(1) + " мин."
                  : (min / 60).toFixed(1) + " ч."}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(StatsMetrics);
