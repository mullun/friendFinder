// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendData = require("../data/friendData");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a friend finder survey... this data is then sent to the server...
  // Then the server saves the data to the friendData array; checks the closest friend; sends information about that friend to the client)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Once the user enters his or her personal values, and hits "send", then that information is sent to the server

  // get user info into a variable
  var userInfo = req.body;
  console.log("userInfo");
  console.log(userInfo);
  var bestFriendIndex = [];
  var currentDiff = 0;

  for (var i = 0; i < friendData.length; i ++) {
    currentDiff = 0;
    for (var j = 0; j < friendData[i].scores.length; j ++){
      currentDiff += Math.abs( parseInt(userInfo.scores[j]) - parseInt(friendData[i].scores[j]) );
    };
    bestFriendIndex.push(currentDiff);
  };

  var lowest = 0;
  for (var i = 1; i < bestFriendIndex.length; i ++){
    if (bestFriendIndex[i] < bestFriendIndex[lowest]) {
      lowest = i;
    };
  };

  var closestFriend = friendData[lowest];

  friendData.push(userInfo);
  // send JSON object of the best match
  res.json(closestFriend);

  });


  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

    app.post("/api/clear", function() {
    // Empty out the arrays of data
    console.log(friendData);
  });
};