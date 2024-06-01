// Import required modules from Mongoose
const { Schema, model } = require("mongoose")

// Define the schema for the Auction model
const auctionSchema = new Schema({
    // Define schema fields with their types and validation rules
    name: { type: String, required: true, unique: true }, // Name of the auction (required and unique)
    price: { type: Number, required: true }, // Starting price of the auction (required)
    deposit: { type: Number }, // Deposit amount for bidding (optional)
    expirationTime: { type: Number }, // Expiration time of the auction (optional)
    ownerId: { type: String }, // ID of the owner of the auction (optional)
    highestBidderId: { type: String }, // ID of the highest bidder (optional)
    previousBidderId: { type: String }, // ID of the previous bidder (optional)
    lastBid: { type: Number } // Last bid amount (optional)
})

// Create an index on the 'name' field for case-insensitive searching
auctionSchema.index({ name: 1 }, {
    // Define collation options for case-insensitive searching
    collation: {
        locale: "en", // Specify locale (English)
        strength: 2 // Specify collation strength (secondary)
    }
})

// Create the Auction model using the schema
const Auction = model("Auction", auctionSchema)

// Export the Auction model for use in other parts of the application
module.exports = Auction