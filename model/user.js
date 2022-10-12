const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: { type: String, required: true, lowercase: true },
  createAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
  post: { type: mongoose.SchemaTypes.ObjectId, ref: "Post" },
  hobbies: [String],
});

module.exports = mongoose.model("User", userSchema);
