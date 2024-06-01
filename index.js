// Import required modules
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const trim = require("./middlewares/trim") // Middleware to trim request body strings
const session = require("./middlewares/session") // Middleware for session management
const userController = require("./controllers.js/userController") // User controller
const auctionController = require("./controllers.js/auctionController") // Auction controller

// MongoDB connection string
const connectionString = "mongodb://127.0.0.1:27017/auction"

// Start function to initialize the server
async function start() {
    // Connect to MongoDB database
    await mongoose.connect(connectionString)

    // Log database connection status
    console.log("Database connected.")

    // Create Express app
    const app = express()

    // Middleware setup
    app.use(express.json()) // Parse request body as JSON
    app.use(cors()) // Enable Cross-Origin Resource Sharing (CORS)
    app.use(trim()) // Trim whitespace from request body strings
    app.use(session()) // Session management middleware

    // Root route handler
    app.get("/", (req, res) => {
        res.json({ message: "Hello" }) // Send a simple JSON response
    })

    // Route handlers for user-related endpoints
    app.use("/users", userController)

    // Route handlers for auction-related endpoints
    app.use("/auctions", auctionController)

    // Start the server and listen on port 3030
    app.listen(3030, () => console.log("Server started."))
}

// Call the start function to initialize the server
start()