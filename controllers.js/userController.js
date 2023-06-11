const userService = require("../services/userService")
const userController = require("express").Router()
const { body, validationResult } = require("express-validator")
const { parseError } = require("../util/parser")

userController.get("/", async (req, res) => {
    try {
        const users = await userService.readUsers()

        res.status(200).json({ users })
    } catch (error) {
        const message = parseError(error)

        res.status(400).json({ message })
    }
})

userController.post("/register",
    body("username").isLength({ min: 2 }).withMessage(
        "Username must be at least 2 characters long."
    ),
    body("password").isLength({ min: 5 }).withMessage(
        "Password must be at least 5 characters long."
    ),
    async (req, res) => {
        try {
            const { errors } = validationResult(req)

            if (errors.length > 0) {
                throw errors
            }

            const token = await userService.register(req.body.username, req.body.password)

            res.status(200).json(token)
        } catch (error) {
            const message = parseError(error)

            res.status(400).json({ message })
        }
    }
)

userController.post("/login", async (req, res) => {
    try {
        const token = await userService.login(req.body.username, req.body.password)

        console.log(req.body)

        res.status(200).json(token)
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
})

userController.post("/logout", async (req, res) => {
    try {
        const token = req.body.accessToken

        await userService.logout(token)

        res.status(204).end()
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
})

module.exports = userController