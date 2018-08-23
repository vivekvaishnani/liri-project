var inquirer = require('inquirer');
// Request - Used for making HTTPS calls
var request = require('request');

module.exports.movieSearch = function() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "movie",
          message: "What movie do you want to search for?",
        }
      ]).then(function(answer) {
        if(!answer.movie) {
          request("http://www.omdbapi.com/?t="+"Mr. Nobody"+"&y=&plot=short&apikey=trilogy", function(error, response, body) {
            if (!error && response.statusCode === 200) {
              var results = JSON.parse(body);
              console.log("\n" + "Please search for a movie.");
              movieInfo(results);
            };
          });
        } else {
          request("http://www.omdbapi.com/?t="+answer.movie+"&y=&plot=short&apikey=trilogy", function(error, response, body) {
            if (!error && response.statusCode === 200) {
              var results = JSON.parse(body);
              movieInfo(results);
            };
          });
        };
      })
  };
  // ------------------------------------------------------------------------------------------------------------------------
  // Receives the results from the OMDB call and prints the required items to the console.
  function movieInfo(results) {
    console.log("-------------------------------------------------------------------");
    console.log(`\nTitle: ${results.Title}\nYear: ${results.Year}`);
    console.log(`\nLanguage: ${results.Language}\n\nActors: ${results.Actors}.`);
    console.log(`\nRating: ${results.Ratings[1].Source}Score: ${results.Ratings[1].Value}IMDB Score${results.imdbRating}`);
    console.log(`\nPlot: ${results.Plot}`);
    console.log("-------------------------------------------------------------------");
  };
  // ------------------------------------------------------------------------------------------------------------------------