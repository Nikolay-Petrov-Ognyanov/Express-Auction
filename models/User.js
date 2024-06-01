// Importing required modules from Mongoose
const { Schema, model } = require("mongoose")

// Defining the schema for the User model
const userSchema = new Schema({
    // Schema fields with their types and validation rules
    username: { type: String, required: true, unique: true }, // Username of the user (required and unique)
    hashedPassword: { type: String, required: true }, // Hashed password of the user (required)
    wallet: { type: Number }, // User's wallet balance (optional)
    createdAuctions: { type: Array }, // Array of auctions created by the user (optional)
    soldAuctions: { type: Array }, // Array of auctions sold by the user (optional)
    bidAuctions: { type: Array }, // Array of auctions bid on by the user (optional)
    wonAuctions: { type: Array }, // Array of auctions won by the user (optional)
})

// Creating an index on the 'username' field for case-insensitive searching
userSchema.index({ username: 1 }, {
    // Collation options for case-insensitive searching
    collation: {
        locale: "en", // Locale for English language
        strength: 2 // Collation strength as secondary
    }
})

// Creating the User model using the schema
const User = model("User", userSchema)

// Exporting the User model for use in other parts of the application
module.exports = User