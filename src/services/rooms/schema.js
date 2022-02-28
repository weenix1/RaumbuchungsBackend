import mongoose from "mongoose";

const { Schema, model } = mongoose;

const RoomSchema = new Schema(
  {
    roomName: { type: String, required: true },
    maxNumOfPeople: { type: Number, required: true },
    imageUrl: { type: String },
    status: {
      type: String,
      required: true,
      default: "free",
      enum: ["free", "occupied"],
    },
  },
  {
    timestamps: true, // adds and manage createdAt and updatedAt fields
  }
);

export default model("Room", RoomSchema);
