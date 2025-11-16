import { create } from "zustand";
import { fetchStats } from "@/api/api";
import type { StatsPeriod, StatsProps } from "@/types/interfaces";

interface StatsStore {
  period: StatsPeriod;
  stats: StatsProps | null;
  loading: boolean;

  setPeriod: (p: StatsPeriod) => void;
  loadStats: (p: StatsPeriod) => Promise<void>;
}

export const useStatsStore = create<StatsStore>((set) => ({
  period: "today",
  stats: null,
  loading: false,

  setPeriod: (p) => set({ period: p }),

  loadStats: async (period) => {
    set({ loading: true });
    const data = await fetchStats(period);
    set({ stats: data, loading: false });
  },
}));
