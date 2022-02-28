import q2m from "query-to-mongo";
import RoomModel from "./schema.js";

const addImageToRoom = async (req, res, next) => {
  try {
    const cloudImage = req.file.path;
    const { roomName, maxNumOfPeople, status, imageUrl } = req.body;
    console.log("here is my:", roomName, maxNumOfPeople, status);
    const newRoom = new RoomModel(roomName, maxNumOfPeople, status, {
      $set: { imageUrl: cloudImage },
    });
    await newRoom.save();

    res.status(201).send({ newRoom });
  } catch (error) {
    next(error);
  }
};

const createNewRoom = async (req, res, next) => {
  try {
    const newRoom = new RoomModel(req.body);
    await newRoom.save();
    res.status(201).send({ newRoom });
  } catch (error) {
    next(error);
  }
};

const getAllRooms = async (req, res, next) => {
  try {
    const mongoQuery = q2m(req.query);
    const total = await RoomModel.countDocuments(mongoQuery.criteria);
    const rooms = await RoomModel.find(mongoQuery.criteria)
      .limit(mongoQuery.options.limit)
      .skip(mongoQuery.options.skip)
      .sort(mongoQuery.options.sort);
    res.send({
      links: mongoQuery.links("/products", total),
      pageTotal: Math.ceil(total / mongoQuery.options.limit),
      total,
      rooms,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleRoom = async (req, res, next) => {
  try {
    const room = await RoomModel.findById(req.params.id);
    res.status(200).send({ room });
  } catch (error) {
    next(error);
  }
};

const editSingleRoom = async (req, res, next) => {
  try {
    const editedRoom = await RoomModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send({ editedRoom });
  } catch (error) {
    next(error);
  }
};
const editSingleRoomPic = async (req, res, next) => {
  try {
    const editedRoom = await RoomModel.findByIdAndUpdate(
      { _id: req.params.id },
      { imageUrl: req.file.path },
      { new: true }
    );
    res.send({ editedRoom });
  } catch (error) {
    next(error);
  }
};

const deleteSingleRoom = async (req, res, next) => {
  try {
    const deletedRoom = await RoomModel.findByIdAndDelete(req.params.id);
    res.status(204).send({ message: `${req.params.id} deleted!!` });
  } catch (error) {
    next(error);
  }
};

const roomHandlers = {
  addImageToRoom,
  createNewRoom,
  getAllRooms,
  getSingleRoom,
  editSingleRoom,
  editSingleRoomPic,
  deleteSingleRoom,
};

export default roomHandlers;
