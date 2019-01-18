// dependencies - necessary express node package
const express = require("express");

// express app setup
const app = express();

// port will be used later for heroku deployment or can also be used locally
const PORT = process.env.PORT || 5000;

// Sets up the Express app to handle data parsing
// aka the middleware
// static code taken from week13-activity 13
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// this points our server to the js route files we are using
// the server responds based on the url requested by the client
// this means that the first function require() returns another function app() and then
// app() is called immediately after
// taken from week 13-activity16-solved
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);


// start the server and begin to listen
// using as test for now
app.listen(PORT, () => {
    console.log("App is listening on port: " + PORT)
});