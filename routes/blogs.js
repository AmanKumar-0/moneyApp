const express = require("express");
const blogsRouter = express.Router();

const {
  getAllBlogs,
  addBlog,
  updateBlog,
  getBlog,
  deleteBlog,
} = require("../controllers/blogs");

blogsRouter.get("/", getAllBlogs);
blogsRouter.post("/add", addBlog);
blogsRouter.put("/update/:id", updateBlog);
blogsRouter.get("/:id", getBlog);
blogsRouter.delete("/:id", deleteBlog);

module.exports = blogsRouter;
