import { Schema, model } from "mongoose";
import { dispatchEventsCallback } from "../hooks";

const UserScheme = new Schema(
  {
    user_id: {
      type: Schema.Types.UUID,
      required: true,
      index: true,
      unique: true,
    },
    email: { type: Schema.Types.String, required: true },
    user_password: { type: Schema.Types.String },
    username: { type: Schema.Types.String },
    phone: { type: Schema.Types.String },
    image_url: { type: Schema.Types.String },
    is_email_verified: { type: Schema.Types.Boolean, default: false },
    is_admin_user: {
      type: Schema.Types.Boolean,
      default: false,
    },
    is_deleted: { type: Schema.Types.Boolean, default: false },
  },
  { timestamps: true }
);

const UserModel = model("User", UserScheme);

const filter = [
  {
    $match: {
      operationType: { $in: ["insert", "update"] },
    },
  },
];

UserModel.watch(filter, { fullDocument: "updateLookup" }).on(
  "change",
  (data: any) => {
    dispatchEventsCallback(data.fullDocument.user_id);
  }
);

export default UserModel;
