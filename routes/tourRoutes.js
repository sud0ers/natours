const express = require("express");
const tourController = require('./../controllers/tourController')
const fs = require("fs");
const router = express.Router();

router.route("/")
.get(tourController.getAllTours)
.post(tourController.postTour);

router.route("/:id")
.get(tourController.getTour)
.delete(tourController.delTour);

module.exports = router;
