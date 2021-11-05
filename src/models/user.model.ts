import mongoose, { Schema, Document } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please Enter Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter Password"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
