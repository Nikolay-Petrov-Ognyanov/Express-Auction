// Export a middleware function that trims whitespace from string values in the request body
module.exports = () => (req, res, next) => {
    // Loop through each key in the request body
    for (let key in req.body) {
        // Check if the value associated with the key is a string
        if (typeof req.body[key] === "string") {
            // If it's a string, trim leading and trailing whitespace
            req.body[key] = req.body[key].trim()
        }
    }

    // Call the next middleware function in the stack
    next()
}