const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  categories: { type: [mongoose.SchemaTypes.ObjectId], ref: "Category" },
});

module.exports = mongoose.model("Post", postSchema);
