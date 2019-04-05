const Recap = require('../models/recap');


exports.createRecaps = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const recap = new Recap({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename,
    creator: req.userData.userId

  });

  recap.save().then(createdRecap => {
    res.status(201).json({
      message: 'Recap added succesfully',
      recap: {
        ...createdRecap,
        id: createdRecap._id

      }
  });
  })
  .catch(error => {
    res.status(500).json({
      message: "Creating a recap failed!"
    });
  });
}

exports.updateRecap = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename
  }
  console.log(req.file);
  const recap = new Recap({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  Recap.updateOne({ _id: req.params.id, creator: req.userData.userId }, recap)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({message: 'Update successful!'});
      } else {
        res.status(401).json({message: 'Not authorized!'});
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't update recap!"
      })
    });
}

exports.getRecaps = (req,res,next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const recapQuery = Recap.find();
  let fetchedRecaps;
  if (pageSize && currentPage) {
    recapQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  recapQuery
    .then(documents => {
      fetchedRecaps = documents;
      return Recap.count();

    })
    .then(count => {
      res.status(200).json({
        message: 'Posts fetched succesfully!',
        recaps: fetchedRecaps,
        maxRecaps: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching recaps failed"
      });
    });
}

exports.getRecap = (req, res, next) => {
  Recap.findById(req.params.id).then(recap => {
    if (recap) {
      res.status(200).json(recap);
    } else {
      res.status(404).json({message: 'Recap not found'});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching recap failed"
    });
  });
}

exports.deleteRecap = (req, res, next) => {
  Recap.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
    if (result.n > 0) {
      res.status(200).json({message: 'Deletion successful!'});
    } else {
      res.status(401).json({message: 'Not authorized!'});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching recaps failed"
    });
  });;
}
