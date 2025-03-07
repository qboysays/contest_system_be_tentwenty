var express = require("express");
var router = express.Router();

var constestAPI = require("../api/contestAPI");

router.post("/create", constestAPI.SaveContestDetails);
router.get("/list", constestAPI.GetContestList);
router.get("/details", constestAPI.GetContestDetails);

module.exports = router;
