// Import necessary modules and services
const auctionService = require("../services/auctionService")
const auctionController = require("express").Router()
const { body, validationResult } = require("express-validator")
const { parseError } = require("../util/parser")
const Auction = require("../models/Auction")

// Route to get all auctions
auctionController.get("/", async (req, res) => {
    try {
        // Retrieve all auctions using the auction service
        const auctions = await auctionService.readAuctions()

        // Respond with the auctions in JSON format
        res.status(200).json({ auctions })
    } catch (error) {
        // Parse and handle any errors
        const message = parseError(error)

        // Respond with the error message
        res.status(200).json({ message })
    }
})

// Route to create a new auction with validation
auctionController.post("/",
    // Validate the 'name' field: it must be at most 10 characters long
    body("name")
        .isLength({ max: 10 })
        .withMessage("Name could be at most 10 characters long."),
    // Validate the 'price' field: it must be an integer and at most 10 characters long
    body("price")
        .isInt()
        .withMessage("Price must be a whole number.")
        .isLength({ max: 10 })
        .withMessage("Price must be at most 10 characters long."),
    async (req, res) => {
        try {
            // Check for validation errors
            const { errors } = validationResult(req)
            if (errors.length > 0) throw errors

            // Extract auction data from the request body
            const {
                name,
                price,
                deposit,
                expirationTime,
                ownerId
            } = req.body

            // Create a new auction using the auction service
            const auction = await auctionService.createAuction(
                name,
                price,
                deposit,
                expirationTime,
                ownerId
            )

            // Respond with the created auction in JSON format
            res.status(200).json(auction)
        } catch (error) {
            // Parse and handle any errors
            const message = parseError(error)

            // Respond with the error message
            res.status(200).json({ message })
        }
    }
)

// Route to update an existing auction by ID
auctionController.put("/:auctionId", async (req, res) => {
    try {
        // Extract the auction ID from the route parameters
        const { auctionId } = req.params
        // Extract the updated auction data from the request body
        const auctionData = req.body

        // Find the auction by ID and update it with the new data
        const updatedAuction = await Auction.findOneAndUpdate(
            { _id: auctionId }, auctionData, { new: true }
        ).exec()

        // Respond with the updated auction in JSON format
        res.status(200).json(updatedAuction)
    } catch (error) {
        // Parse and handle any errors
        const message = parseError(error)

        // Respond with the error message
        res.status(200).json({ message })
    }
})

// Route to delete an auction by ID
auctionController.delete("/:auctionId", async (req, res) => {
    try {
        // Extract the auction ID from the route parameters
        const { auctionId } = req.params

        // Delete the auction by ID
        await Auction.deleteOne({ _id: auctionId })

        // Respond with no content status to indicate successful deletion
        res.status(204).end()
    } catch (error) {
        // Parse and handle any errors
        const message = parseError(error)

        // Respond with the error message
        res.status(200).json({ message })
    }
})

// Export the auction controller for use in other parts of the application
module.exports = auctionController