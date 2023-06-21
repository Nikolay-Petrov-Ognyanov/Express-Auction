const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    wallet: { type: Number },
    createdAuctions: { type: Array },
    soldAuctions: { type: Array },
    bidAuctions: { type: Array },
    wonAuctions: { type: Array },
})

userSchema.index({ username: 1 }, {
    collation: {
        locale: "en",
        strength: 2
    }
})

const User = model("User", userSchema)

module.exports = User