// Function to parse different types of errors into a standardized format
function parseError(error) {
    // If the error is an array, likely from express-validator, return an array of error messages
    if (Array.isArray(error)) {
        return error.map(e => e.msg)
    } 
    // If the error is a Mongoose ValidationError, return an array of error messages from the validation errors
    else if (error.name === "ValidationError") {
        return Object.values(error.errors).map(e => e.message)
    } 
    // For other types of errors, return the error message
    else {
        return error.message
    }
}

// Export the parseError function for use in other parts of the application
module.exports = {
    parseError
}