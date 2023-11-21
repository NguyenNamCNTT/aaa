import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: [true, "Add full name"] },
    email: {
      type: String,
      required: [true, "Add email"],
      unique: true,
      trim: true,
    },
    password: { type: String, required: [true, "Add password"] },
    image: { type: String },
    isAdmin: { type: Boolean, default: false, required: true },
    likedMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("User", userSchema);
