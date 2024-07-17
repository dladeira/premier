const mongoose = require("mongoose");

const pollSchema = mongoose.Schema({
    title: String,
    description: String,
    options: [
        {
            name: String,
            votes: Number,
        },
    ],
    endTime: Number,
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
});

const pollModel = mongoose.model("Poll", pollSchema);

module.exports = pollModel;
