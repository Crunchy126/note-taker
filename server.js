// EXPRESS is an npm package used to help with routing and HTTP for localhosting or use with HEROKU
// Use to give server useful functionality
let express = require("express");
// Sets up the basic properties for express server
// How to use/call out npm functions in files
let app = express();
// Sets an initial port, used later in our listener
// First part is for heroku and second local server
let PORT = process.env.PORT || 8080;
// Sets up the Express app to handle data parsing
// Will not work without this, needs it to read files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// To serve static files such as images, CSS files, and JavaScript files
// The root argument specifies the root directory from which to serve static assets
// Needed to allow access to the files within "public"
app.use(express.static("public"));
// ROUTER
// Points server to a series of "route" files
// Routes give server a "map" of how to respond when users visit or request data from various URLs
let htmlRoutes = require("./routes/htmlRoutes");
htmlRoutes(app);
let apiRoutes = require("./routes/apiRoutes");
apiRoutes(app);
// LISTENER 'Starts' server
app.listen(PORT, function () {
  console.log("app listening on port " + PORT);
});