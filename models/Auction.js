const { Schema, model } = require("mongoose")

const auctionSchema = new Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    expirationTime: { type: Number },
    ownerId: { type: String },
    bidderId: { type: String }
})

auctionSchema.index({ name: 1 }, {
    collation: {
        locale: "en",
        strength: 2
    }
})

const Auction = model("Auction", auctionSchema)

module.exports = Auction