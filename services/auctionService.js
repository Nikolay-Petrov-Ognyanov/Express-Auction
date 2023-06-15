const Auction = require("../models/Auction")

async function readAuctions() {
    return await Auction.find()
}

async function createAuction(
    name,
    price,
    expirationTime,
    ownerId,
    biddersIds
) {
    const existing = await Auction.findOne({ name }).collation(
        { locale: "en", strength: 2 }
    )

    if (existing) {
        throw new Error("Name is taken.")
    } else {
        return await Auction.create({
            name,
            price,
            expirationTime,
            ownerId,
            biddersIds
        })
    }
}

module.exports = {
    readAuctions,
    createAuction
}