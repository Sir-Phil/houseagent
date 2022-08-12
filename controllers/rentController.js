const asyncHandle = require('express-async-handler');
const Rent = require('../models/renting');
const House = require('../models/house');
const moment = require('moment');
const {v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51JupXGEBCuowU9DmPyIu6tKE1UCpyGpAOdnfhzWQ4tOTPYORYBteglVg9DXmc3yBe3si5noDfZMo3IMbT247cbC800jf7YXelU');

//Desc  POST Rent House
//Routes  POST api/renting/renthouse

const postRentHouse = asyncHandle(async (req, res) => {
    const {
        house,
        userid,
        checkin,
        checkout,
        totalamount,
        totaldays,
        token
    } = req.body

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        const payment = await stripe.charges.create({
            amount: totalamount * 100,
            customer: customer.id,
            currency: 'NGN',
            receipt_email: token.email

        }, {
            idempotencyKey: uuidv4()
        })

        if(payment){
                const newrent = new Rent({
                    house: house.name,
                    houseid: house._id,
                    userid,
                    checkin: moment(checkin).format('DD-MM-YYYY'),
                    checkout: moment(checkout).format('DD-MM-YYYY'),
                    totalamount,
                    totaldays,
                    transactionId: '1234'
                })

                const rent = await newrent.save()

                const rentCurrent = await House.findOne({ _id: house._id });
                rentCurrent.currentrented.push({
                    rentid: rent._id,
                    checkin: moment(checkin).format('DD-MM-YYYY'),
                    checkout: moment(checkout).format('DD-MM-YYYY'),
                    userid: userid,
                    status: rent.status
                });
                await rentCurrent.save()
        }
        res.send('Payment Successful, You rented Apartment')
    } catch (error) {

    }

});
//DESC POST Booking by User Id
//Route . POST api/renting/getrentid/

const postRenting = asyncHandle(async (req, res) => {
    const userid = req.body.userid

    try {
        const rentings = await Rent.find({userid : userid})
        res.send(rentings)
    } catch (error) {
        res.status(400).json({ error });
    }
});

// DESC POST Cancel Rent
//Route  POST api/rentings/cancelrent    
const postCancelRent = asyncHandle(async(req, res) => {
    const {rentid, houseid} = req.body

    try {
        const rentingItem = await Rent.findOne({_id : rentid})

        rentingItem.status = 'cancelled'
        await rentingItem.save()

        const house = await House.findOne({_id : houseid})

        const rentings = house.currentrented

        const temp = rentings.filter(renting => renting.rentid.toString()!==rentid)

        house.currentrented = temp
        await house.save()

        res.send('Your Rent cancelled successfully')

    } catch (error) {
        return res.status(400).json({error});
    }
});

//DEsc Get all rents
//Route  GET: api/rentings/getallrents
const getAllrent = asyncHandle (async(req, res) => {
    try {
        const rents = await Rent.find()
        res.send(rents)
    } catch (error) {
        return res.status(400).json({ error });
    }
});

module.exports = {
    postRentHouse, 
    postRenting, 
    postCancelRent, 
    getAllrent
} 