const express = require("express");
const reviewsRouter = express.Router();

const { addReview, deleteReview } = require("../controllers/reviews");

reviewsRouter.post("/newReview", addReview);

reviewsRouter.delete("/deleteReview/:id", deleteReview);

module.exports = reviewsRouter;
