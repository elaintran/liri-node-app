require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

if (process.argv[2] === "concert this") {
    console.log("Name of the venue");
    console.log("Venue location");
    console.log("Date of the Event (use moment to format this as 'MM/DD/YYYY')");
} else if (process.argv[2] === "spotify-this-song" && process.argv[3] === undefined) {
    console.log("if no song, default to 'the sign' by ace of base");
} else if (process.argv[2] === "spotify-this-song" && process.argv[3] !== undefined) {
    console.log("Artist");
    console.log("Song Name");
    console.log("Preview of song link from spotify");
    console.log("The album that the song is from");
} else if (process.argv[2] === "movie-this" && process.argv[3] === undefined) {
    console.log("Mr. Nobody");
} else if (process.argv[2] === "movie-this" && process.argv[3] !== undefined) {
    console.log("Title of the movie");
    console.log("Year the movie came out");
    console.log("IMDB Rating of the movie");
    console.log("Rotten Tomatoes Rating of the movie");
    console.log("Country where the movie was produced.");
    console.log("Language of the movie");
    console.log("Plot of the movie");
    console.log("Actors in the movie");
} else if (process.argv[2] === "do-what-it-says") {

}