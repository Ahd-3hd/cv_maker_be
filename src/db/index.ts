import mongoose from "mongoose";

export default async function () {
  try {
    await mongoose.connect("mongodb://localhost:27017");
    console.info("Connected to db");
  } catch (error) {
    console.error("Couldn't connect to db");
  }
}
