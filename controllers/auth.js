const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }

    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "NOT able to save user in DB",
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id,
            date: user.createdAt
        });
    });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "USER email does not exists",
            });
        }
        if (!user.autheticate(password)) {
            return res.status(400).json({
                error: "Email and password do not match",
            });
        }

        // Create Token

        const token = jwt.sign({ _id: user._id }, process.env.SECRET);

        //put token in cookie
        res.cookie("token", token, { expire: new Date() + 9999 });

        //Send response into front end

        const { _id, name, email, role, createdAt } = user;
        return res.json({
            token,
            user: {
                _id,
                name,
                email,
                role,
                createdAt,
                msg: "success"
            },
        });
    });
};

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User signOut successfully",
    });
};

//Protected Routes

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth",
});

//custom middleWares
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED",
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "YOU are not ADMIN,Access denied",
        });
    }
    next();
};
