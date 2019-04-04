const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const extractFile = require('../middleware/file');
const RecapController = require('../controllers/recaps');

router.post("",
 checkAuth,
 extractFile,
 RecapController.createRecaps);

router.put("/:id",
checkAuth,
extractFile,
RecapController.updateRecap);

router.get("/:id", RecapController.getRecap);

router.get( "",RecapController.getRecaps );


router.delete("/:id", checkAuth, RecapController.deleteRecap);

module.exports = router;
