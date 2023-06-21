const { Schema, model } = require("mongoose")

const auctionSchema = new Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    deposit: { type: Number },
    expirationTime: { type: Number },
    ownerId: { type: String },
    highestBidderId: { type: String },
    previousBidderId: { type: String },
    lastBid: { type: Number }
})

auctionSchema.index({ name: 1 }, {
    collation: {
        locale: "en",
        strength: 2
    }
})

const Auction = model("Auction", auctionSchema)

module.exports = Auction