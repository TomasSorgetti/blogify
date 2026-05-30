import { privateApi } from "./api";

export const getWorkbenchStats = async (workbenchId?: string) => {
  try {
    const url = workbenchId
      ? `/fetch/stats?workbenchId=${workbenchId}`
      : "/fetch/stats";
    const { data } = await privateApi.get(url);
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data?.message || "Error al cargar estadísticas",
    };
  }
};

export const trackEvent = async (eventData: {
  type: string;
  articleId?: string;
  metadata?: any;
}) => {
  try {
    const { data } = await privateApi.post(
      "/fetch/analytics/events",
      eventData,
    );
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data?.message || "Error al rastrear evento",
    };
  }
};
