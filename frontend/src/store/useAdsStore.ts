import { create } from "zustand";
import type { CardItemProps } from "@/types/interfaces";

interface AdsStoreState {
  filteredAds: CardItemProps[];
  setFilteredAds: (ads: CardItemProps[]) => void;
}

export const useAdsStore = create<AdsStoreState>((set) => ({
  filteredAds: [],
  setFilteredAds: (ads) => set({ filteredAds: ads }),
}));
