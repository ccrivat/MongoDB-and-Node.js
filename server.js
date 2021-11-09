const express = require('express')
const app = express()
const mongoose = require("mongoose")
const port = 3000
const Feedback = require('./models/feedback');

const dbURI = "mongodb+srv://netninja:1@assigment.hqytm.mongodb.net/Assigment?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

  app.get('/add-feedback', (req, res) => {
    const feedback = new Feedback({
      title: 'New Feedback',
      snippet: 'about the page',
      body: 'more about the page'
    });

    feedback.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });
  });

  app.get('/feedback', (req, res) => {
    Feedback.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    })
  });

  app.get('/single-feedback', (req, res) => {
    Feedback.findById('618aadb90ffe774da6efff02')
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    })
  })

  app.get('/Feedback', (req, res) => {
    Feedback.find()
    .then((result) => {
      res.render('/feedback.html')
    })
    .catch((err) => {
      console.log(err);
    })
  })

   app.get('/', (req, res) => {
    res.sendFile(__dirname + "/Public/index.html")
  })

app.use(express.static(__dirname));

