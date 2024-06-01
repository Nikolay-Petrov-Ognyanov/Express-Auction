// Import the parseToken function from the userService
const { parseToken } = require("../services/userService")

// Export a middleware function that handles token parsing and validation
module.exports = () => (req, res, next) => {
    // Extract the token from the request headers
    const token = req.headers["x-authorization"]

    // If a token is provided
    if (token) {
        try {
            // Parse the token to get the payload (user information)
            const payload = parseToken(token)

            // Attach the user information and token to the request object
            req.user = payload
            req.token = token
        } catch (error) {
            // If there is an error parsing the token, respond with an error message
            return res.status(200).json({ message: "Invalid authorization token." })
        }
    }

    // Call the next middleware function in the stack
    next()
}