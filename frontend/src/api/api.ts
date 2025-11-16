import type { FetchParams, StatsPeriod } from "@/types/interfaces";
import axios from "axios";
const BASE_URL = "/api/v1";

export const fetchData = async (params: FetchParams) => {
  try {
    const response = await axios.get(`${BASE_URL}/ads`, {
      params: {
        ...params,
        sortBy: params.sortBy || "createdAt",
        sortOrder: params.sortOrder || "desc",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchItemDetails = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/ads/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const postApprovedAds = async (id: number) => {
  try {
    const response = await axios.post(`${BASE_URL}/ads/${id}/approve`, {});
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const postRejectedAds = async (
  id: number,
  reason: string,
  comment?: string
) => {
  try {
    const response = await axios.post(`${BASE_URL}/ads/${id}/reject`, {
      reason,
      comment: comment || "",
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const postPendingAds = async (
  id: number,
  reason: string,
  comment?: string
) => {
  try {
    const response = await axios.post(`${BASE_URL}/ads/${id}/request-changes`, {
      reason,
      comment: comment || "",
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchStats = async (period: StatsPeriod) => {
  try {
    const summary = await axios.get(
      `${BASE_URL}/stats/summary?period=${period}`
    );
    const activity = await axios.get(
      `${BASE_URL}/stats/chart/activity?period=${period}`
    );
    const decisions = await axios.get(
      `${BASE_URL}/stats/chart/decisions?period=${period}`
    );
    const categories = await axios.get(
      `${BASE_URL}/stats/chart/categories?period=${period}`
    );

    return {
      summary: summary.data,
      activity: activity.data,
      decisions: decisions.data,
      categories: categories.data,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
