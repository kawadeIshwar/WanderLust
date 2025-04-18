const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");
const user = require("../models/user.js");
const { render } = require("ejs");


router.route("/signup")
.get(userController.renderSignUp)
.post(wrapAsync(userController.signUp));


router.route("/login")
.get( userController.renderLogin)
.post(saveRedirectUrl, passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
}), userController.login);

router.get("/logout", userController.logout);  

module.exports = router;