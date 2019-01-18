// this file will be responsible for two parts of the site:
// a GET route to display the friends list as json
// a POST route to handle survey results and determine compatibility

// we need the user data from the friends.js file 
const friendData = require("../data/friends");

// export the results (res) gathered after these get and post requests are met
module.exports = (app) => {
    // this will get the friend data and return it in JSON format in a new page
    app.get("/api/friends", (req, res) => {
        res.json(friendData);
    });

    // this will take the user's info and add it to the existing /api/friends
    app.post("/api/friends", (req, res) => {
        // req.body is available since we're using the body parsing middleware
        // basically store the user-submitted data in this variable
        // taken from week-13-activity-16-solved-apiRoutes.js
        const newFriend = req.body;

        // totalDifference will be the difference between the scores of the current user and another being compared
        let totalDifference;
        // this will be the compilation of totalDifferences stored in an array to retrieve the most compatible
        let comparisonArray = [];
        // this will hold the names of the users respective to the scores in the differenceArray above
        let individualNamesArray = [];
        // most compatible result by name
        let matchName;

        console.log(newFriend);
        console.log("existing scores:" + friendData[0].scores)
        console.log("new friend scores: " + newFriend.scores);

        // iterate over the friendData array
        for (let i = 0; i < friendData.length; i++) {

            // store the existing user scores and the new user scores in variables
            const newScore = newFriend.scores;
            let existingScores = friendData[i].scores;

            // the name of the already existing user being compared to the new user
            let existingUserName = friendData[i].name;

            // empty array which will hold the difference in scores per index of the users
            let differenceArray = [];

            // iterate over the scores array to compare each individual score
            for (let j = 0; j < newScore.length; j++) {

                // find the individual index score difference 
                let indexDifference = newScore[j] - existingScores[j];

                // get the absolute value of the indexDifference
                indexDifference = Math.abs(indexDifference);

                // add these individual results to the array containing all the differences in scores
                differenceArray.push(indexDifference);

            }
            console.log("this is the difference in scores array: " + differenceArray);
            // use the reduce method to add all the values in the differenceArray
            totalDifference = differenceArray.reduce((a, b) => a + b);
            console.log("this is the total difference: " + totalDifference + " and it belongs to: " + existingUserName);

            // adding the totalDifference to the comparisonArray
            comparisonArray.push(totalDifference);
            // adding the existingUserName to the individualNamesArray
            individualNamesArray.push(existingUserName);
            console.log("comparison array: " + comparisonArray);

        }

        // add this new data to the existing friendsList array
        // added this after the for loops so the new user's scores wouldn't compare to itself
        friendData.push(newFriend);

        // ES6 spread operator(...) to find the minimum (Math.min) value in this array
        // without the spread operator, the array is not recognized when it has multiple values
        // found this tip on the site jstips.co
        let mostCompatible = Math.min(...comparisonArray);

        console.log("Your most compatible match scored: " + mostCompatible);
        console.log("One of these people: " + individualNamesArray);

        // index of most compatible
        console.log(comparisonArray.indexOf(mostCompatible));

        // assign the name to the matchName variable using the index number of the mostCompatible result
        matchName = individualNamesArray[comparisonArray.indexOf(mostCompatible)];

        // BOOM! There it is!
        console.log("Your match is: " + matchName);

        // this will be the data sent back to the client when they hit the submit button
        // this will be their match's information
        res.json(friendData[comparisonArray.indexOf(mostCompatible)]);



    });

};