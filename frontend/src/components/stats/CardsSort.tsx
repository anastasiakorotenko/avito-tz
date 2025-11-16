import React from "react";
import Button  from "../ui/Button";
import type { SortProps } from "@/types/interfaces";
import { SORT_TABS } from "@/constants/config";
import { ICONS } from "@/constants/icons";

export const CardsSort: React.FC<SortProps> = ({
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <div className="flex flex-col mr-auto gap-4 p-5 dark:bg-gray-600/90 dark:border-gray-950 bg-amber-600/10 rounded-2xl border border-amber-950">
      <div className="sm:text-2xl text-lg font-bold mr-auto">Сортировка</div>

      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex items-center gap-2">
        {SORT_TABS.map((t) => (
          <Button
            key={t.id}
            onClick={() => setSortBy(t.id)}
            className={`
              px-4 py-2 text-sm transition 
              ${
                sortBy === t.id
                  ? "bg-amber-700/30 dark:bg-gray-400/60"
                  : "bg-amber-700/10 border dark:bg-gray-300/10 dark:border-gray-800 border-gray-300"
              }
            `}
            value={t.label}
          />
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={() => setSortOrder("asc")}
          className={`flex-row-reverse
            ${
              sortOrder === "asc"
                ? "bg-amber-400/30 dark:bg-gray-900/60"
                : "bg-amber-400/10 border dark:bg-gray-800/30 dark:border-gray-800 border-gray-300"
            }
          `}
          value="Возрастание"
          imageUrl={ICONS.arrow}
          classNameImage="rotate-270"
        />

        <Button
          onClick={() => setSortOrder("desc")}
          className={`flex-row-reverse
            ${
              sortOrder === "desc"
                ? "bg-amber-400/30 dark:bg-gray-900/60"
                : "bg-amber-400/10 border dark:bg-gray-800/30 dark:border-gray-800 border-gray-300"
            }
          `}
          value="Убывание"
          imageUrl={ICONS.arrow}
          classNameImage="rotate-90"
        />
      </div>
      </div>
    </div>
  );
};
