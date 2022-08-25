const { default: mongoose } = require("mongoose");
const Review = require("../models/reviews");
const Blog = require("../models/blogs");
exports.addReview = async (req, res) => {
  const blogId = req.body.blogId;

  let blogs;

  try {
    blogs = await Blog.findById(blogId);
  } catch (error) {
    console.log(error);
  }
  if (!blogs) {
    return res.status(400).json({ message: "Unable to find blog by Id" });
  }

  const review = new Review({
    desc: req.body.desc,
    blogs: blogId,
  });

  try {
    // await blog.save();
    const session = await mongoose.startSession();
    session.startTransaction();
    await review.save({ session });
    blogs.reviews.push(review);
    await blogs.save({ session });
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
  return res.status(200).json({ review });
};

exports.deleteReview = async (req, res) => {
  const reviewId = req.params.id;

  let review;
  try {
    review = await Review.findByIdAndDelete(reviewId).populate("blogs");
    await review.blogs.reviews.pull(review);
  } catch (error) {
    console.log(error);
  }
  if (!review) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Deleted" });
};
