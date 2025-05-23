const User = require("../models/user");


module.exports.renderSignUp = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        });
        }catch (e) {
            req.flash("error", e.message);
            res.redirect("/signup");
        }

    };

    module.exports.renderLogin = (req, res) => {
        res.render("users/login.ejs");
    };

    module.exports.login = async (req, res) => {
        req.flash("success", "Logged In Successfully, Welcome Back!");
        const redirectUrl = res.locals.redirectUrl || "/listings"; // ❗ Safety fallback
        res.redirect(redirectUrl);
    };

    module.exports.logout =  (req, res, next) => {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "You are Logged Out");
            res.redirect("/listings");
        })
    }