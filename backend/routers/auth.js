const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("../passport");
const User = require("../models/User");

router.post("/data", (req, res) => {
    return res.json(req.user);
});

router.post("/signup", async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10);

    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) return res.status(400).send();

    const user = new User({
        username: req.body.username,
        hash,
    });
    await user.save();

    req.login(user, (err) => {
        if (err) return console.log("ERROR: Error logging new user in");
        res.status(200).send();
    });
});

router.post("/login", passport.authenticate("local", {}), (req, res) => {
    return res.status(200).send();
});

router.post("/logout", (req, res) => {
    req.logout((err) => {
        if (err) return console.log("ERROR: Error logging user out");
        res.status(200).send();
    });
});

module.exports = router;
