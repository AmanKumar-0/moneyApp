const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  desc: {
    type: String,
    required: true,
  },
  c_date: {
    type: String,
    default: new Date(),
  },
  u_date: {
    type: String,
    default: new Date(),
  },
  blogs: {
    type: mongoose.Types.ObjectId,
    ref: "Blogs",
    required: true,
  },
});

const Reviews = new mongoose.model("Reviews", reviewSchema);
module.exports = Reviews;
