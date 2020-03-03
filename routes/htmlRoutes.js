// This page is telling server where to get my html files

// Provides utilities for working with file and directory paths
var path = require("path");
// Function for exporting / sending files
// Routing in seperate folder for cleaner code
function htmlRoutes(app) {
    // Route to main (first) html page / file
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"))
    })
    // Route to notes html page / file
    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"))
    })
};
// Allows for file to be used in another file
// Exports info
module.exports = htmlRoutes