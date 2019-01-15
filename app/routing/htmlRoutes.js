// this file is responsible for two main actions:
// route to home page (home.html)
// route to survey page (survey.html)

// path package is needed to get the correct file paths for the html file
const path = require("path");


app.get("/survey", (req, res) => {
    res.sendFile(path.join(__dirname, "survey.html"))
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "home.html"))
});

