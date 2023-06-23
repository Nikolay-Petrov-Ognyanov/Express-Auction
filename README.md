# Auction System API Documentation

Welcome to the documentation for the Auction System API. This documentation provides a comprehensive overview of the API, including setup instructions, project structure, endpoints, models, services, controllers, and middlewares. Use this guide to understand the functionality and usage of the API.

## Table of Contents
- [Overview](#overview)
- [Setup and Installation](#setup-and-installation)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Models](#models)
- [Services](#services)
- [Controllers](#controllers)
- [Middlewares](#middlewares)

## Overview

The Auction System API is a powerful tool for managing online auctions. It provides endpoints for creating auctions, placing bids, and managing auction-related operations. The API is built using modern web technologies and follows industry best practices to ensure reliability, security, and performance.

## Setup and Installation

To set up and run the Auction System API, follow these steps:

1. Ensure that you have Node.js and MongoDB installed on your machine.
2. Clone the project repository.
3. Navigate to the project directory using a terminal.
4. Install the required dependencies by running the following command:
   ```
   npm install
   ```
5. Start the MongoDB server using the appropriate command for your system.
6. Start the API server by running the following command:
   ```
   npm start
   ```
7. The server should now be running and accessible at http://localhost:3030.

## Project Structure

The project structure is organized in a clean and modular manner to enhance code readability and maintainability. The main components of the project are:

```
- index.js                  // Entry point of the application
- /middlewares              // Custom middlewares
  - session.js              // Middleware for parsing and validating authorization token
  - trim.js                 // Middleware for trimming request data
- /models                   // Mongoose models
  - Auction.js              // Model for Auction objects
  - User.js                 // Model for User objects
- /services                 // Business logic services
  - auctionService.js       // Service for interacting with Auctions
  - userService.js          // Service for interacting with Users
- /controllers              // Request handlers
  - auctionController.js    // Controller for Auction-related endpoints
  - userController.js       // Controller for User-related endpoints
```

## Dependencies

The Auction System API utilizes a range of dependencies to ensure seamless functionality. The main dependencies include:

- Express: A fast and minimalist web framework for Node.js.
- Mongoose: An elegant MongoDB object modeling library for Node.js.
- Cors: Middleware for enabling Cross-Origin Resource Sharing (CORS).
- Bcrypt: A library for hashing passwords securely.
- Jsonwebtoken (JWT): A library for creating and validating JSON Web Tokens.
- Express-validator: Middleware for validating and sanitizing request data.

For a complete list of dependencies and their versions, please refer to the `package.json` file.

## Usage

Once the API server is up and running, you can interact with it by sending HTTP requests to the provided endpoints. The API supports a variety of operations for managing auctions and users. To use the API effectively, follow the guidelines below:

- Use an HTTP client tool such as cURL, Postman, or Insomnia to send requests to the API.
- Set the appropriate headers and request bodies as required by each endpoint.
- Refer to the next section for detailed information about the available endpoints and their usage.

## API Endpoints

The Auction System API provides the following endpoints:

- **GET /users**: Retrieve a list of all users.
- **POST /users/register**:

 Register a new user.
- **POST /users/login**: Log in with a user account.
- **POST /users/logout**: Log out from the current user session.
- **GET /users/:userId**: Retrieve user information by ID.
- **PUT /users/:userId**: Update user information by ID.
- **GET /auctions**: Retrieve a list of all auctions.
- **GET /auctions/:auctionId**: Retrieve auction information by ID.
- **POST /auctions**: Create a new auction.
- **PUT /auctions/:auctionId**: Update an auction by ID.
- **DELETE /auctions/:auctionId**: Delete an auction by ID.

Note: Replace `:userId` and `:auctionId` with the actual IDs of users and auctions, respectively.

For detailed information about request formats and required parameters, refer to the respective controller files and the descriptions provided in the code.

## Models

The Auction System API includes two Mongoose models:

1. **Auction**: Represents an auction item with properties such as name, price, deposit, expiration time, and references to the owner and bidders.
2. **User**: Represents a user with properties such as username, hashed password, wallet balance, and arrays for tracking created, sold, bid, and won auctions.

For more details about the schema and available methods, refer to the respective model files.

## Services

The Auction System API uses services to encapsulate the business logic and interact with the database. The services provided are:

- **auctionService**: Contains methods for reading auctions and creating new auctions.
- **userService**: Provides functionality for user registration, login, logout, and reading users.

These services utilize the Mongoose models to perform CRUD operations on the database.

## Controllers

The API includes controllers that define the request handlers for different endpoints. They validate the incoming requests, invoke the appropriate services, and send back the response. The provided controllers are:

- **auctionController**: Handles endpoints related to auctions, such as reading auctions, creating new auctions, updating auctions, and deleting auctions.
- **userController**: Manages endpoints related to users, including user registration, login, logout, and updating user information.

Each controller exports an Express Router instance, which can be mounted in the main Express app to handle the respective routes.

## Middlewares

The Auction System API includes two custom middlewares:

- **session**: Middleware for parsing and validating the authorization token sent in the request headers. It extracts the payload from the token and attaches it to the request object as `req.user`.
- **trim**: Middleware for trimming the request data. It trims leading and trailing whitespace from the values of request parameters, query strings, and body.

These middlewares are used in the main Express app to process incoming requests before they reach the controllers.

---

This concludes the comprehensive documentation for the Auction System API. You can use this information to understand the project structure, dependencies, and functionality of the API.