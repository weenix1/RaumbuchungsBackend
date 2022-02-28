import mongoose from "mongoose";

const { Schema, model } = mongoose;

const BookingSchema = new Schema(
  {
    roomNames: { type: Schema.Types.ObjectId, ref: "Room" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    numOfPeople: { type: Number, required: true },
    startDate: { type: Date, unique: true },
    endDate: { type: Date, unique: true },
  },
  {
    timestamps: true, // adds and manage createdAt and updatedAt fields
  }
);

export default model("Booking", BookingSchema);
