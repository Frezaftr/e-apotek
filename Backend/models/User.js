// backend/models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user", // defaultnya user
    },
  },
  { timestamps: true }
);

// Hash password sebelum disimpan
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // fix: tambahkan return

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next(); // fix: tambahkan next() untuk menyelesaikan middleware
});

// Method untuk cek password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
