const express = require('express');
const {
    getAllHouse, 
    getHouseById,
    addNewHouse
} = require('../controllers/houseController');
const router = express.Router();


router.route('/allhouse').get(getAllHouse)
router.route('/id').post(getHouseById)
router.route('/addhouse').post(addNewHouse)

module.exports = router