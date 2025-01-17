import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import uploadImage from "../hooks/uploadImage";
import { useAuthContext } from "../context/AuthContext";
import useHotelForm from "../hooks/useHotelForm";
// import { toast } from "react-toastify";

function CreateList() {
  const { register, handleSubmit } = useForm();

  const { imageUpload, imageUploadError, uploading } = uploadImage();

  const { createHotelForm } = useHotelForm();

  const { hotelURL, setHotelURL } = useAuthContext();

  const [homeType, setHomeType] = useState("");

  const [files, setFiles] = useState([]);

  const [offer, setOffer] = useState(false);

  const handleFormSubmit = handleSubmit((userData) => {
    userData.imageUrl = hotelURL;
    userData.type = homeType;
    createHotelForm(userData);
    setHotelURL([]);
  });

  const handleImageSubmit = async (e) => {
    imageUpload(files);
  };

  const handleDeleteImage = (url) => {
    const result = hotelURL.filter((el) => el !== url);
    setHotelURL(result);
  };

  return (
    <main className="p-10 max-w-4xl mx-auto text-white bg-slate-800 mt-20">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="homeName"
            maxLength="62"
            minLength="10"
            required
            {...register("homeName", { required: "This feild is required" })}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg text-black"
            id="description"
            required
            {...register("description", { required: "This feild is required" })}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            {...register("address", { required: "This feild is required" })}
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sell"
                readOnly
                className="w-5 cursor-pointer"
                onClick={() => setHomeType("sell")}
                checked={homeType === "sell"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                readOnly
                className="w-5 cursor-pointer"
                onClick={() => setHomeType("rent")}
                checked={homeType === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5 cursor-pointer"
                {...register("parking")}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5 cursor-pointer"
                {...register("furnished")}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5 cursor-pointer"
                onClick={() => (offer ? setOffer(false) : setOffer(true))}
                {...register("offer")}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedRooms"
                min="1"
                max="10"
                required
                defaultValue={"1"}
                className="p-3 border border-gray-300 rounded-lg text-black cursor-pointer"
                {...register("bedRooms")}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathRooms"
                min="1"
                max="10"
                required
                defaultValue={"1"}
                className="p-3 border border-gray-300 rounded-lg text-black cursor-pointer"
                {...register("bathRooms")}
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                defaultValue={"50"}
                required
                className="p-3 border border-gray-300 rounded-lg text-black cursor-pointer"
                {...register("regularPrice")}
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                {/* {formData.type === "rent" && (
                  <span className="text-xs">($ / month)</span>
                )} */}
              </div>
            </div>
            {offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="10000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  {...register("discountPrice")}
                />
                {/* {setOffer(false)} */}
                <div className="flex flex-col items-center">
                  <p>Discounted price</p>

                  {/* {allFormData.type === "rent" && ( */}
                  <span className="text-xs">($ / month)</span>
                  {/* )} */}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-red-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300  rounded w-full text-white"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-red-500 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {hotelURL.map((url, idx) => (
            <div
              key={url}
              className="flex justify-between p-3 border items-center"
            >
              <img
                src={url}
                alt="listing image"
                className="w-20 h-20 object-contain rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleDeleteImage(url)}
                className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
              >
                Delete
              </button>
            </div>
          ))}

          <button
            // disabled={loading || uploading}
            className="p-3 bg-green-500 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {/* {loading ? "Creating..." : "Create listing"} */}
            Create listing
          </button>
          {/* {error && <p className="text-red-700 text-sm">{error}</p>} */}
        </div>
      </form>
    </main>
  );
}

export default CreateList;
