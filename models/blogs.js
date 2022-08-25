const mongoose = require("mongoose");

const BlogsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  c_date: {
    type: String,
    default: new Date(),
  },
  u_date: {
    type: String,
    default: new Date(),
  },
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Reviews", required: true }],
});

const Blogs = new mongoose.model("Blogs", BlogsSchema);

module.exports = Blogs;
