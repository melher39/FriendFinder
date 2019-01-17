// this file will be responsible for two parts of the site:
// a GET route to display the friends list as json
// a POST route to handle survey results and determine compatibility

// we need the user data from the friends.js file 
const friendData = require("../data/friends");

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

    // totalDifference will be the difference between the scores of the users
    let totalDifference;

    console.log(newFriend);
    console.log("existing scores:" + friendData[0].scores)
    console.log("new friend scores: " + newFriend.scores);
    

    // add this new data to the existing friendsList array
    // friendData.push(newFriend);
    // display the updated array
    // res.json(friendData);

    // iterate over the friendData array
    for (let i=0; i<friendData.length; i++){

        
        const newScore = newFriend.scores;
        const existingScores = friendData[i].scores;

        let differenceArray= [];
        
        for(let j=0;j<newScore.length;j++) {
            
            let indexDifference = newScore[j] - existingScores[j];
            console.log("line 42: " + indexDifference);
            indexDifference = Math.abs(indexDifference);
            console.log("absolute value: " + indexDifference);

            differenceArray.push(indexDifference);
        
            // totalDifference += totalDifference;
            // Math.abs(indexDifference) += Math.abs(indexDifference);


            // console.log("line 49: " + indexDifference);
            
        }
        console.log("this is the difference in scores array: " + differenceArray);
        // use the reduce method to add all the values in the array that stores all the differences in values
        totalDifference = differenceArray.reduce((a,b) => a+b)

    }
    console.log("this is line 46: working!!! " + totalDifference);

});

};