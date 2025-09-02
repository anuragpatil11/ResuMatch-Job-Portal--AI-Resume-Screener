import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      tls: true, // or ssl: true
      tlsAllowInvalidCertificates: true, // for dev only
    });
    console.log("Database Connected Successfully...");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};
