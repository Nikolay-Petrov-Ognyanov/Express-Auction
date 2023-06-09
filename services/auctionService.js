const Auction = require("../models/Auction")

async function readAuctions() {
    return await Auction.find()
}

async function createAuction(
    name,
    price,
    deposit,
    expirationTime,
    ownerId
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
            deposit,
            expirationTime,
            ownerId
        })
    }
}

module.exports = {
    readAuctions,
    createAuction
}