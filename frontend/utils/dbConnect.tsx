import mongoose, { connect, connections } from "mongoose"
import dotenv from "dotenv"

async function dbConnect() {
  if (connections && connections[0].readyState) {
    // Use current db connection
    return
  }

  // Use new db connection
  const mongodbUrl = process.env.MONGODB_URI as string
  await connect(mongodbUrl as string)
}
export default dbConnect
