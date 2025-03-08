const express = require("express");
const router = express.Router();

const authAPI = require("../api/authenticationAPI");

router.post("/register", authAPI.RegisterUser);
router.post("/login", authAPI.UserLogin);


module.exports = router;
