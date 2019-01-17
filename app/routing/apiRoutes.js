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

    // totalDifference will be the difference between the scores of the current user and another being compared
    let totalDifference;
    // this will be the compilation of totalDifferences stored in an array to retrieve the most compatible
    let comparisonArray = [];

    console.log(newFriend);
    console.log("existing scores:" + friendData[0].scores)
    console.log("new friend scores: " + newFriend.scores);
    

    
    // display the updated array
    // res.json(friendData);

    // iterate over the friendData array
    for (let i=0; i<friendData.length; i++){

        // store the existing user scores and the new user scores in variables
        const newScore = newFriend.scores;
        let existingScores = friendData[i].scores;
        // existingScores += existingScores;

        // empty array which will hold the difference in scores per index of the users
        let differenceArray = [];
        
        // loop through the array to compare each individual score
        for(let j=0;j<newScore.length;j++) {
            
            // find the individual index score difference 
            let indexDifference = newScore[j] - existingScores[j];
            // console.log("line 42: " + indexDifference);
            // get the absolute value of the indexDifference
            indexDifference = Math.abs(indexDifference);
            // console.log("absolute value: " + indexDifference);

            // add these individual results to the array containing all the differences in scores
            differenceArray.push(indexDifference);
            
        }
        console.log("this is the difference in scores array: " + differenceArray);
        // use the reduce method to add all the values in the array that stores all the differences in scores
        totalDifference = differenceArray.reduce((a,b) => a+b);
        console.log("this is line 59: working!!! " + totalDifference);

        // adding the totalDifference to the comparisonArray
        comparisonArray.push(totalDifference); 
        console.log("comparison array: "+ comparisonArray);

    }

    // add this new data to the existing friendsList array
    // added this after the for loops so the new user's scores wouldn't compare to itself
    friendData.push(newFriend);

    // ES6 spread operator to find the minimum value in this array
    // found this tip on the site jstips.co
    let mostCompatible = Math.min(...comparisonArray);

    console.log("Your most compatible match scored: " + mostCompatible);
    

});

};