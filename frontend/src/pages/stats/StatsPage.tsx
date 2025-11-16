import Button from "@/components/ui/Button";
import { useTheme } from "@/theme/useTheme";
import { useEffect } from "react";
import { useStatsStore } from "@/store/useStatsStore";
import {
  StatsMetrics,
  StatsChartActivity,
  StatsCircleChart,
  StatsChartCategories,
  StatsSort,
} from "@/components/stats/index";
import { motion } from "framer-motion";

export const StatsPage = () => {
  useEffect(() => {
    document.title = "Аналитика";
  }, []);

  const { theme, toggleTheme } = useTheme();

  const period = useStatsStore((s) => s.period);
  const stats = useStatsStore((s) => s.stats);
  const loading = useStatsStore((s) => s.loading);
  const loadStats = useStatsStore((s) => s.loadStats);
  const setPeriod = useStatsStore((s) => s.setPeriod);

  useEffect(() => {
    loadStats(period);
  }, [loadStats, period]);

  if (loading) return <div className="loader"></div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
      className="w-full h-full dark:bg-gray-950/90 bg-white"
    >
      <div className="w-full dark:bg-gray-950/90 bg-white mb-10">
        <div className="flex flex-col max-w-6xl min-w-0 mx-auto px-4 py-3 w-full gap-3">
          <div className="flex w-full justify-end">
            <Button
              onClick={toggleTheme}
              className="bg-white dark:bg-black dark:text-white text-black text-sm px-3 py-1 rounded border border-gray-500 hover:bg-gray-300 hover:text-white hover:dark:text-black dark:hover:bg-gray-300 transition w-20"
              value={theme === "dark" ? "🌕 light" : "🌑 dark"}
            />
          </div>

          <StatsSort period={period} setPeriod={setPeriod} />
          <StatsMetrics stats={stats} />
          <StatsChartActivity stats={stats} period={period} />

          <div className="w-full p-3 border border-amber-950 rounded-2xl justify-between flex flex-wrap dark:bg-gray-100/60 dark:border-black">
            <StatsCircleChart stats={stats} />
            <StatsChartCategories stats={stats} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
