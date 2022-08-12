const express = require('express');
const {postRentHouse, postRenting, postCancelRent, getAllrent} = require('../controllers/rentController');

const router = express.Router();

router.route('/renthouse').post(postRentHouse);
router.route('/getrentid').post(postRenting);
router.route('/cancelrent').post(postCancelRent);
router.route('/getallrents').get(getAllrent);

module.exports = router