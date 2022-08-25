require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./config/db");

const app = express();
//connect database
db();

//cors
app.use(cors({ origin: true, credentials: true }));
// app.use(express.raw({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

//routers
const blogRouter = require("./routes/blogs");
const reviewRouter = require("./routes/reviews");

//routes
app.use("/api/blog", blogRouter);
app.use("/api/review", reviewRouter);

const PORT = process.env.PORT || 8000;
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
