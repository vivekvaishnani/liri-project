require("dotenv").config();
var fs = require("fs");
// Inquirer - Used for accepting user input
var inquirer = require('inquirer');
var keys = require("../keys.js");
// Spotify API - Used for displaying song information
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
// ------------------------------------------------------------------------------------------------------------------------

module.exports.spotifySongs = function(random) {
    if (random === true) {
      fs.readFile("random.txt", "utf8", function(error, text) {
        if (error) {
          return console.log(error);
        }
        spotify.search({ type: 'track', query: text, limit: 1 }, function(err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          };
          spotifyPrinter(data, text);
        })
      });
    } else {
      inquirer
      .prompt([
        {
          type: "input",
          name: "songName",
          message: "What song would you like to search?",
        }
      ]).then(function(songSearch) {
        if (!songSearch.songName) {
          spotify.search({ type: 'track', query: 'The Sign', limit: 1 }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
            console.log("\n");
            console.log("-------------------------------------------------------------------");
            console.log("Looks like you didn't enter a search term.");
            console.log("Maybe next time you will open up your eyes and see the sign...")
            console.log("Let me tell you what I said to the person before you...");
            console.log("-------------------------------------------------------------------");
            spotifyPrinter(data, 'The Sign');
            return;
          })
        } else {
          spotify.search({ type: 'track', query: songSearch.songName, limit: 1 }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
            if (data.tracks.total === 0) {
              console.log("\nThis isn't a song in the Spotify database. Please try again");
            } else {
              spotifyPrinter(data, songSearch.songName);
            };
          })
        };
      })
    }  
  };
  // ------------------------------------------------------------------------------------------------------------------------
  // Receives the results from the  call and prints the required items to the console.
function spotifyPrinter (data, value) {
    var artistName = data.tracks.items[0].album.artists[0].name;
    var songName = value;
    var songLink = data.tracks.items[0].album.artists[0].external_urls.spotify;
    var albumName = data.tracks.items[0].album.name;
    console.log("\n");
    console.log("-------------------------------------------------------------------");
    console.log("Artist Name : " + artistName);
    if (value === 'The Sign') {
      console.log("Song Name : The Sign");
    } else {
      console.log("Song Name : " + songName);
    };
    console.log("Song Link : " + songLink);
    console.log("Albumn Name : " + albumName);
  };