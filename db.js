const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_PATH, 'http://localhost:27017/houseDB',{
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })

        console.log('MongoDB Connected Successfully')
    } catch (error) {
        console.error('Error While connecting Database')
        process.exit(1)
    }
}

module.exports = connectDB
