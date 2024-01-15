const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    friends: [{ type: Schema.Types.ObjectID, ref: "User" }],
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User;