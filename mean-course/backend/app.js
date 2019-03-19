const path = require("path");
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

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
  const recap = req.body;
  console.log(recap);
  res.status(201).json({
    message: 'Post added sucesfully'
  });
});

app.get( '/api/recaps', (req,res,next) => {
  const recaps = [
    {
      id: 'fadf12421l',
      title: 'First server-side post',
      content: 'This is coming from the server'
    },
    {
      id: 'dfasdfa3',
      title: 'Second server-side post',
      content: 'This is coming from the server!'
    }
  ];
  res.status(200).json({
    message: 'Posts fetched succesfully!',
    recaps: recaps
  });
});

//rM6BBl2KVZuvtyIr

module.exports = app;

// npm run start:server
