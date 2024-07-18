const app = require("express")();
const passport = require("./passport");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRouter = require("./routers/auth");
const pollsRouter = require("./routers/polls");

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

app.use("/auth", authRouter);
app.use("/polls", pollsRouter);

module.exports = app;
