//////////
//SETUP //
//////////

// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs")
// const dbNotes = require("./db/db.json")

// Sets Up Express App
var app = express();
var PORT = process.env.PORT || 3010;

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

///////////////////////////////////////////////
// GET: Retrieves Note Data from DB JSON Object
///////////////////////////////////////////////
app.get("/api/notes", function(req,res){

  // Read DB JSON file, Parse Data in an Object, and Send it Back
  fs.readFile(path.join(__dirname, "", "./db/db.json"), (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data)

    res.send(notes)
    res.end()  
  });
});

/////////////////////////////////////////////////////////////////
// POST - Write New Note to DB JSON File When User Clicks Save //
/////////////////////////////////////////////////////////////////

app.post("/api/notes", function (req, res) {

  // Read DB JSON File, Parse Data Into Object, and Push it to DB JSON File
  fs.readFile(path.join(__dirname, "./db/db.json"), function (err, data) {
      if (err) throw err;
      const noteObject = JSON.parse(data);
      const note = req.body;
      noteObject.push(note);

      // Add ID's to All (New) Notes
      for(var i=0; i<noteObject.length; i++){
      note.id = i
      console.log(note.id)
      }

      // Turn the new note into a string object and write it to the JSON file. 
      const newNote = JSON.stringify(noteObject);
      fs.writeFile(path.join(__dirname, "./db/db.json"), newNote, function (err, data) {
          if (err) throw err;
      })
      res.json(req.body)
      res.end()  
  })
})

/////////////////////////////////////////////////
// DELETE - Remove Note User Selects to Delete //
/////////////////////////////////////////////////

app.delete("/api/notes/:id", function (req, res) {

  // Grab ID of Note to Delete
  const deleteNote = req.params.id;
  console.log(deleteNote);
  console.log("read")

  // Read DB JSON File, Filter Remaining Notes, and Write Remaining Notes to DJ JSON File
  fs.readFile(path.join(__dirname, "", "./db/db.json"), function (err, data) {
    if(err) throw err;
    const notes = JSON.parse(data)
    //console.log(notes)
    const unTouchedNotes = notes.filter(noteObject => noteObject.id !== parseInt(deleteNote))
    console.log(unTouchedNotes);

    fs.writeFile("./db/db.json",JSON.stringify(unTouchedNotes), function (err){
      if(err) throw(err)
    })
      res.json(notes)
      res.end()
  })
})


// Listener
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
})