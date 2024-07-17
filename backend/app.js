const app = require("express")();
const passport = require("./passport");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");

const User = require("./models/User");

app.use(
    session({
        secret: "nothing-matters-anymore",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(bodyParser.json());
app.options("*", cors());
app.use(passport.session());

app.post("/auth/data", (req, res) => {
    return res.json(req.user);
});

app.post("/auth/signup", async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10);

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

app.post("/auth/login", passport.authenticate("local", {}), (req, res) => {
    return res.status(200).send();
});

app.post("/auth/logout", (req, res) => {
    req.logout((err) => {
        if (err) return console.log("ERROR: Error logging user out");
        res.status(200).send();
    });
});

module.exports = app;
