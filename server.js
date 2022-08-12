const express = require('express');
const dotenv = require('dotenv');
const DBconfig = require('./db')


const houseRoutes = require('./routers/houseRoutes');
const userRoutes = require('./routers/userRoutes');
const rentingRoutes = require('./routers/rentingRoutes');

dotenv.config();
const app = express();
DBconfig();




app.use(express.json());
app.use('/api/houses', houseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rentings', rentingRoutes);



const port = process.env.PORT || 2021;

app.listen(port, () => 
    console.log(`Serve Runing ${process.env.NODE_ENV} On ${port}`)
)