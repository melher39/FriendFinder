// dependencies - necessary node packages
const express = require("express");
const path = require("path");

// express app setup
const app = express();
const PORT = 5000;

// Sets up the Express app to handle data parsing
// taken from week13-activity 13
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// start the server and begin to listen
app.listen(PORT, () => {
    console.log("App is listening on port: " + PORT)
});