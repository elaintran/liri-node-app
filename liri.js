//packages
require("dotenv").config();
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");

//command line commands
function commands() {
    switch(process.argv[2]) {
        case "concert-this":
            concertThis();
            break;
        case "spotify-this-song":
            spotifyThis();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-what-it-says":
            doThis();
            break;
        default:
            console.log("Pick a command from the following:");
            console.log("concert-this");
            console.log("spotify-this");
            console.log("movie-this");
            console.log("do-what-it-says");
            break;
    }
}
commands();

//concert this command
function concertThis() {
    var queryURL = "https://rest.bandsintown.com/artists/" + process.argv[3] + "/events?app_id=codingbootcamp";
    //if user did input a value
    if (process.argv[3] !== undefined) {
        axios.get(queryURL).then(
            function(response) {
                //if no concerts show up, show error message
                if (response.data.length === 0) {
                    console.log("No concerts available at the time.");
                //if there are concerts available, log concert info
                } else {
                    for (var i in response.data) {
                        console.log("Venue: " + response.data[i].venue.name);
                        console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
                        console.log("Event Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
                        console.log("---");
                    }
                }
            }
        ).catch(
            function(err) {
                console.log("Error occurred: " + err);
            }
        )
    //error message if user did not input a value
    } else {
        console.log("Please input an artist after concert-this.");
    }
}

//spotify this command
function spotifyThis() {
    //if user did input a value, use value in spotify call function
    if (process.argv[3] !== undefined) {
        spotifyCall(process.argv[3]);
    //if not, search spotify for the sign
    } else {
        spotifyCall("The Sign Ace of Base");
    }
}

function spotifyCall(song) {
    spotify.search({
        type: "track",
        query: song,
        limit: 5
    }).then(
        function(response) {
            //loop to get spotify info
            for (var i in response.tracks.items) {
                //double loop to get all artist names
                for (var j in response.tracks.items[i].artists) {
                    console.log("Artist: " + response.tracks.items[i].artists[j].name);
                }
                console.log("Song Name: " + response.tracks.items[i].name);
                console.log("Album: " + response.tracks.items[i].album.name);
                if (response.tracks.items[i].preview_url === null) {
                    console.log("Song Preview: Not Available");
                } else {
                    console.log("Song Preview: " + response.tracks.items[i].preview_url);
                }
                console.log("---");
            }
        }
    ).catch(function(err) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
    })
}

//moviethis command
function movieThis() {
    //if user did input a value, use value in omdb call function
    if (process.argv[3] !== undefined) {
        omdbCall(process.argv[3]);
    //if not, search for mr.nobody in omdb instead
    } else {
        omdbCall("mr.nobody");
    }
}

function omdbCall(movie) {
    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&apikey=e78640ca";
    axios.get(queryURL).then(
        function(response) {
            //log all movie info
            console.log("Title: " + response.data.Title);
            console.log("Released: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country Produced: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }
    ).catch(function(err) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
    })
}

//do-what-it-says command
function doThis() {
    //read the random.txt file
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //remove \n and \r and split at the comma
        var dataArr = data.replace(/[\n\r]/g, '').split(",");
        //random index in array
        var index = Math.floor(Math.random() * dataArr.length);
        //if index is divisible by 2
        if (index % 2 === 0) {
            //get the command
            process.argv[2] = dataArr[index];
            //move up an index to get the input value
            process.argv[3] = dataArr[index + 1];
        } else {
            //move down an index to get command
            process.argv[2] = dataArr[index - 1];
            //get input value
            process.argv[3] = dataArr[index];
        }
        //call command function again with new values
        commands();
    })
}

//appends the command and value into log.txt
fs.appendFile("log.txt", process.argv[2] + " " + process.argv[3] + "\n", function(err) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
})