import mongoose from "mongoose";

export const connectionDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,  // Increase timeout to 30s
      socketTimeoutMS: 45000,   // Increase socket timeout
      serverSelectionTimeoutMS: 5000 // Reduce waiting time for server selection
    });

    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
  }
};

// Event listeners for debugging
mongoose.connection.on("error", (err) => {
  console.error("MongoDB Connection Error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB Disconnected");
});
