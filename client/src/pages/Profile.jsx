import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import logoutUser from "../hooks/logoutUser";
import deleteUser from "../hooks/deleteBtn";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firbase";
import updateUser from "../hooks/updateUser";
function Profile() {
  const { authUser } = useAuthContext();
  const { logout } = logoutUser();
  const { deleteBtn } = deleteUser();
  const { useUpdate } = updateUser();

  const [file, setFile] = useState(undefined);
  const [filePers, setFilePers] = useState(0);
  const [FileUploadErr, setFileUploadErr] = useState(false);
  const [formData, setFormdata] = useState({});

  useUpdate(formData);

  useEffect(() => {
    if (file) {
      handleFileUpload(file); // Pass the file to the function
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name; // Ensure parentheses for getTime()
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // console.log(filePers);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePers(Math.round(progress));
      },
      (error) => {
        setFileUploadErr(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormdata({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const fileRef = useRef(null);

  const handleLogoutBtn = (e) => {
    e.preventDefault();
    logout();
  };

  const handleDeleteBtn = (e) => {
    e.preventDefault();
    deleteBtn();
  };

  return (
    <div className="p-3 max-w-lg mx-auto mt-[7rem] text-white">
      <div className="">
        <input
          type="file"
          ref={fileRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          src={formData.avatar || authUser.profilePic}
          className="m-auto h-20 rounded-full cursor-pointer"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm text-center mt-5">
          {FileUploadErr ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePers > 0 && filePers < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePers}%`}</span>
          ) : filePers === 100 ? (
            <span className="text-green-700">
              Image successfully uploaded!{}
            </span>
          ) : (
            ""
          )}
        </p>
        <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      </div>

      <form className="flex flex-col gap-4 ">
        <input
          type="text"
          className="border p-3 rounded-lg text-black"
          readOnly
          value={authUser.userName}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg text-black"
          readOnly
          value={authUser.email}
        />
        <Link to={"/update-profile"}>
          <button className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-full mt-5">
            UPDATE PROFILE
          </button>
        </Link>
        <Link to={"/create-listing"}>
          <button className="bg-green-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-full">
            create listing
          </button>
        </Link>
        <div className=" p-2 flex justify-between items-center mt-3">
          <button
            className="hover:bg-white hover:text-black p-2 rounded-lg uppercase text-sm"
            onClick={handleLogoutBtn}
          >
            logout User
          </button>
          <button
            className="hover:bg-white hover:text-black p-2 rounded-lg uppercase text-sm"
            onClick={handleDeleteBtn}
          >
            delete account
          </button>
        </div>
      </form>
      <div className="flex gap-2 mt-5"></div>
    </div>
  );
}

export default Profile;
