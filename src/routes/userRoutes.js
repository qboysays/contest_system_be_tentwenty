const express = require("express");
const router = express.Router();

const userAPI = require("../api/userAPI");

router.get("/details", userAPI.GetUserDetails);


module.exports = router;