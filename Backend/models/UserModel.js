const mongoose = require("mongoose")
var bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "userName is required"],
        min: [3, "too short name"]
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    refreshToken:String

})

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

module.exports = mongoose.model("User", UserSchema)