const { default: mongoose } = require("mongoose");
const Blogs = require("../models/blogs");
const Reviews = require("../models/reviews");
exports.getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blogs.find({});
    res.status(201).send(allBlogs);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.addBlog = async (req, res) => {
  try {
    const addBlog = new Blogs({
      title: req.body.title,
      body: req.body.body,
      imageUrl: req.body.imageUrl,
    });
    const insertRecords = await addBlog.save();
    res.status(201).send(insertRecords);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const _id = req.params.id;
    const updateRecord = await Blogs.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(201).send(updateRecord);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.getBlog = async (req, res) => {
  try {
    const _id = req.params.id;
    const getBlog = await Blogs.findById(_id).populate("reviews");
    res.status(201).send(getBlog);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.deleteBlog = async (req, res) => {
  const _id = req.params.id;
  let blog;
  let review;
  try {
    blog = await Blogs.findByIdAndDelete(_id).populate("reviews");
    blog.reviews.map(async (data) => await Reviews.findByIdAndDelete(data._id));
  } catch (e) {
    console.log(e);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Deleted" });
};
