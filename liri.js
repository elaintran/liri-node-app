require("dotenv").config();
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

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

function concertThis() {
    var queryURL = "https://rest.bandsintown.com/artists/" + process.argv[3] + "/events?app_id=codingbootcamp";
    if (process.argv[3] !== undefined) {
        axios.get(queryURL).then(
            function(response) {
                for (var i in response.data) {
                    console.log("Artist: " + process.argv[3]);
                    console.log("Venue: " + response.data[i].venue.name);
                    console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
                    console.log("Event Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
                    console.log("---");
                }
            }
        ).catch(
            function(err) {
                console.log("Error occurred: " + err);
            }
        )
    } else {
        console.log("Please input an artist after concert-this.");
    }
}

function spotifyThis() {
    if (process.argv[3] !== undefined) {
        spotifyCall(process.argv[3]);
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
            for (var i in response.tracks.items) {
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

function movieThis() {
    if (process.argv[3] !== undefined) {
        omdbCall(process.argv[3]);
    } else {
        omdbCall("mr.nobody");
    }
}

function omdbCall(movie) {
    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&apikey=e78640ca";
    axios.get(queryURL).then(
        function(response) {
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