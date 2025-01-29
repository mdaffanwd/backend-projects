import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const connector = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${connector.connection.host}`);
  } catch (error) {
    console.error("❌ Database Connection Failed", error);
    process.exit(1);
  }
}
