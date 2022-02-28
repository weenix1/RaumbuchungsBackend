import BookingModel from "./schema.js";

const createNewBooking = async (req, res, next) => {
  try {
    const newBooking = new BookingModel(req.body);
    await newBooking.save();

    res.status(201).send({ newBooking });
  } catch (error) {
    next(error);
  }
};

const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await BookingModel.find();
    res.send({ bookings });
  } catch (error) {
    next(error);
  }
};

const getSingleBooking = async (req, res, next) => {
  try {
    const booking = await BookingModel.findById(req.params.id);
    res.status(200).send({ booking });
  } catch (error) {
    next(error);
  }
};

const editSingleBooking = async (req, res, next) => {
  try {
    const editedBooking = await BookingModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send({ editedBooking });
  } catch (error) {
    next(error);
  }
};

const deleteSingleBooking = async (req, res, next) => {
  try {
    const deletedBooking = await BookingModel.findByIdAndDelete(req.params.id);
    res.status(204).send({ message: `${req.params.id} deleted!!` });
  } catch (error) {
    next(error);
  }
};

const bookingHandlers = {
  createNewBooking,
  getAllBookings,
  getSingleBooking,
  editSingleBooking,
  deleteSingleBooking,
};

export default bookingHandlers;
