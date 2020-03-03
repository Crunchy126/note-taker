let db = require("../public/assets/json/db")

// POST Requests
// Handles when a user hits save, submits data to the server
// Submits form data (JSON object)
// JSON is pushed to JavaScript array
// Server saves the data to the tableData array
function apiRoutes(app) {
    // post create entry
    // request and response
    app.post("/api/notes", function (req, res) {
        console.log(req.body)
        db.push(req.body)
        res.json(db)
    })
    //reads entry
    app.get("/api/notes", function (req, res) {
        res.json(db)
    })

    //updates notes
    app.put("/api/notes/:id", function (req, res) {

    })
    // deletes entry
    app.delete("/api/notes/:id", function (req, res) {
        console.log(req.params.id);
        
         removeFromArray(db, req.params.id)
         res.json(db)
    })
};

function removeFromArray(db, id) {
    for (var i =0; i < db.length; i++)
   if (db[i].id === id) {
         db.splice(i,1);
      break;
   }
}
// Allows for file to be used in another file
// Exports info
module.exports = apiRoutes