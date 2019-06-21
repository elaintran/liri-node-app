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

// if (process.argv[2] === "concert-this") {
//     console.log("Name of the venue");
//     console.log("Venue location");
//     console.log("Date of the Event (use moment to format this as 'MM/DD/YYYY')");
// } else if (process.argv[2] === "spotify-this-song" && process.argv[3] === undefined) {
//     console.log("if no song, default to 'the sign' by ace of base");
// } else if (process.argv[2] === "spotify-this-song" && process.argv[3] !== undefined) {
//     console.log("Artist");
//     console.log("Song Name");
//     console.log("Preview of song link from spotify");
//     console.log("The album that the song is from");
// } else if (process.argv[2] === "movie-this" && process.argv[3] === undefined) {
//     console.log("Mr. Nobody");
// } else if (process.argv[2] === "movie-this" && process.argv[3] !== undefined) {
//     console.log("Title of the movie");
//     console.log("Year the movie came out");
//     console.log("IMDB Rating of the movie");
//     console.log("Rotten Tomatoes Rating of the movie");
//     console.log("Country where the movie was produced.");
//     console.log("Language of the movie");
//     console.log("Plot of the movie");
//     console.log("Actors in the movie");
// } else if (process.argv[2] === "do-what-it-says") {

// }