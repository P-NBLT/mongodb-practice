const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  categoriesName: { type: String, required: true },
  posts: { type: mongoose.SchemaTypes.ObjectId, ref: "Post" },
});

module.exports = mongoose.model("Category", categoriesSchema);
