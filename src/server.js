import express from "express";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import {
  notFoundHandler,
  badRequestHandler,
  genericErrorHandler,
  unauthorizedHandler,
  forbiddenHandler,
} from "./errorHandlers.js";
import cors from "cors";
import usersRouter from "./services/users/index.js";
import roomRouter from "./services/rooms/index.js";
import bookingRouter from "./services/bookings/index.js";

const server = express();

const port = process.env.PORT;
// ********************************* MIDDLEWARES ***************************************

server.use(cors());
server.use(express.json());
/* server.use(passport.initialize()); */
server.use(express.urlencoded({ extended: true }));

// ********************************* ROUTES ********************************************

server.use("/users", usersRouter);
server.use("/rooms", roomRouter);
server.use("/bookings", bookingRouter);

// ********************************* ERROR HANDLERS ************************************
server.use(unauthorizedHandler);
server.use(forbiddenHandler);
server.use(notFoundHandler);
server.use(badRequestHandler);
server.use(genericErrorHandler);

mongoose.connect(process.env.MONGO_CONNECTION);

mongoose.connection.on("connected", () => {
  console.log("Mongo Connected");

  server.listen(port, () => {
    console.table(listEndpoints(server));

    console.log(`Server running on port ${port}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
