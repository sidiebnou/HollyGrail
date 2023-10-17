// Import the 'express' framework for creating a web server.
var express = require("express");
var app = express(); // Create an instance of the Express application.

// Import 'swagger-jsdoc' and 'swagger-ui-express' for generating and serving Swagger documentation.
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

// Serve static files from the 'public' directory.
app.use(express.static("public"));

// Define the Swagger options for generating documentation.
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      description: "This is a sample server", // Description of the API.
      version: "1.0.0", // API version.
      title: "Library API", // API title.
    },
  },
  apis: ["app.js"], // Array of paths to the files containing API definitions.
};

// Generate the Swagger documentation using 'swagger-jsdoc'.
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Serve the Swagger documentation using 'swagger-ui-express'.
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Import the 'body-parser' module.
var bodyParser = require("body-parser");

// Configure the Express application to use 'body-parser' for parsing request bodies.

// Parse URL-encoded data. This middleware is used for processing form data.
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON data. This middleware is used for processing JSON data in request bodies.
app.use(bodyParser.json());

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get information about a book
 *     description: Retrieve information about a specific book.
 *     responses:
 *       200:
 *         description: Successful response with book information
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   isbn:
 *                     type: string
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 *                   publisher:
 *                     type: string
 */

// Define an HTTP GET route for the '/books' endpoint
app.get("/books", (req, res) => {
  // Inside the route callback function:

  // 'res' is the response object that allows you to send a response to the client.

  // Send a JSON response (an array) to the client
  res.send([
    {
      isbn: "543535843535",
      title: "The Hitchhiker's Guide to the Galaxy",
      author: "Douglas Adams",
      publisher: "Scholastic",
    },
  ]);
});

/**
 * @swagger
 * /book:
 *   post:
 *     summary: Create a new book.
 *     description: Create a new book by providing a title in the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the book.
 *     responses:
 *       200:
 *         description: Book created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: The title of the created book.
 */

// Define a route to handle the root URL ('/').
app.get("/", function (req, res) {
  res.send("Hello World!"); // Respond with a simple "Hello World!" message.
});

// Define an HTTP POST route for the '/book' endpoint
app.post("/book", (req, res) => {
  // Inside the route callback function:

  // Extract the 'title' property from the request body
  const title = req.body.title;

  // Send a JSON response containing the extracted 'title' property
  res.send({ title });
});

// Start the Express server on port 3000 and log a message when it's running.
app.listen(3000, function () {
  console.log("Running on http://localhost:3000/");
});
