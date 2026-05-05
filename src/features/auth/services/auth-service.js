import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function findUserByEmail(email) {
  await connectDB();
  return User.findOne({ email }).lean(false);
}

export async function findUserById(id) {
  await connectDB();
  return User.findById(id).lean(false);
}

export async function createUser(input) {
  await connectDB();
  return User.create(input);
}
