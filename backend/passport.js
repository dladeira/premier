const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User");
const bcrypt = require("bcrypt");

passport.serializeUser((user, cb) => {
    user.hash = undefined;
    return cb(null, user);
});

passport.deserializeUser((user, cb) => {
    return cb(null, user);
});

passport.use(
    new LocalStrategy(async (username, password, done) => {
        const user = await User.findOne({ username });
        if (!user) return done(null, undefined);

        const result = await bcrypt.compare(password, user.hash);
        if (!result) return done(null, undefined);
        return done(null, user);
    })
);

module.exports = passport;
