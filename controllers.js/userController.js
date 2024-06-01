// Import the necessary modules and services
const userService = require("../services/userService")
const userController = require("express").Router()
const { body, validationResult } = require("express-validator")
const { parseError } = require("../util/parser")
const User = require("../models/User")

// Define a route to handle GET requests for all users
userController.get("/", async (req, res) => {
    try {
        // Retrieve all users using the user service
        const users = await userService.readUsers()

        // Respond with the users in JSON format
        res.status(200).json({ users })
    } catch (error) {
        // Parse and handle any errors that occur
        const message = parseError(error)

        // Respond with the error message in JSON format
        res.status(200).json({ message })
    }
})

// Define a route to handle POST requests for user registration with validation
userController.post("/register",
    // Validate the 'username' field: it must be between 2 and 20 characters long
    body("username").isLength({ min: 2, max: 20 }).withMessage(
        "Username must be between 2 and 20 characters long."
    ),
    // Validate the 'password' field: it must be at least 5 characters long
    body("password").isLength({ min: 5 }).withMessage(
        "Password must be at least 5 characters long."
    ),
    async (req, res) => {
        try {
            // Check for validation errors
            const errors = validationResult(req)

            // If there are validation errors, throw them
            if (errors.length > 0) {
                throw errors
            }

            // Extract user data from the request body
            const {
                username,
                password,
                wallet,
                createdAuctions,
                soldAuctions,
                bidAuctions,
                wonAuctions,
            } = req.body

            // Register a new user using the user service
            const token = await userService.register(
                username,
                password,
                wallet,
                createdAuctions,
                soldAuctions,
                bidAuctions,
                wonAuctions,
            )

            // Respond with the authentication token in JSON format
            res.status(200).json(token)
        } catch (error) {
            // Parse and handle any errors that occur
            const message = parseError(error)

            // Respond with the error message in JSON format
            res.status(200).json({ message })
        }
    }
)

// Define a route to handle POST requests for user login
userController.post("/login", async (req, res) => {
    try {
        // Extract login credentials from the request body
        const { username, password } = req.body

        // Authenticate the user and get a token
        const token = await userService.login(username, password)

        // Respond with the authentication token in JSON format
        res.status(200).json(token)
    } catch (error) {
        // Respond with the error message in JSON format
        res.status(200).json({ message: error.message })
    }
})

// Define a route to handle POST requests for user logout
userController.post("/logout", async (req, res) => {
    try {
        // Extract the access token from the request body
        const token = req.body.accessToken

        // Log out the user using the user service
        await userService.logout(token)

        // Respond with no content status to indicate successful logout
        res.status(204).end()
    } catch (error) {
        // Respond with the error message in JSON format
        res.status(200).json({ message: error.message })
    }
})

// Define a route to handle PUT requests for updating a user by ID
userController.put("/:userId", async (req, res) => {
    try {
        // Extract the updated user data from the request body
        const user = req.body

        // Find the user by ID and update it with the new data
        const updatedUser = await User.findOneAndUpdate({ _id: user._id }, user, { new: true })

        // Respond with the updated user in JSON format
        res.status(200).json(updatedUser)
    } catch (error) {
        // Respond with the error message in JSON format
        res.status(200).json({ message: error.message })
    }
})

// Export the user controller for use in other parts of the application
module.exports = userController