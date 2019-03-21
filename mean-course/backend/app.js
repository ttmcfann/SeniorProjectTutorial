const path = require("path");
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const Recap = require('./models/recap');

const app = express();








mongoose.connect("mongodb+srv://thomas:" + process.env.MONGO_ATLAS_PW + "@cluster0-wj2bz.mongodb.net/node-angular?retryWrites=true", { useNewUrlParser: true })
  .then(()=> {
    console.log('Connected to database!');
  })
  .catch(()=> {
    console.log('Connection failed!')
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: false}));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
      );
  next();
});

app.use("/api/posts" ,postsRoutes);
app.use("/api/user" ,userRoutes);



app.post("/api/recaps", (req, res, next) => {
  const recap = new Recap({
    title: req.body.title,
    content: req.body.content
  });
  recap.save().then(createdRecap => {
    res.status(201).json({
      message: 'Post added succesfully',
      recapId: createdRecap._id
  });
  });
});

app.get( '/api/recaps', (req,res,next) => {
  Recap.find()
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched succesfully!',
        recaps: documents
      });
    });
});

app.delete("/api/recaps/:id", (req, res, next) => {
  Recap.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!"});
  });
});

//rM6BBl2KVZuvtyIr

module.exports = app;

// npm run start:server
