
// Spotify 
var spotify = require("./spotify.js");
// OMDB 
var omdb = require("./omdb.js");
// Inquirer 
var inquirer = require('inquirer');
// twitter 
var twitter = require("./twitter.js");

function startMyLiri() {
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
        spotify.spotifySongs(false)
      } else if (userChoice === "Movie This") {
        omdb.movieSearch();
      } else if (userChoice === "Exit") {
        process.exit();
      }
    });
}
startMyLiri();