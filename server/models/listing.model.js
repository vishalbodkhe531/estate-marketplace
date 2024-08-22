import mongoose from "mongoose";

const listSchema = new mongoose.Schema(
  {
    homeName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    regularPrice: {
      type: Number,
      required: true,
    },

    descountPrice: {
      type: Number,
      default: 0,
    },

    bathRooms: {
      type: Number,
      required: true,
    },
    bedRooms: {
      type: Number,
      required: true,
    },

    furnished: {
      type: Boolean,
      required: true,
    },

    parking: {
      type: Boolean,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    offer: {
      type: Boolean,
      required: true,
    },

    imageUrl: {
      type: Array,
      required: true,
    },

    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },

  { timestamps: true }
);

export const Listing = mongoose.model("Listing", listSchema);
