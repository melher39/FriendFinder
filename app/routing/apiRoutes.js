// this file will be responsible for two parts of the site:
// a GET route to display the friends list as json
// a POST route to handle survey results and determine compatibility

// we need the user data from the friends.js file 
let friendData = require("../data/friends");

module.exports = (app) => {
// this will return the friend data in JSON format in a new page
app.get("/api/friends", (req,res) => {
    res.json(friendData);
});

app.post("/api/friends", (req,res) => {
    // req.body is available since we're using the body parsing middleware
    // basically store the user-submitted data in this variable
    // taken from week-13-activity-16-solved-apiRoutes.js
    const newFriend = req.body;

    // add this new data to the existing " " array
    friendData.push(newFriend);
    res.json(friendData);
})

};