import express from "express";
import bookingHandlers from "./handlers.js";

const bookingRouter = express.Router();

bookingRouter
  .route("/")
  .get(bookingHandlers.getAllBookings)
  .post(bookingHandlers.createNewBooking);

bookingRouter
  .route("/:id")
  .get(bookingHandlers.getSingleBooking)
  .put(bookingHandlers.editSingleBooking)
  .delete(bookingHandlers.deleteSingleBooking);

export default bookingRouter;
