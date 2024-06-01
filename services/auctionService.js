// Import the Auction model
const Auction = require("../models/Auction")

// Function to read all auctions
async function readAuctions() {
    // Find all auctions using the Auction model
    return await Auction.find()
}

// Function to create a new auction
async function createAuction(
    name,
    price,
    deposit,
    expirationTime,
    ownerId
) {
    // Check if an auction with the same name already exists
    const existing = await Auction.findOne({ name }).collation(
        { locale: "en", strength: 2 } // Case-insensitive search for English locale
    )

    // If an auction with the same name exists, throw an error
    if (existing) {
        throw new Error("Name is taken.")
    } else {
        // If no existing auction with the same name, create a new auction
        return await Auction.create({
            name,
            price,
            deposit,
            expirationTime,
            ownerId
        })
    }
}

// Export the functions to be used in other parts of the application
module.exports = {
    readAuctions,
    createAuction
}