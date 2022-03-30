var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, getUser, getAllUsers, updateUser, userPurchaseList } = require("../controllers/user")

router.param("userId", getUserById)
//Get User By Id
router.get("/user/:userId", getUser, isSignedIn, isAuthenticated)

//Get All Users
router.get("/users", getAllUsers)

//Update Userprofile

router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

//Order

router.get("/orders/user/:userId", isSignedIn, isAuthenticated, userPurchaseList)



module.exports = router;
