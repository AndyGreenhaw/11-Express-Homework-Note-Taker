//////////
//SETUP //
//////////

// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs")
const dbNotes = require("./db/db.json")

// Sets Up Express App
var app = express();
var PORT = process.env.PORT || 3001;

// Sets Up Express App to Handle Data PArsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Tells Express It Can Serve Files from the Public Folder
app.use(express.static('public'));

////////////////////
// ROUTE REQUESTS //
////////////////////

// GET: Retrieves HTML Pages to Display Main Page and Notes Page
app.get("/", function(req,res){
  res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.get("/notes", function(req,res){
  res.sendFile(path.join(__dirname, "/public/notes.html"))
});

// GET: Retrieves Note Data from DB JSON Object
app.get("/api/notes", function(req,res){

  // Read DB JSON file, Parse the Data in an Object and Send it Back
  fs.readFile(path.join(__dirname, "", "./db/db.json"), (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data) 
    res.send(notes)
    console.log(notes);
  });

});

// POST - When Save Button Clicked, Write New Note to DB JSON File 
app.post("/api/notes", function (req, res) {

  // Read DB JSON File,  Parse Data Into Object and Push it to DB JSON File
  fs.readFile(path.join(__dirname, "./db/db.json"), function (err, data) {
      if (err) throw err;
      const noteObject = JSON.parse(data);
      const note = req.body;
      noteObject.push(note);

      // Turn the new note into a string object and write it to the JSON file. 
      const newNote = JSON.stringify(noteObject);
      fs.writeFile(path.join(__dirname, "./db/db.json"), newNote, function (err) {
          if (err) throw err;
      })
      res.json(req.body)
  })
})


// Listener
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});