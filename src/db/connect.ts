import mongoose from "mongoose";

export const connectDB = (URI: string) => {
  return mongoose.connect(URI);
};
