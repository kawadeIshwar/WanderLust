const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const path = require("path");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");


//Index route
router.get("/", wrapAsync(listingController.index));
  

// New route
router.get("/new",isLoggedIn,listingController.renderNewForm);

//Show route
router.get("/:id", wrapAsync(listingController.showListing));

//Create route
router.post("/",isLoggedIn, validateListing, wrapAsync(listingController.createListing));

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

//Update route
router.put("/:id",isLoggedIn,isOwner, validateListing, wrapAsync(listingController.updateListing));

//delete route
router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));

module.exports = router;
