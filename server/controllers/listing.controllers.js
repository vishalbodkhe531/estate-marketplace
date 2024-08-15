import { Listing } from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
  try {
    const { imageURL } = req.body;
    console.log(imageURL[0]);
    // const listing = await Listing.create(req.body);
    // console.log(listing);
    // res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};
