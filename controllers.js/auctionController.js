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

        res.status(400).json({ message })
    }
})

auctionController.post("/",
    body("name")
        .isLength({ min: 2, max: 5 })
        .withMessage(
            "Name must be at between 2 and 5 characters long."
        ),
    body("price")
        .isInt()
        .withMessage("Price must be a whole number.")
        .isLength({ max: 5 })
        .withMessage(
            "Price must be at most 5 characters long."
        ),
    async (req, res) => {
        try {
            const { errors } = validationResult(req)

            if (errors.length > 0) {
                throw errors
            }

            const { name, price, expirationTime } = req.body

            const auction = await auctionService.createAuction(
                name, price, expirationTime
            )

            res.status(200).json(auction)
        } catch (error) {
            const message = parseError(error)

            res.status(400).json({ message })
        }
    }
)

auctionController.put("/:auctionId", (req, res) => {
    try {
        const { auctionId } = req.params
        const reqBody = req.body

        const updatedAuction = Auction.findOneAndUpdate(
            { _id: auctionId }, reqBody, { new: true }
        )._update

        res.status(200).json(updatedAuction)
    } catch (error) {
        const message = parseError(error)

        res.status(400).json({ message })
    }
})

module.exports = auctionController