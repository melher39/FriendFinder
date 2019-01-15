// this file is responsible for two main actions:
// route to home page (home.html)
// route to survey page (survey.html)

// path package is needed to get the correct file paths for the html file
const path = require("path");

// exporting the following code to be later imported by server.js
// followed the example in week13-activity16-solved
module.exports = (app) => { 

// if the path is /survey, then the corresponding html page will be loaded
app.get("/survey", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/survey.html"))
});

// * means all/any other route not matching the above will default to home
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/home.html"))
});

};

