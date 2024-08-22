import { Listing } from "../models/listing.model.js";
import { errorHandler } from "../utils/errorHandling.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getList = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id)
      return next(errorHandler(500, "you should login first"));
    const id = req.params.id;
    const userData = await Listing.find({ userRef: id });
    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};

export const deleteList = async (req, res, next) => {
  try {
    const id = req.body.data;
    await Listing.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "list successfully deleted" });
  } catch (error) {
    next(error);
  }
};
