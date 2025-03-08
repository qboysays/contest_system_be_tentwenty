const express = require("express");
const router = express.Router();

const constestAPI = require("../api/contestAPI");

router.post("/create", constestAPI.SaveContestDetails);
router.get("/list", constestAPI.GetContestList);
router.get("/details", constestAPI.GetContestDetails);
router.post("/join", constestAPI.JoinContest);
router.post("/submit", constestAPI.SubmitContest);
router.get("/leaderboard", constestAPI.GetLeaderboard);


module.exports = router;
