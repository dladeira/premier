const express = require("express");
const router = express.Router();

const Poll = require("../models/Poll");

const loggedIn = require("../middleware/loggedIn");

router.get("/", async (req, res) => {
    return res.status(200).json(await Poll.find({}).lean());
});

router.post("/create", loggedIn, async (req, res) => {
    const poll = new Poll({
        title: req.body.title,
        description: req.body.description,
        options: req.body.options,
        endTime: req.body.endTime,
        owner: req.user._id,
    });

    await poll.save();
    res.status(200).send();
});

router.post("/update", loggedIn, async (req, res) => {
    const foundPoll = await Poll.findOne({ _id: req.body._id });

    foundPoll.title = req.body.title;
    foundPoll.description = req.body.description;
    foundPoll.options = req.body.options;
    foundPoll.endTime = req.body.endTime;

    await foundPoll.save();

    return res.status(200).send();
});

router.post("/delete", loggedIn, async (req, res) => {
    const { deletedCount } = await Poll.deleteOne({ _id: req.body._id });
    if (deletedCount > 0) return res.status(200).send();
    else return res.status(400).send();
});

router.post("/vote", loggedIn, async (req, res) => {
    const foundPoll = await Poll.findOne({ _id: req.body.pollId });

    for (var option of foundPoll.options) {
        option.votes = option.votes.filter((i) => i != req.user._id);
    }

    foundPoll.options.find((i) => i._id == req.body.optionId).votes.push(req.user._id);

    await foundPoll.save();

    return res.status(200).send();
});

module.exports = router;
