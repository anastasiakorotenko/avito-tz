import Button from "@/components/ui/Button";
import { useTheme } from "@/theme/useTheme";
import { useEffect, useState } from "react";
import { useStatsStore } from "@/store/useStatsStore";
import {
  StatsMetrics,
  StatsChartActivity,
  StatsCircleChart,
  StatsChartCategories,
  StatsSort,
} from "@/components/stats/index";
import { motion } from "framer-motion";
import { exportToCSV, exportToPDF } from "@/utils/exportStats";

export const StatsPage = () => {
  useEffect(() => {
    document.title = "Аналитика";
  }, []);

  const { theme, toggleTheme } = useTheme();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const period = useStatsStore((s) => s.period);
  const stats = useStatsStore((s) => s.stats);
  const loading = useStatsStore((s) => s.loading);
  const loadStats = useStatsStore((s) => s.loadStats);
  const setPeriod = useStatsStore((s) => s.setPeriod);

  useEffect(() => {
    loadStats(period);
  }, [loadStats, period]);

  const handlePDFExport = async () => {
    setIsGeneratingPDF(true);
    try {
      await exportToPDF("stats.pdf");
    } catch (error) {
      console.error("PDF export failed:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (loading) return <div className="loader"></div>;
  if (!stats) return <div className="text-lg">Нет данных для отображения</div>;

  return (
    <motion.div
      id="stats-root"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
      className="w-full h-full dark:bg-gray-950/90 bg-white gap-3"
    >
      <div className="flex pb-3 py-12 px-4 w-full max-w-6xl justify-end gap-3">
        <Button
          onClick={toggleTheme}
          className="bg-white dark:bg-black dark:text-white text-black text-sm px-3 py-1 rounded border border-gray-500 hover:bg-gray-300 hover:text-white hover:dark:text-black dark:hover:bg-gray-300 transition w-20"
          value={theme === "dark" ? "🌕 light" : "🌑 dark"}
        />
        <Button
          value="Сохранить в CSV"
          onClick={() => exportToCSV(stats, "analytics.csv")}
          className="bg-blue-200"
        />
        <Button
          value={isGeneratingPDF ? "Генерация..." : "Сохранить в PDF"}
          onClick={handlePDFExport}
          className="bg-red-200"
        />
      </div>

      <div className="w-full h-full min-h-fit pb-10 overflow-visible">
        <div className="flex flex-col max-w-6xl min-w-0  mx-auto px-4 py-3 w-full gap-3">
          <StatsSort period={period} setPeriod={setPeriod} />

          <StatsMetrics stats={stats} />
          <StatsChartActivity stats={stats} period={period} />

          <div className="w-full p-3 border border-amber-950 rounded-2xl justify-between flex dark:bg-gray-100/60 dark:border-black">
            <StatsCircleChart stats={stats} />
            <StatsChartCategories stats={stats} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
