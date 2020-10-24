var express = require("express");
var noteObjectArray = require("./db/db.json")
var app = express();
var PORT = process.env.PORT || 3001;

// Sets Up Express App to Handle Data PArsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Tells Express It Can Serve Files from the Public Folder
// The pathname in your HTML file would EXCLUDE the "public part"
app.use(express.static('public'));

// GET route for All
app.get("/", function(req,res){
  res.json(path.join(__dirname, "./public/notes.html"))
});

app.get("/notes", function(req,res){
  res.json(path.join(__dirname, "./public/notes.html"))
});

// GET route for a API Notes
app.get("/api/notes", function(req,res){
  const id = req.params.id; // req.params stores all wildcards and values
});

// POST route for API Notes
app.post("/api/notes", function(req,res){
  const dataToAdd = req.body; // req.body stores the content of any submitted form
});

// Sample PUT route to update existing item
// app.put("/item", function(req,res){
// });

// DELETE ROUTE that deletes existing item
app.delete("/api/notes/:id", function(req,res){
  console.log(req.params.id)
});

// Listener
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});