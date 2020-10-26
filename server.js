// Dependencies
const express = require("express");
const path = require("path");

// Sets Up Express App
var app = express();
var PORT = process.env.PORT || 3001;

// Sets Up Express App to Handle Data PArsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Tells Express It Can Serve Files from the Public Folder
app.use(express.static('public'));

// GET route Listed in Heroku Guide
// app.get("/", function(req,res){
//   res.json(path.join(__dirname, "public/index.html"))
// });

// Sends Index and Notes HTML to Browser
app.get("/", function(req,res){
  res.sendFile(path.join(__dirname, "/public/index.html"))
});
app.get("/notes", function(req,res){
  res.sendFile(path.join(__dirname, "/public/notes.html"))
});

// GET route for API Notes
// app.get("/api/notes", function(req,res){
//   const id = req.params.id; // req.params stores all wildcards and values
// });

// POST route for API Notes
// app.post("/api/notes", function(req,res){
//   const dataToAdd = req.body; // req.body stores the content of any submitted form
// });

// Sample PUT route to update existing item
// app.put("/item", function(req,res){
// });

// DELETE ROUTE that deletes existing item
// app.delete("/api/notes/:id", function(req,res){
//   console.log(req.params.id)
// });

// Listener
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});