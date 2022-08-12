const mongoose = require('mongoose');

const houseSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    maxcount:{
        type: Number,
        required: true,
    } ,
    phonenumber: {
        type: Number,
        required: true,
    },
    rentperyear: {
        type: Number,
        required: true,
    },
    imageurls: [],
    currentrented: [],
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, 
{
    timestamps: true,
}
) 

const houseModel = mongoose.model('houses', houseSchema)

module.exports = houseModel