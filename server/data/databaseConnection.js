import mongoose from "mongoose";

export const databaseConnection = () => {
  mongoose
    .connect(process.env.Db_URI, { DbName: "Estate_Marketplaning" })
    .then(() => console.log(`Database successfully connected`))
    .catch((err) => console.log(`Error while connection database : ${err}`));
};
