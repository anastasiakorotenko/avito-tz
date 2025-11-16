import React, { memo } from "react";
import Button from "../ui/Button";
import { STATS_TABS } from "@/constants/config";
import type { StatsPeriod } from "@/types/interfaces";
import { ICONS } from "@/constants/icons";

interface StatsSortProps {
  period: StatsPeriod;
  setPeriod: (p: StatsPeriod) => void;
}

const StatsSort: React.FC<StatsSortProps> = ({ period, setPeriod }) => {
  return (
    <div className="w-full min-w-0 p-5 rounded-2xl dark:bg-gray-500 dark:border-gray-950 bg-amber-100/30 border border-amber-950 flex flex-col gap-3">
      <div className="flex gap-3 items-center">
        <img src={ICONS.time} className="w-6" alt="time" />
        <div className="sm:text-lg font-medium mb-0.5">Период:</div>
      </div>
      <div className="flex flex-wrap gap-2">
        {STATS_TABS.map((t) => (
          <Button
            key={t.id}
            value={t.label}
            className={`max-w-28 items-center justify-center 
              ${
                period === t.id
                  ? "bg-amber-500/70 dark:bg-gray-900"
                  : "bg-amber-500/30 dark:bg-gray-900/60"
              }
            `}
            onClick={() => setPeriod(t.id as StatsPeriod)}
          />
        ))}
      </div>
    </div>
  );
};
export default memo(StatsSort);
