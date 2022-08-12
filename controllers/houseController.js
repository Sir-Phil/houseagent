const asyncHandle = require('express-async-handler');
const House = require('../models/house')
//Desc Get All Houses
//Route GET  api/houses/allhouse
const getAllHouse = asyncHandle(async (req, res) => {

    try {
        const houses = await House.find({})
        res.send(houses)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
})

//Desc Get House by ID
//Route POST api/houses/id
const getHouseById = asyncHandle(async (req, res) => {
    const houseid = req.body.houseid
    try {
        const house = await House.findOne({ _id: houseid })
        res.send(house)
    } catch (error) {
        return res.status(400).json({ message: error })
    }
});

//DESC ADD NEW HOUSE
//Route  POST: api/houses/addhouse
const addNewHouse = asyncHandle(async(req, res) => {

    try {
        const newhouse = new House(req.body)
        await newhouse.save()
        res.send('New House Added Successfully')
    } catch (error) {
        return res.status(400).json({error});
    }
});

module.exports = {
    getAllHouse,
    getHouseById,
    addNewHouse
}