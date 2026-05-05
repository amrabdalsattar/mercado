import mongoose from "mongoose";
import { getMongoUri } from "@/lib/env";

const globalForMongoose = globalThis;

if (!globalForMongoose.__mongoose) {
  globalForMongoose.__mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectDB() {
  if (globalForMongoose.__mongoose.conn) {
    return globalForMongoose.__mongoose.conn;
  }

  if (!globalForMongoose.__mongoose.promise) {
    const mongoUri = getMongoUri();
    globalForMongoose.__mongoose.promise = mongoose
      .connect(mongoUri, {
        autoIndex: process.env.NODE_ENV !== "production",
        bufferCommands: false,
      })
      .then((mongooseInstance) => mongooseInstance);
  }

  globalForMongoose.__mongoose.conn = await globalForMongoose.__mongoose.promise;
  return globalForMongoose.__mongoose.conn;
}
