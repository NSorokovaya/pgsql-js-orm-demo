import mongoose from "../mongo-client";

const analyticsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  params: { type: Object, required: true },
});

const AnalyticsEvent = mongoose.model(
  "Analytics Event",
  analyticsSchema,
  "analytics"
);

export default AnalyticsEvent;
