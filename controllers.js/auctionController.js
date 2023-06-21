const auctionService = require("../services/auctionService")
const auctionController = require("express").Router()
const { body, validationResult } = require("express-validator")
const { parseError } = require("../util/parser")
const Auction = require("../models/Auction")

auctionController.get("/", async (req, res) => {
    try {
        const auctions = await auctionService.readAuctions()

        res.status(200).json({ auctions })
    } catch (error) {
        const message = parseError(error)

        res.status(200).json({ message })
    }
})

auctionController.post("/",
    body("name")
        .isLength({ max: 10 })
        .withMessage("Name could be at most 10 characters long."),
    body("price")
        .isInt()
        .withMessage("Price must be a whole number.")
        .isLength({ max: 10 })
        .withMessage("Price must be at most 10 characters long."),
    async (req, res) => {
        try {
            const { errors } = validationResult(req)

            if (errors.length > 0) {
                throw errors
            }

            const {
                name,
                price,
                deposit,
                expirationTime,
                ownerId
            } = req.body

            const auction = await auctionService.createAuction(
                name,
                price,
                deposit,
                expirationTime,
                ownerId
            )

            res.status(200).json(auction)
        } catch (error) {
            const message = parseError(error)

            res.status(200).json({ message })
        }
    }
)

auctionController.put("/:auctionId", async (req, res) => {
    try {
        const { auctionId } = req.params
        const auctionData = req.body

        const updatedAuction = await Auction.findOneAndUpdate(
            { _id: auctionId }, auctionData, { new: true }
        ).exec()

        res.status(200).json(updatedAuction)
    } catch (error) {
        const message = parseError(error)

        res.status(200).json({ message })
    }
})

auctionController.delete("/:auctionId", async (req, res) => {
    try {
        const { auctionId } = req.params

        await Auction.deleteOne({ _id: auctionId })

        res.status(204).end()
    } catch (error) {
        const message = parseError(error)

        res.status(200).json({ message })
    }
})

module.exports = auctionController