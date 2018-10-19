const express = require('express')
const app = express()
const methodOverride = require('method-override')
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/contractor-project');

app.use(bodyParser.urlencoded({ extended: true }));
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

// CREATE
app.post('/issues', (req, res) => {
  issue.create(req.body).then((issue) => {
    console.log(issue)
    res.redirect(`/issues/${issue._id}`) // Redirect to issues/:id
  }).catch((err) => {
    console.log(err.message)
  })
})
// UPDATE
app.put('/issues/:id', (req, res) => {
  issue.findByIdAndUpdate(req.params.id, req.body)
    .then(issue => {
      res.redirect(`/issues/${issue._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})
// DELETE
app.delete('/issues/:id', function (req, res) {
  console.log("DELETE issue")
  issue.findByIdAndRemove(req.params.id).then((issue) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})

const issue = mongoose.model('issue', {
  title: String,
  description: String,
  movieTitle: String,
  date: String
});

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// OUR MOCK ARRAY OF PROJECTS
let issues = [
  { title: "Great issue", movieTitle: "Batman II" },
  { title: "Awesome Movie", movieTitle: "Titanic" }
]
// var issues = [
//   { title: "Great issue" },
//   { title: "Next issue" }
// ]

// INDEX
app.get('/', (req, res) => {
  issue.find()
    .then(issues => {
      res.render('issues-index', { issues: issues });
    })
    .catch(err => {
      console.log(err);
    })
})
// NEW
app.get('/issues/new', (req, res) => {
  res.render('issues-new', {});
})
// ADD DUE DATE
app.get('/issues/new-date', (req, res) => {
  res.render('issues-new-date', {});
})
// SHOW
app.get('/issues/:id', (req, res) => {
  issue.findById(req.params.id).then((issue) => {
    res.render('issues-show', { issue: issue })
  }).catch((err) => {
    console.log(err.message);
  })
})
// EDIT
app.get('/issues/:id/edit', (req, res) => {
  issue.findById(req.params.id, function(err, issue) {
    res.render('issues-edit', {issue: issue});
  })
})
app.listen(process.env.PORT || 3000, () => {
  console.log('App listening on port 3000!')
})
