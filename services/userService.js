// Import required modules
const User = require("../models/User")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")

// Define JWT secret and token blacklist
const secret = "jwtsecret"
const tokenBlacklist = new Set()

// Function to read all users
async function readUsers() {
    return await User.find()
}

// Function to register a new user
async function register(
    username,
    password,
    wallet,
    createdAuctions,
    soldAuctions,
    bidAuctions,
    wonAuctions
) {
    // Check if the username is already taken
    const existing = await User.findOne({ username }).collation({ locale: "en", strength: 2 })

    if (existing) {
        throw new Error("Username is taken.")
    } else {
        // If the username is not taken, create a new user
        const user = await User.create({
            username,
            hashedPassword: await bcrypt.hash(password, 10),
            wallet,
            createdAuctions,
            soldAuctions,
            bidAuctions,
            wonAuctions,
        })

        // Create and return a JWT token for the user
        return createToken(user)
    }
}

// Function to log in a user
async function login(username, password) {
    // Find the user by username
    const user = await User.findOne({ username }).collation({ locale: "en", strength: 2 })

    // If no user is found with the username, throw an error
    if (!user) {
        throw new Error("Incorrect username or password.")
    }

    // Check if the password matches the hashed password
    const match = await bcrypt.compare(password, user.hashedPassword)

    // If the password doesn't match, throw an error
    if (!match) {
        throw new Error("Incorrect username or password")
    }

    // Create and return a JWT token for the user
    return createToken(user)
}

// Function to log out a user
async function logout(token) {
    // Add the token to the blacklist
    tokenBlacklist.add(token)
}

// Function to create a JWT token for a user
function createToken(user) {
    // Payload for the JWT token
    const payload = {
        _id: user._id,
        username: user.username,
        wallet: user.wallet,
        createdAuctions: user.createdAuctions,
        soldAuctions: user.soldAuctions,
        bidAuctions: user.bidAuctions,
        wonAuctions: user.wonAuctions,
    }

    // Sign the payload and return the token
    return {
        _id: user._id,
        username: user.username,
        wallet: user.wallet,
        createdAuctions: user.createdAuctions,
        soldAuctions: user.soldAuctions,
        bidAuctions: user.bidAuctions,
        wonAuctions: user.wonAuctions,
        accessToken: JWT.sign(payload, secret)
    }
}

// Function to parse a JWT token
function parseToken(token) {
    // Check if the token is blacklisted
    if (tokenBlacklist.has(token)) {
        throw new Error("Token is blacklisted")
    }

    // Verify the token and return the decoded payload
    return JWT.verify(token, secret)
}

// Export the functions to be used in other parts of the application
module.exports = {
    register,
    login,
    logout,
    parseToken,
    readUsers
}