
import mongoose from "mongoose"
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function dbConnect() {
  if (cached.conn) {
    console.log("connected to previous mongodb session")

    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
        dbName: "test",
   
    };
    cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => {
      return mongoose;
    }).catch((err)=> console.log(err));
  }
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  
}
