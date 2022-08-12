const mongoose = require('mongoose');

const rentingSchema = mongoose.Schema({
    
    house : {
        type: String, required: true
    },
    houseid : {
        type: String, required: true
    },
    userid : {
        type: String, required: true
    },
    checkin : {
        type: String, required: true
    },
    checkout : {
        type: String, required: true
    },
    totalamount : {
        type: Number, required: true
    },
    totaldays : {
        type: Number, required: true
    },
    transactionId : {
        type: String, required: true
    }, 
    status : {
        type: String, required: true, default: 'rented'
    }
},{
    timestamps : true,
})

const rentingModel = mongoose.model('rentings', rentingSchema);

module.exports = rentingModel