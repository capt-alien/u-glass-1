const express = require('express')
const app = express()
const methodOverride = require('method-override')
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contractor-project');

app.use(bodyParser.urlencoded({ extended: true }));
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

// CREATE
app.post('/notes', (req, res) => {
  note.create(req.body).then((note) => {
    console.log(note)
    res.redirect(`/notes/${note._id}`) // Redirect to notes/:id
  }).catch((err) => {
    console.log(err.message)
  })
})
// UPDATE
app.put('/notes/:id', (req, res) => {
  note.findByIdAndUpdate(req.params.id, req.body)
    .then(note => {
      res.redirect(`/notes/${note._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})
// DELETE
app.delete('/notes/:id', function (req, res) {
  console.log("DELETE note")
  note.findByIdAndRemove(req.params.id).then((note) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})

const note = mongoose.model('note', {
  title: String,
  description: String,
  movieTitle: String,
  date: String
});

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// OUR MOCK ARRAY OF PROJECTS
let notes = [
  { title: "Great note", movieTitle: "Batman II" },
  { title: "Awesome Movie", movieTitle: "Titanic" }
]
// var notes = [
//   { title: "Great note" },
//   { title: "Next note" }
// ]

// INDEX
app.get('/', (req, res) => {
  note.find()
    .then(notes => {
      res.render('notes-index', { notes: notes });
    })
    .catch(err => {
      console.log(err);
    })
})
// NEW
app.get('/notes/new', (req, res) => {
  res.render('notes-new', {});
})
// ADD DUE DATE
app.get('/notes/new-date', (req, res) => {
  res.render('notes-new-date', {});
})
// SHOW
app.get('/notes/:id', (req, res) => {
  note.findById(req.params.id).then((note) => {
    res.render('notes-show', { note: note })
  }).catch((err) => {
    console.log(err.message);
  })
})
// EDIT
app.get('/notes/:id/edit', (req, res) => {
  note.findById(req.params.id, function(err, note) {
    res.render('notes-edit', {note: note});
  })
})
app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
