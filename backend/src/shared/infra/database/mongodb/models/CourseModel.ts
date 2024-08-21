import { Schema, model } from "mongoose";

const IncentivesSchema = new Schema(
  {
    total_num_chapters: { type: Schema.Types.Number, default: 0 },
    total_num_lectures: { type: Schema.Types.Number, default: 0 },
    tota_num_quizzes: { type: Schema.Types.Number, default: 0 },
    total_num_assignments: { type: Schema.Types.Number, default: 0 },
    total_num_lectures_duration: { type: Schema.Types.Number, default: 0 },
  },
  { _id: false }
);

const CourseScheme = new Schema(
  {
    course_id: {
      type: Schema.Types.String,
      required: true,
      index: true,
      unique: true,
    },
    category_id: {
      type: Schema.Types.String,
      ref: "Category",
      required: true,
    },
    trainer_id: {
      type: Schema.Types.String,
      ref: "Trainer",
      required: true,
    },
    title: { type: Schema.Types.String, required: true },
    meta_title: { type: Schema.Types.String, default: "" },
    meta_keywords: { type: Schema.Types.String, default: "" },
    meta_description: { type: Schema.Types.String, default: "" },
    slug: { type: Schema.Types.String, required: true, index: true },
    incentives: IncentivesSchema,
    course_type: { type: Schema.Types.String, required: true },
    sub_title: { type: Schema.Types.String },
    description: { type: Schema.Types.String },
    original_price: { type: Schema.Types.Number },
    cost_price: { type: Schema.Types.Number },
    prerequisites: [{ type: Schema.Types.String }],
    objectives: [{ type: Schema.Types.String }],
    target_audience: [{ type: Schema.Types.String }],
    level: { type: Schema.Types.Number },
    has_certificate: { type: Schema.Types.Boolean },
    course_language: { type: Schema.Types.String },
    total_num_chapters: { type: Schema.Types.Number, default: 0 },
    total_num_reviews: { type: Schema.Types.Number, default: 0 },
    total_num_subscribers: { type: Schema.Types.Number, default: 0 },
    is_free: { type: Schema.Types.Boolean, default: false },
    is_free_for_all: { type: Schema.Types.Boolean, default: false },
    is_applicable_for_certificate: {
      type: Schema.Types.Boolean,
      default: false,
    },
    url: { type: Schema.Types.String, required: true },
    learn_url: { type: Schema.Types.String, required: true },
    is_published: { type: Schema.Types.Boolean, default: false },
    is_deleted: { type: Schema.Types.Boolean, default: false },
    course_image: { type: Schema.Types.String },
    promo_asset: {
      type: Schema.Types.String,
      ref: "Asset",
    },
    last_update: { type: Schema.Types.Date },
  },
  { timestamps: true }
);

CourseScheme.index({ title: "text", description: "text" });
const CourseModel = model("Course", CourseScheme);

export default CourseModel;
