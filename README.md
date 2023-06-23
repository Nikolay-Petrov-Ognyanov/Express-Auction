# Auction System API Documentation

Welcome to the documentation for the Auction System API. This documentation provides a comprehensive overview of the API, including setup instructions, project structure, endpoints, models, services, controllers, middlewares, and utility functions. Use this guide to understand the functionality and usage of the API.

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
- [Utility Functions](#utility-functions)

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
- /util                     // Utility functions
  - parser.js               // Function for parsing and formatting error messages
```

## Dependencies

The Auction System API utilizes a range of dependencies to ensure seamless functionality. The main dependencies include:

- Express: A fast and minimalist web framework for Node.js.
- Mongoose: An elegant MongoDB object modeling library for Node.js.
- Cors: Middleware for enabling Cross-Origin Resource Sharing (CORS).
- Bcrypt: A library for hashing passwords securely.

## Usage

Once the Auction System API is up and running, you can interact with it using various API endpoints. Refer to the [API Endpoints](#api-endpoints) section for detailed information about each endpoint and their request/response formats.

## API Endpoints

The Auction System API provides the following endpoints for interacting with the system:

- `GET /`: Retrieves a welcome message.
- `GET /users`: Retrieves a list of all users.
- `POST /users/register`: Registers a new user.
- `POST /users/login`: Logs in a user.
- `POST /users/logout`: Logs out a user.
- `PUT /users/:userId`: Updates user information.
- `GET /auctions`: Retrieves a list of all auctions.
- `POST

 /auctions`: Creates a new auction.
- `GET /auctions/:auctionId`: Retrieves details of a specific auction.
- `PUT /auctions/:auctionId`: Updates auction information.
- `POST /auctions/:auctionId/bids`: Places a bid on a specific auction.

Refer to the API documentation for detailed information about the request/response formats and authentication requirements for each endpoint.

## Models

The Auction System API utilizes the following models:

- `User`: Represents a user in the system. The user model includes properties such as `username`, `email`, and `password`.
- `Auction`: Represents an auction in the system. The auction model includes properties such as `title`, `description`, `startingBid`, and `endDate`.

Refer to the API documentation for detailed information about each model and their properties.

## Services

The Auction System API includes the following services:

- `userService`: Provides functions for user-related operations, such as user registration, login, and logout.
- `auctionService`: Provides functions for auction-related operations, such as creating auctions, retrieving auctions, and placing bids.

Refer to the API documentation for detailed information about each service and the available operations.

## Controllers

The Auction System API includes the following controllers:

- `userController`: Handles user-related endpoints and communicates with the `userService`.
- `auctionController`: Handles auction-related endpoints and communicates with the `auctionService`.

Refer to the API documentation for detailed information about each controller and the supported endpoints.

## Middlewares

The Auction System API includes the following middlewares:

- `session`: Middleware for parsing and validating authorization tokens.
- `trim`: Middleware for trimming request data.

Refer to the API documentation for detailed information about each middleware and their usage.

## Utility Functions

The Auction System API includes the following utility function:

- `parseError`: Function for parsing and formatting error messages.

Refer to the API documentation for detailed information about the utility function and its usage.
```

Please note that this documentation assumes you have already set up the necessary environment and have a basic understanding of Node.js, MongoDB, and web API development.

---

This concludes the comprehensive documentation for the Auction System API. You can use this information to understand the project structure, dependencies, and functionality of the API.