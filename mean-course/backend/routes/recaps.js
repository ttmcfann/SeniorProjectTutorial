const express = require("express");
const Recap = require('../models/recap');

const router = express.Router();



router.post("", (req, res, next) => {
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

router.put("/:id", (req, res, next) => {
  const recap = new Recap({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Recap.updateOne({ _id: req.params.id }, recap)
    .then(result => {
      console.log(result);
      res.status(200).json({message: 'Update successful!'});
    });
});

router.get("/:id", (req, res, next) => {
  Recap.findById(req.params.id).then(recap => {
    if (recap) {
      res.status(200).json(recap);
    } else {
      res.status(404).json({message: 'Post not found'});
    }
  });
});

router.get( "", (req,res,next) => {
  Recap.find()
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched succesfully!',
        recaps: documents
      });
    });
});


router.delete("/:id", (req, res, next) => {
  Recap.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!"});
  });
});

module.exports = router;
