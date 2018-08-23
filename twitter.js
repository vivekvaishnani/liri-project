require("dotenv").config();
// Inquirer - Used for accepting user input
var inquirer = require('inquirer');
// Twitter API - Used for displaying Charlie's tweets
var Twitter = require('twitter');
var keys = require("./keys.js");
var client = new Twitter(keys.twitter);
// Can be changed to different user or search term
var twitterName = 'VivekPa85103889'
// Can be changed to a different number. Currently using 5 until more tweets are made
var tweetsDisplayed = 10;
// ------------------------------------------------------------------------------------------------------------------------
// Uses the Twitter API to search based on the twitterName variable search term and displays the 
// tweets and the timestamp. Displays x results where x is the numOfTweets parameter passed.
module.exports.viewMyTweets = function() {
    client.get('search/tweets', {q: twitterName}, function(error, tweets, response) {
      

      if (error) {
        return console.log(error);
      };
      for (i=0; i<tweetsDisplayed; i++) {
        // showing erroe for "var tweet = tweets.statuses[i].text" dont know why??
        var tweet = tweets.statuses[i].text;  
        var time = tweets.statuses[i].created_at;
        var timeSplit = time.split("+");
        console.log("\n---------------------------Tweet :-" + i +"-----------------------------------");
        console.log(tweet);
        console.log("\nTimestamp: " +timeSplit[0] +"\n" + "\n");
      };
    });
  };
  // ------------------------------------------------------------------------------------------------------------------------
  
module.exports.newTweet = function() {
    inquirer
    .prompt([
      {
        type: "input",
        name: "tweet",
        message: "What do you want to say?",
      }
    ]).then(function(tweetPost) {
      client.post('statuses/update', {status: tweetPost.tweet}, function(error, tweet, response) {
        if (!error) {
          return console.log(tweet);
        };
      })
    })
  };