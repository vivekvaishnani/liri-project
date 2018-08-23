
// Inquirer 
var inquirer = require('inquirer');
// Spotify 
var spotify = require("./features/spotify.js");
// OMDB 
var omdb = require("./features/omdb.js");
// twitter 
var twitter = require("./features/twitter.js");



function startMyLiri() {

// With the inquirer we store user input as a promise and then compare the
// promise to the functionality they select.

// Also sepearting all the functionality into a sepearte js file 
//  helps in keepin the code clean and better to understand.

  inquirer
    .prompt([
      {
        type: "checkbox",
        name: "command",
        message: "What would you like to do?",
        choices: ["My tweets", "Spotify The Song", "Movie This","Exit"]
      }
    ]).then(function(liri) {
      var userChoice = liri.command.join();
      if (userChoice === "My tweets") {
        twitter.viewMyTweets();
      } else if (userChoice === "Spotify The Song") {
        spotify.spotifySongs(false);
      } else if (userChoice === "Movie This") {
        omdb.movieSearch();
      } else if (userChoice === "Exit") {
        process.exit();
      }
    });
}
startMyLiri();