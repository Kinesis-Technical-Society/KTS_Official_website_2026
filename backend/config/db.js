const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || "mongodb://localhost:27017/kts_database";
    console.log(`[MongoDB] Connecting to ${connStr.replace(/:([^:@]+)@/, ":****@")}...`);
    
    const conn = await mongoose.connect(connStr, {
      maxPoolSize: 50,
      minPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`[MongoDB] Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB Error] Failed to connect: ${error.message}`);
    // Do not crash the server immediately so API can run gracefully with mock fallback if DB is offline
  }
};

module.exports = connectDB;
