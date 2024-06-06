import AnalyticsEvent from "../../models/analytics-event";

export const createAnalytics = async (title: string, params: object) => {
  const event = new AnalyticsEvent({ title, params });
  return await event.save();
};
