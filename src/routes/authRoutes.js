var express = require("express");
var router = express.Router();

var authAPI = require("../api/authenticationAPI");

router.post("/register", authAPI.RegisterUser);
router.post("/login", authAPI.UserLogin);


module.exports = router;
