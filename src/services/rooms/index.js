import express from "express";
import roomHandlers from "./handlers.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: { folder: "RoomBooking" },
});

const roomRouter = express.Router();

/* roomRouter
  .route("/image")
  .post(
    multer({ storage: cloudinaryStorage }).single("img"),
    roomHandlers.addImageToRoom
  );
 */
roomRouter
  .route("/")
  .get(roomHandlers.getAllRooms)
  .post(roomHandlers.createNewRoom);

roomRouter
  .route("/:id/uploadPic")
  .put(
    multer({ storage: cloudinaryStorage }).single("img"),
    roomHandlers.editSingleRoomPic
  );

roomRouter
  .route("/:id")
  .get(roomHandlers.getSingleRoom)
  .put(roomHandlers.editSingleRoom)
  .delete(roomHandlers.deleteSingleRoom);

export default roomRouter;
