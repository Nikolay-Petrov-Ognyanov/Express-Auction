const auctionService = require("../services/auctionService")
const auctionController = require("express").Router()
const { body, validationResult } = require("express-validator")
const { parseError } = require("../util/parser")

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
        .isLength({ min: 2, max: 20 })
        .withMessage(
            "Name must be at between 2 and 20 characters long."
        ),
    body("price")
        .isInt()
        .withMessage("Price must be a whole number.")
        .isLength({ max: 20 })
        .withMessage(
            "Price must be at most 20 characters long."
        ),
    async (req, res) => {
        try {
            const { errors } = validationResult(req)

            if (errors.length > 0) {
                throw errors
            }

            const auction = await auctionService.createAuction(
                req.body.name, req.body.price
            )

            res.status(200).json(auction)
        } catch (error) {
            const message = parseError(error)

            res.status(400).json({ message })
        }
    }
)

module.exports = auctionController